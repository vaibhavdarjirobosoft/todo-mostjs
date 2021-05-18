import React from 'react';
import { compose } from "@most/prelude";
import { completedCount } from "./model";
import { handleAdd, handleToggleAll, handleComplete, handleRemove, handleRemoveAllCompleted } from "./action";
import "todomvc-common/base.css";
import "todomvc-app-css/index.css";
const hasClass = className => condition => condition ? className : '';
const ifCompleted = hasClass('completed')
const ifSelected = hasClass('selected')

const filterTodos = ({ filter, todos }) =>
  todos.filter(t => {
    switch (filter) {
      case '/': return true
      case '/active': return !t.completed
      case '/completed': return t.completed
      default: return true
    }
  })

const App = (addAction) => appState => {
  const completed = completedCount(appState);
  const todos = appState.todos;
  const filtered = filterTodos(appState);
  const remaining = todos.length - completed
  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <input className='new-todo' name='new-todo' placeholder='What needs to be done?' autoComplete='off' autoFocus onKeyPress={compose(addAction, handleAdd)} />
      </header>
      <section className='main'>
        <input 
          id='toggle-all' 
          className='toggle-all' 
          type='checkbox' 
          checked={todos.length > 0 && remaining === 0} 
          onChange={compose(addAction, handleToggleAll)} 
        />
        <label htmlFor='toggle-all'>Mark all as complete</label>
        <ul className='todo-list'>
            {filtered.map((todo, index) => (
              <li key={index} className={ifCompleted(todo.completed)}>
                <div className='view'>
                  <input className='toggle' type='checkbox' checked={todo.completed} onChange={compose(addAction, handleComplete(todo))} />
                  <label>{todo.description}</label>
                  <button className='destroy' onClick={compose(addAction, handleRemove(todo))} />
                </div>
                <input className='edit' value={todo.description} />
              </li>
            )
          )}
        </ul>
      </section>
      {todos.length > 0 && (
        <footer className="footer">
          <span className='todo-count'>
            <strong>{remaining}</strong> 
            {remaining === 1 ? 'item' : 'items'} left
          </span>
          <ul className='filters'>
            <li><a className={ifSelected(appState.filter === '/')} href='#/'>All</a></li>
            <li><a className={ifSelected(appState.filter === '/active')} href='#/active'>Active</a></li>
            <li><a className={ifSelected(appState.filter === '/completed')} href='#/completed'>Completed</a></li>
          </ul>
          {completed > 0 && <button className='clear-completed' onClick={compose(addAction, handleRemoveAllCompleted)}>Clear completed</button>}
        </footer>
      )}
    </div>
  )
}

export default App;
