import React, {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
  memo,
  useImperativeHandle,
  forwardRef,
} from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { ErrorAlert } from "../../../../common/js/fetch/util";
import { postData } from "../../../../common/js/fetch";
import {autoAlert} from '../../../../common/js/public'
let DefaultBadge = "/SysSetting/Attach/default_164_40.png";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const IMG_WIDTH = 98;
const IMG_HEIGHT = 24;
// const Url = `SubjectRes_UploadHandler.ashx?method=doUpload_WholeFile&userid=${UserID}`;
// 校徽-长方形
function SchoolBadge(props, ref) {
  const { schoolBadge } = props;

  let [Badge, setBadge] = useState(schoolBadge ? schoolBadge : DefaultBadge);
  let [ResHttpRootUrl, setResHttpRootUrl] = useState("");
  let [Url, setUrl] = useState("");

  useEffect(() => {
    let { ResHttpRootUrl } = JSON.parse(
      sessionStorage.getItem("LgBasePlatformInfo")
    )
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    setResHttpRootUrl(ResHttpRootUrl);
    let { UserID } = JSON.parse(sessionStorage.getItem("UserInfo"))
      ? JSON.parse(sessionStorage.getItem("UserInfo"))
      : {};
    let Url = `SubjectRes_UploadHandler.ashx?method=doUpload_WholeFile&userid=${UserID}`;
    setUrl(Url);
  }, []);

  const onSelectBadgeChange = (e) => {
    let input = e.target
    let files = e.target.files;
    const error=(title)=> {
      autoAlert({title,type:'btn-error'})
      // uploadError(title)
      // input.value=''

    }
    // const error = (function (e) {
    //   return function (title){
    //     uploadError(title)
    //   console.log(e.target,e,input)
    //   // e.target.value=''
    //   }
    // }(e))
    if (files && files[0]) {
      let file = files[0];
      if (file.size <= MAX_FILE_SIZE) {
        checkImgSize(file, PostBadgeData,error);
      } else {
        error("文件过大")
        // ReactDOM.render(
        //   // eslint-disable-next-line react/react-in-jsx-scope
        //   <ErrorAlert
        //     //   key={"alert" + "400-" + Math.round(Math.random() * 10000)}
        //     show={true}
        //     title={"文件过大"}
        //   />,
        //   document.getElementById("alert")
        // );
        //   this.props.onCheck("overSize")
        // console.log("文件过大");
      }
      input.value=''
    }
  };
  const uploadError = useCallback(
    (title='') => {
      ReactDOM.render(
        // eslint-disable-next-line react/react-in-jsx-scope
        <ErrorAlert
          //   key={"alert" + "400-" + Math.round(Math.random() * 10000)}
          show={true}
          title={title}
        />,
        document.getElementById("alert")
      );
    },
    [],
  )
  const checkImgSize = (file, fn = () => {},error=()=>{}) => {
    let Img = URL.createObjectURL(file);
    let img = new Image();
    img.src = Img;
    let isError = false;
    img.onload = () => {
      if (img.width !== 98 || img.height !== 24) {
        error("文件像素必须为98*24")
        // ReactDOM.render(
        //   <ErrorAlert show={true} title={"文件像素必须为98*24"} />,
        //   document.getElementById("alert")
        // );
        // e.target.value=''
        isError = true;
      } else {
        fn(file,error);
      }
    };
  };
  const PostBadgeData = (file,error=()=>{}) => {
    let formData = new FormData();
    formData.append("file", file);
    fetch(ResHttpRootUrl + Url, { method: "POST", body: formData })
      .then((response) => {
        //当请求成功时直接返回response，失败则进行json解析返回失败信息
        if (response.status === 200) {
          return response.json();
        } else {
          return response.json().then((json) => {
            // console.log(json)
            return Promise.reject(json);
          });
        }
      })
      .then((data) => {
        if (data.result) {
          setBadge(data.filePath);
        }
      })
      .catch((e) => {
        error(e.message)
        // //获取错误信息并弹出
        // ReactDOM.render(
        //   <ErrorAlert show={true} title={e.message} />,
        //   document.getElementById("alert")
        // );
        // e.target.value=''
      });
  };
  const onSelectDefaultImg = () => {
    setBadge(DefaultBadge);
  };
  useImperativeHandle(ref, () => ({
    ImgUrl: Badge,
  }));
  return (
    <div ref={ref} className="SchoolBadge">
      <div className="SB-Content">
        <i
          className="SBC-Badge"
          style={{
            background: `url(${
              ResHttpRootUrl + Badge
            }) no-repeat center center/100% 100%`,
          }}
        ></i>
        {/* <span className="SBC-Title">(可用于登录界面显示)</span> */}
        <span className="SBC-Title">(可用于智慧校园信息数据指挥中心首界面显示)</span>
        
      </div>
      <div className="SB-Handle">
        <label>
          <span className="SBH-btn SBH-SelectImg">
            选择图片
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) => onSelectBadgeChange(e)}
              accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png"
              className="choose-pic"
            />
          </span>
        </label>

        <span className="SBH-btn  SBH-DefaultImg" onClick={onSelectDefaultImg}>
          默认图片
        </span>
        <span className="SBH-Title">上传要求:大小不能超过2MB,像素为98*24</span>
      </div>
    </div>
  );
}
export default memo(forwardRef(SchoolBadge));
