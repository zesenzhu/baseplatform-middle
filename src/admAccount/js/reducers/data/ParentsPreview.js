import UpDataState from "../../actions/UpDataState";

const ParentsPreview = (
  state = {
    keyList: [],
    newList: [],
    Total: 0,
    canBeUse: {
    //   ProductUseRange: 1, //1专业院校；2综合大学；3单个中小学；4多个中小学
    //   ParentsShow: 0, //1开启家长功能，0关闭家长功能
    },
  },
  actions
) => {
  switch (actions.type) {
    case UpDataState.GET_PARENTS_PREVIEW:
      let { Total, ...list } = actions.data;

      let { newList, keyList } = handleData(
        list,
        actions.pageIndex,
        actions.pageSize
      );

      return Object.assign({}, state, { Total, newList, keyList });
    case UpDataState.GET_CONFIG:
      return Object.assign({}, state, { canBeUse: actions.data });
    default:
      return state;
  }
};

function handleData(data, pageIndex, pageSize) {
  let keyList = [];
  let newList = data.List.map((child, index) => {
    let list = {};
    list.key = index;
    list.OrderNo = index + pageIndex * pageSize;
    list.UserName = {
      Name: child.UserName,
      UserID: child.UserID,
      key: index,
    };
    list.ShortName = child.ShortName;
    list.Sign = child.Sign;
    list.Gender = child.Gender;
    list.UserImg = child.PhotoPath_NoCache || child.PhotoPath;
    list.UserContact = {
      QQ: child.QQ,
      WeiXin: child.Weixin,
      Telephone: child.Telephone,
      Weibo: child.Weibo,
    };
    list.handle = {
      key: index,
      OrderNo: index + pageIndex * pageSize,
    };
    keyList.push(list.key);

    let {
      UserID,
      Grader,
      GradeName,
      ClassName,
      PhotoPath,
      UserName,
      ...others
    } = child;
    list.Others = child;
    return list;
  });
  return { newList, keyList };
}

export default ParentsPreview;
