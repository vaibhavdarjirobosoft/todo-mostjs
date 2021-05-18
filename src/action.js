import { id } from "@most/prelude";
import { addTodo, updateAllCompleted, updateCompleted, removeTodo, removeAllCompleted, setFilter } from "./model";

const runAction = (app, action) => action(app);

const handleAdd = event => {
    const value = event.target.value.trim();
    var code = (event.keyCode ? event.keyCode : event.which);
    console.log('\n code>>', code,value);
    if (code === 13 || value.length === 0) {
        return id;
    }
    event.target.value = '';
    return addTodo(value);
};

const handleToggleAll = event => updateAllCompleted(event.target.checked);

const handleComplete = ({ id }) => event => updateCompleted(event.target.checked, id);

const handleRemove = ({ id }) => event => removeTodo(id);

const handleRemoveAllCompleted = event => removeAllCompleted;

const handleFilterChange = event => setFilter(event.newURL.replace(/^.*#/, ''));

export {
    runAction,
    handleAdd,
    handleToggleAll,
    handleComplete,
    handleRemove,
    handleRemoveAllCompleted,
    handleFilterChange
};