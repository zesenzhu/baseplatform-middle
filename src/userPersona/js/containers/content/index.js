import React, {useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
  useRef,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import ContentItem from "../../components/contentItem";

import StuResult from "../../components/StuResult";

import AnchorPoint from "../../components/anchorPoint";

import "./index.scss";


function Content(props){

    //模块列表
  const [moduleList,setModuleList] = useState([]);


  const { SchoolID, UserID, UserName, PhotoPath, Sign } = useSelector((state) => state.loginUser);

  const {UsedType} = useSelector((state) => state.pageUsedType);




  useEffect(() => {

    if (UsedType) {

      switch (UsedType) {

          case 'AdmToStu':



            break;

          case 'LeaderToStu':

          case 'StuToStu':

          case 'ParentsToStu':

          case 'HeaderTeacherToStu':

          case 'OtherToStu':

          case 'AdmToTeacher':

          case 'LeaderToTeacher':

          case 'TeacherToTeacher':

          case 'OtherToTeacher':



      }

    }

  }, [UsedType]);

  return (
<<<<<<< HEAD
    <ul className={"app-content-wrapper"}>
      <ContentItem tabName={"学籍档案信息"}></ContentItem>
      <StuResult></StuResult>
    </ul>
=======

    <>

        <ul className={"app-content-wrapper"}>
          <ContentItem type={"archives"} tabName={"学籍档案信息"}></ContentItem>
          <ContentItem type="score" tabName={"学生成绩信息"}>
            <StuResult></StuResult>
          </ContentItem>
        </ul>

        <AnchorPoint></AnchorPoint>

    </>
>>>>>>> 6b44d3a6867d411dc7b687af599b33da55e4b17f
  );
}

export default memo(Content);
