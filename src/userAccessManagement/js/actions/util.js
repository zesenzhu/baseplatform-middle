import CommonAction from "./CommonAction";
import Public from "../../../common/js/public";
import { postData as Post, getData as Get } from "../../../common/js/fetch";
export const getData = async ({
  url = "",
  params = {},
  level = 2,
  mode = "cors",
  IsDesk = false,
  element = true,
}) => {
  if (Object.keys(params).length > 0) {
    url += "?";
    for (let key in params) {
      url += "&" + key + "=" + params[key];
    }
  }
  let data = "";
  console.log(url, level, mode, IsDesk, element);
  return {};
  let res = await Get(url, level, mode, IsDesk, element);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return {res:data,json};
};
export const postData = async ({
  url = "",
  params = {},
  level = 2,
  mode = "cors",
  IsDesk = false,
  element = true,
}) => {
  let data = "";
  let res = await Post(url, params, level, mode, IsDesk, element);
  let json = await res.json();
  if (json.StatusCode === 200) {
    data = json;
  } else {
    data = false; //有错误
  }
  return {res:data,json};
};
export default {
  getData ,
  postData ,
};
