import TeacherCustomActions from "../../actions/Teacher/TeacherCustomActions";
import Database from '../../../images/database.png'
const TeacherCustomData = (
  state = {
    ToolData: [],
    ToolAlterData: [],
    WebsiteData: [],
    WebsiteAlterData: [],
    AppData: [],
    AppAlterData: [],
    DataBaseData: [],
    DataBaseAlterData: [],
    AlterPeriod: [],
    TipsShow: {
      WebsiteTipsShow: false,
      ToolTipsShow: false,
      AppTipsShow: false,
      DataBaseTipsShow: false
    },
    WebTypeList: [],
    PeriodList: [],
    CombineModalData: { data: {}, Row: "", key: "" },
    AllData:{
      Period:{},
      period: 0
    },
    ToolImgUrlProxy:''
  },
  actions
) => {
  let TipsShow = "";
  switch (actions.type) {
    case TeacherCustomActions.GET_IMG_URL_PROXY:
      return Object.assign({}, state, { ToolImgUrlProxy:actions.data.ResHttp});
    case TeacherCustomActions.GET_CUSTOM_DATA:
      let data = handleData(actions.data, actions.data2, actions.key);
      return Object.assign({}, state, { ...data });
      case TeacherCustomActions.GET_CUSTOM_ONE_DATA:
      let data2 = handleData2(actions.data,  actions.key);
      return Object.assign({}, state, { ...data2 });
    case TeacherCustomActions.SET_CUSTOM_DATA:
      let newData = handleCustomData(
        actions.dataType,
        actions.dataObj,
        actions.source,
        actions.destination,
        state.WebsiteAlterData
      );
      return Object.assign({}, state, { ...newData });
    case TeacherCustomActions.SET_ONE_CUSTOM_DATA:
      let oneData = handleOneCustomData(actions.dataObj, actions.source);
      return Object.assign({}, state, { ...oneData });
    case TeacherCustomActions.GET_ALTER_PERIOD_DATA:
      return Object.assign({}, state, { AlterPeriod: actions.data });
    case TeacherCustomActions.GET_ALTER_DATA:
      return Object.assign({}, state, {
        WebsiteAlterData: handleWebsiteAlter(actions.data)
      });
    case TeacherCustomActions.GET_WEBSITE_ALTER_TIPS:
      TipsShow = Object.assign({}, state.TipsShow, {
        WebsiteTipsShow: actions.data
      });
      return Object.assign({}, state, { TipsShow });
    case TeacherCustomActions.GET_TOOL_ALTER_TIPS:
      TipsShow = Object.assign({}, state.TipsShow, {
        ToolTipsShow: actions.data
      });
      return Object.assign({}, state, { TipsShow });
    case TeacherCustomActions.GET_APP_ALTER_TIPS:
      TipsShow = Object.assign({}, state.TipsShow, {
        AppTipsShow: actions.data
      });
      return Object.assign({}, state, { TipsShow });
    case TeacherCustomActions.GET_DATABASE_ALTER_TIPS:
      TipsShow = Object.assign({}, state.TipsShow, {
        DataBaseTipsShow: actions.data
      });
      return Object.assign({}, state, { TipsShow });
    case TeacherCustomActions.GET_TYPE_LIST:
      let WebTypeList = handleWebTypeList(actions.data);
      return Object.assign({}, state, { WebTypeList: WebTypeList });
    case TeacherCustomActions.GET_PERIOD_LIST:
      // let Period = handleWebTypeList(actions.data)
      return Object.assign({}, state, { PeriodList: actions.data });
    case TeacherCustomActions.SET_COMBINE_CUSTOM_DATA:
      let CombineData = handleCombineCustomData(actions.data);
      return Object.assign({}, state, { ...CombineData });
    case TeacherCustomActions.SET_MY_COMBINE_CUSTOM_DATA:
      let MyCombineData = handleMyCombineCustomData(actions.data);
      return Object.assign({}, state, { ...MyCombineData });
    case TeacherCustomActions.SET_COMBINE_CUSTOM_MODAL_DATA:
      let CombineModalData = Object.assign(
        {},
        state.CombineModalData,
        actions.data
      );
      return Object.assign({}, state, { CombineModalData: CombineModalData });
    case TeacherCustomActions.SET_ALL_CUSTOM_DATA:
      let AllData = Object.assign({},state.AllData,{ ...actions.data })
      return Object.assign({}, state, { AllData:AllData });
      case TeacherCustomActions.SET_COMBINE_NAME_DATA:
      let NameData = handleNameData(actions.data)
      return Object.assign({}, state, { ...NameData });
    default:
      return state;
  }
};
// 处理整体数据
function handleNameData (data){
  return data
}
// 处理我的合并
function handleMyCombineCustomData({ Data, source, destination, type }) {
  let SourceIndex = source.index;
  let DestinationIndex = destination.index;
  let SourceMainRow = source.droppableId.split("-")[1];
  let SourceMainIndex = source.droppableId.split("-")[2];
  let SourceRow = source.droppableId.split("-")[3];
  let DestinationRow = destination.droppableId.split("-")[3];
  let DestinationMainRow = destination.droppableId.split("-")[1];
  let Destination = type;
  let DestinationMainIndex = destination.droppableId.split("-")[2];
  let Key = [];
  let CustomData = [];
  let MainData = [];
  let AlterData = [];
  let remove = "";
  for (let key in Data) {
    Key.push(key);
    CustomData.push(Data[key]);
  }
  MainData = CustomData[0];
  AlterData = CustomData[1];

  console.log(
    MainData,
    Key,
    AlterData,
    source,

    destination,
    DestinationIndex,
    SourceIndex,
    SourceMainRow,
    SourceMainIndex,
    SourceRow,
    DestinationMainRow,
    DestinationMainIndex
  );
  let removed = {};
  if (Destination === "combine") {
    [removed] = MainData[SourceMainRow].List[SourceMainIndex].List[
      SourceRow
    ].List.splice(SourceIndex, 1);
    MainData[DestinationMainRow].List[DestinationMainIndex].List[
      DestinationRow
    ].List.splice(DestinationIndex, 0, removed);
  } else if (Destination === "alter") {
    [removed] = MainData[SourceMainRow].List[SourceMainIndex].List[
      SourceRow
    ].List.splice(SourceIndex, 1);
    let SubtypeID = removed.SubTypeId;
    let alterIndex = "";
    AlterData.map((child, index) => {
      if (child.SubTypeId === SubtypeID) {
        alterIndex = index;
      }
    });
    if (alterIndex !== "") {
      AlterData[alterIndex].List.push(removed); //destunation增加等到的
    }
    AlterData[alterIndex].List.map((child, index) => {
      child.Row = alterIndex;
      child.index = index;
      child.key = index;
      return child;
    });
  } else if (Destination === "main") {
    [removed] = MainData[SourceMainRow].List[SourceMainIndex].List[
      SourceRow
    ].List.splice(SourceIndex, 1);
    if (DestinationMainRow === "1" && DestinationIndex === 0) {
      MainData.push({
        Row: 1,
        type: removed.type,
        List: [removed]
      });
    } else {
      MainData[DestinationMainRow].List.push(removed);
    }
  } else {
    return;
  }
  console.log(MainData, removed, SourceRow, DestinationRow, SourceIndex);
  let CombineList = [];
  // MainData[DestinationMainRow].List[
  //   DestinationMainIndex
  // ].List[SourceRow].List =
  MainData[SourceMainRow].List[SourceMainIndex].List.map((child, index) => {
    child.List.map(child1 => {
      CombineList.push(child1);
    });
  });

  let num = 0;
  let Row = 0;
  let List = [];
  let RowList = [];
  // let type =
  console.log(CombineList);
  if (CombineList.length > 0) {
    CombineList.map((child, index) => {
      child.key = num;
      child.index = num;
      let type = child.type;
      child.Row = Row;
      if (num < 3 && index === CombineList.length - 1) {
        List.push(child);
        RowList.push({ List, Row, type });
        Row++;
        num = 0;

        List = [];
      } else if (num < 3 && index !== CombineList.length - 1) {
        List.push(child);
        num++;
      } else {
        List.push(child);

        RowList.push({ List, Row, type });
        Row++;
        List = [];
        num = 0;
      }
    });
    MainData[SourceMainRow].List[SourceMainIndex].List = RowList;
  } else {
    MainData[SourceMainRow].List.splice(SourceMainIndex, 1);
  }

  num = 0;
  let Main = [];
  List = [];
  Row = 0;
  type = "";
  let Old = [];
  // console.log(result, keys);
  MainData.map((Child, Index) => {
    console.log(Child);
    Child.List.map((child, index) => {
      type = Child.type;
      Old.push(child);
    });
  });

  Old.map((child, index) => {
    child.key = num;
    child.index = num;
    if (num < 6 && index !== Old.length - 1) {
      List.push(child);
      num++;
      console.log(1);
    } else if (num < 6 && index === Old.length - 1) {
      List.push(child);
      Main.push({
        Row,
        type,
        List
      });
      console.log(2);
    } else {
      List.push(child);
      Main.push({
        Row,
        type,
        List
      });
      List = [];
      num = 0;
      ++Row;
      console.log(3);
    }
    console.log(Main, num);
    return child;
  });
  console.log(Main, Old);
  if (Main.length === 0) {
    Main.push({
      Row,
      type,
      List
    });
  }
  let result = {};
  result[Key[0]] = Main;
  if (CustomData.length > 1) {
    result[Key[1]] = AlterData;
  }

  return result;
}
// 处理合并
function handleCombineCustomData({
  Data,
  Source,
  SourceRow,
  SourceIndex,
  Destination,
  DestinationRow,
  DestinationIndex
}) {
  console.log(
    Data,
    Source,
    SourceRow,
    SourceIndex,
    Destination,
    DestinationRow,
    DestinationIndex
  );
  let Key = [];
  let CustomData = [];
  let MainData = [];
  let AlterData = [];
  let remove = "";
  for (let key in Data) {
    Key.push(key);
    CustomData.push(Data[key]);
  }
  MainData = CustomData[0];
  AlterData = CustomData[1];
  if (!AlterData && MainData[SourceRow].List[SourceIndex].IsGroup) {
    // console.log(MainData[SourceRow].List[SourceIndex].IsGroup);
    return;
  }
  if (Source.IsGroup && Destination.IsGroup) {
    //小组里面操作:小组=>小组
  } else if (!Source.IsGroup && Destination.IsGroup) {
    //非小组=>小组
    if (AlterData) {
      remove = AlterData[SourceRow].List.splice(SourceIndex, 1)[0];
      AlterData[SourceRow].List = AlterData[SourceRow].List.map(
        (child, index) => {
          child.key = index;
          child.index = index;
          return child;
        }
      );
    } else {
      remove = MainData[SourceRow].List[SourceIndex];
      MainData[SourceRow].List = MainData[SourceRow].List.map(
        (child, index) => {
          child.key = index;
          child.index = index;
          return child;
        }
      );
    }
    let CombineLen =
      MainData[DestinationRow].List[DestinationIndex].List.length;
    let CombineLast =
      MainData[DestinationRow].List[DestinationIndex].List[CombineLen - 1];
    console.log(
      remove,
      MainData[DestinationRow].List[DestinationIndex],
      CombineLast,
      CombineLen
    );

    if (CombineLast.length >= 4) {
      MainData[DestinationRow].List[DestinationIndex].List.push({
        List: [remove],
        Row: CombineLast.Row + 1,
        type: CombineLast.type
      });
    } else {
      MainData[DestinationRow].List[DestinationIndex].List[
        CombineLen - 1
      ].List.push(remove);
    }

    let num = 0;
    console.log(MainData, MainData[DestinationRow].List[DestinationIndex]);
    MainData[DestinationRow].List[DestinationIndex].List = MainData[
      DestinationRow
    ].List[DestinationIndex].List.map((child, index) => {
      child.List = child.List.map(child2 => {
        child2.key = ++num;
        return child2;
      });
      child.key = index;
      child.index = index;
      //child.OrderNo=index;
      return child;
    });
    if (!AlterData) {
      MainData[SourceRow].List.splice(SourceIndex, 1);
    }
    console.log(MainData);
  } else if (Source.IsGroup && !Destination.IsGroup) {
    //小组=>非小组
  } else if (!Source.IsGroup && !Destination.IsGroup) {
    //非小组=>非小组
    let Group = {};
    let List = [];
    let NameNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    if (AlterData) {
      List.push(AlterData[SourceRow].List.splice(SourceIndex, 1)[0]);
      AlterData[SourceRow].List = AlterData[SourceRow].List.map(
        (child, index) => {
          child.key = index;
          child.index = index;
          return child;
        }
      );
    } else {
      List.push(MainData[SourceRow].List[SourceIndex]);
    }
    List.push(MainData[DestinationRow].List[DestinationIndex]);
    let NewNum = NameNum;
    MainData.map((child, index) => {
      child.List.map(key => {
        if (key.IsGroup) {
          NameNum = NewNum;
          let GroupName = key.GroupName.split("文件夹");
          console.log(GroupName);
          if (GroupName[0] === "") {
          NewNum = [];

            NameNum.map(num => {
              if (num !== Number(GroupName[1])) {
                NewNum.push(num);
              }
            });
            console.log(NewNum);
          }
        }
      });
    });
    console.log(NewNum);
    let GroupId = Math.round(Math.random() * 10000000);
    Group = {
      GroupId: GroupId,
      GroupName: "文件夹" + NewNum[0],
      ID: GroupId,
      Img: "",
      Row: DestinationRow,
      IsGroup: true,
      Name: "文件夹" + NewNum[0],
      OrderNo: List[1].key,
      key: List[1].key,
      myColor: List[1].myColor,
      type: List[1].type,
      List: [{ List, Row: 0, type: List[1].type }]
    };
    MainData[DestinationRow].List.splice(DestinationIndex, 1, Group);
    if (!AlterData) {
      MainData[SourceRow].List.splice(SourceIndex, 1);
    }

    // console.log('4')
  }
  let num = 0;
  let Main = [];
  let List = [];
  let Row = 0;
  let type = "";
  let Old = [];
  // console.log(result, keys);
  MainData.map((Child, Index) => {
    console.log(Child);
    Child.List.map((child, index) => {
      type = Child.type;
      Old.push(child);
    });
  });

  Old.map((child, index) => {
    child.key = num;
    child.index = num;
    if (num < 6 && index !== Old.length - 1) {
      List.push(child);
      num++;
      console.log(1);
    } else if (num < 6 && index === Old.length - 1) {
      List.push(child);
      Main.push({
        Row,
        type,
        List
      });
      console.log(2);
    } else {
      List.push(child);
      Main.push({
        Row,
        type,
        List
      });
      List = [];
      num = 0;
      ++Row;
      console.log(3);
    }
    console.log(Main, num);
    return child;
  });
  console.log(Main, Old);
  if (Main.length === 0) {
    Main.push({
      Row,
      type,
      List
    });
  }
  let End = {};
  if (AlterData) {
    End[Key[1]] = AlterData;
  }
  End[Key[0]] = Main;
  return End;
}

