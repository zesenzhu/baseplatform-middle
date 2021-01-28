import { useEffect, useCallback, useState } from "react";
import Config from "../../../../common/js/config";
import { getData } from "../../../../common/js/fetch";
let { PowerProxy } = Config;
// let { getData } = Fetch;

export function usePowerMsg(schoolID) {
  // 数据结构，界面顺序
  let ListStructure = { student: 0, teacher: 1, parents: 2 };
  //   结构
  const [Data, setData] = useState(null);
  //   选择的权限
  const [SelectList, setSelectList] = useState([]);
  const getPowerMsg = useCallback(async (id) => {
    if (!id) {
      return false;
    }
    return await getData(PowerProxy + "/GetGlobalUserPower?SchoolID=" + id)
      .then((res) => res.json())
      .then((json) => {
        let newData = [[], [], []];
        let Select = [];
        if (json.StatusCode === 200 && json.Data instanceof Array) {
          json.Data.forEach((child, index) => {
            //Status 0表示关闭权限，1表示开启权限 （学生教师注册权限比较特殊，0：关闭；
            // 1：先审后用模式；2：先用后审模式）
            let { PowerID, Category, PowerName, SchoolID, Status } = child;

            let ListIndex = ListStructure[Category];
            if (ListIndex !== undefined) {
              let powerData = { value: PowerID, title: PowerName };
              if (Category === "student") {
                //学生比较特殊
                Status !== 1 && Select.push(PowerID);
                // powerData.checked = Status !== 1;
                if (!newData[ListIndex][0]) {
                  //保证只出现一次
                  // text是数组表示选择不同状态又不同结果，第一个为没选择，第二个为选择
                  powerData.text = [
                    "需要经过学校管理员审核确认后，系统才会为学生创建用户账号",
                    "注册完成时，即可使用，不需要经过审核",
                  ];
                }
              } else if (Category === "teacher") {
                //教师要根据不同id进行确定副标题
                if (PowerID === "Teacher_SginUp") {
                  Status !== 1 && Select.push(PowerID);
                  powerData.text = [
                    "需要经过学校管理员审核确认后，系统才会为教师创建用户账号",
                    "注册完成时，即可使用，不需要经过审核",
                  ];
                } else {
                  Status !== 0 && Select.push(PowerID);
                  if (PowerID === "Teacher_CourseClass_CURD") {
                    powerData.text = "可以自主添加、修改、删除教学班";
                  } else if (PowerID === "Teacher_Schedule_C") {
                    powerData.text = "可以自主录入课表安排";
                  } else if (PowerID === "Teacher_Schedule_U") {
                    powerData.text = "可以调整个人课表";
                  }
                }
              } else if (Category === "parents") {
                Status !== 0 && Select.push(PowerID);
                if (PowerID === "Parents_Show") {
                  powerData.text = "可以登录平台访问相应功能";
                }
              }
              newData[ListIndex].push(powerData);
            }

            // if (!newData[child.Category]) {
            //   newData[child.Category] = [];
            //   newData[child.Category].push(child);
            // } else {
            //   newData[child.Category].push(child);
            // }
          });
          //   return {
          //     StatusCode: 200,
          //     Data: newData,
          //   };
        } else {
          newData = false;
          //   return {
          //     StatusCode: 400,
          //     Data: false,
          //   };
        }
        setData(newData);
        setSelectList(Select);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    schoolID && getPowerMsg(schoolID);
    //   .then((data) => {
    //     setData(data.Data);
    //   });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolID]);
  // 改变选择,查看这个id是否已存在，存在去掉，不存在加上
  const changeSelect = useCallback(
    (id) => {
      let list = [];
      if (SelectList.some((child) => child === id)) {
        list = SelectList.filter((child) => child !== id);
      } else {
        list = [id].concat(SelectList);
      }
      console.log(list)
      setSelectList(list);
    },
    [SelectList]
  );
  return [Data, SelectList, changeSelect];
}
