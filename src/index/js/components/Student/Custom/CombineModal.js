import React from "react";
import { connect } from "react-redux";
import { CheckBox, CheckBoxGroup, Tips, DropDown } from "../../../../../common";
import { Input } from "antd";
import TeacherCustomActions from "../../../actions/Student/TeacherCustomActions";
import { postData, getData } from "../../../../../common/js/fetch";
import CONFIG from "../../../../../common/js/config";
import "../../../../scss/CombineModal.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Scrollbars } from "react-custom-scrollbars";
import Card from "./Card";
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  width: "126px",
  height: "156px",
  // padding: grid * 2,
  margin: `0 12px `,
  border: isDragging ? `solid 1px #02e362` :`solid 1px #fff`,
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
class CombineModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CombineData: props.CombineData,
      List: props.CombineData.List
    };
  }
  // combine内card移除
  onEditClick = source => {
    const { Student, dispatch } = this.props;
    let CombineData = Student.TeacherCustomData.CombineModalData.data;

    let type = this.props.type;
    let Data = {};
    let MainData = "";
    let AlterData = "";
    let Destinationtype = "";
    let Url = ''
    if (type === "Website") {
      MainData = Student.TeacherCustomData.WebsiteData;
      AlterData = Student.TeacherCustomData.WebsiteAlterData;
      Data["WebsiteData"] = MainData;
      Data["WebsiteAlterData"] = AlterData;
      Url = "/SubjectResMgr/WebSiteMgr/Teacher/EditDeskTop"
    } else if (type === "App") {
      MainData = Student.TeacherCustomData.AppData;
      AlterData = Student.TeacherCustomData.AppAlterData;
      Data["AppData"] = MainData;
      Data["AppAlterData"] = AlterData;
      Url = "/SubjectResMgr/AppMgr/Teacher/EditDeskTop"

    } else if (type === "tool") {
      MainData = Student.TeacherCustomData.ToolData;
      AlterData = Student.TeacherCustomData.ToolAlterData;
      Data["ToolData"] = MainData;
      Data["ToolAlterData"] = AlterData;
      Url = "/SubjectResMgr/ToolMgr/Teacher/EditDeskTop"

    } else if (type === "database") {
      MainData = Student.TeacherCustomData.DataBaseData;
      AlterData = Student.TeacherCustomData.DataBaseAlterData;
      Data["DataBaseData"] = MainData;
      Data["DataBaseAlterData"] = AlterData;
      Url = "/SubjectResMgr/ResLibMgr/Teacher/EditDeskTopInfo"

    } else {
      return;
    }
    let destination = {};
    if (MainData[1] && MainData[1].List.length >= 7) {
      if (
        MainData[source.droppableId.split("-")[1]].List[
          source.droppableId.split("-")[2]
        ].List[0].List.length === 1
      ) {
        destination = { droppableId: "main-1", index: 7 };
        Destinationtype = "main";
      } else {
        destination = { droppableId: "alter", index: 0 };
        Destinationtype = "alter";
      }
    } else if (MainData[1] && MainData[1].List.length < 7) {
      destination = { droppableId: "main-1", index: MainData[1].List.length };
      Destinationtype = "main";
    } else if (!MainData[1] && MainData[0].List.length < 7) {
      destination = { droppableId: "main-0", index: MainData[0].List.length };
      Destinationtype = "main";
    } else if (!MainData[1] && MainData[0].List.length === 7) {
      destination = { droppableId: "main-1", index: 0 };
      Destinationtype = "main";
    } else {
      console.log(MainData[1], MainData[0]);
      return;
    }
    console.log(Data, source, destination, Destinationtype);
    if (CombineData.List[0].List.length <= 1) {
      dispatch({
        type: TeacherCustomActions.STU_EDIT_COMBINE_CUSTOM_MODAL_CLOSE
      });
    }
    dispatch(
      TeacherCustomActions.setMyCombineCustomData({
        Data,
        source,
        destination,
        type: Destinationtype
      })
    );
    dispatch(
      TeacherCustomActions.fetchCustomData(
        Url,type
      )
    );
  };
  // card删除
  onDeleteClick = (source, data) => {
    const { Student, dispatch } = this.props;
    let MainData = "";
    let CombineData = Student.TeacherCustomData.CombineModalData.data;

    // let dataObj = {}
    // dataObj['WebsiteData'] = MainData;
    // dataObj['WebsiteAlterData'] = AlterData
    // let destination = { droppableId: "delete", index: -1 };
    let type = data.type;
    let dataObj = {};
    if (type === "Website") {
      MainData = Student.TeacherCustomData.WebsiteData;
      dataObj = { WebsiteData: MainData };
    } else if (type === "App") {
      MainData = Student.TeacherCustomData.AppData;
      dataObj = { AppData: MainData };
    } else if (type === "tool") {
      MainData = Student.TeacherCustomData.ToolData;
      dataObj = { ToolData: MainData };
    } else if (type === "database") {
      MainData = Student.TeacherCustomData.DataBaseData;
      dataObj = { DataBaseData: MainData };
    }
    let Row = Student.TeacherCustomData.CombineModalData.Row;
    let Key = Student.TeacherCustomData.CombineModalData.key;
    console.log(dataObj, source, data)
    if (CombineData.List[0].List.length <= 1) {
      dispatch({
        type: TeacherCustomActions.STU_EDIT_COMBINE_CUSTOM_MODAL_CLOSE
      });
    }else{
      if (
        MainData[Row] &&
        MainData[Row].List[Key] &&
        MainData[Row].List[Key].List
      ) {
        dispatch(TeacherCustomActions.setCombineCustomModalData(MainData[Row].List[Key]));
      } else {
        dispatch(
          TeacherCustomActions.setCombineCustomModalData({
            Row: -1,
            type: "",
            List: []
          })
        );
      }
    }
   
    dispatch(TeacherCustomActions.setOneCustomData(dataObj, source));

    dispatch(
      TeacherCustomActions.fetchDeleteCustomData(
        "/SubjectResMgr/WebSiteMgr/Teacher/DeleteWebsite",
        data.ID
      )
    );
  };
  // card编辑
  onResetClick = source => {
    const { Student, dispatch } = this.props;
    // let MainData = Student.TeacherCustomData.WebsiteData;
    // let AlterData = Student.TeacherCustomData.WebsiteAlterData;
    // let dataObj = {};
    // dataObj["WebsiteData"] = MainData;
    // dataObj["WebsiteAlterData"] = AlterData;
    // let destination = { droppableId: "main", index: -1 };
    // dispatch(
    //   TeacherCustomActions.setCustomData("alter", dataObj, source, destination)
    // );
    // dispatch(
    //   TeacherCustomActions.fetchCustomData(
    //     "/SubjectResMgr/WebSiteMgr/Teacher/EditDeskTop"
    //   )
    // );
    let AllData = Student.TeacherCustomData.AllData;
    if (source.type === "Website") {
      let SubjectID = '';
      let SubjectName = ''

      let url =
        "/SubjectResMgr/WebSiteMgr/GetTypeList?SubjectID=" +
        SubjectID +
        "&Period=" +
        AllData.period;
      console.log(source);
      dispatch(
        TeacherCustomActions.setHandleWebsiteInitData({
          WebsiteId: source.ID,
          SubjectID,
          WebName: source.Name,
          WebAddress: source.Url,
          SubjectName,
          WebType: { value: source.SubTypeId, title: source.SubTypeName },
          PeriodID: [AllData.Period.value],
          PeriodName: [AllData.Period.title]
        })
      );
      dispatch(TeacherCustomActions.getTypeList(url, "edit"));
      dispatch({
        type: TeacherCustomActions.STU_EDIT_WEBSITE_CUSTOM_MODAL_OPEN
      });
    }
  };

  // 拖拽事件
  onDragEnd = result => {
    const { source, destination, combine, draggableId } = result;
    const { Student, dispatch } = this.props;
    let type = this.props.type;
    let MainData = "";
    let AlterData = "";
    let Data = {};
    if (type === "Website") {
      MainData = Student.TeacherCustomData.WebsiteData;
      AlterData = Student.TeacherCustomData.WebsiteAlterData;
      Data = { WebsiteData: MainData };
    } else if (type === "tool") {
      MainData = Student.TeacherCustomData.ToolData;
      AlterData = Student.TeacherCustomData.ToolAlterData;
      Data = { ToolData: MainData };
    } else if (type === "App") {
      MainData = Student.TeacherCustomData.AppData;
      AlterData = Student.TeacherCustomData.AppAlterData;
      Data = { AppData: MainData };
    } else if (type === "database") {
      MainData = Student.TeacherCustomData.DataBaseData;
      AlterData = Student.TeacherCustomData.DataBaseAlterData;
      Data = { DataBaseData: MainData };
    } else {
      console.log("type值有误");
      return;
    }

    let dataObj = {};
    let Source = {};
    let SourceRow = "";
    let SourceIndex = "";

    // SourceRow = source.droppableId.split("-")[1];
    // SourceIndex = source.index;
    // Source = MainData[SourceRow].List[SourceIndex];
    console.log(result);
    if (!destination) {
      return;
    }
    dispatch(
      TeacherCustomActions.setMyCombineCustomData(
        {
          Data,
          source,
          destination,
          type: "combine"
        },
        type
      )
    );
    // dispatch(
    //   TeacherCustomActions.fetchCustomData(
    //     "/SubjectResMgr/WebSiteMgr/Teacher/EditDeskTop"
    //   )
    // );
  };
  render() {
    const { LoginUser, Student, AppLoading } = this.props;
    let CombineData = Student.TeacherCustomData.CombineModalData.data;

    console.log(CombineData);
    return (
      <div id="CombineModal">
        <Scrollbars
          style={{
            width: 641 + "px",
            height: 468 + "px"
          }}
        >
          <DragDropContext onDragEnd={this.onDragEnd}>
            {CombineData &&
              CombineData.List.length >= 0 &&
              CombineData.List.map((Child, Index) => {
                return (
                  <Droppable
                    key={Index}
                    droppableId={
                      "combine-" +
                      CombineData.Row +
                      "-" +
                      CombineData.key +
                      "-" +
                      Child.Row
                    }
                    direction="horizontal"
                  >
                    {(provided, snapshot) => {
                      //provided生成的数据，snapshot监听拖拽时的数据变化，snapshot:{draggingFromThisWith: null,draggingOverWith: null,isDraggingOver: false},draggingFromThisWith为拖拽对象的id，draggingOverWith为拖拽对象在该区域的id，isDraggingOver为是否有拖拽事件
                      // console.log(provided, snapshot)
                      return (
                        <div
                          ref={provided.innerRef}
                          className={"combine-drop"}
                          style={getListStyle(snapshot.isDraggingOver)}
                          {...provided.droppableProps}
                        >
                          {Child.List instanceof Array &&
                            Child.List.length !== 0 &&
                            Child.List.map((item, index) => (
                              <div
                                className="Card-protect"
                                key={"combine-" + item.ID + index}
                              >
                                <Draggable
                                  draggableId={
                                    "combine-" +
                                    CombineData.Row +
                                    "-" +
                                    Child.Row +
                                    "-" +
                                    item.ID +
                                    "-" +
                                    index
                                  }
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <Card
                                      type="main"
                                      custom="Website"
                                      data={item}
                                      ID={
                                        "combine-" +
                                        CombineData.Row +
                                        "-" +
                                        CombineData.key +
                                        "-" +
                                        Child.Row
                                      }
                                      provided={provided}
                                      snapshot={snapshot}
                                      onDeleteClick={this.onDeleteClick.bind(
                                        this,

                                        {
                                          droppableId:
                                            "combine-" +
                                            CombineData.Row +
                                            "-" +
                                            CombineData.key +
                                            "-" +
                                            Child.Row,
                                          index: index
                                        },
                                        item
                                      )}
                                      onResetClick={this.onResetClick}
                                      onEditClick={this.onEditClick.bind(this, {
                                        droppableId:
                                          "combine-" +
                                          CombineData.Row +
                                          "-" +
                                          CombineData.key +
                                          "-" +
                                          Child.Row,
                                        index: index
                                      })}
                                      style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                      )}
                                    ></Card>
                                  )}
                                </Draggable>
                              </div>
                            ))}
                          {/* <Draggable draggableId={"main-test"} index={100}>
                            <div style={{width:'50px',height:'100px' ,background:'#aaa'}}></div>
                          </Draggable> */}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                );
              })}
          </DragDropContext>
        </Scrollbars>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { LoginUser, Student, AppLoading } = state;

  return {
    LoginUser,

    Student,

    AppLoading
  };
};
export default connect(mapStateToProps)(CombineModal);
