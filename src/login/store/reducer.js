import {combineReducers} from 'redux';

import commSetting from './commSetting';

import introduce from './introduce';

import slider from './slider';

import appAlert from './appAlert';

const reducer = combineReducers({

    commSetting,

    introduce,

    slider,

    appAlert

});

export  default  reducer;