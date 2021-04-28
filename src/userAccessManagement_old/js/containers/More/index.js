import React, { useState, useMemo, useEffect, memo, forwardRef } from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import ContentTop from "../../component/ContentTop";
import { usePowerMsg } from "./hooks";
import { Loading } from "../../../../common";
import { checkProduct } from "../../../../common/js/public";
import Config from "../../../../common/js/config";
import { postData } from "../../../../common/js/fetch";
import Radio from "./Radio";
import "./index.scss";
let { PowerProxy } = Config;

function More(props, ref) {
  const { data, SchoolID } = props;
  let location = useLocation();
  let history = useHistory();
  const [Select, setSelect] = useState("");
  //   阻止重复点击
  const [RepeatClick, setRepeatClick] = useState(false);
  const [Data, SelectList, changeSelect] = usePowerMsg(SchoolID);
  //   检查是大学还是中小学，middle,university
  const version = useMemo(() => {
    return checkProduct();
  }, []);
  useEffect(() => {
    let route = location.pathname.slice(1).split("/")[0];

    setSelect(route);
  }, [location]);
  return (
    <div className=" Content   lg-More">
      <ContentTop topType={"more"}></ContentTop>
      <Loading
        opacity={false}
        // tip="加载中..."
        size="small"
        spinning={Data === null}
      >
        <div className="power-content-box">
          {Data instanceof Array &&
            Data.map((child, index) => {
              return (
                <div key={index} className="content-row clearfix">
                  <div className={`left `}>
                    <i className={`img-left img-${index}`}></i>
                    {/* <img width={108} height={116} alt="director" src={director} /> */}
                  </div>
                  <div className="right">
                    <div className="normal">
                      {child instanceof Array &&
                        child.map((power, index_2) => {
                          let { value, title, text } = power;
                          return (
                            <Radio
                              key={index_2}
                              value={value}
                              checked={SelectList.some((p) => p === value)}
                              className="radio"
                              title={title}
                              text={text}
                              onChange={(check) => {
                                if (RepeatClick) {
                                  return;
                                }
                                setRepeatClick(true);
                                changeSelect(value);
                                postData(
                                  PowerProxy + "/SetGlobalUserPower",
                                  {
                                    PowerID: value,
                                    SchoolID: SchoolID,
                                    Status:
                                      value === "Student_SginUp" ||
                                      value === "Teacher_SginUp"
                                        ? check
                                          ? 2
                                          : 1
                                        : check
                                        ? 1
                                        : 0,
                                  },
                                  2
                                )
                                  .then((res) => {
                                    return res.json();
                                  })
                                  .then((json) => {
                                    if (json.StatusCode === 200) {
                                      setRepeatClick(false);
                                    } else {
                                      // 失败就取消
                                      changeSelect(value);
                                      setRepeatClick(false);
                                    }
                                  });
                              }}
                              // onChange={this.onRadioChange.bind(this)}
                            ></Radio>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Loading>
    </div>
  );
}

export default memo(forwardRef(More));
