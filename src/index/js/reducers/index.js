import {combineReducers} from 'redux';

import LoginUser from './LoginUser';

import AppAlert from "./AppAlert";

import AppLoading from  './AppLoading';

import Manager from './Manager/Index';

import BsToCs from './BsToCs';

import ProductInfo from './ProductInfo';

import identifyInfo from './identifyInfo';



const Index = combineReducers({

    LoginUser,

    AppAlert,

    AppLoading,

    Manager,

    BsToCs,

    ProductInfo,

    identifyInfo

});


export let initialState = {



};



export default Index