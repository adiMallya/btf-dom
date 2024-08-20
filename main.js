import Todo from "./scripts/todo.js";
import { groupTasksByDate } from "./scripts/utils.js";

const toDoList = document.querySelector('.toDoList');
const toDoForm = document.querySelector('.toDoForm');
const toDoInput = document.querySelector('#toDoInput');
const toDoDate = document.querySelector('#toDoDate');
// State
const myToDo = new Todo([
    {
        id: 0,
        task: "Run 2km Today",
        completed: true,
        date: "2024-07-29"
    },
    {
        id: 1,
        task: "Read for 20min Today",
        completed: false,
        date: "2024-08-20"
    }
]);
// First render
render(myToDo);

// Create
toDoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = toDoInput.value.trim();
    const date = toDoDate.value;

    if (task && date) {
        myToDo.add(task, date);
        render(myToDo);
        toDoInput.value = '';
        toDoDate.value = '';
    }
});
// Remove
function removeTask(id) {
    myToDo.remove(id);
    render(myToDo);
}
// Mark Completed
function toggleComplete(id) {
    myToDo.toggleComplete(id);
    render(myToDo);
}
// Edit/update
function editTask(id, newText) {
    myToDo.update(id, newText);
    render(myToDo);
}


// Rendering
function render(todo) {
    toDoList.innerHTML = '';

    const todos = todo.getAll();

    if (!todos.length) {
        const message = document.createElement('li');
        message.textContent = "You have no tasks at the moment!";
        message.classList.add('message');
        toDoList.appendChild(message);
    } else {
        todos.sort((a, b) => new Date(b.date) - new Date(a.date));
        //Grouping tasks by date
        const groupedTasks = groupTasksByDate(todos);

        // Creating component
        Object.keys(groupedTasks).forEach(date => {
            const showDate = document.createElement('li');
            showDate.textContent = date;
            showDate.classList.add('dateHeader');
            toDoList.appendChild(showDate);

            const taskList = document.createElement('ul');

            groupedTasks[date]?.forEach(({ id, task, completed }) => {
                const li = document.createElement('li');
                li.setAttribute('data-id', id);
                li.classList.add('task');
    
                // Mark completed or not
                const span = document.createElement('span');
                span.textContent = task;
                completed ? span.classList.add('completed') : span.classList.remove('completed');
    
                // Append checkbox
                const wrapper = document.createElement('div');
                wrapper.classList.add('checkbox');
    
                const checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('id', `$check${id}`);
                checkbox.checked = completed;
                checkbox.addEventListener('change', () => toggleComplete(id));
    
                const tick = document.createElement('label');
                tick.setAttribute('for', `$check${id}`);
                wrapper.appendChild(checkbox);
                wrapper.appendChild(tick);
    
                const span1 = document.createElement('span')
                span1.appendChild(wrapper);
                span1.appendChild(span);
    
                // Append Edit
                const editBtn = document.createElement('button');
                editBtn.setAttribute('type', 'button');
                editBtn.classList.add('btn');
                editBtn.textContent = '✏️';
                editBtn.addEventListener('click', () => {
                    if (editBtn.innerText === '✏️') {
                        const edit = document.createElement('input')
                        edit.setAttribute('type', 'text');
                        edit.value = task;
                        span1.replaceChild(edit, span);
                        editBtn.textContent = 'OK'
                    } else {
                        const newLabel = li.querySelector('input[type="text"]').value.trim();
                        if (newLabel) editTask(id, newLabel);
                    }
                });
    
                // Append remove button
                const removeBtn = document.createElement('button');
                removeBtn.setAttribute('type', 'button');
                removeBtn.classList.add('btn');
                removeBtn.textContent = '❌';
                removeBtn.addEventListener('click', () => removeTask(id));
    
            
                const span2 = document.createElement('span')
                span2.appendChild(editBtn);
                span2.appendChild(removeBtn);
                li.appendChild(span1);
                li.appendChild(span2)
                taskList.appendChild(li);
            })
            toDoList.appendChild(taskList);
        });

    }
}
