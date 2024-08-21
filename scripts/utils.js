export function fetchFromStore(){
    const locallyStored = localStorage.getItem('myTodos');
    return JSON.parse(locallyStored) ?? [];
}

export const groupTasksByDate = (todos = []) => {
    return todos.reduce((groups, task) => {
        const date = formatDate(task?.date);

        if (!groups[date]) {
            groups[date] = [];
        }

        groups[date] = [...groups[date], task];
        return groups;
    }, {});
}

export function formatDate(date) {
    const dateToFormat = new Date(date);

    if (dateToFormat.toDateString() === new Date()?.toDateString())
        return "Today";

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return dateToFormat.toLocaleDateString('en-IN', options);
}

