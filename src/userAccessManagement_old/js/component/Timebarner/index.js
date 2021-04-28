import React, { useState, useMemo, useEffect, memo, forwardRef } from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import './index.scss';
function Timebarner(props, ref) {
  const { data } = props;
  let location = useLocation();
  let history = useHistory();
  const [Select, setSelect] = useState("");
  const List = useMemo(() => {
    return data instanceof Array ? data : [];
  }, [data]);
  useEffect(() => {
    let route = location.pathname.slice(1).split("/")[0];

    console.log(location, route);
    setSelect(route);
  }, [location]);
  return (
    <div className="lg-Timebarner">
      {List.map((child, index) => {
        let { value, title, icon } = child;
        // eslint-disable-next-line eqeqeq
        if (value == undefined) {
          return <React.Fragment key={index}></React.Fragment>;
        }

        return (
          <span
            key={index}
            className={`tb-content ${icon ? "tb-content-" + icon : ""} ${
              Select === value ? "tb-select" : ""
            }`}
            onClick={()=>{
                history.push('/'+value)
            }}
          >
            {title}
          </span>
        );
      })}
    </div>
  );
}

export default memo(forwardRef(Timebarner));
