import React from 'react';
import ReactDOM from 'react-dom';
import '../common/index.scss';
import App from './js/containers/App'
import * as serviceWorker from '../serviceWorker';
import {Provider} from 'react-redux';
import store from './js/config/store';
console.log(sessionStorage.getItem('token'))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker.register();