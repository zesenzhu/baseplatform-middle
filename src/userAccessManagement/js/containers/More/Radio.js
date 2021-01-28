import { func } from "prop-types";
import React, { useState, useMemo, useEffect, memo, forwardRef } from "react";

function Radio(props) {
  let {
    className,
    onChange,
    checked,
    value,
    children,
    textClass,
    title,
    text,
  } = props;
  const selectText = useMemo(() => {
    let select = checked ? 1 : 0;
    if (text instanceof Array) {
      return text[select];
    } else {
      return text;
    }
  }, [checked, text]);
  return (
    <div className={`power-radio ${className || ""}`}>
      <label>
        <div className={`Radio-new radio-${checked ? "open" : "close"}`}>
          <input
            value={value}
            checked={checked}
            type="checkBox"
            onChange={(e) => {
              typeof onChange === "function" &&
                onChange( !checked, value);
            }}
            className="Radio-old"
          />
        </div>
      </label>
      {title && (
        <span className={`Radio-tips`}>
          <span title={title} className="radio-tips-1">
            {title}
          </span>
          {selectText && (
            <span title={selectText} className="radio-tips-2">
              ({selectText})
            </span>
          )}
        </span>
      )}
    </div>
  );
}

export default memo(forwardRef(Radio));
