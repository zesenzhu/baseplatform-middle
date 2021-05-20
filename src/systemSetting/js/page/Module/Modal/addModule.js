import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  memo,
  useReducer,
  forwardRef,
  useCallback,
  useContext,
  createContext,
  useLayoutEffect,
  useImperativeHandle,
} from "react";
import {
  Loading,
  Empty,
  PagiNation,
  Radio,
  RadioGroup,
  DropDown,
  CheckBox,
  CheckBoxGroup,
} from "../../../../../common";
import useGetList from "../../hooks/useGetList";
import { GetAllModule, UploadHandler } from "../api";
import clamp from "clamp-js";

import { Input } from "antd";
import { Context } from "../context";
import { Scrollbars } from "react-custom-scrollbars";
import { autoAlert } from "../../../../../common/js/public";
import { ImgUrlProxy } from "../../../../../common/js/config";

// 录入新的应用

function AddModule(props, ref) {
  let {
    defaultData,
    type,
    comfirmSubmit,
    tableList,
    // AccessData: { ImgUrlProxy },
  } = props;
  const {
    state: {
      LoginMsg: { UserID },
      GroupList,
      SysTypeList,
      ImgUrlProxy,
      UserTypeList,
      UserTypeData,
      ThirdPartySubSystem,
      IdentityTypeList,
    },
  } = useContext(Context);
  // 促使界面更新
  const [Updata, setUpdata] = useState(0);
  const [DataTipsVisible, setDataTipsVisible] = useState({});
  const [ImgTypes] = useState([
    // "jpg", "jpeg", "gif", "bmp",
    "png",
  ]);
  const ThirdPartySubSystemForKey = useMemo(() => {
    let list = {
      "": {
        value: "",
        title: <span style={{ color: "#bac7d9" }}>请选择第三方应用系统</span>,
      },
    };
    ThirdPartySubSystem.forEach((c) => {
      list[c.value] = c;
    });
    return list;
  }, [ThirdPartySubSystem]);
  // 身份列表
  const [IdentityList, setIdentityList] = useState([]);
  const [Data, setData] = useState({});
  // 记录分组forkey
  const GroupListForKey = useMemo(() => {
    let data = {
      "": {
        value: "",
        title: <span style={{ color: "#bac7d9" }}>请选择分组</span>,
      },
    };
    GroupList.forEach((c) => {
      data[c.value] = c;
    });
    return data;
  }, [GroupList]);
  const TableRuleList = useMemo(() => {
    let list =
      typeof tableList === "object" && tableList
        ? tableList
        : {
            groupID: {
              key: "groupID",
              reg: true,
              defaultValue: "",
            },
            logoUrl: {
              key: "logoUrl",
              reg: true,
              defaultValue: "",
            },
            moduleName: {
              key: "moduleName",
              reg: /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,8}$/,
              defaultValue: "",
            },
            introduction: {
              key: "introduction",
              reg: /^[0-9a-zA-Z()（）,，。;""“”’‘'':\/\.@#=\u4E00-\u9FA5\uF900-\uFA2D-]{1,100}$/,
              defaultValue: "",
            },
            accessUrl: {
              key: "accessUrl",
              reg: /(^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$)/,
              defaultValue: "",
            },
            sysID: {
              key: "sysID",
              reg: true,
              defaultValue: "",
            },
            userType: {
              key: "userType",
              reg: true,
              defaultValue: [],
            },
            identityCodes: {
              key: "identityCodes",
              reg: false,
              defaultValue: [],
            },
          };
    let dataTipsVisible = {};
    let data = {};
    let noAdd = type !== "add" && type && defaultData;
    if (noAdd) {
      //默认为添加模式

      data = defaultData;
    }
    for (let key in list) {
      list[key]["TipsVisible"] = key + "TipsVisible";
      dataTipsVisible[key + "TipsVisible"] = false;
      if (!noAdd) {
        data[key] = list[key].defaultValue;
      }
    }
    setDataTipsVisible(dataTipsVisible);
    setData(data);
    return list;
  }, [defaultData, tableList, type]);

  const isAdd = useMemo(() => {
    return type === "add" || !type;
  }, [type]);
  const [GotID, setGotID] = useState(isAdd ? false : true); //是否已经请求过id
  // 是否是第三方
  const IsThirdParty = useMemo(() => {
    return Data.isThirdParty !== 0;
  }, [Data.isThirdParty]);
  // 回调，获取数据
  const onSubmit = useCallback(() => {
    // 先判断是否有错
    // 有错返回false
    let canSubmit = true;
    // console.log(DataTipsVisible);
    for (let v in TableRuleList) {
      let { key, reg } = TableRuleList[v];
      // 蓝鸽的编辑检查一些不用

      if (
        type === "add" ||
        !type ||
        (IsThirdParty && (key === "userType" || key === "identityCodes"))
      ) {
        // eslint-disable-next-line no-loop-func
        onUpdata(key, [Data[key]], reg, (test) => {
          if (!test) {
            canSubmit = false;
          }
        });
      }
    }
    // for (let i in DataTipsVisible) {
    //   if (DataTipsVisible[i]) {
    //     canSubmit = false;
    //   }
    // }
    let newData = {};
    for (let i in Data) {
      if (TableRuleList[i] || (type === "edit" && i === "moduleID"))
        newData[i] = Data[i] instanceof Array ? Data[i].join(",") : Data[i];
    }
    return canSubmit && newData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Data, TableRuleList, IsThirdParty, type]);
  // 更新数据
  /**
   * @description:
   * @param {*} reg:正则，缺省不检查，key:在Data 的键,可以为数组或字符串，value要更新的值
   * @return {*}
   */
  const onUpdata = useCallback(
    (key, value, reg, callback = () => {}) => {
      // reg===true,表示不能为空,只做第一个的检测
      let Test =
        !reg ||
        (reg === true
          ? (value[0] !== undefined ? value[0] : value) !==
            TableRuleList[key].defaultValue
          : reg.test(value));
      key = key instanceof Array ? key : [key];
      value = value instanceof Array ? value : [value];

      Test &&
        setData((pre) => {
          key.forEach((k, i) => {
            pre[k] = value[i];
          });
          return pre;
        });
      // reg==false表明不用改变
      reg !== false &&
        setDataTipsVisible((pre) => {
          key.forEach((k, i) => {
            pre[k + "TipsVisible"] = !Test;
          });

          return pre;
        });
      setUpdata((pre) => {
        return ++pre;
      });
      typeof callback === "function" && callback(Test, value);
      return Test;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Data, TableRuleList]
  );
  useImperativeHandle(ref, () => ({
    onSubmit,
  }));

  // 是否允许编辑

  // 判断是否是图片
  const CheckImg = useCallback(
    (value) => {
      let isImg = false;
      if (value) {
        let Index = value.lastIndexOf(".");
        let fileType = value.substring(Index + 1).toLowerCase();

        if (ImgTypes.some((c) => c === fileType)) {
          isImg = true;
        } else {
          autoAlert({ title: "请选择png格式的图片" });
        }
      }

      return isImg;
    },
    [ImgTypes]
  );
  // 上传图标
  const UploadImg = useCallback(
    (e) => {
      const input = e.target.value;
      const files = e.target.files;
      if (files) {
        // for (let index = 0; index < files.length; index++) {
        const File = files[0];
        if (File.size > 1024 * 1024 * 2) {
          // fileTip.innerHTML = '文件大小不能超过2M!';
          autoAlert({ title: "文件大小不能超过2M" });
          // setForbinClick(false);

          // input.value = "";
          return false;
        } else {
          if (CheckImg(input)) {
            let _URL = window.URL || window.webkitURL;
            let locationUrl = _URL.createObjectURL(File);
            let img = new Image();
            img.onload = function () {
              if (this.width !== 80 || this.height !== 80) {
                autoAlert({ title: "请选择大小为80*80的图片" });
              } else {
                const formData = new FormData();
                // 添加要上传的文件
                formData.append(
                  "file",
                  File,
                  Data["groupID"] + "." + File.type.split("/")[1]
                );
                formData.append("diskName", "SysSetting");
                UploadHandler({
                  userid: UserID,
                  ImgUrlProxy: ImgUrlProxy,
                  data: formData,
                }).then((json) => {
                  if (json.StatusCode === 200) {
                    onUpdata("logoUrl", ImgUrlProxy + json.Data.filePath);
                  } else {
                    autoAlert({ title: "上传失败，请重新上传" });
                  }
                });
              }
            };
            img.src = locationUrl;
          }

          // fileTip.innerHTML = '';
          // formData.append("file", file);
        }
      }
      // }
    },
    [CheckImg, onUpdata, Data, ImgUrlProxy, UserID]
  );
  // 身份change
  const onIdentityChange = useCallback(
    (e) => {
      onUpdata("identityCodes", [e], TableRuleList["identityCodes"].reg);
    },
    [TableRuleList, onUpdata]
  );
  // 根据账号类型的选择，控制身份列表
  useEffect(() => {
    let Identity = [];
    // console.log(IdentityTypeList,Data.userType,Identity)\
    // 先升序
    Data.userType.sort((a,b)=>a-b)
    Data.userType.forEach((c) => {
      // 排除重复的
      Identity = Identity.concat(
        IdentityTypeList[c].filter(
         // 因为后面要求匹配逻辑是身份被包含才能算真正的列表，所以要在筛选 
          (i) => !Identity.some((s) => s.value === i.value)&&(i.userTypes===`${c}`||i.userTypes.split(',').sort((a,b)=>a-b).join(',')===Data.userType.join(','))
        )
      );
    });
    // 更新列表后，对已选的进行排除
    let IdentitySelect = Data.identityCodes.filter((i) =>
      Identity.some((s) => s.value === i)
    );
 
    onIdentityChange(IdentitySelect);
     console.log(IdentityTypeList,Data.userType,Identity)
    setIdentityList(Identity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [IdentityTypeList, Data.userType, onIdentityChange]);
  return (
    <div className={`Module-Modal ${!isAdd ? "EditModule" : "AddModule"}`}>
      <table>
        <tbody>
          <tr className={"table-tr-1  "}>
            <td className={`${IsThirdParty ? "must" : ""}`}>所属应用系统:</td>
            <td>
              {IsThirdParty ? (
                <DropDown
                  width={200}
                  dropSelectd={ThirdPartySubSystemForKey[`${Data["sysID"]}`]}
                  dropList={ThirdPartySubSystem}
                  height={120}
                  style={{ zIndex: 10 }}
                  onChange={(e) => {
                    console.log(e);
                    onUpdata(
                      ["sysID", "logoUrl", 'moduleName'],
                      [
                        e.value,
                        ThirdPartySubSystemForKey[e.value].SysLogoUrl,
                        ThirdPartySubSystemForKey[e.value].title,
                      ]
                      // TableRuleList["sysID"].reg
                    );
                  }}
                ></DropDown>
              ) : (
                <p title={Data.sysName}>{Data.sysName || "--"}</p>
              )}
              {DataTipsVisible[TableRuleList["sysID"].TipsVisible] && (
                <p className="td-tips">请选择所属应用系统</p>
              )}
            </td>
            <td className={`${IsThirdParty ? "must" : ""} top`}>模块图标:</td>
            <td rowSpan={2}>
              <div className="upload-img">
                <i
                  className="default-upload"
                  style={Object.assign(
                    {},
                    Data["logoUrl"]
                      ? {
                          backgroundImage: `url(${Data["logoUrl"]})`,
                        }
                      : {},
                    !IsThirdParty ? { cursor: "auto" } : {}
                  )}
                >
                  {IsThirdParty && (
                    <input
                      onChange={UploadImg}
                      type="file"
                      accept={ImgTypes.map((c) => "image/" + c).join()}
                      // accept={"image/jpg,image/jpeg,image/gif,image/bmp,image/png"}
                    ></input>
                  )}
                </i>
                {IsThirdParty && (
                  <div className="handle-box">
                    <span
                      className="img-btn select-system"
                      onClick={() => {
                        if (Data["sysID"])
                          onUpdata(
                            "logoUrl",
                            ThirdPartySubSystemForKey[Data["sysID"]].SysLogoUrl
                          );
                        else {
                          autoAlert({ title: "请先选择所属应用系统" });
                        }
                      }}
                    >
                      选择系统图标
                    </span>
                    <span className="img-btn select-local">
                      上传本地图片
                      <input
                        onChange={UploadImg}
                        type="file"
                        accept={ImgTypes.map((c) => "image/" + c).join()}
                        // accept={"image/jpg,image/jpeg,image/gif,image/bmp,image/png"}
                      ></input>
                    </span>
                    <p className="upload-tips">
                      上传图片时，需选择80*80的PNG图片
                    </p>
                  </div>
                )}
              </div>
              {DataTipsVisible[TableRuleList["logoUrl"].TipsVisible] && (
                <p className="td-tips">请上传模块图标</p>
              )}
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td className={`${IsThirdParty ? "must" : ""}`}>模块名称:</td>
            <td>
              {IsThirdParty ? (
                <Input
                  placeholder={"请输入8位以内的中英文名称..."}
                  className="add-input add-input-1"
                  maxLength={8}
                  defaultValue={Data["moduleName"] || ""}
                  value={Data["moduleName"]}
                  onChange={(e) => {
                    onUpdata("moduleName", e.target.value, false);
                  }}
                  onBlur={(e) => {
                    onUpdata(
                      "moduleName",
                      e.target.value,
                      TableRuleList["moduleName"].reg
                    );
                  }}
                ></Input>
              ) : (
                <p title={Data.moduleName}>{Data.moduleName || "--"}</p>
              )}

              {DataTipsVisible[TableRuleList["moduleName"].TipsVisible] && (
                <p className="td-tips">输入的模块名称有误</p>
              )}
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td className={`${IsThirdParty ? "must" : ""}`}>模块简介:</td>

            <td colSpan={3}>
              {IsThirdParty ? (
                <Input
                  placeholder={"请输入100字以内的模块简介..."}
                  className="add-input add-input-2"
                  maxLength={100}
                  defaultValue={Data["introduction"] || ""}
                  value={Data["introduction"]}
                  onChange={(e) => {
                    onUpdata("introduction", e.target.value, false);
                  }}
                  onBlur={(e) => {
                    onUpdata(
                      "introduction",
                      e.target.value,
                      TableRuleList["introduction"].reg
                    );
                  }}
                ></Input>
              ) : (
                <p title={Data.introduction}>{Data.introduction || "--"}</p>
              )}

              {DataTipsVisible[TableRuleList["introduction"].TipsVisible] && (
                <p className="td-tips">输入的模块简介有误</p>
              )}
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td className={`${IsThirdParty ? "must" : ""}`}>访问地址:</td>

            <td colSpan={3}>
              {IsThirdParty ? (
                <Input
                  placeholder={
                    "请输入完整的网页访问路径，如http://www.baidu.com"
                  }
                  className="add-input add-input-2"
                  maxLength={100}
                  defaultValue={Data["accessUrl"] || ""}
                  value={Data["accessUrl"]}
                  onChange={(e) => {
                    onUpdata("accessUrl", e.target.value, false);
                  }}
                  onBlur={(e) => {
                    onUpdata(
                      "accessUrl",
                      e.target.value,
                      TableRuleList["accessUrl"].reg
                    );
                  }}
                ></Input>
              ) : (
                <p title={Data.accessUrl}>{Data.accessUrl || "--"}</p>
              )}
              {DataTipsVisible[TableRuleList["accessUrl"].TipsVisible] && (
                <p className="td-tips">输入的访问地址有误</p>
              )}
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td className={`${IsThirdParty ? "must" : ""}`}>所属分组:</td>
            <td>
              {IsThirdParty ? (
                <DropDown
                  width={200}
                  dropSelectd={GroupListForKey[`${Data["groupID"]}`]}
                  dropList={GroupList}
                  height={120}
                  style={{ zIndex: 10 }}
                  onChange={(e) => {
                    onUpdata("groupID", e.value, TableRuleList["groupID"].reg);
                  }}
                ></DropDown>
              ) : (
                <p title={Data.groupName}>{Data.groupName || "--"}</p>
              )}
              {DataTipsVisible[TableRuleList["groupID"].TipsVisible] && (
                <p className="td-tips">请选择所属分组</p>
              )}
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td className={`${IsThirdParty ? "must" : ""}`}>支持账号类型:</td>
            <td colSpan={3}>
              {IsThirdParty ? (
                <CheckBoxGroup
                  value={Data["userType"]}
                  onChange={(e) => {
                    onUpdata("userType", [e], TableRuleList["userType"].reg);
                  }}
                >
                  {UserTypeList.map((child, index) => {
                    let dom = null;
                    // 排除全部
                    if (child.value) {
                      dom = (
                        <CheckBox
                          key={index}
                          value={child.value}
                          title={child.name}
                        >
                          {child.name}
                        </CheckBox>
                      );
                    }
                    return dom;
                  })}
                </CheckBoxGroup>
              ) : (
                <p title={UserTypeData[Data.userType]}>
                  {UserTypeData[Data.userType] || "--"}
                </p>
              )}
              {DataTipsVisible[TableRuleList["userType"].TipsVisible] && (
                <p className="td-tips">请选择支持账号类型</p>
              )}
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td className="top identity-title">可访问用户身份:</td>
            <td colSpan={3}>
              <div className="identify-box">
                <p className="identify-tips">
                  注:
                  可访问用户身份的范围由支持账号类型决定；允许为空，可后期在“用户权限设置”中进行设置
                </p>
                <div className="identify-scroll">
                  <Scrollbars>
                    <CheckBoxGroup
                      value={Data["identityCodes"]}
                      onChange={onIdentityChange}
                    >
                      {IdentityList.map((child, index) => {
                        let dom = null;
                        // 排除全部
                        if (child.value) {
                          dom = (
                            <CheckBox
                              key={index}
                              value={child.value}
                              title={child.title}
                            >
                              {child.title}
                            </CheckBox>
                          );
                        }
                        return dom;
                      })}
                    </CheckBoxGroup>
                  </Scrollbars>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};
const NewSystem = memo(forwardRef(AddModule));
export { NewSystem };
export default memo(forwardRef(AddModule), (pre, next) => {
  return pre.visible === next.visible;
});
