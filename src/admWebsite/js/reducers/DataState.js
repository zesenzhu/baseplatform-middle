import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import GetWebsiteResourceData from './data/GetWebsiteResourceData';
import GetMenuData from './data/GetMenuData';
import WebsiteData from './data/WebsiteData';



const DataState=combineReducers(
    {
        LoginUser,
        GetWebsiteResourceData,
        GetMenuData,
        WebsiteData
        
    });
export default DataState;