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

import SchoolLife from "../../components/schoolLife";

import Study from "../../components/study";

import "./index.scss";

function Content(props){

  const { SchoolID, UserID, UserName, PhotoPath, Sign } = useSelector(
    (state) => state.loginUser
  );

  const { UsedType } = useSelector((state) => state.pageUsedType);

  const { Urls, ModuleRely } = useSelector((state) => state.systemUrl);

  const userArchives = useSelector((state) => state.userArchives);

  const targetUser = useSelector(state=>state.targetUser);
  const BaseData = useSelector((state) => state.MoreData.CommonData.BaseData);

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
      if (BaseData.ProductType === 3&&Urls['L10'].WebUrl) {
        //为3的时候只要档案账号，同时在档案上面加师资发展的个人画像
        urlGet = false;
      }
      if (urlGet) {

        const initList = [
            {
                title:<span>{targetUser.UserType===1?'档案':'学籍'}<br />{targetUser.UserType===1?'信息':'档案'}</span>,
                id: "archives",
                value: Archives,
                type:
                    "AdmToStu,LeaderToStu,StuToStu,ParentsToStu,HeaderTeacherToStu,AdmToTeacher,LeaderToTeacher,TeacherToTeacher",

                rely:''
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
                    "AdmToStu,LeaderToStu,StuToStu,OtherToStu,ParentsToStu,HeaderTeacherToStu,AdmToTeacher,LeaderToTeacher,TeacherToTeacher,OtherToTeacher",
                rely:''

            },

            {
                title: <span>生活<br />信息</span>,
                id: "life",
                value:SchoolLife,
                type:"AdmToStu,LeaderToStu,HeaderTeacherToStu,StuToStu,ParentsToStu",

                rely:'schoolLife'
            },

            {
                title: <span>科目<br />课程</span>,
                id: "study",
                value:Study,
                type:"AdmToStu,LeaderToStu,HeaderTeacherToStu,StuToStu,ParentsToStu,OtherToStu",

                rely:''
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
                rely:'StuResult'
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
                rely:'StuQuality'
            },
            {
                title: <span>德育</span>,
                id: "pe",
                value: MoralEdu,
                type:
                    "AdmToStu,LeaderToStu,StuToStu,ParentsToStu,HeaderTeacherToStu",
                rely:'MoralEdu'
            },
            {
                title: <span>教学<br />工作量</span>,
                id: "work",
                value: TeaWork,
                type:
                    "AdmToTeacher,LeaderToTeacher,TeacherToTeacher,OtherToTeacher",
                rely:'TeaWork'
            },
            {
                title: <span>教学<br />资料</span>,
                id: "material",
                value: TeaMaterial,
                type:
                    "AdmToTeacher,LeaderToTeacher,TeacherToTeacher,OtherToTeacher",
                rely:'TeaMaterial'
            },
        ];

        const newList = initList.filter(i=>{

          let canView = false;

          if (i.rely){

              ModuleRely[i.rely].map(item=>{

                if(Urls[item].WebUrl){

                  canView = true;

                }

              });

          }else{

              canView = true;

          }

          return canView;

      });

        return newList;

      } else {

        return [

            {
                title:<span>{targetUser.UserType===1?'档案':'学籍'}<br />{targetUser.UserType===1?'信息':'档案'}</span>,
                id: "archives",
                value: Archives,
                type:
                    "AdmToStu,LeaderToStu,StuToStu,ParentsToStu,HeaderTeacherToStu,AdmToTeacher,LeaderToTeacher,TeacherToTeacher",

                rely:''
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
                    "AdmToStu,LeaderToStu,StuToStu,OtherToStu,ParentsToStu,HeaderTeacherToStu,AdmToTeacher,LeaderToTeacher,TeacherToTeacher,OtherToTeacher",
                rely:''

            },

            {
                title: <span>科目<br />课程</span>,
                id: "study",
                value:Study,
                type:"AdmToStu,LeaderToStu,HeaderTeacherToStu,StuToStu,ParentsToStu,OtherToStu",
                rely:''
            }

        ];

      }
    }else {
      return []
    }
  }, [userArchives]);

  //锚点
  const anchorList = useMemo(() => {

    if (moduleList instanceof Array&&moduleList.length > 0) {

      return moduleList.filter(i =>i.type.includes(UsedType)).map(i => ({ id: i.id, title: i.title }));

    } else {
      return [];
    }
  }, [moduleList]);





console.log(moduleList,UsedType)
  return (
    <>
      <ul className={"app-content-wrapper"}>
        {moduleList instanceof Array&&moduleList.map((i) => {
          if (i.type.includes(UsedType)) {
            return <i.value key={i.id}></i.value>;
          }
        })}
      </ul>


        {

          UsedType!=='OtherToStu'&&anchorList.length>=4?

              <AnchorPoint anchorList={anchorList}></AnchorPoint>

              :null

        }


    </>
  );
}

export default memo(Content);
