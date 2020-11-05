/*
 *           佛曰:
 *                   写字楼里写字间，写字间里程序员；
 *                   程序人员写程序，又拿程序换酒钱。
 *                   酒醒只在网上坐，酒醉还来网下眠；
 *                   酒醉酒醒日复日，网上网下年复年。
 *                   但愿老死电脑间，不愿鞠躬老板前；
 *                   奔驰宝马贵者趣，公交自行程序员。
 *                   别人笑我忒疯癫，我笑自己命太贱；
 *                   不见满街漂亮妹，哪个归得程序员？
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-10-28 10:50:56
 * @LastEditTime: 2020-11-04 09:32:38
 * @Description: 控制注册审核审核模式：先审后用。先用后审
 * @FilePath: \baseplatform-middle\src\common\js\Aniamtion\ReactCanvas\waveRound\index.js
 */

import React, {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
  memo,
  useImperativeHandle,
  forwardRef,useLayoutEffect
} from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { ErrorAlert } from "../../../../common/js/fetch/util";
import { postData, getData } from "../../../../common/js/fetch";
import Config from "../../../../common/js/config";
let { PowerProxy } = Config;
// 校徽-长方形
function RegisterModel(props, ref) {
  const { type, role,className } = props; //role:student,teacher,选择控制的对象是教师还是学生,type:done先用后审,will先审后用,

  let [Type, setType] = useState("先用后审模式");
  let [Role, setRole] = useState(role ? role : "student");
  let [Title, setTitle] = useState("需要审核确认后，系统才会创建用户账号");
  let [Model, setModel] = useState(false);
  let [IsError, setIsError] = useState(false);
  let [CanHandle, setCanHandle] = useState(true);
  let [PowerData, setPowerData] = useState({});
  let [UserMsg, setUserMsg] = useState(
    JSON.parse(sessionStorage.getItem("UserInfo"))
  );
  let ModelRef = useRef();
  useLayoutEffect(() => {
    ModelRef.current = Model;
  });
  useEffect(() => {
    if (type === "will") {
        setType("先审后用模式");
      setTitle("注册完成时，即可使用，不需要经过审核");
    } else {
        setType("先用后审模式");
      setTitle("需要审核确认后，系统才会创建用户账号");
    }
  }, [type]);
  //   const GetModel = useCallback(async () => {
  //     let IsSelect = false;
  //     const Res = await getData(
  //       PowerProxy + "/GetGlobalUserPower?SchoolID=" + UserMsg.SchoolID,
  //       2
  //     );
  //     const json = await Res.json();

  //     if (
  //       json.StatusCode === 200 &&
  //       json.Data &&
  //       json.Data instanceof Array &&
  //       ((Type === "student" &&
  //         json.Data.some((child) => {
  //           let Power = child.PowerID === "Student_SginUp";
  //           if (Power) {
  //             setPowerData(child);
  //             IsSelect = child.Status === 2; //1：先审后用模式；2：先用后审模式,不为2都是false
  //           }
  //           return Power;
  //         })) ||
  //         (Type === "teacher" &&
  //           json.Data.some((child) => {
  //             let Power = child.PowerID === "Teacher_SginUp";
  //             if (Power) {
  //               setPowerData(child);
  //               IsSelect = child.Status === 2; //1：先审后用模式；2：先用后审模式,不为2都是false
  //             }
  //             return Power;
  //           })))
  //     ) {
  //       setIsError(false);
  //       setModel(IsSelect);
  //     } else {
  //       setIsError(true);
  //     }
  //   }, [Type, UserMsg]);
  const GetModel = useCallback(() => {
    let IsSelect = false;

    getData(PowerProxy + "/GetGlobalUserPower?SchoolID=" + UserMsg.SchoolID, 2)
      .then((res) => res.json())
      .then((json) => {
        if (
          json.StatusCode === 200 &&
          json.Data &&
          json.Data instanceof Array &&
          ((Role === "student" &&
            json.Data.some((child) => {
              let Power = child.PowerID === "Student_SginUp";
              if (Power) {
                setPowerData(child);
                IsSelect = child.Status === 2; //1：先审后用模式；2：先用后审模式,不为2都是false
              }
              return Power;
            })) ||
            (Role === "teacher" &&
              json.Data.some((child) => {
                let Power = child.PowerID === "Teacher_SginUp";
                if (Power) {
                  setPowerData(child);
                  IsSelect = child.Status === 2; //1：先审后用模式；2：先用后审模式,不为2都是false
                }
                return Power;
              })))
        ) {
          setIsError(false);
          setModel(IsSelect);
        } else {
          setIsError(true);
        }
      });
  }, [Role, UserMsg]);
  useEffect(() => {
    GetModel();
  }, []);

  const onModelChange = (value) => {
    if (CanHandle) {
      setCanHandle(false);
      postData(
        PowerProxy + "/SetGlobalUserPower",
        {
          PowerID: PowerData.PowerID,
          SchoolID: UserMsg.SchoolID,
          Status: value ? 1 : 2,
        },
        2
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.StatusCode === 200) {
            GetModel();
          }
          setCanHandle(true);
        });
    }
  };
  
  

  useImperativeHandle(ref, () => ({}));
  return !IsError ? (
    <span ref={ref} className={`RegisterModel ${className}`}>
      <span className="title">{Type}：</span>
      <span
        title={Title}
        className={`selectModel ${Model ? "selected" : ""}`}
        onClick={() => onModelChange(Model)}
      ></span>
    </span>
  ) : (
    ""
  );
}
export default memo(forwardRef(RegisterModel));
