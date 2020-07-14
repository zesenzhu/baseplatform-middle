import {combineReducers} from 'redux';

import LoginUser from './LoginUser';

import AppAlert from "./AppAlert";

import AppLoading from  './AppLoading';

import Manager from './Manager/Index';

import BsToCs from './BsToCs';

import ProductInfo from './ProductInfo';



const Index = combineReducers({

    LoginUser,

    AppAlert,

    AppLoading,

    Manager,

    BsToCs,

    ProductInfo

});


export let initialState = {



};



export default Index