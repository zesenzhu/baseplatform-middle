import UpDataState from "../../action/data/UpDataState";
import English from "../../../images/Subject/English.png";
import Biology from "../../../images/Subject/Biology.png";
import Chemistry from "../../../images/Subject/Chemistry.png";
import Geography from "../../../images/Subject/Geography.png";
import History from "../../../images/Subject/History.png";
import Physics from "../../../images/Subject/Physics.png";
import Politics from "../../../images/Subject/Politics.png";
import Maths from "../../../images/Subject/Math.png";
import Chinese from "../../../images/Subject/Chinese.png";
import Others from "../../../images/Subject/Others.png";
import Science from "../../../images/Subject/Science.png";
import IT from "../../../images/Subject/IT.png";
import PE from "../../../images/Subject/PE.png";
import Arts from "../../../images/Subject/Art.png";
// 新增
// import Music from "../../../images/Subject/Music.png";
// import Painting from "../../../images/Subject/Painting.png";
// import Practical from "../../../images/Subject/Practical.png";
import Music from "../../../images/Subject/Others.png";
import Painting from "../../../images/Subject/Painting.png";
import Practical from "../../../images/Subject/Others.png";
const TextBookData = (
  state = {
    SubjectList: {
      SubjectList: [],
      SubjectListForKey: {},
      InitData: [],
    },
    SubjectInfo: {
      SubjectInfo: [],
      SubjectInfoForKey: {},
    },
    NodeInfo: {
      NodeList: [],
      OpenNode: [],
    },
    GradeSubjectList:[],
    TextBookList: [],
    TextBookListForKey: {},
  },
  actions
) => {
  let SubjectList = {};
  let SubjectInfo = [];
  let TextBookList = [];
  let NodeInfo = [];
  let SubjectInfoForKey = {};
  let GradeSubjectList=[];
  switch (actions.type) {
    case UpDataState.GET_SUBJECT_LIST_DATA:
      return Object.assign({}, state, {
        SubjectList: handleSubjectList(actions.data),
      });
      case UpDataState.GET_GRADE_SUBJECT_LIST_DATA:
        return Object.assign({}, state, {
          GradeSubjectList: handleGradeSubjectList(actions.data),
        });
    case UpDataState.GET_SUBJECT_INFO_DATA:
      // let NewData = InsertData(allClass,actions.Class)
      SubjectInfoForKey = Object.assign(
        {},
        state.SubjectInfo.SubjectInfoForKey,
        {
          ...handleSubjectInfo(actions.data, actions.subjectId),
        }
      );
      return Object.assign({}, state, {
        SubjectInfo: {
          ...state.SubjectInfo,
          SubjectInfoForKey,
        },
      });
    case UpDataState.GET_NODE_INFO_DATA:
      NodeInfo = handleNodeInfo(actions.data);
      return Object.assign({}, state, { NodeInfo });
    case UpDataState.GET_TEXT_BOOK_LIST_DATA:
      let data = handleTextBookList(actions.data);
      return Object.assign({}, state, { ...data });
    default:
      return state;
  }
};
// 教材详情
let OpenNode = [];

function handleNodeInfo(Data) {
  let NodeList = [];
  if (Data instanceof Array) {
    recursionNodeData(Data);
    NodeList = Data;
    
  }
  return { NodeList, OpenNode };
}

// 递归遍历
function recursionNodeData(Data) {
  if (Data instanceof Array && Data.length > 0) {
    Data.map((child) => {
      if (child.childs instanceof Array && child.childs.length > 0) {
        OpenNode.push(child.nodeId);
        recursionNodeData(child.childs)
      }
    });
  } else {
    return [];
  }
}

