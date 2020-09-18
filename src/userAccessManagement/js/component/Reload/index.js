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

  function Reload(props, ref) {
    const { title } = props;
 
 
    useImperativeHandle(ref, () => ({
    //   ImgUrl: Badge,
    }));
    return (
      <div ref={ref} className="Reload">
         数据加载失败，请<span onClick={()=>{
             location.reload()
         }}>点击</span>刷新界面重新加载
      </div>
    );
  }
  export default memo(forwardRef(Reload));