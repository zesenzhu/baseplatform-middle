import '@babel/polyfill';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './js/container/App'
import {Provider} from 'react-redux'
import store from './js/store'
import * as serviceWorker from '../serviceWorker';

// import {createStore} from 'redux'
// import reducer from '../index/js/reducers/toggle'

// const store =createStore(reducer);
// store.subscribe(()=>console.log("State updated!",store.getState()));
// store.dispatch({
//     type:"Add ToDoList"
// });


//将HelloReact这个组件,渲染到index.html中对饮的ID为good的div中
//provider是react提供的redux 一般将他绑定给整个APP,从而省去使用subscribe订阅组件更新情况
ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById("root"));
serviceWorker.register();

