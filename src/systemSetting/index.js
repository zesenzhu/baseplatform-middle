import '@babel/polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/containers/App';
import { Provider } from 'react-redux';
import store from './js/store';
import * as serviceWorker from '../serviceWorker';
import './sass/index.scss';



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.register();