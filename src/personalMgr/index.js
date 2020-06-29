import React from 'react';
import ReactDOM from 'react-dom';
import '../common/index.scss';
import App from './js/containers/App'
import * as serviceWorker from '../serviceWorker';
import {Provider} from 'react-redux';
import store from './js/store';

import './scss/index.scss';



ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

serviceWorker.register();