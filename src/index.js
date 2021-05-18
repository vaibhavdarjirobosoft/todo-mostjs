import ReactDOM from 'react-dom';
import { skipRepeats, map, merge, scan, tap, runEffects } from "@most/core";
import { newDefaultScheduler } from "@most/scheduler";
import { hashchange } from "@most/dom-event";
import { createAdapter } from "@most/adapter";

import "todomvc-common/base.css";
import "todomvc-app-css/index.css";

import './index.css';
import App from './App';
import { emptyApp } from "./model";
import { runAction, handleFilterChange } from "./action";
import reportWebVitals from './reportWebVitals';

const scheduler = newDefaultScheduler();
const [addAction, todoActions] = createAdapter();

const updateFilter = map(handleFilterChange, hashchange(window));
const actions = merge(todoActions, updateFilter);

const stateUpdates = skipRepeats(scan(runAction, emptyApp, actions));

const stream = tap(element => ReactDOM.render(element, document.getElementById('root')), map(App(addAction), stateUpdates))

runEffects(stream, scheduler);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
