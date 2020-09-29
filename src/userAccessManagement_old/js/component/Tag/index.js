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

function Tag(props, ref) {
  const {
    className,
    type,
    name,
    id,
    onCancel,
    styleType,
    children,
    ...other
  } = props;

  useImperativeHandle(ref, () => ({
    //   ImgUrl: Badge,
  }));
  const onTagCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  return (
    <span
      ref={ref}
      className={`Tag ${styleType === "dashed" ? "Tag-dashed" : ""} ${
        className ? className : ""
      }`}
    >
      <span title={name} className="Tag-name">
        {name}
      </span>
      {id ? (
        <>
          (
          <span title={id} className="Tag-id">
            {id}
          </span>
          )
        </>
      ) : (
        ""
      )}
      {type === "edit" ? (
        <i
          onClick={onTagCancel}
          className={styleType === "dashed" ? "Tag-clear" : "Tag-cancel"}
        ></i>
      ) : (
        ""
      )}
    </span>
  );
}
export default memo(forwardRef(Tag));
