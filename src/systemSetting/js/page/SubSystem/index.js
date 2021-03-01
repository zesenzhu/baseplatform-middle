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
} from "react";
import { connect } from "react-redux";
import {
  LgModal,
  Loading,
  DropDown,
  Search,
  Empty,
  PagiNation,
} from "../../../../common";
import { autoAlert } from "../../../../common/js/public.js";

import "./scss/index.scss";
import useGetList from "../hooks/useGetList";
import {
  GetAllSubSystem,
  ToggleAccessState,
  GetImgUrlProxy,
  AddSubSystemToSchool,
  AddSubSystemInfo,
  DeleteSubSystemFromSchool,
  GetSubSystemDetail,
  EditSubSystemInfo,
} from "./api";
import { Context, reducer, initState } from "./context";
import Card from "./component/card";

import AddSubSystem, {
  NewSystem,
  Detail as SystemDetail,
} from "./Modal/addSubSystem";
/**
 * @description: 子系统模块
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
    sysState: 0,
    userType: "",
    sysType: 0,
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

  const [SysState, setSysState] = useState({ value: 0, title: "全部" });
  const [UserType, setUserType] = useState({ value: 0, title: "全部" });
  const [SysType, setSysType] = useState({ value: 0, title: "全部" });
  const [PageInit] = useState({
    pageSize: 12,
  });
  // 编辑时的数据
  const [EditData, setEditData] = useState(false);
  const [DetailData, setDetailData] = useState({});
  const [Data, handleChange, LoadingShow, reloadList] = useGetList(
    GetAllSubSystem,
    Query,
    PageInit
  );
  const AddSystemRef = useRef({});
  const EditSystemRef = useRef({});
  // 关闭
  const onModalCancel = useCallback((func, callback) => {
    typeof func === "function" &&
      func(() => {
        typeof callback === "function" && callback();
        return false;
      });
  }, []);
  // 保存
  const onAddModalOk = useCallback(
    (ModalVisible) => {
      let { type, data } = AddSystemRef.current.onSubmit();
      if (!data || AddModalLoadingShow) {
        //有问题
        return;
      }
      setAddModalLoadingShow(true);
      let promise = "";
      if (type === "new") {
        promise = AddSubSystemInfo({ ...data });
      } else {
        promise = AddSubSystemToSchool({ sysIDs: data.join(",") });
      }

      promise.then((res) => {
        if (res.StatusCode === 200) {
          onModalCancel(setAddModalVisible);
        }
        reloadList({});

        setAddModalLoadingShow(false);
      });
      // onModalCancel(setAddModalVisible,()=>{})
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reloadList]
  );
  // 保存
  const onEditModalOk = useCallback(
    () => {
      let data = EditSystemRef.current.onSubmit();
      if (!data || EditModalLoadingShow) {
        //有问题
        return;
      }
      setEditModalLoadingShow(true);
      let Data = {};
      for (let i in data) {
        let upKey = i.substring(0, 1).toUpperCase() + i.substring(1);
        Data[upKey] = data[i];
      }

      EditSubSystemInfo({ ...Data }).then((res) => {
        if (res.StatusCode === 200) {
          onModalCancel(setEditModalVisible);
        }
        reloadList({});

        setEditModalLoadingShow(false);
      });
      // onModalCancel(setAddModalVisible,()=>{})
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reloadList]
  );
  const onToggleStatus = useCallback(async (params) => {
    let res = await ToggleAccessState(params);
    return res.StatusCode === 200;
  }, []);
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
  // 删除
  const Delete = useCallback(
    (sysID) => {
      autoAlert({
        title: "确定删除该应用吗？",
        type: "btn-query",
        cancelShow: "y",
        onOk: () => {
          DeleteSubSystemFromSchool({ sysID }).then((res) => {
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
  // 编辑
  const Edit = useCallback((sysID) => {
    setEditModalLoadingShow(true);
    setEditModalVisible(true);

    GetSubSystemDetail({ sysID }).then((res) => {
      if (res.StatusCode === 200) {
        let data = {};
        for (let i in res.Data) {
          let lowKey = i.substring(0, 1).toLowerCase() + i.substring(1);
          data[lowKey] = res.Data[i];
        }
        setEditData(data);
      }
      setEditModalLoadingShow(false);
    });
  }, []);
  // 详情
  const Detail = useCallback((sysID) => {
    setDetailModalLoadingShow(true);
    setDetailModalVisible(true);

    GetSubSystemDetail({ sysID }).then((res) => {
      if (res.StatusCode === 200) {
        let data = {};
        for (let i in res.Data) {
          let lowKey = i.substring(0, 1).toLowerCase() + i.substring(1);
          data[lowKey] = res.Data[i];
        }
        setDetailData(data);
      }
      setDetailModalLoadingShow(false);
    });
  }, []);
  return (
    <Context.Provider value={{ state, Dispatch }}>
      <div className="System-content SubSystem">
        <p className="System-content-top">
          子系统访问设置
          <span
            className="btn-add-sub"
            onClick={() => {
              // GetSubSystemToAdd()
              setAddModalVisible(true);
            }}
          >
            添加应用
          </span>
        </p>
        <div className="System-content-center">
          <div className="params-box">
            <DropDown
              width={120}
              title={"访问状态:"}
              dropSelectd={SysState}
              dropList={SysStateList}
              height={144}
              style={{ zIndex: 400 }}
              onChange={(value) => {
                setSysState(value);
                setQuery((data) => {
                  return { ...data, sysState: value.value };
                });
              }}
            ></DropDown>
            <DropDown
              width={120}
              title={"用户对象:"}
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
            <DropDown
              width={120}
              title={"应用分类:"}
              dropSelectd={SysType}
              dropList={SysTypeList}
              height={144}
              style={{ zIndex: 400 }}
              onChange={(value) => {
                setSysType(value);
                setQuery((data) => {
                  return { ...data, sysType: value.value };
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
            <div className="System-content-center-box">
              {Data ? (
                <>
                  <div
                    className="subsystem-detail"
                    // style={{ display: `${exeit === "0" ? "block" : "none"}` }}
                  >
                    共计<span>{Data.TotalCount}</span>个系统 ，其中
                    <span className="title-2">{Data.ThirdPartyAppCount}</span>
                    个为第三方应用
                  </div>
                  {Data.List instanceof Array &&
                    Data.List.length > 0 &&
                    Data.List.map((child, index) => {
                      child.SysStateName = SysStateData[child.SysState];
                      child.SysTypeName = SysTypeData[child.SysType];
                      let UserTypesList = [];
                      typeof child.UserTypes === "string" &&
                        child.UserTypes.split(",").forEach((c) => {
                          UserTypesList.push(UserTypeData[c]);
                        });
                      child.UserTypesName = UserTypesList.join(",");
                      child.onClickDelete = Delete;
                      child.onClickEdit = Edit;
                      child.onClickDetails = Detail;
                      return (
                        <Card
                          onToggleStatus={onToggleStatus}
                          data={child}
                          key={index}
                        ></Card>
                      );
                    })}
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
                    pageSizeOptions={["12", "24", "36", "48"]}
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
                    SysState.value ||
                    UserType.value ||
                    SysType.value ||
                    Query.key
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
        title="添加应用"
        onOk={onAddModalOk}
        onCancel={onModalCancel.bind(this, setAddModalVisible)}
        width={"1160px"}
        height={560}
        getContainer={false}

        visible={AddModalVisible}
        okText="保存"
      >
        <Loading spinning={AddModalLoadingShow} opacity={0.5} tip="请稍候...">
          <AddSubSystem
            onDetail={Detail}
            ref={AddSystemRef}
            visible={AddModalVisible}
          ></AddSubSystem>
        </Loading>
      </LgModal>
      <LgModal
        type="1"
        className={"system-modal"}
        title="编辑应用"
        onOk={onEditModalOk}
        getContainer={false}

        onCancel={onModalCancel.bind(this, setEditModalVisible)}
        width={"1160px"}
        height={500}
        visible={EditModalVisible}
        okText="保存"
      >
        <Loading spinning={EditModalLoadingShow} opacity={0.5} tip="请稍候...">
          <NewSystem
            ref={EditSystemRef}
            type={"edit"}
            defaultData={EditData}
          ></NewSystem>
        </Loading>
      </LgModal>
      <LgModal
        type="1"
        title="查看应用详情"
        onCancel={onModalCancel.bind(this, setDetailModalVisible)}
        width={"1040px"}
        height={380}
        footer={null}
        getContainer={false}
        style={{zIndex:2003}}
        // maskStyle={{zIndex:'2001!important'}}
        visible={DetailModalVisible}
      >
        <Loading
          spinning={DetailModalLoadingShow}
          opacity={0.5}
          tip="请稍候..."
        >
          <SystemDetail data={DetailData}></SystemDetail>
        </Loading>
      </LgModal>
    </Context.Provider>
  );
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(memo(forwardRef(SubSystem)));
