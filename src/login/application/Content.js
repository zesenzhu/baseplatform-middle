import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useCallback,
  useMemo,
} from "react";

import { Input, Button } from "antd";

import { showWarnAlert, showErrorAlert, hideAlert } from "../store/appAlert";

import { loginApi } from "../api";

import { getQueryVariable } from "../../common/js/disconnect";

import { Modal, Loading, CheckBox } from "../../common";

import { removeSlashUrl, downLoadFile } from "../api/utils";

import { connect } from "react-redux";

import md5 from "md5";

import pic1 from "../assets/images/dark-tech/dark-tech-animation1.png";

import pic2 from "../assets/images/dark-tech/dark-tech-animation2.png";

import pic3 from "../assets/images/dark-tech/dark-tech-animation3.png";

import pic4 from "../assets/images/dark-tech/dark-tech-animation4.png";

import animationPic1 from "../assets/images/dark-tech/dark-tech-pic1.png";

import animationPic2 from "../assets/images/dark-tech/dark-tech-pic2.png";

import animationPic3 from "../assets/images/dark-tech/dark-tech-pic3.png";

import animationPic4 from "../assets/images/dark-tech/dark-tech-pic4.png";

import { goToNextPage, decodeObjValue } from "../api/utils";

import { introduceChange } from "../store/introduce";