function handleWebTypeList(data) {
  if (!(data instanceof Array)) {
    console.log("接口有误");
    return [];
  }

  let getData = [];
  data.map((child, index) => {
    if (child.SubTypeID !== 0) {
      getData.push({
        value: child.SubTypeID,
        title: child.SubTypeName
      });
    }
  });
  return getData;
}
function handleData(data, data2, key) {
  if (key === "tool") {
    return {
      ToolData: handleWebsiteMain2(data, key),
      ToolAlterData: handleAlter(data2, key)
    };
  } else if (key === "App") {
    return {
      AppData: handleWebsiteMain2(data, key),
      AppAlterData: handleAlter(data2, key)
    };
  } else if (key === "Website") {
    return {
      WebsiteData: handleWebsiteMain2(data, key),
      WebsiteAlterData: handleWebsiteAlter(data2, key)
    };
  } else if (key === "database") {
    return {
      DataBaseData: handleWebsiteMain2(data, key),
      DataBaseAlterData: handleAlter(data2, key)
    };
  }
}
function handleData2(data2, key) {
  if (key === "tool") {
    return {
      ToolAlterData: handleAlter(data2, key)
    };
  } else if (key === "App") {
    return {
      AppAlterData: handleAlter(data2, key)
    };
  } else if (key === "Website") {
    return {
      WebsiteAlterData: handleWebsiteAlter(data2, key)
    };
  } else if (key === "database") {
    return {
      DataBaseAlterData: handleAlter(data2, key)
    };
  }
}
function handleWebsiteMain(data, key) {
  let main = [];
  data instanceof Array &&
    data.map((child, index) => {
      if (!child.IsGroup) {
        main = Sort(main, child, key);
      } else {
        let group = [];
        child.List.map((child2, index2) => {
          group = Sort(group, child2, key);
        });
        group = group.map((child2, index2) => {
          child2.key = index2;
          child2.type = key;
          return child2;
        });
        child.List = group;
        main = Sort(main, child, key);
      }
    });
  main.map((child, index) => {
    child.key = index;
    child.index = index;
    return child;
  });
  return main;
}
// 第二种处理方法
function handleWebsiteMain2(data, key) {
  let main = [];
  data instanceof Array &&
    data.map((child, index) => {
      if (!child.IsGroup) {
        main = Sort(main, child, key);
      } else {
        let group = [];
        child.List.map((child1, index2) => {
          group = Sort(group, child1, key);
        });
        let num = 0;
        let Combine = [];
        let List = [];
        let Row = 0;
        let type = key;
        group.map((child2, index2) => {
          child2.key = index2;
          child2.type = key;
          child2.Row = Row;
          if (num < 3 && index2 !== group.length - 1) {
            List.push(child2);
            num++;
          } else if (num < 3 && index2 === group.length - 1) {
            List.push(child2);
            Combine.push({
              Row,
              type,
              List
            });
          } else {
            List.push(child2);
            Combine.push({
              Row,
              type,
              List
            });
            List = [];
            num = 0;
            ++Row;
          }
          return child2;
        });
        if (Combine.length === 0) {
          Combine.push({
            Row,
            type,
            List
          });
        }
        child.List = Combine;
        main = Sort(main, child, key);
      }
    });
  let num = 0;
  let Main = [];
  let List = [];
  let Row = 0;
  let type = key;
  main.map((child, index) => {
    child.key = num;
    child.index = num;
    child.Row = Row;
    if (num < 6 && index !== main.length - 1) {
      List.push(child);
      num++;
    } else if (num < 6 && index === main.length - 1) {
      List.push(child);
      Main.push({
        Row,
        type,
        List
      });
    } else {
      List.push(child);
      Main.push({
        Row,
        type,
        List
      });
      List = [];
      num = 0;
      ++Row;
    }
    return child;
  });

  if (Main.length === 0) {
    Main.push({
      Row,
      type,
      List
    });
  }
  return Main;
}
function handleWebsiteAlter(data, key) {
  if (!(data instanceof Array)) return [];
  let newData = data.map((child, index) => {
    let List = child.List.map((child1, index1) => {
      let number = Math.random() * 3;
      let myColor = number > 2 ? "blue" : number > 1 ? "orange" : "green";
      child1.myColor = myColor; //设计颜色
      child1.type = key;
      child1.Img =
        child1.ModuleLogoPath ||
        child1.ImgUrl ||
        data.LogoPath ||
       ( key!=='database'?
        UrlGetIcon(child1.Url) + "/favicon.ico":Database); // data数据处理:img
      return child1;
    });

    child.List = List;
    return child;
  });
  if (data.length === 0) {
    newData = [{ List: [] }];
  }
  return newData;
}
function handleAlter(data, key) {
  if (!(data instanceof Array)) return [];
  let newData = data.map((child, index) => {
    let number = Math.random() * 3;
    let myColor = number > 2 ? "blue" : number > 1 ? "orange" : "green";
    child.myColor = myColor; //设计颜色
    child.type = key;
    child.key = child.OrderNo || index;
    child.Img =
      child.ModuleLogoPath ||
      child.ImgUrl ||
      child.LogoPath ||
      (key!=='database'?
      UrlGetIcon(child.Url) + "/favicon.ico":Database); // data数据处理:img
    return child;
  });
  // if(data.length===0){
  //     newData = [{List:[]}]
  // }
  return [{ List: newData }];
}
// 排序
function Sort(dataArr, data, key) {
  let end = dataArr;
  let first = true;
  let number = Math.random() * 3;
  let myColor = number > 2 ? "blue" : number > 1 ? "orange" : "green";
  data.myColor = myColor; //设计颜色
  let Img = data.ImgUrl || data.LogoPath ||(key!=='database'?UrlGetIcon(data.Url) + "/favicon.ico":Database); // data数据处理:img
  data.Img = Img;
  data.type = key;
  // data.Url = Url;
  if (data.IsGroup) {
    data.Name = data.GroupName;
    data.ID = data.GroupId;
  }
  if (dataArr instanceof Array && !dataArr.length) {
    end.push(data);
  } else {
    dataArr instanceof Array &&
      dataArr.map((child, index) => {
        if (first && child.OrderNo > data.OrderNo) {
          end.splice(index, 0, data);
          first = false;
        } else if (first && index === dataArr.length - 1) {
          end.push(data);
        }
      });
  }

  return end;
}

