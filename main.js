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
            const span = document.createElement('span');
            span.textContent = task;
            li.setAttribute('data-id', id);
            li.classList.add('task');

            // Mark completed or not
            completed ? span.classList.add('completed') : span.classList.remove('completed');

            // Append complete button
            const completeBtn = document.createElement('button');
            completeBtn.setAttribute('type', 'button');
            completeBtn.classList.add('btn');
            completeBtn.textContent = completed ? 'Undo' : 'Done';
            completeBtn.addEventListener('click', () => toggleComplete(id));

            // Append remove button
            const removeBtn = document.createElement('button');
            removeBtn.setAttribute('type', 'button');
            completeBtn.classList.add('btn');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => removeTask(id));

            li.appendChild(span);
            li.appendChild(completeBtn);
            li.appendChild(removeBtn);
            toDoList.appendChild(li);
        })
    }
}

