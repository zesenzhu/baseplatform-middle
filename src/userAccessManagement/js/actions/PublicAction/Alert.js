/*
 *                        ::
 *                       :;J7, :,                        ::;7:
 *                       ,ivYi, ,                       ;LLLFS:
 *                       :iv7Yi                       :7ri;j5PL
 *                      ,:ivYLvr                    ,ivrrirrY2X,
 *                      :;r@Wwz.7r:                :ivu@kexianli.
 *                     :iL7::,:::iiirii:ii;::::,,irvF7rvvLujL7ur
 *                    ri::,:,::i:iiiiiii:i:irrv177JX7rYXqZEkvv17
 *                 ;i:, , ::::iirrririi:i:::iiir2XXvii;L8OGJr71i
 *               :,, ,,:   ,::ir@mingyi.irii:i:::j1jri7ZBOS7ivv,
 *                  ,::,    ::rv77iiiriii:iii:i::,rvLq@huhao.Li
 *              ,,      ,, ,:ir7ir::,:::i;ir:::i:i::rSGGYri712:
 *            :::  ,v7r:: ::rrv77:, ,, ,:i7rrii:::::, ir7ri7Lri
 *           ,     2OBBOi,iiir;r::        ,irriiii::,, ,iv7Luur:
 *         ,,     i78MBBi,:,:::,:,  :7FSL: ,iriii:::i::,,:rLqXv::
 *         :      iuMMP: :,:::,:ii;2GY7OBB0viiii:i:iii:i:::iJqL;::
 *        ,     ::::i   ,,,,, ::LuBBu BBBBBErii:i:i:i:i:i:i:r77ii
 *       ,       :       , ,,:::rruBZ1MBBqi, :,,,:::,::::::iiriri:
 *      ,               ,,,,::::i:  @arqiao.       ,:,, ,:::ii;i7:
 *     :,       rjujLYLi   ,,:::::,:::::::::,,   ,:i,:,,,,,::i:iii
 *     ::      BBBBBBBBB0,    ,,::: , ,:::::: ,      ,,,, ,,:::::::
 *     i,  ,  ,8BMMBBBBBBi     ,,:,,     ,,, , ,   , , , :,::ii::i::
 *     :      iZMOMOMBBM2::::::::::,,,,     ,,,,,,:,,,::::i:irr:i:::,
 *     i   ,,:;u0MBMOG1L:::i::::::  ,,,::,   ,,, ::::::i:i:iirii:i:i:
 *     :    ,iuUuuXUkFu7i:iii:i:::, :,:,: ::::::::i:i:::::iirr7iiri::
 *     :     :rk@Yizero.i:::::, ,:ii:::::::i:::::i::,::::iirrriiiri::,
 *      :      5BMBBBBBBSr:,::rv2kuii:::iii::,:i:,, , ,,:,:i@petermu.,
 *           , :r50EZ8MBBBBGOBBBZP7::::i::,:::::,: :,:,::i;rrririiii::
 *               :jujYY7LS0ujJL7r::,::i::,::::::::::::::iirirrrrrrr:ii:
 *            ,:  :@kevensun.:,:,,,::::i:i:::::,,::::::iir;ii;7v77;ii;i,
 *            ,,,     ,,:,::::::i:iiiii:i::::,, ::::iiiir@xingjief.r;7:i,
 *         , , ,,,:,,::::::::iiiiiiiiii:,:,:::::::::iiir;ri7vL77rrirri::
 *          :,, , ::::::::i:::i:::i:i::,,,,,:,::i:i:::iir;@Secbone.ii:::
 * 
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-09-17 11:36:46
 * @LastEditTime: 2020-09-17 11:39:29
 * @Description: Alert 还可在项目移植后用
 * @FilePath: \baseplatform-university\src\userAccessManagement\js\actions\PublicAction\Alert.js
 */


const SHOW_ERROR_ALERT = "SHOW_ERROR_ALERT";
const CLOSE_ERROR_ALERT = "CLOSE_ERROR_ALERT";
const SHOW_WARN_ALERT = "SHOW_WARN_ALERT";
const CLOSE_WARN_ALERT = "CLOSE_WARN_ALERT";
const SHOW_QUERY_ALERT = "SHOW_QUERY_ALERT";
const CLOSE_QUERY_ALERT = "CLOSE_QUERY_ALERT";
const showErrorAlert = ({
  type = "btn-error",
  title = "",
  littleTitle = "",
  onOk,
  onCancel,
  onClose,
  onHide,
}) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_ERROR_ALERT,
      msg: {
        type,
        title,
        littleTitle,
        onOk:onOk?onOk: ()=>onAppAlertOK(dispatch),
        onCancel:onCancel?onCancel:()=>onAppAlertCancel(dispatch),
        onClose:onClose?onClose:()=>onAppAlertClose(dispatch),
        onHide:onHide?onHide:()=>onAlertWarnHide(dispatch),
      },
    });
  };
};

const hideErrorAlert = () => {
  return { type: CLOSE_ERROR_ALERT };
};
const showWarnAlert = (alertMsg) => {
  return { type: SHOW_WARN_ALERT, msg: alertMsg };
};

const hideWarnAlert = () => {
  return { type: CLOSE_WARN_ALERT };
};
const showQueryAlert = (alertMsg) => {
  return { type: SHOW_QUERY_ALERT, msg: alertMsg };
};

const hideQueryAlert = () => {
  return { type: CLOSE_QUERY_ALERT };
};
//自动关闭
const onAlertWarnHide = (dispatch) => {
  dispatch(hideErrorAlert());
};
//提示弹窗
const onAppAlertOK = (dispatch) => {
  dispatch(hideErrorAlert());
};
const onAppAlertCancel = (dispatch) => {
  dispatch(hideErrorAlert());
};
const onAppAlertClose = (dispatch) => {
  dispatch(hideErrorAlert());
};
export default {
  onAlertWarnHide,
  onAppAlertOK,
  onAppAlertCancel,
  onAppAlertClose,

  
  SHOW_ERROR_ALERT,
  CLOSE_ERROR_ALERT,
  SHOW_WARN_ALERT,
  CLOSE_WARN_ALERT,
  SHOW_QUERY_ALERT,
  CLOSE_QUERY_ALERT,

  showErrorAlert,
  hideErrorAlert,
  showWarnAlert,
  hideWarnAlert,
  showQueryAlert,
  hideQueryAlert,
};
