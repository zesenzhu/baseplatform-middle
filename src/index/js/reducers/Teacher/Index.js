import { combineReducers } from 'redux';

import HeaderSetting from './HeaderSetting';

import Modules from './Modules';

import TeacherCustomModalShow from './TeacherCustomModalShow';

import TeacherCustomData from './TeacherCustomData';

import TeacherTipsVisible from './TeacherTipsVisible';

import WebsiteData from './WebsiteData';

import ToolData from './ToolData';



const Index  = combineReducers({

    HeaderSetting,

    Modules,

    TeacherCustomModalShow,

    TeacherCustomData,

    TeacherTipsVisible,

    WebsiteData,

    ToolData

});

export default Index;