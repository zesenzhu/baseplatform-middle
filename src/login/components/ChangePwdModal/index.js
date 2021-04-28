import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
  useEffect,
} from "react";
import { connect } from "react-redux";
import "./index.scss";
import { LgModal as Modal, Tips, Loading } from "../../../common";
import { Input } from "antd";
import { ChangePwdParams } from "../../store/changePwd";
import { getPostData } from "../../api/utils";
import {
  showErrorAlert,
  APP_ALERT_SHOW,
  hideAlert,
} from "../../store/appAlert";
import Config from "../../api/config";
import md5 from "md5";
let UpdatePwd = async ({ UserID, UserType, OldPwd, NewPwd, dispatch }) => {
  let res = await getPostData(
    `/UserMgr/PersonalMgr/UpdatePwd`,
    {
      UserID,
      UserType,
      OldPwd,
      NewPwd,
    },
    2,
    Config.GetBaseInfo
  );

  if (res.StatusCode === 200) {
    return res.Msg;
  } else {
    dispatch(
      showErrorAlert({
        title: `修改失败`,
        okShow: "n",
        cancelTitle: "确定",
      })
    );
    // if (res.ErrCode === -2) {

    //     dispatch({type: SAFE_SETTING_PWD_TIPS_SHOW, data: {type: 'new', tips: "新旧密码一致！"}});

    // }else if (res.ErrCode === -3){

    //     dispatch({type: SAFE_SETTING_PWD_TIPS_SHOW, data: {type: 'origin', tips: "原密码不正确"}});

    // }else {

    //     dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'未知异常'}));

    // }
  }
};
function ChangePwdModal(props) {
  const { changePwd, dispatch,skin } = props;
  let {
    firstPwd,
    onOk,
    visible,
    onCancel,
    comfirmPwd,
    oldPwd,
    loading,
  } = changePwd;
  // const [Check, setCheck] = useState(false);

  const BoxRef = useRef({});

  const ModalCancel = useCallback(() => {
    if (loading) {
      return;
    }
    typeof onCancel === "function" && onCancel();
    // dispatch(ChangePwdParams({ visible: false }));
  }, [onCancel,loading]);
  const ModalOk = useCallback(() => {
    if (loading) {
      return;
    }
    const { UserType, SchoolID, UserID } = JSON.parse(
      sessionStorage.getItem("UserInfo")
    );

    if (BoxRef.current.onOk && BoxRef.current.onOk()) {
      dispatch(
        ChangePwdParams({
          loading: true,
        })
      );
      UpdatePwd({
        UserID: UserID,
        UserType: UserType,
        OldPwd: md5(oldPwd),
        NewPwd: md5(BoxRef.current.pwd),
        dispatch,
      }).then((data) => {
        if (data === "success") {
          dispatch(
            {
              type: APP_ALERT_SHOW,
              data: {
                type: "success",

                title: "修改密码成功，即将重新登录",
                hide: () => {
                  dispatch(hideAlert(dispatch));
                  typeof onOk === "function" && onOk();
                  // return () => {

                  // };
                },
              },
            }
            // AppAlertActions.alertSuccess({
            //   title: "修改密码成功，即将重新登录",
            //   hide: () => {
            //     // return () => typeof onOk === "function" && onOk();
            //   },
            // })
          );
        }
      });
      // typeof onOk === "function" && onOk();
      // ModalCancel();
    }
  }, [onOk, ModalCancel, oldPwd,loading]);
  const CheckPwd = useCallback((check) => {
    setCheck(check);
  }, []);
  return (
    <Modal
      title={"修改初始密码"}
      bodyStyle={{ height: 193 }}
      width={423}
      className={`ChangePwdModal ${"ChangePwdModal-" + skin}`}
      visible={visible}
      onOk={ModalOk}
      onCancel={ModalCancel}
      okText={"确定"}
      cancelText={
        <div title={"后续可通过个人账号管理模块修改密码"}>暂不修改</div>
      }
    >
      <Loading spinning={loading} tip={"请稍候..."} size="small">
        <ChangePwdBox ref={BoxRef}></ChangePwdBox>
      </Loading>
    </Modal>
  );
}
const mapStateToProps = (state) => {
  return state;
};
const ChangePwdBox = connect(mapStateToProps, null, null, { forwardRef: true })(
  forwardRef(function (props, ref) {
    let { changePwd } = props;
    let { oldPwd } = changePwd;

    const [FirstPwd, setFirstPwd] = useState("");
    const [SecondPwd, setSecondPwd] = useState("");
    const [FirstPwdTipsVisible, setFirstPwdTipsVisible] = useState(false);
    const [SecondPwdTipsVisible, setSecondPwdTipsVisible] = useState(false);
    const [FirstPwdTips, setFirstPwdTips] = useState("");
    const [SecondPwdTips, setSecondPwdTips] = useState("");
    // 当值改变的时候，对密码检查，提供外面用
    // const [Check, setCheck] = useState(1);
    // 对CheckPwd封装
    const FirstLoadRef = useRef(true);
    const SecondLoadRef = useRef(true);
    //密码合法判断
    const UserComm_ValidatePwd = useCallback((pwd) => {
      let lengthOver8 = true;
      let lengthLess20 = true;
      let containNumber = true;
      let containLetters = true;
      let containSymbol = true;
      let isOK = true;

      let txt = "";

      lengthOver8 = pwd.length >= 8;
      lengthLess20 = pwd.length <= 20;
      containNumber = /[0-9]+/.test(pwd);
      containLetters = /[a-zA-Z]+/.test(pwd);
      containSymbol = /[`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]+/.test(
        pwd
      );
      isOK = /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]){8,20}$/.test(
        pwd
      );

      if (!lengthOver8) {
        txt += "密码长度不足8位、";
      }
      if (!lengthLess20) {
        txt += "密码长度不能超过20位、";
      }

      if (
        (containNumber && containLetters) ||
        (containNumber && containSymbol) ||
        (containLetters && containSymbol) ||
        (containNumber && containLetters && containSymbol)
      ) {
        //密码合法
      } else {
        txt += "至少包含字母、数字及特殊符号中的两种、";
      }

      if (lengthOver8 && lengthLess20 && !isOK) {
        txt += "密码包含非法字符、";
      }

      if (txt === "") {
        txt = "密码合法";
        return { isOK: true, txt: txt };
      } else {
        txt = txt.substr(0, txt.length - 1);
        return { isOK: false, txt: txt };
      }
    }, []);
    const checkComfirm = useCallback(
      (value, value2) => {
        if (FirstLoadRef.current) {
          FirstLoadRef.current = false;
          return;
        }
        let { isOK, txt } = UserComm_ValidatePwd(value2);
        // setSecondPwd(value);
        // 输入合法，检查是否与新密码一样
        if (isOK) {
          isOK = value2 === value;
          if (value) txt = isOK ? txt : "两次输入的密码不一致!";
          else {
            checkPwd(value, value2);
          }
        }
        setSecondPwdTipsVisible(!isOK);

        !isOK && setSecondPwdTips(txt);
        return isOK;
      },
      [UserComm_ValidatePwd]
    );
    // 检查新密码
    const checkPwd = useCallback(
      (value, value2) => {
        if (SecondLoadRef.current) {
          SecondLoadRef.current = false;
          return;
        }
        let { isOK, txt } = UserComm_ValidatePwd(value);

        if (isOK) {
          isOK = !(value === oldPwd);
          txt = "新旧密码一致！";
        }
        setFirstPwdTipsVisible(!isOK);

        !isOK && setFirstPwdTips(txt);
        if (isOK) {
          checkComfirm(value, value2);
        }
        return isOK;
      },
      [UserComm_ValidatePwd, oldPwd]
    );
    useEffect(() => {
      checkPwd(FirstPwd, SecondPwd);
    }, [checkPwd, SecondPwd, FirstPwd]);

    // 检查确认密码
    useEffect(
      (value) => {
        checkComfirm(FirstPwd, SecondPwd);
        // let { isOK, txt } = UserComm_ValidatePwd(SecondPwd);
        // // setSecondPwd(value);
        // // 输入合法，检查是否与新密码一样
        // if (isOK) {
        //   isOK = FirstPwd === SecondPwd;
        //   txt = isOK ? txt : "两次输入的密码不一致!";
        // }
        // setSecondPwdTipsVisible(!isOK);

        // setSecondPwdTips(txt);
      },
      [checkComfirm, FirstPwd, SecondPwd]
    );
    useImperativeHandle(ref, () => ({
      onOk: () => {
        return (
          checkPwd(FirstPwd, SecondPwd) && checkComfirm(FirstPwd, SecondPwd)
        );
      },
      pwd: FirstPwd,
    }));
    return (
      <div className={`ChangePwdBox `}>
        <p className={"CPB-tip"}>
          使用初始密码登录成功，建议您修改为新的登录密码
        </p>
        <div className="tr">
          <span className="td td-1">新密码：</span>
          <span className="td td-2">
            <Tips
              // placement="bottom"
              visible={FirstPwdTipsVisible}
              title={FirstPwdTips}
            >
              <Input
                placeholder={"请输入8~20位新密码..."}
                className="pwd-input pwd-input-1"
                maxLength={20}
                type="password"
                defaultValue={FirstPwd}
                // onChange={(e) => {
                //   onUpdata("moduleName", e.target.value, false);
                // }}
                onBlur={(e) => {
                  setFirstPwd(e.target.value);
                  // checkPwd(e.target.value);
                }}
              ></Input>
            </Tips>
            <PwdStrong pwd={FirstPwd}></PwdStrong>
          </span>
        </div>
        <div className="tr">
          <span className="td td-1">确认密码：</span>
          <span className="td td-2">
            <Tips
              // placement="bottom"
              visible={SecondPwdTipsVisible}
              title={SecondPwdTips}
            >
              <Input
                placeholder={"请重新输入新密码..."}
                className="pwd-input pwd-input-1"
                maxLength={20}
                type="password"
                defaultValue={SecondPwd}
                // onChange={(e) => {
                //   onUpdata("moduleName", e.target.value, false);
                // }}
                onBlur={(e) => {
                  setSecondPwd(e.target.value);
                  // checkSecondPwd(e.target.value);
                }}
              ></Input>
            </Tips>
          </span>
        </div>
      </div>
    );
  })
);
function PwdStrong(props) {
  let { className, style, pwd } = props;
  const [PwdStrong, setPwdStrong] = useState("");
  const FirstLoadRef = useRef(true);

  //判断密码是否符合正则表达式
  useEffect(() => {
    if (FirstLoadRef.current) {
      FirstLoadRef.current = false;
      return;
    }
    let pwdStrong = 0;
    const containNumber = /[0-9]+/.test(pwd);

    const containLetters = /[a-zA-Z]+/.test(pwd);

    const containSymbol = /[`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]+/.test(
      pwd
    );

    //判断是否是强

    if (containLetters && containNumber && containSymbol) {
      pwdStrong = "strong";
    } else if (
      (containLetters && !containSymbol && !containNumber) ||
      (containSymbol && !containLetters && !containNumber) ||
      (containNumber && !containLetters && !containSymbol)
    ) {
      //判断是否是弱类型

      pwdStrong = "weak";
    } else if (!containLetters && !containNumber && !containSymbol) {
      //是否是这样的类型
      pwdStrong = "weak";
    } else {
      //是否是中等类型

      pwdStrong = "middle";
    }
    setPwdStrong(pwdStrong);
  }, [pwd]);

  //检测密码的强度

  return (
    PwdStrong && (
      <div className={`PwdStrong ${className || ""}`}>
        <span className="text">密码强度:</span>

        <i className={`strong-type  ${PwdStrong}`}></i>

        <span className={`strong-name  ${PwdStrong}`}>
          {PwdStrong === "weak" ? "弱" : PwdStrong === "middle" ? "中" : "强"}
        </span>
      </div>
    )
  );
}
export default connect(mapStateToProps)(ChangePwdModal);
