import React from "react";
import { connect } from "react-redux";
import TeacherCustomActions from "../../../actions/Student/TeacherCustomActions";
import AppAlertActions from "../../../actions/AppAlertActions";
import CombineCard from "./CombineCard";

import { postData, getData } from "../../../../../common/js/fetch";
import CONFIG from "../../../../../common/js/config";
import "../../../../scss/TeacherCustomContent.scss";
import { Scrollbars } from "react-custom-scrollbars";
import Card from "./Card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Loading, DropDown, Search } from "../../../../../common";
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  //source为原始出发数据，destination为原始目的地数据，droppableSource为插件出发对象，droppableDestination为插件目的地对象
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1); //source去掉失去的

  destClone.splice(droppableDestination.index, 0, removed); //destunation增加等到的

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  width: "126px",
  height: "156px",
  // padding: grid * 2,
  margin: `0 12px `,
  border: isDragging ? `solid 1px #02e362` : `solid 1px #fff`,
  // change background colour if dragging
  //background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  //background: isDraggingOver ? 'lightblue' : 'lightgrey',
  //display: 'flex',
  //padding: grid,
  //overflow: 'hidden',
});

class DataBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      main: this.props.Student.TeacherCustomData.DataBaseData,
      alter1: this.props.Student.TeacherCustomData.DataBaseAlterData,
      userMsg: props.LoginUser,
      firstSelect: { value: 0, title: "全部学段" },
      keyword: "",
      CancelBtnShow: "n",
      searchValue: ""
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { Student } = nextProps;
    this.setState({
      main: Student.TeacherCustomData.DataBaseData,
      //main: Student.TeacherCustomData.DataBaseAlterData,
      alter1: Student.TeacherCustomData.DataBaseAlterData
    });
  }
  // 从id选择列表
  id2List = {
    main: "main",
    alter1: "alter1"
  };
  getList = id => this.state[this.id2List[id]];
  onDragEnd = result => {
    const { source, destination, combine } = result;
    const { Student, dispatch } = this.props;
    let MainData = Student.TeacherCustomData.DataBaseData;
    let AlterData = Student.TeacherCustomData.DataBaseAlterData;
    let dataObj = {};
    console.log(result);
    //        result:{ combine: null
    // destination: {droppableId: "droppable2", index: 4}
    // draggableId: "item-4"
    // mode: "FLUID"
    // reason: "DROP"
    // source: {index: 6, droppableId: "droppable"}
    // type: "DEFAULT"}
    // dropped outside the list
    // if (!destination) {
    //   return;
    // }
    let Source = {};
    let SourceRow = "";
    let SourceIndex = "";
    let Data = {};
    if (!destination && combine) {
      console.log(combine);
      const { draggableId, droppableId } = combine;
      let DestinationRow = droppableId.split("-")[1];
      let DestinationIndex = draggableId.split("-").reverse()[0];
      if (source.droppableId.indexOf("alter") !== -1) {
        SourceRow = source.droppableId.split("-")[1];
        SourceIndex = source.index;
        Source = AlterData[SourceRow].List[SourceIndex];
        Data = { DataBaseData: MainData, DataBaseAlterData: AlterData };
      } else {
        SourceRow = source.droppableId.split("-")[1];
        SourceIndex = source.index;
        Source = MainData[SourceRow].List[SourceIndex];
        Data = { DataBaseData: MainData };
      }

      let Destination = MainData[DestinationRow].List[DestinationIndex];

      if (Source.IsGroup) {
        // dispatch(
        //   AppAlertActions.alertSuccess({ title: "不能合并小组到小组" })
        // );
        return;
      }
      // if (Destination.IsGroup && Destination.List.length >= 4) {
      //   dispatch(AppAlertActions.alertSuccess({ title: "该小组网站已满" }));
      //   return;
      // }
      dispatch(
        TeacherCustomActions.setCombineCustomData({
          Data,
          Source,
          SourceRow,
          SourceIndex,
          Destination,
          DestinationRow,
          DestinationIndex
        })
      );
      dispatch(
        TeacherCustomActions.fetchCustomData(
          "/SubjectResMgr/ResLibMgr/Teacher/EditDeskTopInfo",
          "database"
        )
      );
      // console.log(DestinationRow,DestinationIndex,SourceRow,SourceIndex,Destination,Source)
    } else if (destination) {
      if (
        source.droppableId === destination.droppableId &&
        source.droppableId.split("-")[0] === "main"
      ) {
        //同一个区域
        dataObj["DataBaseData"] = MainData;
        dispatch(
          TeacherCustomActions.setCustomData(
            "main",
            dataObj,
            source,
            destination
          )
        );
        dispatch(
          TeacherCustomActions.fetchCustomData(
            "/SubjectResMgr/ResLibMgr/Teacher/EditDeskTopInfo",
            "database"
          )
        );
      } else if (
        source.droppableId !== destination.droppableId &&
        source.droppableId.split("-")[0] === "alter" &&
        source.droppableId.split("-")[0] !== "combine" &&
        destination.droppableId.split("-")[0] === "main"
      ) {
        dataObj["DataBaseData"] = MainData;
        dataObj["DataBaseAlterData"] = AlterData;
        if (MainData.length === 2 && MainData[1].List.length === 7) {
          dispatch(
            AppAlertActions.alertAutoWarn({ title: "桌面最多添加14个资源库或自定义分组" })
          );
          return;
        }
        dispatch(
          TeacherCustomActions.setCustomData(
            "alter",
            dataObj,
            source,
            destination
          )
        );
        dispatch(
          TeacherCustomActions.fetchCustomData(
            "/SubjectResMgr/ResLibMgr/Teacher/EditDeskTopInfo",
            "database"
          )
        );
      } else if (
        source.droppableId !== destination.droppableId &&
        source.droppableId.split("-")[0] === "main" &&
        destination.droppableId.split("-")[0] === "main"
      ) {
        dataObj["DataBaseData"] = MainData;
        // dataObj["WebsiteAlterData"] = AlterData;
        dispatch(
          TeacherCustomActions.setCustomData(
            "alter",
            dataObj,
            source,
            destination
          )
        );
        dispatch(
          TeacherCustomActions.fetchCustomData(
            "/SubjectResMgr/ResLibMgr/Teacher/EditDeskTopInfo",
            "database"
          )
        );
      } else if (
        source.droppableId !== destination.droppableId &&
        source.droppableId.split("-")[0] === "main" &&
        destination.droppableId.split("-")[0] === "alter"
      ) {
        dataObj["DataBaseData"] = MainData;
        dataObj["DataBaseAlterData"] = AlterData;

        console.log(dataObj);
        dispatch(
          TeacherCustomActions.setCustomData(
            "alter",
            dataObj,
            source,
            destination
          )
        );
        dispatch(
          TeacherCustomActions.fetchCustomData(
            "/SubjectResMgr/ResLibMgr/Teacher/EditDeskTopInfo",
            "database"
          )
        );
      } else if (
        source.droppableId === destination.droppableId &&
        source.droppableId.split("-")[0] === "combine" &&
        destination.droppableId.split("-")[0] === "combine"
      ) {
        let CombineModalData = Student.TeacherCustomData.CombineModalData;
        let DestinationRow = destination.droppableId.split("-")[1];
        let DestinationIndex = destination.index;

        SourceRow = source.droppableId.split("-")[1];
        SourceIndex = source.index;
        Source = CombineModalData.List[SourceRow].List[SourceIndex];
        Data = { DataBaseData: MainData };
        console.log(
          SourceRow,
          SourceIndex,
          CombineModalData,
          DestinationRow,
          destination
        );

        let Destination =
          CombineModalData.List[DestinationRow].List[DestinationIndex];
        // dispatch(
        //   TeacherCustomActions.setMyCombineCustomData({
        //     Data,
        //     Source,
        //     SourceRow,
        //     SourceIndex,
        //     Destination,
        //     DestinationRow,
        //     DestinationIndex
        //   })
        // );
      }
    }
    // if (source.droppableId === destination.droppableId) {//同一个区域
    //     const main = reorder(
    //         this.getList(source.droppableId),
    //         source.index,
    //         destination.index
    //     );

    //     let state = { main };

    //     if (source.droppableId === 'alter1') {
    //         state = { alter1: main };
    //     }

    //     this.setState(state);
    // } else {//非同一个区域
    //     const result = move(
    //         this.getList(source.droppableId),
    //         this.getList(destination.droppableId),
    //         source,
    //         destination
    //     );

    //     this.setState({
    //         main: result.main,
    //         alter1: result.alter1
    //     });
    // }
  };
  // main内card移除
  onEditClick = source => {
    const { Student, dispatch } = this.props;
    let MainData = Student.TeacherCustomData.DataBaseData;
    let AlterData = Student.TeacherCustomData.DataBaseAlterData;
    let dataObj = {};
    dataObj["DataBaseData"] = MainData;
    dataObj["DataBaseAlterData"] = AlterData;
    let destination = { droppableId: "alter", index: 0 };
    dispatch(
      TeacherCustomActions.setCustomData("alter", dataObj, source, destination)
    );
    dispatch(
      TeacherCustomActions.fetchCustomData(
        "/SubjectResMgr/ResLibMgr/Teacher/EditDeskTopInfo",
        "database"
      )
    );
  };
  // main内card移除
  onEditCombineClick = (e, source) => {
    console.log(e);
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const { Student, dispatch } = this.props;
    let MainData = Student.TeacherCustomData.DataBaseData;
    let AlterData = Student.TeacherCustomData.DataBaseAlterData;
    let dataObj = {};
    dataObj["DataBaseData"] = MainData;
    dataObj["DataBaseAlterData"] = AlterData;
    let destination = { droppableId: "alter", index: 0 };
    console.log(dataObj, source);
    dispatch(
      TeacherCustomActions.setCustomData("alter", dataObj, source, destination)
    );
    dispatch(
      TeacherCustomActions.fetchCustomData(
        "/SubjectResMgr/ResLibMgr/Teacher/EditDeskTopInfo",
        "database"
      )
    );
  };
  // alter 内card增加
  onAddClick = source => {
    const { Student, dispatch } = this.props;
    let MainData = Student.TeacherCustomData.DataBaseData;
    let AlterData = Student.TeacherCustomData.DataBaseAlterData;
    let dataObj = {};
    if (MainData.length === 2 && MainData[1].List.length === 7) {
      dispatch(AppAlertActions.alertAutoWarn({ title: "桌面最多添加14个资源库或自定义分组" }));
      return;
    }
    dataObj["DataBaseData"] = MainData;
    dataObj["DataBaseAlterData"] = AlterData;
    let Row = MainData[MainData.length - 1].Row;

    let destination = { droppableId: "main-" + Row, index: -1 };

    dispatch(
      TeacherCustomActions.setCustomData("alter", dataObj, source, destination)
    );
    dispatch(
      TeacherCustomActions.fetchCustomData(
        "/SubjectResMgr/ResLibMgr/Teacher/EditDeskTopInfo",
        "database"
      )
    );
  };
  // card删除
  onDeleteClick = (dataObj, source, ID) => {
    const { Student, dispatch } = this.props;
    let MainData = Student.TeacherCustomData.DataBaseData;
    let AlterData = Student.TeacherCustomData.DataBaseAlterData;
    // let dataObj = {}
    // dataObj['DataBaseData'] = MainData;
    // dataObj['DataBaseAlterData'] = AlterData
    let destination = { droppableId: "delete", index: -1 };
    dispatch(TeacherCustomActions.setOneCustomData(dataObj, source));
    dispatch(
      TeacherCustomActions.fetchDeleteCustomData(
        "/SubjectResMgr/ResLibMgr/Teacher/EditDeskTopInfo",
        ID,
        "database"
      )
    );
  };
  // card编辑
  onResetClick = source => {
    const { Student, dispatch } = this.props;
    let MainData = Student.TeacherCustomData.DataBaseData;
    let AlterData = Student.TeacherCustomData.DataBaseAlterData;
    let dataObj = {};
    dataObj["DataBaseData"] = MainData;
    dataObj["DataBaseAlterData"] = AlterData;
    let destination = { droppableId: "main", index: -1 };
    dispatch(
      TeacherCustomActions.setCustomData("alter", dataObj, source, destination)
    );
    dispatch(
      TeacherCustomActions.fetchCustomData(
        "/SubjectResMgr/ResLibMgr/Teacher/EditDeskTopInfo",
        "tool"
      )
    );
  };
  // 学段下拉
  onDropMenuChange = value => {
    const { dispatch, LoginUser } = this.props;
    let url = this.setState({
      firstSelect: value
    });
    dispatch(
      TeacherCustomActions.getCustomData(
        "tool",
        this.state.userMsg.UserID,
        "",
        '',
        value.value
      )
    );

    //dispatch(TeacherCustomActions.getAlterData('/SubjectResMgr/WebSiteMgr/Teacher/ListAvailableDataBases?TeacherID=' + LoginUser.UserID + '&keyWord=' + keyword + '&SubjectId=' + subjectID + '&PeriodId=' + periodId;))
  };
  StudentSearch = e => {
    const { dispatch, Student } = this.props;
    // this.setState({
    //     keyword: '&keyword='+e.value,
    //     CancelBtnShow: 'y',
    //     pagination: 1,
    // })
    if (e.value === "") {
      dispatch(AppAlertActions.alertSuccess({ title: "搜索数据为能为空" }));

      return;
    }
    // //  console.log(e)
    // dispatch(actions.UpDataState.getGradeStudentPreview('/GetStudentToPage?SchoolID=' + this.state.userMsg.SchoolID + (this.state.firstSelect.value !== 0 ? '&gradeID=' + this.state.firstSelect.value : '') + (this.state.secondSelect.value !== 0 ? '&classID=' + this.state.secondSelect.value : '') + '&keyword=' + e.value + '&PageIndex=0&PageSize=10' + this.state.sortFiled + this.state.sortType, this.state.firstSelect, this.state.secondSelect));
    this.setState({
      CancelBtnShow: "y"
    });
    dispatch(
      TeacherCustomActions.getCustomData(
        "tool",
        this.state.userMsg.UserID,
        e.value,
        '',
        this.state.firstSelect.value
      )
    );
  };
  //搜索change
  onChangeSearch = e => {
    this.setState({
      searchValue: e.target.value
    });
  };
  // 取消搜索
  onCancelSearch = e => {
    const { dispatch } = this.props;

    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: ""
    });
    dispatch(
      TeacherCustomActions.getCustomData(
        "tool",
        this.state.userMsg.UserID,
        "",
        '',
        this.state.firstSelect.value
      )
    );

    // dispatch(actions.UpDataState.getGradeStudentPreview('/GetStudentToPage?SchoolID=' + this.state.userMsg.SchoolID + (this.state.firstSelect.value !== 0 ? '&gradeID=' + this.state.firstSelect.value : '') + (this.state.secondSelect.value !== 0 ? '&classID=' + this.state.secondSelect.value : '') + '&PageIndex=' + (this.state.pagination - 1) + '&PageSize=10' + this.state.sortType + this.state.sortFiled, this.state.firstSelect, this.state.secondSelect));
  };

  // 获取备选网站总数
  getNumber = data => {
    let num = 0;
    data instanceof Array &&
      data.map((child, index) => {
        num += child.List.length;
      });
    return num;
  };

  // 关闭提示
  onCancelTipsClick = () => {
    const { dispatch, LoginUser } = this.props;
    dispatch(
      TeacherCustomActions.setAlterTips(
        {
          TeacherId: LoginUser.UserID,
          SectionID: 3
        },
        "database"
      )
    );
  };
  // 仅仅关闭提示
  onOnlyCancelTipsClick = () => {
    const { dispatch, LoginUser } = this.props;
    dispatch({
      type: TeacherCustomActions.STU_GET_DATABASE_ALTER_TIPS,
      data: false
    });
  };
  // 小组点击
  onCardClick = data => {
    const { dispatch, Student } = this.props;
    let Row = data.Row;
    let key = data.key;
    console.log(Row, key);
    dispatch(TeacherCustomActions.setCombineCustomModalData(data, Row, key));
    dispatch({
      type: TeacherCustomActions.STU_EDIT_COMBINE_CUSTOM_MODAL_OPEN
    });
  };
  render() {
    const { Student, AppLoading } = this.props;
    let MainData = Student.TeacherCustomData.DataBaseData;
    let AlterData = Student.TeacherCustomData.DataBaseAlterData;
    let alterIsNULL = true;

    // console.log(this.state.main)
    return (
      <Loading opacity={false} spinning={AppLoading.customOpacityLoading}>
        <Loading spinning={AppLoading.customLoading}>
          <div id="DataBase">
            <div
              style={{
                display: Student.TeacherCustomData.TipsShow.DataBaseTipsShow
                  ? "block"
                  : "none"
              }}
              className="my-Tips"
            >
              <div className="tips-left">
                <i className="tips-icon"></i>
                <span className="tips-text">
                  操作提示: 拖放图标可调整资源库的摆放顺序或进行分组。
                </span>
              </div>
              <div className="tips-handle">
                <span
                  className="handle-text"
                  onClick={this.onCancelTipsClick.bind(this)}
                >
                  不再提示
                </span>
                <span
                  className="handle-cancel"
                  onClick={this.onOnlyCancelTipsClick.bind(this)}
                ></span>
              </div>
            </div>
            <Scrollbars
              style={{
                width: 1150 + "px",
                height: 682 + "px"
              }}
            >
              {/* <div className='add-box'>
                            <span className='btn-add'><i className='add-icon'></i><span className='add-text'>添加</span> </span>
                        </div> */}
              <DragDropContext onDragEnd={this.onDragEnd}>
                <div
                  style={{
                    marginTop: Student.TeacherCustomData.TipsShow
                      .DataBaseTipsShow
                      ? "46px"
                      : "16px"
                  }}
                  className="main-box"
                >
                  <p className="main-header">已添加至桌面的资源库:</p>

                  {MainData instanceof Array &&
                    MainData.length !== 0 &&  
                    MainData.map((Child, Index) => (
                      <Droppable
                        droppableId={"main-" + Child.Row}
                        isCombineEnabled
                        key={Index}
                        direction="horizontal"
                      >
                        {(provided, snapshot) => {
                          //provided生成的数据，snapshot监听拖拽时的数据变化，snapshot:{draggingFromThisWith: null,draggingOverWith: null,isDraggingOver: false},draggingFromThisWith为拖拽对象的id，draggingOverWith为拖拽对象在该区域的id，isDraggingOver为是否有拖拽事件
                          // console.log(provided, snapshot)
                          return (
                            <div
                              ref={provided.innerRef}
                              className="main-drop"
                              style={getListStyle(snapshot.isDraggingOver)}
                              {...provided.droppableProps}
                            >
                              {Child.List instanceof Array &&
                                Child.List.length !== 0 ?
                                Child.List.map((item, index) => (
                                  <div
                                    className="Card-protect"
                                    key={"main-" + item.ID + index}
                                  >
                                    <Draggable
                                      draggableId={
                                        "main-" +
                                        Child.Row +
                                        "-" +
                                        item.ID +
                                        "-" +
                                        index
                                      }
                                      index={index}
                                    >
                                      {(provided, snapshot) =>
                                        item.IsGroup ? (
                                          <CombineCard
                                            type="main"
                                            custom="database"
                                            data={item}
                                            ID={
                                              "main-" +
                                              Child.Row +
                                              "-" +
                                              item.ID +
                                              "-" +
                                              index
                                            }
                                            provided={provided}
                                            snapshot={snapshot}
                                            onCardClick={this.onCardClick}
                                            onEditClick={e => {
                                              this.onEditCombineClick(e, {
                                                droppableId:
                                                  "main-" +
                                                  Child.Row +
                                                  "-" +
                                                  item.ID +
                                                  "-" +
                                                  index,
                                                index: index
                                              });
                                            }}
                                            style={getItemStyle(
                                              snapshot.isDragging,
                                              provided.draggableProps.style,
                                              item,
                                            )}
                                          ></CombineCard>
                                        ) : (
                                          <Card
                                            type="main"
                                            custom="database"
                                            data={item}
                                            ID={
                                              "main-" +
                                              Child.Row +
                                              "-" +
                                              item.ID +
                                              "-" +
                                              index
                                            }
                                            provided={provided}
                                            snapshot={snapshot}
                                            onDeleteClick={this.onDeleteClick.bind(
                                              this,
                                              { DataBaseData: MainData },
                                              {
                                                droppableId:
                                                  "main-" +
                                                  Child.Row +
                                                  "-" +
                                                  item.ID +
                                                  "-" +
                                                  index,
                                                index: index
                                              },
                                              item.ID
                                            )}
                                            onResetClick={this.onResetClick.bind(
                                              this,
                                              {
                                                droppableId: "main-" + item.ID,
                                                index: index
                                              }
                                            )}
                                            onEditClick={this.onEditClick.bind(
                                              this,
                                              {
                                                droppableId:
                                                  "main-" +
                                                  Child.Row +
                                                  "-" +
                                                  item.ID +
                                                  "-" +
                                                  index,
                                                index: index
                                              }
                                            )}
                                            style={getItemStyle(
                                              snapshot.isDragging,
                                              provided.draggableProps.style,
                                              item,
                                            )}
                                          ></Card>
                                        )
                                      }
                                    </Draggable>
                                  </div>
                                )):Index===0?(
                                  <div className='no-drop'>暂无资源库，请选择下方备选资源库</div>
                                ):''}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                    ))}
                </div>
                {/* <div className='changeBox'>
                            <span className='box-tips'>备选网站<span className='tips-1'>（共<span className='tips-2'>{this.getNumber(AlterData)}</span>）</span></span>
                            <DropDown
                                ref='dropMenu'
                                style={{ zIndex: 2 }}
                                onChange={this.onDropMenuChange}
                                width={110}
                                height={240}
                                dropSelectd={this.state.firstSelect}
                                dropList={[{ value: 1, title: '小学' },
                                { value: 2, title: '初中' },
                                { value: 4, title: '高中' },
                                ]}
                            ></DropDown>
                            <Search placeHolder='输入关键词搜索...'
                                onClickSearch={this.StudentSearch.bind(this)}
                                className='SearchAlter'
                                height={30}
                                width={200}
                                Value={this.state.searchValue}
                                onCancelSearch={this.onCancelSearch}
                                onChange={this.onChangeSearch.bind(this)}
                                CancelBtnShow={this.state.CancelBtnShow}
                            ></Search>
                        </div> */}
                <div className="changeBox">
                  <span className="box-tips">
                    备选资源库
                    <span className="tips-1">
                      （共
                      <span className="tips-2">
                        {this.getNumber(AlterData)}
                      </span>
                      个）
                    </span>
                  </span>
                </div>
                {AlterData instanceof Array &&
                  AlterData.map((child, index) => {
                    // console.log(child)
                    if (child.List.length > 0) {
                      alterIsNULL = false;
                    }
                    return (
                      (child.List.length > 0 ||
                        (alterIsNULL && index === AlterData.length - 1)) && (
                        <Droppable
                          key={"alter-" + index}
                          droppableId={"alter-" + index}
                          direction="horizontal"
                        >
                          {(provided, snapshot) => {
                            return (
                              <div className="alter-box alter-box-2">
                                {/* <p className='alter-header'><i className='header-icon-1'></i><span className='header-text'>{child.SubTypeName}</span><i className='header-icon-2'></i></p> */}
                                <div
                                  className="alter-drop"
                                  ref={provided.innerRef}
                                  style={getListStyle(snapshot.isDraggingOver)}
                                  {...provided.droppableProps}
                                >
                                  {child.List.map((item, index1) => (
                                    <Draggable
                                      key={"alter-" + index + "-" + item.ID}
                                      draggableId={
                                        "alter-" + index + "-" + item.ID
                                      }
                                      index={index1}
                                    >
                                      {(provided, snapshot) => (
                                        <Card
                                          type="alter"
                                          custom="DataBase"
                                          data={item}
                                          onAddClick={this.onAddClick.bind(
                                            this,
                                            {
                                              droppableId: "alter-" + index,
                                              index: index1
                                            }
                                          )}
                                          onDeleteClick={this.onDeleteClick.bind(
                                            this,
                                            { DataBaseAlterData: AlterData },
                                            {
                                              droppableId: "alter-" + index,
                                              index: index1
                                            },
                                            item.ID
                                          )}
                                          onResetClick={this.onResetClick.bind(
                                            this,
                                            {
                                              droppableId: "alter-" + index,
                                              index: index1
                                            }
                                          )}
                                          provided={provided}
                                          snapshot={snapshot}
                                          style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                            // ,
                                            // item
                                          )}
                                        ></Card>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              </div>
                            );
                          }}
                        </Droppable>
                      )
                    );
                  })}
              </DragDropContext>
            </Scrollbars>
          </div>
        </Loading>
      </Loading>
    );
  }
}

const mapStateToProps = state => {
  const { LoginUser, Student, AppLoading, AppAltert } = state;

  return {
    LoginUser,

      Student,

    AppLoading,

    AppAltert
  };
};
export default connect(mapStateToProps)(DataBase);
