import '@babel/polyfill';

import React from 'react';

import ReactDOM from 'react-dom';

import '../common/index.scss';

import App from './applications/App';

import * as serviceWorker from '../serviceWorker';

import ReduxContainer from "./applications/ReduxConatiner";

import './assets/scss/index.scss';







ReactDOM.render(<ReduxContainer><App /></ReduxContainer>, document.getElementById('root'));

serviceWorker.register();