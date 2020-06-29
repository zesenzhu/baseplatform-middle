import UpDataState from "../../action/data/UpDataState";

const TextBookParams = (
  state = {
    SelectSubjects: {
      OpenList: [],
      OpenPanel: "",
      SubjectsLoading: false,
      SelectSubjectsLoading: {},
    },
    NodeInfo: {
      TextBookID: "",
      TextBookModalVisible: false,
      TextBookModalLoading: false,
    },
    SetTextBook: {
      TextBookMsg: {
        Subject: {
          SubjectID: "",
          SubjectName: "",
        },
        Grade: {
          GradeID: "",
          GradeName: "",
        },
        Period: {
          PeriodID: "",
          PeriodName: "",
        },
        TextBook: {
          TextBookId: "",
          TextBookName: "",
        },
      },
      InitTextBookMsg: {
        Subject: {
          SubjectID: "",
          SubjectName: "",
        },
        Grade: {
          GradeID: "",
          GradeName: "",
        },
        Period: {
          PeriodID: "",
          PeriodName: "",
        },
        TextBook: {
          TextBookId: "",
          TextBookName: "",
        },
        
      },
      CopyTextBookMsg: {
        Subject: {
          SubjectID: "",
          SubjectName: "",
        },
        Grade: {
          GradeID: "",
          GradeName: "",
        },
        Period: {
          PeriodID: "",
          PeriodName: "",
        },
        TextBook: {
          TextBookId: "",
          TextBookName: "",
        },
      
    },
    SetTextBookModalVisible: false,
      SetTextBookModalLoading: false,
  }
},
  actions
) => {
  let SelectSubjects = {};
  let SubjectInfo = [];
  let NodeInfo = {};
  let SetTextBook = {};
  let InitTextBookMsg = {};
  let TextBookMsg = {};
  let SelectSubjectsLoading = {};
  switch (actions.type) {
    case UpDataState.SET_TEXT_BOOK_MODAL_PARAMS:
      TextBookMsg = Object.assign({}, state.SetTextBook , {
        ...state.SetTextBook,
        ...actions.data,
      });
      return Object.assign({}, state, {
        SetTextBook: {...state.SetTextBook, ...actions.data },
      });
    case UpDataState.SET_TEXT_BOOK_INIT_DATA:
      InitTextBookMsg = Object.assign({}, state.SetTextBook.InitTextBookMsg, {
        ...state.SetTextBook.InitTextBookMsg,
        ...actions.data,
      });
      TextBookMsg = Object.assign({}, state.SetTextBook.TextBookMsg, {
        ...state.SetTextBook.TextBookMsg,
        ...actions.data,
      });
      return Object.assign({}, state, {
        SetTextBook: { ...state.SetTextBook,InitTextBookMsg, TextBookMsg },
      });
    case UpDataState.SET_TEXT_BOOK_DATA:
      TextBookMsg = Object.assign({}, state.SetTextBook.TextBookMsg, {
        ...state.SetTextBook.TextBookMsg,
        ...actions.data,
      });
      return Object.assign({}, state, {
        SetTextBook: {...state.SetTextBook, TextBookMsg },
      });
    case UpDataState.SET_OPEN_SUBJECT_DATA:
      return Object.assign({}, state, {
        SelectSubjects: { ...state.SelectSubjects, ...actions.data },
      });
    case UpDataState.SET_NODE_INFO_DATA:
      return Object.assign({}, state, {
        NodeInfo: { ...state.NodeInfo, ...actions.data },
      });
    case UpDataState.SET_SELECT_SUBJECT_LOADING:
      SelectSubjectsLoading = Object.assign(
        {},
        state.SelectSubjects.SelectSubjectsLoading,
        {
          ...actions.data,
        }
      );
      return Object.assign({}, state, {
        SelectSubjects: { ...state.SelectSubjects, SelectSubjectsLoading },
      });
    case UpDataState.SET_SUBJECTS_LOADING:
      return Object.assign({}, state, {
        SelectSubjects: {
          ...state.SelectSubjects,
          SubjectsLoading: actions.data,
        },
      });
    default:
      return state;
  }
};
function handleNodeInfo(Data) {
  return Data;
}
export default TextBookParams;
