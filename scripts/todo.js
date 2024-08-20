class Todo {
    constructor(init = []) {
        this.todoList = init;
        this.id = init?.length;
    }

    add(todo, date) {
        const newTask = {
            id: this.id++,
            task: todo,
            completed: false,
            date: date
        }
        this.todoList = [...this.todoList, newTask];
    }

    remove(id) {
        this.todoList = this.todoList.filter((item, _) => item.id !== id);
    }

    update(id, updatedTodo) {
        this.todoList = this.todoList.map((item, idx) => item.id === id ? { ...item, task: updatedTodo } : item);
    }

    getAll() {
        return this.todoList;
    }

    get(id) {
        return this.todoList.find((item, _) => item.id === id) ?? null;
    }

    clear() {
        this.todoList = [];
    }

    toggleComplete(id) {
        this.todoList = this.todoList.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        )
    }
}

export default Todo;