// 滑块
function handleCustomData(type, data, source, destination, WebsiteAlterData) {
  let droppableSource = [];
  let droppableDestination = [];
  let newData = {};
  let dataKeys = [];
  for (let key in data) {
    dataKeys.push(key);
  }
  console.log(data, source, destination);
  if (dataKeys.length === 2) {
    //不同滑块框
    if (destination.droppableId.indexOf("alter") === -1) {
      droppableDestination = Array.from(data[dataKeys[0]]);
      droppableSource = Array.from(data[dataKeys[1]]);
    } else {
      droppableSource = Array.from(data[dataKeys[0]]);
      droppableDestination = Array.from(data[dataKeys[1]]);
    }
  } else if (dataKeys.length === 1) {
    droppableDestination = droppableSource = Array.from(data[dataKeys[0]]);
  } else {
    // console.log(dataKeys)
  }
  console.log(droppableDestination, droppableSource);
  if (type === "main") {
    newData[dataKeys[0]] = reorder(
      droppableSource,
      source.index,
      destination.index,
      source.droppableId.split("-")[1]
    );
  } else if (type === "alter") {
    console.log(droppableDestination, droppableSource);

    newData = move(
      droppableSource,
      droppableDestination,
      source,
      destination,
      dataKeys,
      WebsiteAlterData
    );
  }
  // console.log(newData)
  return newData;
}
// 处理一个card
const handleOneCustomData = (dataObj, source) => {
  let newData = {};
  let dataKeys = "";
  let data = [];
  let Clone = "";
  for (let key in dataObj) {
    dataKeys = key;
    data = dataObj[key];
  }
  if (source.droppableId.indexOf("main") !== -1) {
    let MainIndex = Number(source.droppableId.split("-")[1]);
    data[MainIndex].List.splice(source.index, 1);
  } else if (source.droppableId.indexOf("alter") !== -1){
    // let Clone = data;
    let alterIndex = Number(source.droppableId.split("-")[1]);
    data[alterIndex].List.splice(source.index, 1);
  }else if (source.droppableId.indexOf("combine") !== -1){
    let CombineMainRow = Number(source.droppableId.split("-")[1]);
    let CombineMainIndex = Number(source.droppableId.split("-")[2]);
    let CombineRow= Number(source.droppableId.split("-")[3]);
    let CombineIndex = Number(source.index);
    console.log(data,data[CombineMainRow],CombineMainIndex,CombineRow)
    data[CombineMainRow].List[CombineMainIndex].List[CombineRow].List.splice(source.index, 1);
    if(CombineRow===0&&source.index===0){
      data[CombineMainRow].List.splice(CombineMainIndex,1)
    }
  }
  data = SortMainData(data,data[0].type)
  return { dataKeys: data };
};