// 教材列表
function handleTextBookList(Data) {
  let TextBookList = [];
  let TextBookListForKey = {};
  // let TextBookListForKey ={123:{

  // }}
  if (Data instanceof Array) {
    Data.map((child) => {
      let { TextbookId, TextbookName, ...other } = child;

      TextBookList.push({
        TextBookId: TextbookId,
        TextBookName: TextbookName,
        ...other,
      });
      TextBookListForKey[TextbookId] = {
        TextBookId: TextbookId,
        TextBookName: TextbookName,
        ...other,
      };
    });
  }
  return { TextBookList, TextBookListForKey };
}
function handleSubjectList(Data) {
  let SubjectList = [];
  let SubjectListForKey = {};
  if (Data instanceof Array) {
    Data.map((child) => {
      let Subject = {
        value: child.SubjectId,
        title: child.SubjectName,
        SubjectImg: setSubjectLogo(child),
        ...child,
      };
      SubjectList.push(Subject);
      SubjectListForKey[child.SubjectId] = Subject;
    });
  }
  return { SubjectList, SubjectListForKey, InitData: Data };
}
function handleGradeSubjectList(Data){
  let  SubjectList = [];
  if (Data instanceof Array) {
    let Data2=[];
    Data.map((child,idx) => {
      let b =0;
      let a=child.OrderNo;
      Data.map((child2,idx2)=>{
        if(a>child2.OrderNo){
          b++;
        }
      })
      console.log(b);
      Data2[b]=JSON.parse(JSON.stringify(Data[idx]));
      // console.log(Data2[],4444444);
    })
    // console.log(Data2,4444444);
    Data2.map((child,idx) => {
      if ( child.Subjects instanceof Array) {
        child.Subjects.map((SubjectArr,id)=>{
          child.Subjects[id]={
            value:id,
            title: SubjectArr.SubjectName,
            ...SubjectArr,
          }
        })
      }
     
      SubjectList[idx]={
        value:idx,
        title: child.GradeName,
        ...child,
      }
     
    })
  }
  console.log(SubjectList);
  return SubjectList;
}
function setSubjectLogo(Subject) {
  let SubjectLogo = Others;
  if (
    Subject.SubjectId === "S1-English" ||
    Subject.SubjectId === "S2-English" ||
    Subject.SubjectId === "S3-English" ||
    Subject.SubjectId === "S4-English"
  )
    SubjectLogo = English;
  else if (Subject.SubjectId === "S2-Maths") SubjectLogo = Maths;
  else if (Subject.SubjectId === "S2-Chinese") SubjectLogo = Chinese;
  else if (Subject.SubjectId === "S2-Geography") SubjectLogo = Geography;
  else if (Subject.SubjectId === "S2-History") SubjectLogo = History;
  else if (Subject.SubjectId === "S2-Politics") SubjectLogo = Politics;
  else if (Subject.SubjectId === "S2-Physics") SubjectLogo = Physics;
  else if (Subject.SubjectId === "S2-Chemistry") SubjectLogo = Chemistry;
  else if (Subject.SubjectId === "S2-Biology") SubjectLogo = Biology;
  else if (Subject.SubjectId === "S2-Science") SubjectLogo = Science;
  else if (Subject.SubjectId === "S2-IT") SubjectLogo = IT;
  else if (Subject.SubjectId === "S2-PE") SubjectLogo = PE;
  else if (Subject.SubjectId === "S2-Arts") SubjectLogo = Arts;
  else if (Subject.SubjectId === "S2-Music") SubjectLogo = Music;
  else if (Subject.SubjectId === "S2-Painting") SubjectLogo = Painting;
  else if (Subject.SubjectId === "S2-Practical") SubjectLogo = Practical;
  return SubjectLogo;
}
function handleSubjectInfo(Data, subjectId) {
  let SubjectInfoForKey = {};
  let SubjectInfo = [];

  let { List, ...others } = Data;
  let PeriodData = [];

  if (List instanceof Array) {
    List.map((PeriodChild, index1) => {
      let { List, ...periodOthers } = PeriodChild;
      let period = { ...periodOthers };
      let PeriodName = "第" + periodOthers.Period + "学期";
      let PeriodID = periodOthers.Period;

      period.PeriodName = PeriodName;
      period.PeriodID = PeriodID;
      period.List = [];
      // period.List = [{
      //   Grade: {
      //     GradeID: 123,
      //     GradeName: 123,
      //   },
      //   TextBook: {
      //     TextBookId: '',
      //     TextBookName: '',
      //   },
      //   Subject: {
      //     SubjectID: 123,
      //     SubjectName: 12321,
      //   },
      //   Period: {
      //     PeriodID: 123,
      //     PeriodName: 123,
      //   },
      // }];
      List instanceof Array &&
        List.map((child) => {
          let PeriodList = {
            Grade: {
              GradeID: child.GradeId,
              GradeName: child.GradeName,
            },
            TextBook: {
              TextBookId: child.TextBookId,
              TextBookName: child.TextBookName,
              SubjectID: child.BookSubjectId,
              // PeriodID: PeriodID,
              GradeID: child.BookGradeId,
              TermId:child.BookTermId,
            },
            Subject: {
              SubjectID: child.SubjectId,
              SubjectName: child.SubjectName,
            },
            Period: {
              PeriodID: PeriodID,
              PeriodName: PeriodName,
            },
            InitData: child,
          };
          period.List.push(PeriodList);
        });
      PeriodData.push(period);
    });
  }
  SubjectInfoForKey[others.SubjectId || subjectId] = PeriodData;

  return SubjectInfoForKey;
}
export default TextBookData;
