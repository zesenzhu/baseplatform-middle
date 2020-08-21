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

import AnchorPoint from "../../components/anchorPoint";

import "./index.scss";

function Content(props) {
  const { SchoolID, UserID, UserName, PhotoPath, Sign } = useSelector(
    (state) => state.loginUser
  );

  const { UsedType } = useSelector((state) => state.pageUsedType);

  useEffect(() => {
    if (UserID) {
    }
  }, [UserID]);

  return (
    <>
      <ul className={"app-content-wrapper"}>
        <ContentItem type={"archives"} tabName={"学籍档案信息"}></ContentItem>
        <StuResult></StuResult>
      </ul>

      <AnchorPoint></AnchorPoint>
    </>
  );
}

export default memo(Content);