// 同滑块
const reorder = (list, startIndex, endIndex, row) => {
  const result = Array.from(list);
  console.log(result, row);
  const [removed] = result[row].List.splice(startIndex, 1);
  result[row].List.splice(endIndex, 0, removed);

  result[row].List.map((child, index) => {
    child.key = index;
    child.index = index;
    child.Row = row;
    return child;
  });
  console.log(result);
  return result;
};
// 不同滑块
const move = (
  source,
  destination,
  Source,
  Destination,
  keys,
  WebsiteAlterData
) => {
  console.log(source, destination, Source, Destination, keys, WebsiteAlterData);

  //source为原始出发数据，destination为原始目的地数据，droppableSource为插件出发对象，droppableDestination为插件目的地对象
  const sourceClone = Array.from(source);
  const destClone = destination;

  // const destClone = Array.from(destination);
  const result = {};
  let alterIndex = 0;
  let mainRow = 0;
  let SourceMainRow = 0;
  let DestinationMainRow = 0;
  console.log(destination, destClone);

  if (Destination.droppableId.indexOf("alter") === -1) {
    //目标为main
    if (Source.droppableId.indexOf("alter") !== -1) {
      if (destClone.length === 2 && destClone[1].List.length === 7) {
        return;
      }
      //出发为alter
      alterIndex = Number(Source.droppableId.split("-")[1]);
      mainRow = Number(Destination.droppableId.split("-")[1]);
      console.log(mainRow, alterIndex, Destination, destClone);
      const [removed] = sourceClone[alterIndex].List.splice(Source.index, 1); //source去掉失去的
      if (Destination.index === -1) {
        destClone[mainRow].List.push(removed); //destunation增加等到的
      } else {
        destClone[mainRow].List.splice(Destination.index, 0, removed); //destunation增加等到的
      }
      // console.log(alterIndex,sourceClone,destClone,removed,sourceClone[alterIndex])
      result[keys[0]] = destClone;
      result[keys[0]][mainRow].List = destClone[mainRow].List.map(
        (child, index) => {
          child.Row = mainRow;
          child.index = index;
          child.key = index;
          return child;
        }
      );
      result[keys[1]] = sourceClone;

      result[keys[1]][alterIndex].List = sourceClone[alterIndex].List.map(
        (child, index) => {
          child.Row = alterIndex;
          child.index = index;
          child.key = index;
          return child;
        }
      );
    } else {
      //出发为main
      SourceMainRow = Number(Source.droppableId.split("-")[1]);
      DestinationMainRow = Number(Destination.droppableId.split("-")[1]);
      console.log(Source, Destination);
      const [removed] = sourceClone[SourceMainRow].List.splice(Source.index, 1); //source去掉失去的
      if (Destination.index === -1) {
        destClone[DestinationMainRow].List.push(removed); //destunation增加等到的
      } else {
        destClone[DestinationMainRow].List.splice(
          Destination.index,
          0,
          removed
        ); //destunation增加等到的
      }
      result[keys[0]] = destClone;
      result[keys[0]][SourceMainRow].List = destClone[SourceMainRow].List.map(
        (child, index) => {
          child.Row = SourceMainRow;
          child.key = index;
          child.index = index;
          console.log(child, index);
          return child;
        }
      );
      result[keys[0]][DestinationMainRow].List = destClone[
        DestinationMainRow
      ].List.map((child, index) => {
        child.Row = DestinationMainRow;
        child.index = index;
        child.key = index;
        console.log(child, index);

        return child;
      });
    }
  } else {
    //目标为alter
    SourceMainRow = Number(Source.droppableId.split("-")[1]);
    //alterIndex = Number(Destination.droppableId.split('alter')[1]);
    const [removed] = sourceClone[SourceMainRow].List.splice(Source.index, 1); //source去掉失去的
    console.log(removed);
    if (removed.List) {
      //小组
      removed.List.map(child => {
        child.List.map(child1 => {
          let SubtypeID = child1.SubTypeId;
          destClone.map((child2, index) => {
            if (child2.SubTypeId === SubtypeID) {
              alterIndex = index;
            }
          });
          destClone[alterIndex].List.push(child1); //destunation增加等到的
        });
      });
    } else {
      let SubtypeID = removed.SubTypeId;
      destClone.map((child, index) => {
        if (child.SubTypeId === SubtypeID) {
          alterIndex = index;
        }
      });
      destClone[alterIndex].List.push(removed); //destunation增加等到的
    }

    sourceClone[SourceMainRow].List = sourceClone[SourceMainRow].List.map(
      (child, index) => {
        child.Row = SourceMainRow;
        child.key = index;
        child.index = index;
        return child;
      }
    );
    result[keys[0]] = sourceClone;
    result[keys[1]] = destClone;
    result[keys[1]][alterIndex].List = destClone[alterIndex].List.map(
      (child, index) => {
        child.Row = alterIndex;
        child.index = index;
        child.key = index;
        return child;
      }
    );
  }
  // console.log(destClone, sourceClone, result)

  // if (Destination.droppableId.indexOf('alter') === '-1') {
  //     alterIndex = Source.droppableId.split('alter')[1];
  //     result[keys[1]][alterIndex].List = destClone.map((child, index) => {
  //         child.key = index
  //         return child
  //     });;
  // } else {
  //     alterIndex = Destination.droppableId.split('alter')[1];
  //     result[keys[1]][alterIndex].List = destClone.map((child, index) => {
  //         child.key = index
  //         return child
  //     });;
  // }
  // result[keys[1]] = destClone.map((child, index) => {
  //     child.key = index
  //     return child
  // });;
  let num = 0;
  let Main = [];
  let List = [];
  let Row = 0;
  let type = "";
  let Old = [];
  console.log(result, keys);
  result[keys[0]].map((Child, Index) => {
    console.log(Child);
    Child.List.map((child, index) => {
      type = Child.type;
      Old.push(child);
    });
  });

  Old.map((child, index) => {
    child.key = num;
    child.index = num;
    if (num < 6 && index !== Old.length - 1) {
      List.push(child);
      num++;
      // console.log(1);
    } else if (num < 6 && index === Old.length - 1) {
      List.push(child);
      Main.push({
        Row,
        type,
        List
      });
      console.log(2);
    } else {
      List.push(child);
      Main.push({
        Row,
        type,
        List
      });
      List = [];
      num = 0;
      ++Row;
      console.log(3);
    }
    // console.log(Main, num);
    return child;
  });
  console.log(Main, Old);
  if (Main.length === 0) {
    Main.push({
      Row,
      type,
      List
    });
  }
  result[keys[0]] = Main;
  return result;
};
// 处理url适合获取icon
const UrlGetIcon = url => {
  let urlArr = "";
  // console.log(url,url instanceof String,typeof url)
  if (typeof url !== "string") {
    return;
  }
  if (url.indexOf("://") !== "-1") {
    urlArr = url
      .split("/")
      .slice(0, 3)
      .join("/");
    // console.log(urlArr)
    return urlArr;
  } else {
    urlArr = url.split("/")[0];
    // console.log(urlArr)

    return urlArr;
  }
};
// Main 数据结构重新排序
function SortMainData(Data,type){

let MainData = []
  Data.map(mainRow=>{
    mainRow.List.map(mainIndex=>{
      MainData.push(mainIndex)
    })
  })
  let mainNum = 0;
  let Row = 0;
  let List = [];
  let Main = []
  MainData.map((child,index)=>{
    child.key = mainNum;
    child.index = mainNum;
    child.Row = Row;
    child.type = type;

    if(child.IsGroup){
      child = SortGroupData(child,type)
    }
    if(mainNum<6&&MainData.length!==index){
      List.push(child)
      mainNum++
    }else if(mainNum<6&&MainData.length===index){
      List.push(child)
      Main.push({
        Row,
        type,
        List
      })
      mainNum++
    }else if(mainNum>=6){
      List.push(child)
      Main.push({
        Row,
        type,
        List
      })
      mainNum = 0;
      Row++
    }
  })
  return Main
}
// Group 数据结构重新排序
function SortGroupData(Data,type){
  let MainData = []
  Data.List.map(mainRow=>{
    mainRow.List.map(mainIndex=>{
      MainData.push(mainIndex)
    })
  })
  let mainNum = 0;
  let Row = 0;
  let List = [];
  let Main = []
  MainData.map((child,index)=>{
    child.key = mainNum;
    child.index = mainNum;
    child.Row = Row;
    child.type = type;

    
    if(mainNum<3&&MainData.length!==index){
      List.push(child)
      mainNum++
    }else if(mainNum<3&&MainData.length===index){
      List.push(child)
      Main.push({
        Row,
        type,
        List
      })
      mainNum++
    }else if(mainNum>=6){
      List.push(child)
      Main.push({
        Row,
        type,
        List
      })
      mainNum = 0;
      Row++
    }
  })
  return Main
}
export default TeacherCustomData;