function Content(props) {
  const [bluePicList, setBluePicList] = useState([0, 1, 2, 3]);

  //aibPic
  const [aiPicList, setAiPicList] = useState([0, 1, 2, 3]);

  const [techPicList, setTechPicList] = useState([0, 1, 2, 3]);

  const [aiExamPicList, setAiExamPicList] = useState([0, 1, 2]);

  const [aiPracticePicList, setAiPracticePicList] = useState([0, 1, 2, 3]);

  const [account, setAccount] = useState(() => {
    const username = localStorage.getItem("LgBaseAccount");

    return username ? username : "";
  });

  const [pwd, setPwd] = useState("");

  const [modalShow, setModalShow] = useState(false);

  const [modalLoading, setModalLoading] = useState(true);

  const [modalTitle, setModalTitle] = useState("");

  const [modalUrl, setModalUrl] = useState("");

  const [loginLoading, setLoginLoading] = useState(true);

  const [delAccountBtn, setDelAccount] = useState(() => {
    const username = localStorage.getItem("LgBaseAccount");

    return username ? true : false;
  });

  //????????????????????????????????????

  const [darkTechImgShow, setDarkTechImgShow] = useState(true);

  //???????????????????????????

  const [unCheckedTips, setUnCheckedTips] = useState(false);

  //??????????????????title

  const [showSchoolLogo, setShowSchoolLogo] = useState(false);

  const [delPwdBtn, setDelPwd] = useState(false);

  const accountInput = useRef();

  const pwdInput = useRef();

  //????????????
  const CtxRef = useRef();

  //???????????????????????????
  const ImgAnimationRef = useRef({
    img: "",

    dir: "left",

    count: 1,

    move: 0,

    maxCount: 8,
  });

  const AnimationRef = useRef();

  //?????????????????????

  const unCheckedTipsRef = useRef();

  const { introduce, commSetting, picChange, dispatch } = props;

  const {
    skin,
    OpenSetInfo,
    basePlugin,
    isCheckBasePlugin,
    WebIndexUrl,
    ClinetDownUrl,
    WebRootUrl,
    ResHttpRootUrl,
  } = commSetting;

  let { active } = introduce[skin] ? introduce[skin] : {};

  const { title, describe } = introduce[skin]
    ? introduce[skin].list[active]
    : {};

  useEffect(() => {
    if (
      skin !== "ai_school" &&
      skin !== "dark_tech" &&
      skin !== "ai_exam" &&
      skin !== "ai_practice"
    )
      return;

    let timer = null;

    if (skin === "ai_school" || skin === "ai_practice") {
      timer = setTimeout(() => {
        if (active === 3) {
          slideChange(0);
        } else {
          slideChange(active + 1);
        }
      }, 4000);
    } else if (skin === "dark_tech") {
      setDarkTechImgShow(true);

      const canvas = document.getElementById(`dark_tech_pic`);

      const ctx = canvas.getContext("2d");

      const img = new Image();

      switch (active) {
        case 0:
          img.src = pic1;

          break;

        case 1:
          img.src = pic2;

          break;

        case 2:
          img.src = pic3;

          break;

        case 3:
          img.src = pic4;

          break;
      }

      cancelAnimationFrame(AnimationRef.current);

      img.onload = () => {
        ImgAnimationRef.current.img = img;

        ImgAnimationRef.current.count = 1;

        ImgAnimationRef.current.move = 0;

        ImgAnimationRef.current.dir = "left";

        CtxRef.current = ctx;

        cancelAnimationFrame(AnimationRef.current);

        setDarkTechImgShow(false);

        canvasDraw();
      };

      timer = setTimeout(() => {
        setDarkTechImgShow(true);

        if (active === 3) {
          slideChange(0);
        } else {
          slideChange(active + 1);
        }
      }, 4000);
    } else {
      timer = setTimeout(() => {
        if (active === 2) {
          slideChange(0);
        } else {
          slideChange(active + 1);
        }
      }, 4000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [active]);

  useEffect(() => {
    if (isCheckBasePlugin) {
      setLoginLoading(false);
    }
  }, [isCheckBasePlugin]);

  useEffect(() => {
    window.top.ClosePop = closeModal;
  }, []);

  const canvasDraw = useCallback(() => {
    const ctx = CtxRef.current;

    const moveTotal = ImgAnimationRef.current.move;

    const direction = ImgAnimationRef.current.dir;

    const countNum = ImgAnimationRef.current.count;

    const { img, maxCount } = ImgAnimationRef.current;

    ctx.clearRect(0, 0, 640, 400);

    ctx.drawImage(img, moveTotal, 0, 15216, 400);

    if (countNum >= maxCount) {
      ImgAnimationRef.current.count = 1;

      /* if (direction==='right'){

                ImgAnimationRef.current.move = moveTotal + 634

            }else{

                ImgAnimationRef.current.move = moveTotal - 634

            }

            if (ImgAnimationRef.current.move<=-14582){

                ImgAnimationRef.current.dir = 'right';

            }

            if (ImgAnimationRef.current.move>=0){

                ImgAnimationRef.current.dir = 'left';

            }*/

      if (ImgAnimationRef.current.move <= -14582) {
        ImgAnimationRef.current.move = 0;
      } else {
        ImgAnimationRef.current.move = moveTotal - 634;
      }
    } else {
      ImgAnimationRef.current.count = countNum + 1;
    }

    AnimationRef.current = requestAnimationFrame(canvasDraw);
  }, [active]);

  //??????????????????
  const signIn = () => {
    if (account) {
      if (pwd) {
        const NoCheck = localStorage.getItem("LgBasePluginsNoCheck");

        if (NoCheck !== "true") {
          if (basePlugin) {
            //?????????????????????????????????????????????????????????

            loginFnc();
          } else {
            dispatch(
              showWarnAlert({
                title: (
                  <div className={"prompt"}>
                    <div className={"title"}>
                      ??????????????????????????????????????????????????????????????????????????????
                    </div>

                    <div className={"no-check-tips"}>
                      <CheckBox
                        checked={unCheckedTips}
                        onClick={baseCheckChange}
                      >
                        ????????????
                      </CheckBox>
                    </div>
                  </div>
                ),

                okTitle: "????????????",
                cancelTitle: "????????????",
                okShow: "y",
                cancelShow: "y",
                ok: downLoadBase,
                cancel: () => {
                  loginFnc();
                },
              })
            );
          }
        } else {
          loginFnc();
        }
      } else {
        dispatch(
          showWarnAlert({
            title: "?????????????????????",
            okShow: "n",
            cancelTitle: "??????",
            close: pwdFoucs,
            cancel: pwdFoucs,
            cancelShow: "y",
          })
        );
      }
    } else {
      dispatch(
        showWarnAlert({
          title: "?????????????????????",
          okShow: "n",
          cancelTitle: "??????",
          close: accountFoucs,
          cancel: accountFoucs,
          cancelShow: "y",
        })
      );
    }
  };

  //?????????????????????
  const downLoadBase = () => {
    dispatch(hideAlert(dispatch));

    downLoadFile(ClinetDownUrl);
  };

  //????????????
  const openModal = ({ title, url }) => {
    setModalLoading(true);

    setModalTitle(title);

    setModalUrl(url);

    setModalShow(true);
  };

  //????????????
  const closeModal = () => {
    setModalShow(false);
  };

  //keyup??????
  const KeyUp = (e) => {
    e.stopPropagation();

    if (e.keyCode === 13) {
      signIn();
    }
  };

  //????????????

  const loginFnc = () => {
    setLoginLoading(true);

    const md5Pwd = md5(pwd).toString().split("").reverse().join("");

    const browser = navigator.userAgent;

    const lg_sysid = getQueryVariable("lg_sysid")
      ? getQueryVariable("lg_sysid")
      : 101;

    const macId = localStorage.getItem("LgBaseMacID")
      ? localStorage.getItem("LgBaseMacID")
      : "";

    loginApi({
      method: "Login",
      params: `${account}|${md5Pwd}|${lg_sysid}|2||${macId}|${browser}`,
    }).then(
      (res) => {
        if (parseInt(res.error) === 0) {
          switch (parseInt(res.data.result)) {
            case 0:
              dispatch(
                showErrorAlert({
                  title: "????????????",
                  okShow: "n",
                  cancelTitle: "??????",
                  cancel: accountFoucs,
                  close: accountFoucs,
                  cancelShow: "y",
                })
              );

              break;

            case 1:
              localStorage.setItem("LgBaseAccount", account);

              localStorage.setItem("token", res.data.token);

              sessionStorage.setItem("token", res.data.token);

              loginApi({
                token: res.data.token,
                method: "GetUserInfo",
                params: "000",
              }).then(
                (result) => {
                  //?????????????????????????????????
                  if (result.data && result.error === "0") {
                    const UserInfo = decodeObjValue(result.data);

                    sessionStorage.setItem(
                      "UserInfo",
                      JSON.stringify(UserInfo)
                    );

                    goToNextPage({
                      token: res.data.token,
                      WebIndexUrl,
                      UserType: UserInfo.UserType,
                      dispatch,
                      oldPwd: pwd,
                      loadingHide: setLoginLoading,
                    });
                  } else {
                    dispatch(
                      showErrorAlert({
                        title: "???????????????????????????????????????",
                        okShow: "n",
                        cancelTitle: "??????",
                        cancel: accountFoucs,
                        close: accountFoucs,
                        cancelShow: "y",
                      })
                    );

                    setLoginLoading(false);
                  }
                },
                (err) => {
                  dispatch(
                    showErrorAlert({
                      title: "???????????????????????????????????????",
                      okShow: "n",
                      cancelTitle: "??????",
                      cancel: accountFoucs,
                      close: accountFoucs,
                      cancelShow: "y",
                    })
                  );

                  setLoginLoading(false);
                }
              );

              break;

            case 2:
              dispatch(
                showErrorAlert({
                  title: "??????????????????????????????????????????????????????????????????",
                  okShow: "n",
                  cancelTitle: "??????",
                  cancel: accountFoucs,
                  close: accountFoucs,
                  cancelShow: "y",
                })
              );

              break;

            case 3:
              dispatch(
                showErrorAlert({
                  title: "????????????????????????????????????",
                  okShow: "n",
                  cancelTitle: "??????",
                  cancel: pwdFoucs,
                  close: pwdFoucs,
                  cancelShow: "y",
                })
              );

              break;

            case 4:
              dispatch(
                showErrorAlert({
                  title: "???????????????????????????????????? IP ??????",
                  okShow: "n",
                  cancelTitle: "??????",
                  cancel: accountFoucs,
                  close: accountFoucs,
                  cancelShow: "y",
                })
              );

              break;

            case 5:

            case 6:

            case 7:

            case 8:
              dispatch(
                showErrorAlert({
                  title: decodeURIComponent(res.data.token),
                  okShow: "n",
                  cancelTitle: "??????",
                  cancel: accountFoucs,
                  close: accountFoucs,
                  cancelShow: "y",
                })
              );

              break;
          }
        } else {
          dispatch(
            showErrorAlert({
              title: "????????????",
              okShow: "n",
              cancelTitle: "??????",
              cancel: accountFoucs,
              close: accountFoucs,
              cancelShow: "y",
            })
          );
        }

        setLoginLoading(false);
      },
      (resp, err) => {
        dispatch(
          showErrorAlert({
            title: decodeURIComponent(err),
            okShow: "n",
            cancelTitle: "??????",
            cancel: accountFoucs,
            close: accountFoucs,
            cancelShow: "y",
          })
        );

        setLoginLoading(false);
      }
    );
  };

  //???????????????????????????
  const accountFoucs = () => {
    dispatch(hideAlert(dispatch));

    //??????????????????
    setTimeout(() => {
      accountInput.current.focus();
    }, 200);
  };

  const pwdFoucs = () => {
    dispatch(hideAlert(dispatch));

    //??????????????????
    setTimeout(() => {
      pwdInput.current.focus();
    }, 200);
  };

  //????????????????????????

  const accountChange = (str) => {
    setAccount(str);

    if (str) {
      setDelAccount(true);
    } else {
      setDelAccount(false);
    }
  };

  const pwdChange = (str) => {
    setPwd(str);

    if (str) {
      setDelPwd(true);
    } else {
      setDelPwd(false);
    }
  };

  //?????????????????????

  const clearAccount = () => {
    setAccount("");

    setDelAccount(false);

    accountInput.current.focus();
  };

  const clearPwd = () => {
    setPwd("");

    setDelPwd(false);

    pwdInput.current.focus();
  };

  //???????????????????????????

  const baseCheckChange = () => {
    setUnCheckedTips((d) => {
      localStorage.setItem("LgBasePluginsNoCheck", !d);

      unCheckedTipsRef.current = !d;

      dispatch(
        showWarnAlert({
          title: (
            <div className={"prompt"}>
              <div className={"title"}>
                ??????????????????????????????????????????????????????????????????????????????
              </div>

              <div className={"no-check-tips"}>
                <CheckBox
                  checked={unCheckedTipsRef.current}
                  onClick={baseCheckChange}
                >
                  ????????????
                </CheckBox>
              </div>
            </div>
          ),

          okTitle: "????????????",
          cancelTitle: "????????????",
          okShow: "y",
          cancelShow: "y",
          ok: downLoadBase,
          cancel: () => {
            loginFnc();
          },
        })
      );

      return !d;
    });
  };

  //?????????????????????????????? loaded

  const imgLoaded = useCallback((e) => {
    setShowSchoolLogo(true);
  }, []);

  //?????????????????????????????? fail

  const imgFail = useCallback((e) => {
    setShowSchoolLogo(false);
  }, []);

  //????????????
  const schoolLogoUrl = useMemo(() => {
    return `${removeSlashUrl(ResHttpRootUrl)}/Base/Product/SchoolLogo.png`;
  }, [ResHttpRootUrl]);

  //??????
  const darkTeachImgs = useMemo(() => {
    return [animationPic1, animationPic2, animationPic3, animationPic4];
  }, []);

  const slideChange = (activeIndex) => {
    //????????????????????????

    dispatch(introduceChange({ skin, activeIndex }));
  };

  //ai??????????????????

  const aiPracticePointerClick = useCallback((i) => {
    slideChange(i);
  }, []);

  return (
    <div
      className={"content_wrapper"}
      style={{
        marginTop:
          window.innerHeight - 634 > 0 ? (window.innerHeight - 634) / 2 : 20,
      }}
    >
      <div className={"content_left_wrapper"}>
        {skin === "dark_blue" ? (
          <div className="dark_blue_left_introduce">
            {bluePicList.map((i, k) => {
              if (k === active) {
                return (
                  <Fragment key={k}>
                    <div className={`pic pic${active + 1}`}></div>

                    <div className={`introduce-wrapper introduce${active + 1}`}>
                      <div className="introduce-title">{title}</div>

                      <div className="introduce-describe">{describe}</div>
                    </div>
                  </Fragment>
                );
              }
            })}
          </div>
        ) : null}

        {skin === "dark_tech" ? (
          <div className="dark_tech_left_introduce">
            {techPicList.map((i, k) => {
              if (k === active) {
                return (
                  <Fragment key={k}>
                    <div className={"pic-wrapper"}>
                      {/*<i className={`pic pic${active+1}`}></i>

                                                    <i className={`pallet pallet${active+1}`}></i>*/}

                      {darkTechImgShow ? (
                        <i
                          className={"animation-before-pic"}
                          style={{
                            backgroundImage: `url(${darkTeachImgs[k]})`,
                          }}
                        />
                      ) : null}

                      <canvas
                        id={`dark_tech_pic`}
                        width={640}
                        height={500}
                        className={`animation${k}`}
                      ></canvas>
                    </div>

                    <div className={`introduce-wrapper introduce${active + 1}`}>
                      <span className="introduce-title">{title}</span>

                      <span className="introduce-describe">{describe}</span>
                    </div>
                  </Fragment>
                );
              }
            })}
          </div>
        ) : null}

        {skin === "cloud_schoolroom" ? (
          <div className="cloud_schoolroom_left_introduce">
            <div className={"setting"}>
              <i className={"icon"}></i>

              <div className={"point-wrapper"}>
                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>
              </div>
            </div>

            <div className={"video"}>
              <i className={"icon"}></i>

              <div className={"point-wrapper"}>
                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>
              </div>
            </div>

            <div className={"cap"}>
              <i className={"icon"}></i>

              <div className={"point-wrapper"}>
                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>
              </div>
            </div>

            <div className={"book"}>
              <i className={"icon"}></i>

              <div className={"point-wrapper"}>
                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>

                <i className={"point"}></i>
              </div>
            </div>
          </div>
        ) : null}

        {skin === "ai_school" ? (
          <div className="ai_school_left_introduce">
            {aiPicList.map((i, k) => {
              if (k === active) {
                return (
                  <Fragment key={k}>
                    <div className={`pic pic${active + 1}`}></div>

                    <div className={`introduce-wrapper introduce${active + 1}`}>
                      <div className="introduce-title">{title}</div>

                      <div className="introduce-describe">{describe}</div>
                    </div>
                  </Fragment>
                );
              }
            })}
          </div>
        ) : null}

        {skin === "ai_exam" ? (
          <div className="ai_exam_left_introduce">
            {aiExamPicList.map((i, k) => {
              if (k === active) {
                return (
                  <Fragment key={k}>
                    <div className={`ai_exam_bg bg${k + 1}`}>
                      <div className={"ai-exam-top-box"}>
                        {k === 0 ? (
                          <>
                            <div className={`animate-center center${k + 1}`}>
                              <i className={"robot"}></i>

                              <i className={"card card1"}></i>

                              <i className={"card card2"}></i>

                              <i className={"card card3"}></i>
                            </div>
                          </>
                        ) : k === 1 ? (
                          <>
                            <div className={`animate-center center${k + 1}`}>
                              <i className={"arrow"}></i>

                              <i className={"exam-paper"}></i>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={`animate-center center${k + 1}`}>
                              <div className={"success-wrapper"}>
                                <i className={"success"}></i>
                              </div>

                              <i className={"board"}></i>
                            </div>
                          </>
                        )}
                      </div>

                      <div className={`title title${k + 1}`}></div>
                    </div>
                  </Fragment>
                );
              }
            })}
          </div>
        ) : null}

        {skin === "ai_practice" ? (
          <div className={"ai_practice_left_introduce"}>
            {aiPracticePicList.map((i, k) => {
              let animationDom = "";

              switch (active) {
                case 0:
                  animationDom = (
                    <>
                      <div className={"light-points"}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                          return (
                            <i key={i} className={`light-point light${i}`}></i>
                          );
                        })}
                      </div>

                      <i className={"wheel"}></i>

                      <i className={"book"}></i>

                      <i className={"penciel"}></i>

                      <i className={"pc"}></i>

                      <i className={"pie"}></i>
                    </>
                  );

                  break;

                case 1:
                  animationDom = (
                    <div className={"animation-pic-wrapper"}>
                      <i className={"icon pillar"}></i>

                      <i className={"icon corona"}></i>

                      <i className={"icon book"}></i>
                    </div>
                  );

                  break;

                case 2:
                  animationDom = (
                    <>
                      <i className={"icon img"}></i>

                      <i className={"icon video"}></i>

                      <i className={"icon ai"}></i>

                      <i className={"icon chart"}></i>

                      <i className={"icon doc"}></i>

                      {[1, 2, 3, 4].map((i) => {
                        return (
                          <i key={i} className={`icon-point icon${i}`}></i>
                        );
                      })}
                    </>
                  );

                  break;

                case 3:
                  animationDom = (
                    <>
                      <i className={"icon paper"}></i>

                      <i className={"icon fold-line"}></i>

                      <i className={"icon bar"}></i>

                      <i className={"icon bubble"}></i>

                      <i className={"icon calendar"}></i>

                      <i className={"light-corona"}></i>

                      <div className={"light-wrapper"}>
                        {[1, 2, 3].map((i) => {
                          return (
                            <i
                              key={i}
                              className={`little-corona corona${i}`}
                            ></i>
                          );
                        })}
                      </div>
                    </>
                  );

                  break;
              }

              return (
                <div
                  key={i}
                  className={`left-content-pic-wrapper ${
                    active === k ? "active" : ""
                  }`}
                >
                  <div className={`ai_left_pic pic${k + 1}`}>
                    {animationDom}

                    <div className={"meteor-wrapper"}>
                      {[1, 2, 3].map((i) => {
                        return <i key={i} className={`meteor meteor${i}`}></i>;
                      })}
                    </div>
                  </div>

                  <div className={"title"}>{introduce[skin].list[k].title}</div>

                  <div className={"describe"}>
                    {introduce[skin].list[k].describe}
                  </div>
                </div>
              );
            })}

            <div className={"pointer-wrapper"}>
              {aiPracticePicList.map((i, k) => {
                return (
                  <i
                    onClick={(e) => aiPracticePointerClick(i)}
                    key={i}
                    className={`pointer ${i === active ? "active" : ""}`}
                  ></i>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      <div className={"content_right_wrapper"}>
        <div className={`${skin}_sign_wrapper`}>
          <Loading
            spinning={loginLoading}
            opacity={true}
            tip={"?????????,?????????..."}
          >
            <div className="locked-wrapper"></div>

            <div className={"normal-wrapper"}>
              {showSchoolLogo ? (
                <i
                  className={"ai_school_logo"}
                  style={{ backgroundImage: `url(${schoolLogoUrl})` }}
                ></i>
              ) : (
                <div className="title">?????????????????????</div>
              )}

              {skin === "ai_school" ? (
                <img
                  style={{ display: "none" }}
                  onError={imgFail}
                  onLoad={imgLoaded}
                  src={schoolLogoUrl}
                />
              ) : null}

              <div className={"account_wrapper"}>
                <Input
                  ref={accountInput}
                  className={"account"}
                  value={account}
                  onChange={(e) => accountChange(e.target.value)}
                  onKeyUp={KeyUp}
                  placeholder={"?????????????????????"}
                />

                <i className={"icon account"}></i>

                <i
                  onClick={clearAccount}
                  style={{ display: `${delAccountBtn ? "block" : "none"}` }}
                  className={"input_clear account_clear"}
                ></i>
              </div>

              <div className={"pwd_wrapper"}>
                <Input
                  ref={pwdInput}
                  value={pwd}
                  className={"pwd"}
                  onChange={(e) => pwdChange(e.target.value)}
                  onKeyUp={KeyUp}
                  type={"password"}
                  placeholder={"?????????????????????"}
                />

                <i className={"icon pwd"}></i>

                <i
                  onClick={clearPwd}
                  style={{ display: `${delPwdBtn ? "block" : "none"}` }}
                  className={"input_clear pwd_clear"}
                ></i>
              </div>

              <div className={"forget_pwd_wrapper"}>
                <a
                  onClick={downLoadBase}
                  target="_blank"
                  title={
                    !basePlugin
                      ? "??????????????????????????????????????????????????????????????????????????????"
                      : null
                  }
                  className={`download_client ${!basePlugin ? "sparkle" : ""}`}
                >
                  ?????????????????????
                </a>

                <a
                  className={"forget_pwd link"}
                  target={"_blank"}
                  target={"_blank"}
                  href={`${WebRootUrl}/UserMgr/Login/GetPwdBack/CheckUserID.aspx`}
                >
                  ?????????????
                </a>
              </div>

              <Button type={"primary"} className={"to-login"} onClick={signIn}>
                ??????
              </Button>

              {OpenSetInfo && OpenSetInfo.length > 0 ? (
                <>
                  <div className={"split_wrapper"}>
                    <i className="left_line split_line"></i>

                    <span className={"split_text"}>?????????????????????</span>

                    <i className={"right_line split_line"}></i>
                  </div>

                  <div className={"author_wrapper"}>
                    {OpenSetInfo.map((item, key) => {
                      let type = "";

                      switch (item.OpenType) {
                        case 1:
                          type = "qq";

                          break;

                        case 2:
                          type = "weibo";

                          break;

                        case 4:
                          type = "wechat";

                          break;
                      }

                      if (type !== "wechat") {
                        return (
                          <div
                            key={key}
                            className={type}
                            onClick={(e) =>
                              openModal({
                                title: item.OpenType === 1 ? "QQ" : "??????",
                                url: item.OpenUrl,
                              })
                            }
                          ></div>
                        );
                      } else {
                        return;
                      }
                    })}
                  </div>
                </>
              ) : (
                ""
              )}

              {!commSetting.LockerVersion ||
              parseInt(commSetting.LockerVersion) !== 1 ? (
                <div className={"sign_up_wrapper"}>
                  ??????????????????
                  <a
                    target={"_blank"}
                    href={`/html/register`}
                    className={"sign_up_link link"}
                  >
                    ????????????
                  </a>
                </div>
              ) : null}
            </div>
          </Loading>
        </div>
      </div>

      <Modal
        type="1"
        title={`??????${modalTitle}??????`}
        width={850}
        bodyStyle={{ height: 462 }}
        footer={null}
        destroyOnClose={true}
        visible={modalShow}
        className={"author_modal"}
        onCancel={closeModal}
      >
        <Loading
          spinning={modalLoading}
          opacity={false}
          tip={"?????????????????????..."}
        >
          <iframe
            src={modalUrl}
            className={"author_iframe"}
            onLoad={(e) => setModalLoading(false)}
            frameBorder="0"
          ></iframe>
        </Loading>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Content);
