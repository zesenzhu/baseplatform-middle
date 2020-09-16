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
import "./index.scss";
function TimeBanner(props, ref) {
  const { List, SelectBar, AfterSelect } = props;

  let [Select, setSelect] = useState({});
  useEffect(() => {
    if (List instanceof Array) {
      setSelect(
        List.find((child) => child.value === SelectBar)
          ? List.find((child) => child.value === SelectBar)
          : List[0]
      );
    }
  }, [SelectBar, List]);

  const onSelectBar = (e) => {
    setSelect(e);
    AfterSelect && AfterSelect(e);
  };
  useImperativeHandle(ref, () => ({
    onSelectBar: (e) => {
      console.log(e)
      setSelect(e);
    },
  }));
  return (
    <div className="TimeBanner">
      {List instanceof Array &&
        List.map((child, index) => {
          return (
            <span
              key={index}
              onClick={() => onSelectBar(child)}
              className={`TB-Bar ${"TB-Bar-" + child.value} ${
                Select.value === child.value ? "Selected" : ""
              }`}
              title={child.title}
            >
              <i></i>
              {child.title}
            </span>
          );
        })}
    </div>
  );
}

export default memo(forwardRef(TimeBanner));
