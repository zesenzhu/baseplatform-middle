import { getData, postData } from "../../../common/js/fetch";
//获取数据以及封装数据格式
const getMgrCenterData = async (
  url,
  level,
  mode = "cors",
  arr = false,
  Params = {}
) => {
  let token = sessionStorage.getItem("token");
  let UserInfo = sessionStorage.getItem("UserInfo");
  if(!UserInfo||UserInfo.UserID||!token){
      console.log('数据不全')
      return;
  }
  let moreParams = {
    requestHeader: {
      Lg_MgrCenter_Token: token,
      Lg_MgrCenter_UserId: UserInfo.UserID,
      Lg_MgrCenter_Client:1
    },
    content_type:'json',
    ...Params,
  };
  try {
    let fetchAsync = "";

    try {
      fetchAsync = await getData(url, level, mode, false, arr, moreParams);
    } catch (e) {
      return e;
    }

    let json = await fetchAsync.json();

    return json;
  } catch (e) {
    return e;
  }
};
//调用post接口
const postMgrCenterData = async (
  url,
  data,
  level,
  api = config.UserPersonaProxy,
  content_type = "urlencoded",
  arr = false,
  Params = {}

) => {
    let token = sessionStorage.getItem("token");
  let UserInfo = sessionStorage.getItem("UserInfo");
  if(!UserInfo||UserInfo.UserID||!token){
      console.log('数据不全')
      return;
  }
  let moreParams = {
    requestHeader: {
      Lg_MgrCenter_Token: token,
      Lg_MgrCenter_UserId: UserInfo.UserID,
      Lg_MgrCenter_Client:1
    },
    content_type:'json',
    ...Params,
  };
  try {
    let fetchAsync = "";

    try {
      fetchAsync = await postData(
        api + url,
        data,
        level,
        content_type,
        false,
        arr
      );
    } catch (e) {
      return e;
    }

    let json = await fetchAsync.json();

    return json;
  } catch (e) {
    return e;
  }
};
