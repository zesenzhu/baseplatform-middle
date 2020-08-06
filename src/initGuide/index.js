import '@babel/polyfill';

import React from 'react';

import ReactDOM from 'react-dom';

import '../common/index.scss';

import App from './containers/App'

import * as serviceWorker from '../serviceWorker';

import {Provider} from 'react-redux';

import {HashRouter as Router} from 'react-router-dom';

import store from './store';

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));

serviceWorker.register();