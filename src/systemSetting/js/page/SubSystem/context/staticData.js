/**
 * @description: 静态数据
 * @param {*}
 * @return {*}
 */
// 都是多地方使用，不要乱改，改前先看看会影响那些地方
export const SysStateList = [
  {
    value: 0,
    title: "全部",
    name: "全部",
  },
  {
    value: 1,
    title: "未购买",
    name: "未购买",
  },
  {
    value: 2,
    title: `已过期`,
    name: `已过期`,
  },
  {
    value: 3,
    title: `未部署`,
    name: `未部署`,
  },
  {
    value: 4,
    title: `已关闭`,
    name: `已关闭访问`,
  },
  {
    value: 5,
    title: `已开启`,
    name: `已开启访问`,
  },
];

export const SysTypeList = [
  {
    value: 0,
    title: `全部`,
  },
  {
    value: `1`,
    title: `教学类`,
  },
  {
    value: `2`,
    title: "辅助工具类",
  },
  {
    value: `3`,
    title: `办公类`,
  },
  {
    value: `4`,
    title: `后台管理类`,
  },
  {
    value: `5`,
    title: `资源库类`,
  },
];
export const UserTypeList = [
  {
    value: "",
    title: "全部",
    name: "管理员,教师,学生,家长",
  },
  {
    value: `0`,
    title: `管理员`,
    name: `管理员`,
  },
  {
    value: `1`,
    title: "教师",
    name: "教师",
  },
  {
    value: `2`,
    title: `学生`,
    name: `学生`,
  },
  {
    value: `3`,
    title: `家长`,
    name: `家长`,
  },
];
let sysStateData = {};
SysStateList.forEach((child, index) => {
  sysStateData[child.value] = child.name;
});
export const SysStateData = sysStateData;

let userTypeData = {};
UserTypeList.forEach((child, index) => {
  userTypeData[child.value] = child.name;
});
export const UserTypeData = userTypeData;

let sysTypeData = {};
SysTypeList.forEach((child, index) => {
  sysTypeData[child.value] = child.title;
});
export const SysTypeData = sysTypeData;

export default {
  SysTypeData: sysTypeData,
  UserTypeData: userTypeData,
  SysStateData: sysStateData,
  SysStateList,
  UserTypeList,
  SysTypeList,
};
