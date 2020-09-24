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
 * @Date: 2020-09-17 10:08:21
 * @LastEditTime: 2020-09-24 14:31:32
 * @Description: 模块接口的post的action
 * @FilePath: \baseplatform-middle\src\userAccessManagement\js\actions\DataAction\PostAction.js
 */

import { postData, getData } from "../util";

import PublicAction from "../PublicAction";
import HandleAction from "../HandleAction";
import DataAction from "./index";
import CONFIG from "../../../../common/js/config";
const { BasicProxy, UserInfoProxy, UserAccessProxy, UserAccountProxy } = CONFIG;

const AddIdentityType = ({ fn = () => {}, schoolID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.ModalLoadingOpen());

    let State = getState();
    let {
      HandleState: {
        ParamsData: {
          CustomIdentity: { IdentityName, Description, UserType },
        },
      },
    } = State;

    let url = UserAccessProxy + "AddIdentityType";
    postData({
      url,
      params: { IdentityName, Description, UserType: UserType.join(",") },
    }).then(({ res }) => {
      if (res) {
        dispatch(PublicAction.ModalLoadingClose());
        fn();

        dispatch(
          PublicAction.showErrorAlert({ type: "success", title: "添加成功" })
        );
        dispatch(DataAction.GetIdentityTypeList({}));
      }
    });
  };
};
// 编辑身份
const EditIdentityType = ({ fn = () => {}, schoolID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.ModalLoadingOpen());

    let State = getState();
    let {
      HandleState: {
        ParamsData: {
          CustomIdentity: { IdentityName, Description, UserType, IdentityID },
        },
      },
    } = State;

    let url = UserAccessProxy + "EditIdentityType";
    postData({
      url,
      params: {
        IdentityName,
        Description,
        UserType: UserType.join(","),
        IdentityID,
      },
    }).then(({ res }) => {
      if (res) {
        dispatch(PublicAction.ModalLoadingClose());
        fn();

        dispatch(
          PublicAction.showErrorAlert({ type: "success", title: "编辑成功" })
        );
        dispatch(DataAction.GetIdentityTypeList({}));
      }
    });
  };
};

// 删除身份
const DeleteIdentityType = ({ fn = () => {}, schoolID }) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      HandleState: {
        ParamsData: {
          CustomIdentity: { IdentityID },
        },
      },
    } = State;

    let url = UserAccessProxy + "DeleteIdentityType";
    postData({
      url,
      params: { IdentityID },
    }).then(({ res }) => {
      if (res) {
        fn();

        dispatch(
          PublicAction.showErrorAlert({ type: "success", title: "删除成功" })
        );
        dispatch(DataAction.GetIdentityTypeList({}));
      }
    });
  };
};
// 编辑权限模块
const EditIdentityModule = ({ fn = () => {}, schoolID }) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      HandleState: {
        ParamsData: {
          IdentityPower: { IdentityID, ModuleIDs },
        },
      },
    } = State;

    let url = UserAccessProxy + "EditIdentityModule";
    postData({
      url,
      params: { IdentityID, ModuleIDs: ModuleIDs.join(",") },
    }).then(({ res }) => {
      if (res) {
        fn();

        dispatch(
          PublicAction.showErrorAlert({ type: "success", title: "编辑成功" })
        );
        dispatch(DataAction.GetIdentityTypeList({}));
      }
    });
  };
};
// 删除成员
const DeleteIdentityUser = ({ fn = () => {}, UserID }) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      HandleState: {
        ParamsData: {
          CheckMember: { IdentityID },
        },
      },
    } = State;

    let url = UserAccessProxy + "DeleteIdentityUser";
    postData({
      url,
      params: { IdentityID, UserID },
    }).then(({ res }) => {
      if (res) {
        fn();

        dispatch(
          PublicAction.showErrorAlert({ type: "success", title: "移除成功" })
        );
        dispatch(DataAction.GetIdentityUser({}));
      }
    });
  };
};
// 删除成员
const AddIdentityUser = ({ fn = () => {}, UserID }) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      HandleState: {
        ParamsData: {
          AddMember: { IdentityID, MemberList },
        },
      },
    } = State;

    let url = UserAccessProxy + "AddIdentityUser";
    postData({
      url,
      params: {
        IdentityID,
        NodeItems: MemberList.map((child) => {
          return (
            child.NodeType +
            "|" +
            child.NodeLevel +
            "|" +
            child.NodeID +
            "|" +
            child.FullID
          );
        }).join(","),
      },
    }).then(({ res }) => {
      if (res) {
        dispatch(DataAction.GetIdentityUser({}));

        fn();

        dispatch(
          PublicAction.showErrorAlert({ type: "success", title: "添加成功" })
        );
        dispatch(DataAction.GetIdentityTypeList({}));
      }
    });
  };
};
// 删除成员
const UpdateUserIdentity = ({ fn = () => {}, UserID }) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      HandleState: {
        ParamsData: {
          SearchIdentity: { IdentityIDsList, UserID },
        },
      },
    } = State;

    let url = UserAccessProxy + "UpdateUserIdentity";
    postData({
      url,
      params: {
        UserID,
        IdentityIDs: IdentityIDsList.join(","),
      },
    }).then(({ res }) => {
      if (res) {
        dispatch(DataAction.SearchIdentityUser({}));

        fn();

        dispatch(
          PublicAction.showErrorAlert({ type: "success", title: "编辑成功" })
        );
        dispatch(DataAction.GetIdentityTypeList({}));
      }
    });
  };
};
export default {
  UpdateUserIdentity,
  AddIdentityUser,
  DeleteIdentityUser,
  AddIdentityType,
  EditIdentityType,
  DeleteIdentityType,
  EditIdentityModule,
};
