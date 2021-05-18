
const newTodo = (description, id) => ({
    description,
    completed: false,
    id
});

const addTodo = description => app => ({
    ...app,
    nextId: app.nextId + 1,
    todos: app.todos.concat(
        [newTodo(description, app.nextId)]
    )
});

const removeTodo = id => app => ({
    ...app,
    todos: app.todos.filter(todo => todo.id !== id)
});

const updateCompleted = (completed, id) => app => ({
    ...app,
    todos: app.todos.map(
        todo => todo.id === id ? {
            ...todo,
            completed
        } : todo
    )
});

const updateAllCompleted = completed => app => ({
    ...app,
    todos: app.todos.map(todo => ({...todo, completed}))
});

const removeAllCompleted = app => ({
    ...app,
    todos: app.todos.filter(todo => !todo.completed)
});

const setFilter = filter => app => ({
    ...app,
    filter
});

const emptyApp = {
    todos: [],
    focus: null,
    filter: '/',
    nextId: 0
};

const countIfCompleted = (count, { completed }) => count + (completed ? 1 : 0)

const completedCount = ({ todos }) => todos.reduce(countIfCompleted, 0)

export {
    addTodo,
    newTodo,
    removeTodo,
    updateCompleted,
    updateAllCompleted,
    removeAllCompleted,
    setFilter,
    emptyApp,
    completedCount
};