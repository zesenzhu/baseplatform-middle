import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
  useRef,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import ContentItem from "../../components/contentItem";

import StuResult from "../../components/StuResult";
import "./index.scss";

function Content(props) {
  const loginUser = useSelector((state) => state.loginUser);

  const { SchoolID, UserID, UserName, PhotoPath, Sign } = loginUser;

  useEffect(() => {
    if (UserID) {
    }
  }, [UserID]);

  return (
    <ul className={"app-content-wrapper"}>
      <ContentItem tabName={"学籍档案信息"}></ContentItem>
      <ContentItem type="score" tabName={"学生成绩信息"}>
        <StuResult></StuResult>
      </ContentItem>
    </ul>
  );
}

export default memo(Content);
