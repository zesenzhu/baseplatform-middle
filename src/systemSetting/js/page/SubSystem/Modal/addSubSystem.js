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
import ImgDefault from "../images/img-default.png";

import {
  Loading,
  Empty,
  PagiNation,
  Radio,
  RadioGroup,
  DropDown,
} from "../../../../../common";
import useGetList from "../../hooks/useGetList";
import {
  GetSubSystemToAdd,
  GetAllSubSystem,
  GetClientidAndKey,
  UploadHandler,
} from "../api";
import clamp from "clamp-js";
import moment from "moment";
import Card from "../component/card";
import { Input } from "antd";
import { Context } from "../context";
import { Scrollbars } from "react-custom-scrollbars";
import { autoAlert } from "../../../../../common/js/public";
import { ImgUrlProxy } from "../../../../../common/js/config";
function AddSubSystem(props, ref) {
  let { onDetail } = props;
  const [TabList] = useState([
    { value: "old", title: "选择已有应用" },
    { value: "new", title: "录入新的应用" },
  ]);
  const [TabSelect, setTabSelect] = useState(TabList[0].value);
  const NewRef = useRef({});
  const OldRef = useRef({});
  const onSubmit = useCallback(() => {
    return {
      type: TabSelect,
      data:
        TabSelect === "new"
          ? NewRef.current.onSubmit()
          : OldRef.current.onSubmit(),
    };
  }, [TabSelect]);
  useImperativeHandle(ref, () => ({
    onSubmit,
  }));
  return (
    <div className="System-Modal AddSubSystem">
      <div className="AddSubSystem-top">
        {TabList.map((c, i) => {
          return (
            <span
              key={i}
              onClick={() => {
                setTabSelect(c.value);
              }}
              className={`tab ${
                TabSelect === c.value ? "tab-select" : "tab-default"
              }`}
            >
              {c.title}
            </span>
          );
        })}
      </div>
      <Scrollbars autoHeight autoHeightMin={539}>
        <div className="AddSubSystem-center">
          {TabSelect === TabList[0].value && (
            <OldSystem onDetail={onDetail} ref={OldRef}></OldSystem>
          )}
          {TabSelect === TabList[1].value && (
            <NewSystem ref={NewRef}></NewSystem>
          )}
        </div>
      </Scrollbars>
    </div>
  );
}

// 选择已有应用

function OldSubSystem(props, ref) {
  let { getCardSelect, onDetail } = props;
  const { state } = useContext(Context);
  const { SysTypeData, UserTypeData, SysStateData } = state;
  const [Query, setQuery] = useState({});
  const [SelectList, setSelectList] = useState([]);
  const [Data, handleChange, LoadingShow] = useGetList(
    GetSubSystemToAdd,
    Query,
    {
      pageSize: 12,
    }
  );
  const onCardSelect = useCallback(
    (id, checked) => {
      let next = [];
      setSelectList((pre) => {
        pre = pre.filter((c) => c !== id);
        checked && pre.push(id);
        next = pre;
        return next;
      });
      typeof getCardSelect === "function" && getCardSelect(next);
    },
    [getCardSelect]
  );
  // 回调，获取数据
  const onSubmit = useCallback(() => {
    return SelectList;
  }, [SelectList]);
  useImperativeHandle(ref, () => ({
    onSubmit,
  }));
  return (
    <Loading spinning={LoadingShow} opacity={false} tip="请稍候...">
      <div className="AddSubSystem-tab OldSubSystem">
        {Data && Data.List instanceof Array && Data.List.length > 0 ? (
          <>
            {Data.List.map((child, index) => {
              child.SysStateName = SysStateData[child.SysState];
              child.SysTypeName = SysTypeData[child.SysType];
              let UserTypesList = [];
              typeof child.UserTypes === "string" &&
                child.UserTypes.split(",").forEach((c) => {
                  UserTypesList.push(UserTypeData[c]);
                });
              child.UserTypesName = UserTypesList.join(",");
              child.onClickDetails = onDetail;
              return (
                <Card
                  type={"old"}
                  onCardSelect={onCardSelect}
                  data={child}
                  checked={SelectList.some((c) => c === child.SysID)}
                  key={index}
                ></Card>
              );
            })}
            <PagiNation
              showQuickJumper
              showSizeChanger
              onShowSizeChange={(current, pageSize) => {
                console.log(pageSize);
                handleChange({ pageSize });
              }}
              pageSize={Data.PageSize}
              current={Data.PageIndex}
              hideOnSinglePage={Data.TotalCount === 0 ? true : false}
              total={Data.TotalCount}
              pageSizeOptions={["12", "24", "36", "48"]}
              onChange={(value) => {
                handleChange({ pageIndex: value });
              }}
            ></PagiNation>
          </>
        ) : (
          <Empty
            title={"暂无子系统应用"}
            type="4"
            style={{ marginTop: "200px" }}
          ></Empty>
        )}
      </div>
    </Loading>
  );
}

