import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  memo,
  forwardRef,
  useCallback,
} from "react";
// import { Img } from "../../../../../common";
import ImgDefault from "../images/img-default.png";
function Card(props, ref) {
  let {
    type,
    className,
    data,
    onToggleStatus, // old
    checked, // old
    onCardSelect,
  } = props;
  const {
    SysLogoUrl,
    SysState,
    SysName,
    SysType,
    IsThirdParty,
    UserTypes,
    IsClosable,
    ProviderName,
    SysTypeName,
    UserTypesName,
    SysStateName,
    SysID,

    // 事件
    onClickDetails,
    onClickDelete,
    onClickEdit,
  } = data;
  const [Status, setStatus] = useState(false);
  const [StatusChange, setStatusChange] = useState(false);
  const [HandleImg, setHandleImg] = useState("");
  const isOld = useMemo(() => {
    return type === "old";
  }, [type]);
  const canDelete = useMemo(() => {
    let canDelete = false;
    if (
      (IsClosable && (SysState === 1 || SysState === 2 || SysState === 3)) ||
      IsThirdParty
    ) {
      canDelete = true;
    }
    return canDelete;
  }, [SysState, IsClosable, IsThirdParty]);
  useEffect(() => {
    setStatus(SysState === 5);
  }, [SysState]);
  useEffect(() => {
    setHandleImg(SysLogoUrl);
  }, [SysLogoUrl]);
  const onImg = useCallback((el, Failed) => {
    //       在IE中,onerror事件不会触发无效的链接URL,但是onload事件会触发.
    // 在Chrome中,情况恰恰相反：onload事件不会触发无效的链接URL,但是onerror事件会触发.
    // ie是两个都出发
    // let u = navigator.userAgent.toLowerCase();
    // console.log(u.indexOf("trident"), Failed);
    // if (u.indexOf("trident") === -1 && Failed) {
      //Failed!
      setHandleImg(ImgDefault);
    // } else {
    //   //Success!
    // }
  }, []);
  return (
    <div
      className={`MainAccessCard ${isOld ? "OldAccessCard" : ""} ${
        className || ""
      }`}
    >
      <div className="grey-bg"></div>
      <div className="subsystem-content">
        {isOld && (
          <i
            onClick={() => {
              typeof onCardSelect === "function" &&
                onCardSelect(SysID, !checked);
            }}
            className={`card-select ${checked ? "active" : ""}`}
          ></i>
        )}
        <div className="content-msg-box">
          <div className="pic-bg">
            {!!HandleImg && (
              <img
                src={HandleImg}
                alt={SysLogoUrl}
                onError={(el) => onImg(el, true)}
                // onLoad={(el) => onImg(el)}
                title={SysName}
              />
            )}
          </div>
          <div className="msg-tilte-box">
            <p title={SysName} className="msg-app-name">
              {SysName}
            </p>
            <span title={SysTypeName} className="msg-app-type ApplicationType">
              {SysTypeName ? SysTypeName : "--"}
            </span>
          </div>
        </div>
        <div className="content-center-msg-box">
          <div className="clearfix row">
            <span className="row-left">用户对象：</span>
            <span title={UserTypesName} className="row-right">
              {UserTypes && UserTypesName ? UserTypesName : "--"}
            </span>
          </div>
          <div className="clearfix row">
            <span className="row-left">所有者：</span>
            <span title={ProviderName} className="row-right">
              {IsThirdParty && <span className="IsThirdParty">[第三方]</span>}{" "}
              {ProviderName ? ProviderName : "--"}
            </span>
          </div>
          {!isOld ? (
            <div className="clearfix row">
              <span className="row-left">运行状态：</span>
              {SysState === 5 || SysState === 4 ? (
                <>
                  <span
                    className={`btn-state ${Status ? "open" : "ban"}`}
                    style={{
                      cursor:
                        StatusChange || IsClosable ? "pointer" : "no-drop",
                    }}
                    onClick={() => {
                      if (StatusChange || !IsClosable) {
                        return;
                      }
                      setStatusChange(true);
                      onToggleStatus({
                        sysID: SysID,
                        accessible: Status ? 0 : 1,
                      }).then((res) => {
                        if (res) {
                          setStatus((pre) => {
                            return !pre;
                          });
                        }
                        setStatusChange(false);
                      });
                    }}
                    //   disabled={item.CanBeClose === false}
                    title={IsClosable === false ? "该子系统不能被关闭" : ""}
                  ></span>
                  <span className={`other-state other-state-${Status ? 5 : 4}`}>
                    {Status ? "已开启访问" : "已关闭访问"}
                  </span>
                </>
              ) : (
                <span className={`other-state other-state-${SysState}`}>
                  {SysStateName}
                </span>
              )}
            </div>
          ) : (
            ""
          )}
          {isOld ? (
            <div className="clearfix row">
              <span className="row-left">更多信息：</span>
              <span className="row-right  ">
                <span
                  className="more-details"
                  onClick={() => {
                    typeof onClickDetails === "function" &&
                      onClickDetails(SysID);
                  }}
                >
                  点击查看详情
                </span>
              </span>
            </div>
          ) : (
            ""
          )}
        </div>

        {!isOld && (
          <div className="edit-bar-box">
            <span
              className="bar-btn bar-btn-details"
              onClick={() => {
                typeof onClickDetails === "function" && onClickDetails(SysID);
              }}
            >
              详情
            </span>
            <span
              className={`bar-btn bar-btn-edit ${
                IsThirdParty ? "canEdit" : ""
              }`}
              onClick={() => {
                IsThirdParty &&
                  typeof onClickEdit === "function" &&
                  onClickEdit(SysID);
              }}
            >
              修改
            </span>
            <span
              className={`bar-btn bar-btn-delete ${
                canDelete ? "canDelete" : ""
              }`}
              onClick={() => {
                canDelete &&
                  typeof onClickDelete === "function" &&
                  onClickDelete(SysID);
              }}
            >
              删除
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(forwardRef(Card));
