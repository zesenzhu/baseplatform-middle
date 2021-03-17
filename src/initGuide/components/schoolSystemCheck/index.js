import React, {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
  memo,
} from "react";

import { RadioGroup, Radio } from "../../../common";

import "./index.scss";

function SchoolSystemCheck(props) {
  const { checked } = props;

  const { systemChange, sysTemType, radioList } = props;
  const List = useMemo(() => {
    let list = [
      { value: "3", title: "三年制" },
      { value: "4", title: "四年制" },
      { value: "5", title: "五年制" },
    ];
    if (sysTemType === "kid") {
      list = [
        { value: "3", title: "三年制" },
        { value: "4", title: "四年制" },
      ];
    } else if (sysTemType === "middle") {
      list = [
        { value: "2", title: "二年制" },
        { value: "3", title: "三年制" },
        { value: "4", title: "四年制" },
        { value: "5", title: "五年制" },
      ];
    }
    return radioList instanceof Array ? radioList : list;
  }, [sysTemType, radioList]);
  return (
    <RadioGroup value={checked} onChange={systemChange}>
      {List.map((c, i) => {
        return <Radio key={i} value={c.value}>{c.title}</Radio>;
      })}
    </RadioGroup>
  );
}

export default memo(SchoolSystemCheck);