// 录入新的应用

function NewSubSystem(props, ref) {
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
      SysTypeList,
      ImgUrlProxy,
    },
  } = useContext(Context);
  // 促使界面更新
  const [Updata, setUpdata] = useState(false);
  const [DataTipsVisible, setDataTipsVisible] = useState({});
  const [ImgTypes] = useState([
    // "jpg", "jpeg", "gif", "bmp",
    "png",
  ]);
  // 类型
  const [SysType] = useState(() => {
    return SysTypeList.filter((c) => c.value !== 0);
  });
  const SysTypeForKey = useMemo(() => {
    let list = {
      "": {
        value: "",
        title: <span style={{ color: "#bac7d9" }}>请选择分类</span>,
      },
    };
    SysType.forEach((c) => {
      list[c.value] = c;
    });
    return list;
  }, [SysType]);
  const [Data, setData] = useState({});
  const TableRuleList = useMemo(() => {
    let list =
      typeof tableList === "object" && tableList
        ? tableList
        : {
            sysName: {
              key: "sysName",
              reg: /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,8}$/,
              defaultValue: "",
            },
            isThirdParty: {
              key: "isThirdParty",
              // reg: /^[A-Za-z0-9\u4e00-\u9fa5]{1,6}$/,
              reg: false,
              defaultValue: 1, //后面需求要求不要蓝鸽的，直接是第三方的
            },
            providerName: {
              key: "providerName",
              reg: /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/,
              defaultValue: "",
            },
            sysID: {
              key: "sysID",
              reg: /^([a-zA-Z0-9]{1,24})$/,
              defaultValue: "",
            },
            sysSecretKey: {
              key: "sysSecretKey",
              reg: /^([a-zA-Z0-9]{1,24})$/,
              defaultValue: "",
            },
            introduction: {
              key: "introduction",
              // reg: /^[0-9a-zA-Z()（）,，。;""“”’‘'':\/\.@#=\u4E00-\u9FA5\uF900-\uFA2D-]{1,100}$/,
              reg: true,
              defaultValue: "",
            },
            sysLogoUrl: {
              key: "sysLogoUrl",
              reg: true,
              defaultValue: "",
            },
            sysType: {
              key: "sysType",
              reg: true,
              defaultValue: "",
            },
            sysCallbackAddr: {
              key: "sysCallbackAddr",
              reg: /(^$)|(^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$)/,
              defaultValue: "",
            },
            sysUrl: {
              key: "sysUrl",
              reg: /(^$)|(^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$)/,
              defaultValue: "",
            },
            sysApiUrl: {
              key: "sysApiUrl",
              reg: /(^$)|(^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$)/,
              defaultValue: "",
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
  }, [SysType, defaultData, tableList, type]);

  const isAdd = useMemo(() => {
    return type === "add" || !type;
  }, [type]);
  const [GotID, setGotID] = useState(isAdd ? false : true); //是否已经请求过id

  // 回调，获取数据
  const onSubmit = useCallback(() => {
    // 先判断是否有错
    // 有错返回false
    let canSubmit = true;
    // console.log(DataTipsVisible);
    for (let v in TableRuleList) {
      let { key, reg } = TableRuleList[v];
      // 第三方要选择了才检查
      let useReg =
        key === "providerName" && Data["isThirdParty"] === 0 ? false : reg;
      // eslint-disable-next-line no-loop-func
      onUpdata(key, Data[key], useReg, (test) => {
        if (!test) {
          canSubmit = false;
        }
      });
    }
    // for (let i in DataTipsVisible) {
    //   if (DataTipsVisible[i]) {
    //     canSubmit = false;
    //   }
    // }
    return canSubmit && Data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Data, TableRuleList]);
  // 更新数据
  /**
   * @description:
   * @param {*} reg:正则，缺省不检查，key:在Data 的键,可以为数组或字符串，value要更新的值
   * @return {*}
   */
  const onUpdata = useCallback(
    (key, value, reg, callback = () => {}) => {
      // 可能后台会返回null，转换为kong
      value = value || "";
      // reg===true,表示不能为空
      let Test = !reg || (reg === true ? value !== "" : reg.test(value));
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
        return !pre;
      });
      typeof callback === "function" && callback(Test, value);
      return Test;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Data]
  );
  useImperativeHandle(ref, () => ({
    onSubmit,
  }));

  const GetID = useCallback(
    (can, data) => {
      if (!GotID && can) {
        GetClientidAndKey({ sysName: data[0] }).then((res) => {
          if (res.StatusCode === 200) {
            let { sysID, sysSecretKey } = res.Data;

            onUpdata(["sysID", "sysSecretKey"], [sysID, sysSecretKey]);
            setGotID(true);
          } else {
            setDataTipsVisible((pre) => {
              pre["sysName"] = true;
              return pre;
            });
          }
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Data]
  );
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
                  Data["sysName"] + "." + File.type.split("/")[1]
                );
                formData.append("diskName", "SysSetting");
                UploadHandler({
                  userid: UserID,
                  ImgUrlProxy: ImgUrlProxy,
                  data: formData,
                }).then((json) => {
                  if (json.StatusCode === 200) {
                    onUpdata("sysLogoUrl", json.Data.filePath);
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

  return (
    <div
      className={`AddSubSystem-tab  ${
        !isAdd ? "EditSubSystem" : "NewSubSystem"
      }`}
    >
      <table>
        <tbody>
          <tr className={"table-tr-1  "}>
            <td className="must">应用名称:</td>
            <td>
              <Input
                placeholder={"请输入8位以内的中英文名称..."}
                className="add-input add-input-1"
                maxLength={8}
                defaultValue={Data["sysName"] || ""}
                value={Data["sysName"]}
                onChange={(e) => {
                  onUpdata("sysName", e.target.value, false);
                }}
                onBlur={(e) => {
                  onUpdata(
                    "sysName",
                    e.target.value,
                    TableRuleList["sysName"].reg,
                    GetID
                  );
                }}
              ></Input>
              {DataTipsVisible[TableRuleList["sysName"].TipsVisible] && (
                <p className="td-tips">输入的名称有误</p>
              )}
            </td>
            {
              <>
                <td className="must">所有者:</td>
                <td>
                  {/* <RadioGroup
                onChange={(e) => {
                  if (e.target.value === 0) {
                    onUpdata(
                      ["isThirdParty", "providerName"],
                      [e.target.value, ""],
                      false
                    );
                  } else {
                    onUpdata("isThirdParty", e.target.value, false);
                  }
                }}
                defaultValue={Data["isThirdParty"] || 0}
              >
                <Radio value={0} title={"蓝鸽"}>
                  蓝鸽
                </Radio>
                <Radio value={1} title={"第三方"}>
                  第三方
                </Radio>
              </RadioGroup> */}
                  {Data["isThirdParty"] !== 0 ? (
                    <>
                      {" "}
                      <Input
                        placeholder={"请输入6位以内的公司名..."}
                        className="add-input  add-input-2"
                        maxLength={6}
                        disabled={!Data["isThirdParty"]}
                        value={Data["providerName"]}
                        onChange={(e) => {
                          onUpdata("providerName", e.target.value, false);
                        }}
                        defaultValue={Data["providerName"] || ""}
                        onBlur={(e) => {
                          onUpdata(
                            "providerName",
                            e.target.value,
                            TableRuleList["providerName"].reg
                          );
                        }}
                      ></Input>
                      {DataTipsVisible[
                        TableRuleList["providerName"].TipsVisible
                      ] && <p className="td-tips">输入的公司名有误</p>}
                    </>
                  ) : (
                    Data["providerName"]
                  )}
                </td>
              </>
            }
          </tr>
          {/* <tr className={"table-tr-1  table-tr-providerName"}>
            <td className="must">所有者:</td>
            <td>
               
              <Input
                placeholder={"请输入6位以内的公司名..."}
                className="add-input  add-input-1"
                maxLength={6}
                disabled={!Data["isThirdParty"]}
                value={Data["providerName"]}
                onChange={(e) => {
                  onUpdata("providerName", e.target.value, false);
                }}
                defaultValue={Data["providerName"] || ""}
                onBlur={(e) => {
                  onUpdata(
                    "providerName",
                    e.target.value,
                    TableRuleList["providerName"].reg
                  );
                }}
              ></Input>
              {DataTipsVisible[TableRuleList["providerName"].TipsVisible] && (
                <p className="td-tips">输入的公司名有误</p>
              )}
            </td>
          </tr> */}
          <tr className={"table-tr-1  "}>
            <td className="must">应用ID:</td>
            <td>
              {isAdd ? (
                <Input
                  placeholder={"请输入8位以内的应用ID..."}
                  className="add-input add-input-1"
                  maxLength={8}
                  value={Data["sysID"] || ""}
                  onChange={(e) => {
                    onUpdata("sysID", e.target.value, false);
                  }}
                  onBlur={(e) => {
                    onUpdata(
                      "sysID",
                      e.target.value,
                      TableRuleList["sysID"].reg
                    );
                  }}
                ></Input>
              ) : (
                Data["sysID"]
              )}
              {DataTipsVisible[TableRuleList["sysID"].TipsVisible] && (
                <p className="td-tips">输入的应用ID有误</p>
              )}
            </td>
            <td className="must">应用密钥:</td>
            <td>
              <Input
                placeholder={"请输入24位以内的应用密钥..."}
                className="add-input add-input-2"
                maxLength={24}
                value={Data["sysSecretKey"] || ""}
                onChange={(e) => {
                  onUpdata("sysSecretKey", e.target.value, false);
                }}
                onBlur={(e) => {
                  onUpdata(
                    "sysSecretKey",
                    e.target.value,
                    TableRuleList["sysSecretKey"].reg
                  );
                }}
              ></Input>

              {DataTipsVisible[TableRuleList["sysSecretKey"].TipsVisible] && (
                <p className="td-tips">输入的应用密钥有误</p>
              )}
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td className="must top">应用简介:</td>
            <td colSpan={3}>
              <Input.TextArea
                placeholder={"请输入100字以内的应用简介..."}
                className="add-input add-input-3"
                maxLength={100}
                height={60}
                defaultValue={Data["introduction"] || ""}
                value={Data["introduction"] || ""}
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
              ></Input.TextArea>
              {DataTipsVisible[TableRuleList["introduction"].TipsVisible] && (
                <p className="td-tips">输入的应用简介有误</p>
              )}
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td className="must">应用图标:</td>
            <td>
              <div className="upload-img">
                <i
                  className="default-upload"
                  style={Object.assign(
                    {},
                    Data["sysLogoUrl"] && ImgUrlProxy
                      ? {
                          backgroundImage: `url(${
                            (isAdd ? ImgUrlProxy : "") + Data["sysLogoUrl"]
                          })`,
                        }
                      : {}
                  )}
                >
                  <input
                    onChange={UploadImg}
                    type="file"
                    accept={ImgTypes.map((c) => "image/" + c).join()}
                    // accept={"image/jpg,image/jpeg,image/gif,image/bmp,image/png"}
                  ></input>
                </i>
                <p className="upload-tips">
                  请上传一张80*80的png格式的
                  <br />
                  应用图标文件
                </p>
              </div>
              {DataTipsVisible[TableRuleList["sysLogoUrl"].TipsVisible] && (
                <p className="td-tips">请上传应用图标</p>
              )}
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td className="must">应用分类:</td>
            <td>
              <DropDown
                width={120}
                dropSelectd={SysTypeForKey[`${Data["sysType"]}`]}
                dropList={SysType}
                height={120}
                style={{ zIndex: 10 }}
                onChange={(e) => {
                  console.log(e);
                  onUpdata("sysType", e.value, TableRuleList["sysType"].reg);
                }}
              ></DropDown>
              {DataTipsVisible[TableRuleList["sysType"].TipsVisible] && (
                <p className="td-tips">请选择应用分类</p>
              )}
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td>授权回调地址:</td>
            <td colSpan={3}>
              <Input
                className="add-input add-input-1"
                maxLength={100}
                defaultValue={Data["sysCallbackAddr"] || ""}
                value={Data["sysCallbackAddr"] || ""}
                onChange={(e) => {
                  onUpdata("sysCallbackAddr", e.target.value, false);
                }}
                onBlur={(e) => {
                  onUpdata(
                    "sysCallbackAddr",
                    e.target.value,
                    e.target.value === ""
                      ? false
                      : TableRuleList["sysCallbackAddr"].reg
                  );
                }}
              ></Input>
              <span className="input-tips">
                如需进行OAuth2.0单点登录授权，必须填写登录后的回调地址
              </span>

              {DataTipsVisible[TableRuleList["sysUrl"].TipsVisible] && (
                <p className="td-tips">输入的授权回调地址有误</p>
              )}
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td>应用访问地址:</td>
            <td colSpan={3}>
              <Input
                className="add-input add-input-1"
                maxLength={100}
                defaultValue={Data["sysApiUrl"] || ""}
                value={Data["sysApiUrl"] || ""}
                onChange={(e) => {
                  onUpdata("sysApiUrl", e.target.value, false);
                }}
                onBlur={(e) => {
                  onUpdata(
                    "sysApiUrl",
                    e.target.value,
                    e.target.value === ""
                      ? false
                      : TableRuleList["sysApiUrl"].reg
                  );
                }}
              ></Input>
              <span className="input-tips">
                应用访问的网页路径，如http://www.baidu.com
              </span>
              {DataTipsVisible[TableRuleList["sysApiUrl"].TipsVisible] && (
                <p className="td-tips">输入的应用访问地址有误</p>
              )}
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td>接口服务地址:</td>
            <td colSpan={3}>
              <Input
                className="add-input add-input-1"
                maxLength={100}
                defaultValue={Data["sysUrl"] || ""}
                value={Data["sysUrl"] || ""}
                onChange={(e) => {
                  onUpdata("sysUrl", e.target.value, false);
                }}
                onBlur={(e) => {
                  onUpdata(
                    "sysUrl",
                    e.target.value,
                    e.target.value === "" ? false : TableRuleList["sysUrl"].reg
                  );
                }}
              ></Input>
              <span className="input-tips">
                应用提供接口给平台调用访问时的根路径，如http://www.123.com
              </span>
              {DataTipsVisible[
                TableRuleList["sysCallbackAddr"].TipsVisible
              ] && <p className="td-tips">输入的接口服务地址有误</p>}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function Detail(props) {
  let { data: Data } = props;

  const {
    state: { SysStateData, SysTypeData },
  } = useContext(Context);
  const TitleRef = useRef(null);
  const [HandleImg, setHandleImg] = useState("");

  useLayoutEffect(() => {
    clamp(TitleRef.current, { clamp: 4 });
  }, [Data]);
  const CreateTime = useMemo(() => {
    return Data["createTime"]
      ? moment(Data["createTime"]).format("YYYY-MM-DD HH:mm")
      : "";
  }, [Data]);
  const SysState = useMemo(() => {
    return Data["sysState"] ? SysStateData[Data["sysState"]] : "";
  }, [Data, SysStateData]);
  useEffect(() => {
    setHandleImg(Data.sysLogoUrl);
  }, [Data.sysLogoUrl]);
  return (
    <div className={`SubSystemDetails`}>
      <table>
        <tbody>
          <tr className={"table-tr-1  "}>
            <td>应用名称:</td>
            <td>
              <span title={Data["sysName"]} className="sysName">
                {Data["sysName"] || "--"}
              </span>
            </td>

            <td>所有者:</td>
            <td>
              <span title={Data["providerName"]}>
                {Data["providerName"] || "--"}
              </span>
              {Data["isThirdParty"] && (
                <span className="default">[第三方公司]</span>
              )}
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td>添加时间:</td>
            <td>
              <span title={CreateTime}>{CreateTime || "--"}</span>
            </td>

            <td>运行状态:</td>
            <td>
              <span
                className={`sysState sysState-${Data["sysState"]}`}
                title={SysState}
              >
                {SysState || "--"}
              </span>
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td>应用ID:</td>
            <td>
              <span title={Data["sysID"]}>{Data["sysID"] || "--"}</span>
            </td>
            <td>应用密钥:</td>
            <td>
              <span title={Data["sysSecretKey"]}>
                {Data["sysSecretKey"] || "--"}
              </span>
            </td>
          </tr>
          <tr className={"table-tr-1 introduction "}>
            <td className=" top">应用简介:</td>
            <td className="top">
              <p ref={TitleRef} title={Data["introduction"]}>
                {Data["introduction"] || "--"}
              </p>
            </td>

            <td className="top">应用图标:</td>
            <td>
              <div className="upload-img">
                <img
                  className="default-upload"
                  src={HandleImg}
                  alt={Data["sysLogoUrl"]}
                  onError={() => {
                    setHandleImg(ImgDefault);
                  }}
                  title={Data["sysName"]}
                />
                {/* <i
                  className="default-upload"
                  style={Object.assign(
                    {},
                    Data["sysLogoUrl"]
                      ? {
                          backgroundImage: `url(${Data["sysLogoUrl"]})`,
                        }
                      : {}
                  )}
                ></i> */}
              </div>
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td>授权回调地址:</td>
            <td>
              <span title={Data["sysCallbackAddr"]}>
                {Data["sysCallbackAddr"] || (
                  <span className="default">[未填写]</span>
                )}
              </span>
            </td>
            <td>应用分类:</td>
            <td>
              <span title={SysTypeData[Data["sysType"]]}>
                {SysTypeData[Data["sysType"]] || "--"}
              </span>
            </td>
          </tr>
          <tr className={"table-tr-1  "}>
            <td>应用访问地址:</td>
            <td>
              <span title={Data["sysApiUrl"]}>
                {Data["sysApiUrl"] || <span className="default">[未填写]</span>}
              </span>
            </td>
            <td>接口服务地址:</td>
            <td>
              <span title={Data["sysUrl"]}>
                {Data["sysUrl"] || <span className="default">[未填写]</span>}
              </span>
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
const NewSystem = memo(forwardRef(NewSubSystem));
const OldSystem = memo(forwardRef(OldSubSystem));
export { NewSystem };
export default memo(forwardRef(AddSubSystem), (pre, next) => {
  return pre.visible === next.visible;
});
