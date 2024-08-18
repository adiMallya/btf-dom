import Todo from "./todo.js";

const toDoList = document.querySelector('.toDoList');
const toDoForm = document.querySelector('.toDoForm');
const toDoInput = document.querySelector('#toDoInput');
// State
const myToDo = new Todo([
    {
        id: 0,
        task: "Run 2km Today",
        completed: true
    },
    {
        id: 1,
        task: "Read for 20min Today",
        completed: false
    }
]);
// First render
render(myToDo);

// Create
toDoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = toDoInput.value.trim();

    if (task) {
        myToDo.add(task);
        render(myToDo);
        toDoInput.value = '';
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
        message.textContent = "Your List is Empty :/";
        message.classList.add('message');
        toDoList.appendChild(message);
    } else {
        // Creating component
        todos.forEach(({ id, task, completed }) => {
            const li = document.createElement('li');
            li.setAttribute('data-id', id);
            li.classList.add('task');

            // Mark completed or not
            const span = document.createElement('span');
            span.textContent = task;
            completed ? span.classList.add('completed') : span.classList.remove('completed');

            // Append checkbox
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.checked = completed;
            checkbox.addEventListener('change', () => toggleComplete(id));

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
                    li.replaceChild(edit, span);
                    editBtn.textContent = '🆗'
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

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(editBtn);
            li.appendChild(removeBtn);
            toDoList.appendChild(li);
        })
    }
}

