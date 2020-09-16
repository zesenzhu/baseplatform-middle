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
import { Radio, RadioGroup, Tips } from "../../../../common";
import "./index.scss";
import { ErrorAlert } from "../../../../common/js/fetch/util";
import { postData } from "../../../../common/js/fetch";

// const Url = `SubjectRes_UploadHandler.ashx?method=doUpload_WholeFile&userid=${UserID}`;
// 校徽-长方形
function SchoolType(props, ref) {
  const DefaultSchoolSessionType = "0/0/0";
  const {
    SchoolSessionType,
    PrimaryList,
    MiddleList,
    HightList,
    TipTitle,
  } = props;

  let [SchoolSession, setSchoolSessionType] = useState([0, 0, 0]);
  let [primaryList, setPrimary] = useState([
    { value: 5, title: "五年制" },
    { value: 6, title: "六年制" },
  ]);
  let [middleList, setMiddle] = useState([
    { value: 3, title: "三年制" },
    { value: 4, title: "四年制" },

  ]);
  let [hightList, setHight] = useState([{ value: 3, title: "三年制" }]);
  let [schoolType, setSchoolType] = useState(0); //-1不可选择的组合,0初始，没选择,1表示只有小学；2表示只有初中；4表示只有高中；3表示小学和初中；7表示小学初中高中

  let [tipTitle, setTipTitle] = useState("请选择学制");
  let [tipVisible, setTipVisible] = useState(false);
  useEffect(() => {
    // console.log(schoolBadge);
    if (typeof SchoolSessionType === "string") {
      let TypeList = SchoolSessionType.split("/").map((child) =>
        parseInt(child)
      );
      console.log(TypeList);
      CheckSchoolType(TypeList);

      setSchoolSessionType(TypeList);
    }
  }, [SchoolSessionType]);
  // 设置小学列表
  useEffect(() => {
    if (PrimaryList) setPrimary(PrimaryList);
  }, [PrimaryList]);
  // 设置初中列表
  useEffect(() => {
    if (MiddleList) setMiddle(MiddleList);
  }, [MiddleList]);
  // 设置高中列表
  useEffect(() => {
    if (HightList) setHight(HightList);
  }, [HightList]);
  // 设置学制title
  useEffect(() => {
    setTipTitle(TipTitle);
  }, [TipTitle]);

  /**
   * @description: 设置学校制度
   * @param {type:primary,middle,hight}
   * @return {type:}
   */
  const onSelectSchoolTypeClick = (type) => {
    let schoolSession = [].concat(SchoolSession);
    let session = 0;
    let index = -1;
    let List = [];
    if (type === "primary") {
      index = 0;
      List = primaryList;
    } else if (type === "middle") {
      index = 1;
      List = middleList;
    } else if (type === "hight") {
      index = 2;
      List = hightList;
    }

    if (index !== -1) {
      if (schoolSession[index]) {//旧
        session = 0;
      } else {
        session = List[0].value;
      }
    }
    onSessionTypeChange(type,session)
    // CheckSchoolType(schoolSession);
    // setSchoolSessionType(schoolSession);
  };
  /**
   * @description: 对sessionType解析，获取学校制度SchoolType
   * @param {sessionType:[0,0,0]}
   * @return {type:-1不可选择的组合,0初始，没选择,1表示只有小学；2表示只有初中；4表示只有高中；3表示小学和初中；7表示小学初中高中}
   */
  const CheckSchoolType = (sessionType) => {
    let TypeList = [0, 0, 0];
    if (sessionType[0] !== 0 && sessionType[2] !== 0 && sessionType[1] === 0) {
      //不允许只选小学高中
      TypeList[1] = -1;
    } else {
      if (sessionType[0] !== 0) {
        TypeList[0] = 1;
      }
      if (sessionType[1] !== 0) {
        TypeList[1] = 2;
      }
      if (sessionType[2] !== 0) {
        TypeList[2] = 4;
      }
    }
    let schoolType = 0;
    TypeList.forEach((child, index) => {
      schoolType += child;
    });
    if(schoolType===-1){
      setTipTitle('请正确选择学制关系');
      setTipVisible(true)
    }else if(schoolType===0){
      setTipTitle('请选择学制');
      setTipVisible(true)

    }else{
      setTipVisible(false)

    }
    setSchoolType(schoolType);
  };


  const SetTipVisible = (boolean) => {
    setTipVisible(boolean);
  };

const CheckType =  ()=>{
  CheckSchoolType(SchoolSession);
  return tipVisible
}

  useImperativeHandle(ref, () => ({
    SchoolSessionType: SchoolSession.join('/'),
    SetTipVisible,
    SchoolType: schoolType,
    CheckSchoolType:CheckType,
  }));
  /**
   * @description: 单选学制
   * @param {type:primary,middle,hight,}
   * @return {type}
   */
  const onSessionTypeChange = (type, session) => {
    let schoolSession = [].concat(SchoolSession);

    let index = -1;

    if (type === "primary") {
      index = 0;
      if(session===5&&schoolSession[1]===3){//加起来腰围9
        schoolSession[1] = 4
      }else if(session===6&&schoolSession[1]===4){
        schoolSession[1] = 3
      }
    } else if (type === "middle") {
      index = 1;
      if(session===3&&schoolSession[0]===5){
        schoolSession[0] = 6
      }else if(session===4&&schoolSession[0]===6){
        schoolSession[0] = 5
      }
    } else if (type === "hight") {
      index = 2;
    }

    if (index !== -1) {
      schoolSession[index] = session;
    }
    CheckSchoolType(schoolSession);
    setSchoolSessionType(schoolSession);
  };
  return (
    <Tips overlayClassName="tips" visible={tipVisible} title={tipTitle}>
      <div ref={ref} className="SchoolType">
        {/* {!isNaN(SchoolSession[0]) ? ( */}
          <div className="ST-bar">
            <span
              onClick={onSelectSchoolTypeClick.bind(this, "primary")}
              className={`STb-Type ${SchoolSession[0] ? "select" : ""}`}
            >
              小学
            </span>
            <span className="STb-Year">
              <RadioGroup
                value={SchoolSession[0]}
                onChange={(e) => onSessionTypeChange("primary", e.target.value)}
              >
                {primaryList instanceof Array &&
                  primaryList.map((child, index) => {
                    return <Radio key={index} value={child.value}>{child.title}</Radio>;
                  })}
              </RadioGroup>
            </span>
          </div>
        {/* ) : (
          ""
        )} */}
        {/* {!isNaN(SchoolSession[1]) ? ( */}
          <div className="ST-bar">
            <span
              onClick={onSelectSchoolTypeClick.bind(this, "middle")}
              className={`STb-Type ${SchoolSession[1] ? "select" : ""}`}
            >
              初中
            </span>
            <span className="STb-Year">
              <RadioGroup
                value={SchoolSession[1]}
                onChange={(e) => onSessionTypeChange("middle", e.target.value)}
              >
                {middleList instanceof Array &&
                  middleList.map((child, index) => {
                    return <Radio key={index} value={child.value}>{child.title}</Radio>;
                  })}
              </RadioGroup>
            </span>
          </div>
        {/* ) : (
          ""
        )} */}
        {/* {!isNaN(SchoolSession[2]) ? ( */}
          <div className="ST-bar">
            <span
              onClick={onSelectSchoolTypeClick.bind(this, "hight")}
              className={`STb-Type ${SchoolSession[2] ? "select" : ""}`}
            >
              高中
            </span>
            <span className="STb-Year">
              <RadioGroup
                value={SchoolSession[2]}
                onChange={(e) => onSessionTypeChange("hight", e.target.value)}
              >
                {hightList instanceof Array &&
                  hightList.map((child, index) => {
                    return <Radio key={index} value={child.value}>{child.title}</Radio>;
                  })}
              </RadioGroup>
            </span>
          </div>
        {/* ) : (
          ""
        )} */}
      </div>
    </Tips>
  );
}
export default memo(forwardRef(SchoolType));
