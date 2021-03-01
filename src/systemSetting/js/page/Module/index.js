import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  memo,
  useReducer,
  forwardRef,
  useLayoutEffect,
  useCallback,
  useContext,
  createContext,
} from "react";
import { connect } from "react-redux";
import {
  LgModal,
  Loading,
  DropDown,
  Search,
  Empty,
  PagiNation,
  Table,
} from "../../../../common";
import { autoAlert } from "../../../../common/js/public.js";
import { useHistory } from "react-router-dom";
import "./scss/index.scss";
import useGetList from "../hooks/useGetList";
import clamp from "clamp-js";
import $ from "jquery";
import {
  GetAllModule,
  GetThirdPartySubSystem,
  GetImgUrlProxy,
  AddModule as AddSubSystemInfo,
  DeleteModule,
  GetModuleGroupList,
  GetIdentityTypeList,
  EditModuleInfo,
} from "./api";
import { Context, reducer, initState } from "./context";

import { Tooltip } from "antd";
import AddModule, { NewSystem } from "./Modal/addModule";
/**
 * @description: 应用模块设置
 * @param {*} props
 * @param {*} ref
 * @return {*}
 */
function SubSystem(props, ref) {
  const { dispatch } = props;
  const [state, Dispatch] = useReducer(reducer, initState);
  let {
    SysTypeData,
    UserTypeData,
    SysStateData,
    SysStateList,
    UserTypeList,
    SysTypeList,
  } = state;
  const [Query, setQuery] = useState({
    groupID: "",
    userType: "",

    key: "",
  });
  // 添加
  const [AddModalVisible, setAddModalVisible] = useState(false);
  const [AddModalLoadingShow, setAddModalLoadingShow] = useState(false);
  // 编辑
  const [EditModalVisible, setEditModalVisible] = useState(false);
  const [EditModalLoadingShow, setEditModalLoadingShow] = useState(false);
  // 详情
  const [DetailModalVisible, setDetailModalVisible] = useState(false);
  const [DetailModalLoadingShow, setDetailModalLoadingShow] = useState(false);

  const [ModuleGroup, setModuleGroup] = useState({ value: 0, title: "全部" });
  const [UserType, setUserType] = useState({ value: 0, title: "全部" });
  const [SysType, setSysType] = useState({ value: 0, title: "全部" });

  // 应用分组列表
  const [ModuleGroupList, setModuleGroupList] = useState([
    { value: 0, title: "全部" },
  ]);
  const [PageInit] = useState({
    pageSize: 10,
  });
  // 编辑的类型
  const [HandleType, setHandleType] = useState("");
  // 编辑时的数据
  const [EditData, setEditData] = useState(false);
  const HandleParams = useMemo(() => {
    if (!HandleType) {
      return {};
    }
    return {
      title: HandleType === "add" ? "添加模块" : "编辑模块",
    };
  }, [HandleType]);
  const [DetailData, setDetailData] = useState({});
  const [ListData, handleChange, LoadingShow, reloadList] = useGetList(
    GetAllModule,
    Query,
    PageInit
  );
  // 因为当新增时要前端自己添加数据，所以设置这个中间数据源
  const [Data, setData] = useState(ListData);
  useEffect(() => {
    setData(ListData);
  }, [ListData]);

  // 删除
  const Delete = useCallback(
    (moduleID) => {
      autoAlert({
        title: "确定删除该模块吗？",
        type: "btn-query",
        cancelShow: "y",
        onOk: () => {
          DeleteModule({ moduleID }).then((res) => {
            if (res.StatusCode === 200) {
              autoAlert({
                type: "success",
                autoHide: () => {},
                title: "操作成功",
              });
            }
            reloadList();
          });
        },
      });
    },
    [reloadList]
  );
  // 列表
  const Columns = useMemo(() => {
    return [
      {
        title: "",
        key: "OrderNo",
        width: 48,
        align: "center",
        render: (data) => {
          let { OrderNo } = data;
          return (
            <p
              className={`key-content ${OrderNo === "新增" ? "new-row" : ""}`}
              title={OrderNo}
            >
              {OrderNo}
            </p>
          );
        },
      },
      {
        title: "",
        key: "img",
        width: 66,
        align: "right",
        render: (data) => {
          let { LogoUrl, ModuleName } = data;
          return (
            <i
              className="LogoUrl"
              style={{
                background: `url(${LogoUrl}) no-repeat center center/56px 56px`,
              }}
              title={ModuleName}
            ></i>
          );
        },
      },
      {
        title: "模块名称",
        key: "ModuleName",
        width: 115,
        align: "left",
        render: (data) => {
          let { ModuleID, ModuleName } = data;
          return (
            <>
              <p className={"ModuleName"} title={ModuleName}>
                {ModuleName || "--"}
              </p>
              <p className={"ModuleID"} title={ModuleID}>
                ID:{ModuleID || "--"}
              </p>
            </>
          );
        },
      },
      {
        title: "所属应用系统",
        key: "SysName",
        width: 200,
        align: "center ",
        render: (data) => {
          let { SysType, SysName, IsThirdParty } = data;
          let Com =
            IsThirdParty === 0
              ? { name: "蓝鸽", className: "" }
              : { name: "第三方", className: "IsThirdParty" };
          let type = SysTypeData[SysType];
          return (
            <>
              <p className={"SysName"} title={SysName}>
                <span className={`com ${Com.className}`}>[{Com.name}]</span>{" "}
                {SysName || "--"}
              </p>
              <p className={"SysType"} title={type}>
                {type || "--"}
              </p>
            </>
          );
        },
      },

      {
        title: "所属分组",
        key: "GroupName",
        width: 110,
        align: "center",
        render: (data) => {
          let { GroupName } = data;

          return (
            <p className="GroupName" title={GroupName}>
              {GroupName || "--"}
            </p>
          );
        },
      },
      {
        title: "支持账号类型",
        key: "UserType",
        width: 100,
        align: "center",
        render: (data) => {
          let { UserType } = data;
          let name =
            UserType &&
            UserType.split(",")
              .map((c) => {
                return UserTypeData[c];
              })
              .join("、");
          return (
            <p className="UserType" title={name}>
              {name || "--"}
            </p>
          );
        },
      },
      {
        title: "可访问身份",
        key: "IdentityNames",
        width: 120,
        align: "center",
        render: (data) => {
          let { IdentityNames } = data;
          // let name = IdentityNames.split(",").map((c) => {
          //   return (
          //     c && (
          //       <p className="IdentityNames" title={c}>
          //         {c}
          //       </p>
          //     )
          //   );
          // });
          let name2 = IdentityNames && IdentityNames.split(",").join("、");
          return (
            <p className="IdentityNames" title={name2}>
              {name2 || "--"}
            </p>
          );
        },
      },
      {
        title: "访问方式",
        key: "AccessUrl",
        width: 185,
        align: "center",
        render: (data) => {
          let { AccessUrl, IsThirdParty } = data;

          return (
            <p className="AccessUrl" title={AccessUrl}>
              {AccessUrl
                ? !IsThirdParty
                  ? `[${AccessUrl}]`
                  : AccessUrl
                : "--"}
            </p>
          );
        },
      },
      {
        title: "简介",
        key: "Introduction",
        width: 50,
        align: "center",
        render: (data) => {
          let { Introduction } = data;

          return (
            <Tooltip
              overlayClassName={"Module-Introduction"}
              title={<div className="Introduction">{Introduction || "--"}</div>}
              trigger={"hover"}
              arrowPointAtCenter={true}
              placement={"bottomRight"}
            >
              <span className="Introduction-icon"></span>
            </Tooltip>
          );
        },
      },
      {
        title: "操作",
        key: "handle",
        width: 133,
        align: "center",
        render: (data) => {
          let { AccessUrl, IsThirdParty, ModuleID } = data;

          return (
            <div className="handle">
              {
                <span
                  className="edit"
                  onClick={() => {
                    // GetSubSystemToAdd()
                    let editData = {};
                    for (let i in data) {
                      let key =
                        i.substring(0, 1).toLowerCase() + i.substring(1);
                      // 账号类型和身份要数组
                      if (i === "UserType" || i === "IdentityCodes") {
                        editData[key] = data[i] ? data[i].split(","):[];
                      } else {
                        editData[key] = data[i];
                      }
                    }
                    setHandleType("edit");
                    setEditData(editData);
                    setAddModalVisible(true);
                  }}
                >
                  修改
                </span>
              }
              {!!IsThirdParty && (
                <span className="delete" onClick={Delete.bind(this, ModuleID)}>
                  删除
                </span>
              )}
            </div>
          );
        },
      },
    ];
  }, [SysTypeData, UserTypeData, Delete]);

  const ControlModuleRef = useRef({});
  const EditSystemRef = useRef({});
  // 关闭
  const onModalCancel = useCallback((func, callback) => {
    typeof func === "function" &&
      func(() => {
        typeof callback === "function" && callback();
        return false;
      });
    setHandleType("");
  }, []);
  // 保存
  const onAddModalOk = useCallback(
    (ModalVisible) => {
      let data = ControlModuleRef.current.onSubmit();
      console.log(data);
      if (!data || AddModalLoadingShow) {
        //有问题
        return;
      }
      setAddModalLoadingShow(true);
      let promise = "";
      if (HandleType === "add" || !HandleType) {
        promise = AddSubSystemInfo({ ...data });
      } else if (HandleType === "edit") {
        promise = EditModuleInfo({ ...data });
      } else {
        return;
      }

      promise.then((res) => {
        let { StatusCode, Data } = res;
        if (StatusCode === 200) {
          onModalCancel(setAddModalVisible);

          if (Data instanceof Array) {
            Data = Data.map((c) => {
              c.OrderNo = "新增";
              return c;
            });
            let TotalCount = ++ListData.TotalCount;
            let List = Data.concat(ListData.List);
            setData({ TotalCount, List });
          }
          // 当新增成功，前端自动给插入新数据
          if(HandleType === "edit"){
            reloadList({});
          }
        }
        // reloadList({});
        setAddModalLoadingShow(false);
      });
      // onModalCancel(setAddModalVisible,()=>{})
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reloadList, HandleType, ListData]
  );

  // 挂载后请求
  useEffect(() => {
    const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
    Dispatch({ type: "loginMsg", data: UserInfo });
    // dispatch(AccessAction.getImgUrlProxy());
    GetImgUrlProxy().then((res) => {
      if (res.StatusCode === 200) {
        Dispatch({ type: "imgUrlProxy", data: res.Data.ResHttp });
      }
    });

    // setTimeout(()=>{reloadList({})},5000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 挂载后请求数据
  useEffect(() => {
    // 获取分组
    GetModuleGroupList().then((res) => {
      if (res.StatusCode === 200) {
        let more = res.Data.map((c) => {
          return { value: c.GroupID, title: c.GroupName };
        });
        Dispatch({ type: "groupList", data: more });
        setModuleGroupList((pre) => {
          return pre.concat(more);
        });
      }
    });
    // 获取第三方系统
    GetThirdPartySubSystem().then((res) => {
      if (res.StatusCode === 200) {
        let more = res.Data.map((c) => {
          return { value: c.SysID, title: c.SysName, ...c };
        });
        Dispatch({ type: "thirdPartySubSystem", data: more });
      }
    });
    // 获取身份列表
    GetIdentityTypeList().then((res) => {
      if (res.StatusCode === 200) {
        let more = {};
        res.Data.map((c) => {
          let { UserType, IdentityCode, IdentityName } = c;
          typeof UserType === "string" &&
            UserType.split(",").forEach((u) => {
              more[u] = more[u] || [];
              more[u].push({
                value: IdentityCode,
                title: IdentityName,
                userTypes: UserType,
                userType: u,
              });
            });
        });
        Dispatch({ type: "identityTypeList", data: more });
      }
    });
  }, []);
  useLayoutEffect(() => {
    let dom = [$(".IdentityNames"), $(".AccessUrl"), $(".UserType")];
    dom.forEach((jq) => {
      jq.each((i, d) => {
        clamp(d, { clamp: 2 });
      });
    });
  }, [Data]);
  return (
    <Context.Provider value={{ state, Dispatch }}>
      <div className="Module-content SubModule">
        <p className="Module-content-top">
          应用模块设置
          <span
            className="btn-add-sub"
            onClick={() => {
              // GetSubSystemToAdd()
              setHandleType("add");
              setAddModalVisible(true);
            }}
          >
            添加第三方模块
          </span>
        </p>
        <div className="Module-content-center">
          <div className="params-box">
            <DropDown
              width={120}
              title={"应用分组:"}
              dropSelectd={ModuleGroup}
              dropList={ModuleGroupList}
              height={120}
              style={{ zIndex: 400 }}
              onChange={(value) => {
                setModuleGroup(value);
                setQuery((data) => {
                  return { ...data, groupID: value.value };
                });
              }}
            ></DropDown>
            <DropDown
              width={120}
              title={"支持账号类型:"}
              dropSelectd={UserType}
              dropList={UserTypeList}
              height={120}
              style={{ zIndex: 400 }}
              onChange={(value) => {
                setUserType(value);
                setQuery((data) => {
                  return { ...data, userType: value.value };
                });
              }}
            ></DropDown>

            <Search
              placeHolder="输入关键词快速搜索..."
              onClickSearch={(e) => {
                if (e.value === "") {
                  dispatch(
                    AppAlertAction.alertTips({
                      title: "搜索内容不能为空",
                      cancelTitle: "确定",
                    })
                  );
                  return;
                }
                setQuery((data) => {
                  return { ...data, key: e.value };
                });
              }}
              onCancelSearch={() => {
                setQuery((data) => {
                  return { ...data, key: "" };
                });
              }}
            ></Search>
          </div>
          <Loading spinning={LoadingShow} opacity={false} tip="请稍候...">
            <div className="Module-content-center-box">
              {Data ? (
                <>
                  <div
                    className="subsystem-detail"
                    // style={{ display: `${exeit === "0" ? "block" : "none"}` }}
                  >
                    共计<span className="title-2">{Data.TotalCount}</span>
                    个应用入口模块
                  </div>
                  {Data.List instanceof Array && Data.List.length > 0 && (
                    <Table
                      className="table"
                      columns={Columns}
                      pagination={false}
                      dataSource={Data.List}
                    ></Table>
                  )}
                  <PagiNation
                    showQuickJumper
                    showSizeChanger
                    onShowSizeChange={(current, pageSize) => {
                      handleChange({ pageSize });
                    }}
                    pageSize={Data.PageSize}
                    current={Data.PageIndex}
                    hideOnSinglePage={Data.TotalCount === 0 ? true : false}
                    total={Data.TotalCount}
                    pageSizeOptions={["10", "20", "30", "50"]}
                    onChange={(value) => {
                      handleChange({ pageIndex: value });
                    }}
                  ></PagiNation>
                </>
              ) : (
                ""
              )}
              {!(
                Data &&
                Data.List instanceof Array &&
                Data.List.length > 0
              ) && (
                <Empty
                  title={
                    ModuleGroup.value || UserType.value || Query.key
                      ? "暂无符合条件的子系统应用"
                      : "暂无子系统应用"
                  }
                  type="4"
                  style={{ marginTop: "100px" }}
                ></Empty>
              )}
            </div>
          </Loading>
        </div>
      </div>
      <LgModal
        type="1"
        className={"system-modal"}
        title={HandleParams.title}
        onOk={onAddModalOk}
        onCancel={onModalCancel.bind(this, setAddModalVisible)}
        width={"964px"}
        height={466}
        visible={AddModalVisible}
        okText="保存"
      >
        <Loading spinning={AddModalLoadingShow} opacity={0.5} tip="请稍候...">
          <AddModule
            ref={ControlModuleRef}
            visible={AddModalVisible}
            type={HandleType}
            defaultData={EditData}
          ></AddModule>
        </Loading>
      </LgModal>
    </Context.Provider>
  );
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(memo(forwardRef(SubSystem)));
