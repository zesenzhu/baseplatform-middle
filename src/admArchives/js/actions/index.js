/*
在ActionCreator里面完成数据的获取与处理的工作。并且通过向store发送各个组合的action，从而达到控制界面展示的内容实现交互。
 */

/*
在ActionCreator里面完成数据的获取与处理的工作。并且通过向store发送各个组合的action，从而达到控制界面展示的内容实现交互。
 */
import util from './util'

import PublicAction from './PublicAction';
import CommonAction from './CommonAction';
import MainAction from './MainAction';



const actions = {
    PublicAction,
    CommonAction,
    MainAction,util
};
export default actions;

