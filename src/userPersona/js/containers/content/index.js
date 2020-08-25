import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
  useRef,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import StuQuality from "../../components/StuQuality";

import StuResult from "../../components/StuResult";

import Archives from "../../components/archives";

import MoralEdu from "../../components/MoralEdu";

import AnchorPoint from "../../components/anchorPoint";

import "./index.scss";

function Content(props) {
  //模块列表
  //const [moduleList,setModuleList] = useState([]);

  //锚点列表

  //const [anchorList,setAnchorList] = useState([]);

  const { SchoolID, UserID, UserName, PhotoPath, Sign } = useSelector(
    (state) => state.loginUser
  );

  const { UsedType } = useSelector((state) => state.pageUsedType);

  const { Urls, ModuleRely } = useSelector((state) => state.systemUrl);

  //模块列表
  const moduleList = useMemo(() => {
    let urlGet = false;

    for (let k in Urls) {
      if (Urls[k].WebUrl) {
        urlGet = true;

        break;
      }
    }

    for (let k in Urls) {
      if (Urls[k].WebUrl) {
        urlGet = true;

        break;
      }
    }

    if (urlGet) {
      return [
        {
          title: (
            <span>
              学籍
              <br />
              档案
            </span>
          ),
          id: "archives",
          value: Archives,
          type:
            "AdmToStu,LeaderToStu,StuToStu,ParentsToStu,HeaderTeacherToStu,OtherToStu,LeaderToTeacher,TeacherToTeacher,OtherToTeacher",
        },

        {
          title: (
            <span>
              成绩
              <br />
              信息
            </span>
          ),
          id: "score",
          value: StuResult,
          type: "AdmToStu,LeaderToStu,StuToStu,ParentsToStu,HeaderTeacherToStu",
        },
        {
          title: (
            <span>
              德育
              <br />
              评价
            </span>
          ),
          id: "comment",
          value: StuQuality,
          type: "AdmToStu,LeaderToStu,StuToStu,ParentsToStu,HeaderTeacherToStu",
        },
        {
          title: <span>德育</span>,
          id: "pe",
          value: MoralEdu,
          type: "AdmToStu,LeaderToStu,StuToStu,ParentsToStu,HeaderTeacherToStu",
        },
      ];
    } else {
      return [];
    }
  }, [Urls]);

  //锚点
  const anchorList = useMemo(() => {
    if (moduleList.length > 0) {
      return moduleList
        .filter((i) => i.type.includes(UsedType))
        .map((i) => ({ id: i.id, title: i.title }));
    } else {
      return [];
    }
  }, [moduleList]);

  return (
    <>
      <ul className={"app-content-wrapper"}>
        {moduleList.map((i) => {
          if (i.type.includes(UsedType)) {
            return <i.value key={i.id}></i.value>;
          }
        })}
      </ul>

      <AnchorPoint anchorList={moduleList}></AnchorPoint>
    </>
  );
}

export default memo(Content);
