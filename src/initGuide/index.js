import '@babel/polyfill';

import React from 'react';

import ReactDOM from 'react-dom';

import '../common/index.scss';

import App from './containers/App'

import * as serviceWorker from '../serviceWorker';

import {Provider} from 'react-redux';

import {HashRouter as Router} from 'react-router-dom';

import {ConfigProvider} from 'antd';

import zhCN from 'antd/es/locale/zh_CN';

import store from './store';

ReactDOM.render(<Provider store={store}><Router><ConfigProvider locale={zhCN}><App /></ConfigProvider></Router></Provider>, document.getElementById('root'));

serviceWorker.register();