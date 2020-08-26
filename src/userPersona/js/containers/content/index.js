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

import TeaWork from "../../components/TeaWork";

import AnchorPoint from "../../components/anchorPoint";

import TeaMaterial from "../../components/TeaMaterial";

import Account from "../../components/account";

import "./index.scss";

function Content(props) {
  const { SchoolID, UserID, UserName, PhotoPath, Sign } = useSelector(
    (state) => state.loginUser
  );

  const { UsedType } = useSelector((state) => state.pageUsedType);

  const { Urls, ModuleRely } = useSelector((state) => state.systemUrl);

  const userArchives = useSelector((state) => state.userArchives);

  //模块列表
  const moduleList = useMemo(() => {
    if (userArchives) {
      let urlGet = false;

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
              "AdmToStu,LeaderToStu,StuToStu,ParentsToStu,HeaderTeacherToStu,AdmToTeacher,LeaderToTeacher,TeacherToTeacher,OtherToTeacher",
          },

          {
            title: (
              <span>
                账号
                <br />
                信息
              </span>
            ),
            id: "account",
            value: Account,
            type:
              "AdmToStu,LeaderToStu,StuToStu,ParentsToStu,HeaderTeacherToStu,AdmToTeacher,LeaderToTeacher,TeacherToTeacher,OtherToTeacher",
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
            type:
              "AdmToStu,LeaderToStu,StuToStu,ParentsToStu,HeaderTeacherToStu",
          },
          {
            title: (
              <span>
                综合
                <br />
                评价
              </span>
            ),
            id: "comment",
            value: StuQuality,
            type:
              "AdmToStu,LeaderToStu,StuToStu,ParentsToStu,HeaderTeacherToStu",
          },
          {
            title: <span>德育</span>,
            id: "pe",
            value: MoralEdu,
            type:
              "AdmToStu,LeaderToStu,StuToStu,ParentsToStu,HeaderTeacherToStu",
          },
          {
            title: <span>教学<br />工作量</span>,
            id: "work",
            value: TeaWork,
            type:
              "AdmToStu,LeaderToStu,StuToStu,ParentsToStu,HeaderTeacherToStu",
          },
          {
            title: <span>教学<br />资料</span>,
            id: "material",
            value: TeaMaterial,
            type:
              "AdmToStu,LeaderToStu,StuToStu,ParentsToStu,HeaderTeacherToStu",
          },
        ];
      } else {
        return [];
      }
    }else {
      return []
    }
  }, [userArchives]);

  //锚点
  const anchorList = useMemo(() => {
    if (moduleList instanceof Array&&moduleList.length > 0) {
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
        {moduleList instanceof Array&&moduleList.map((i) => {
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
