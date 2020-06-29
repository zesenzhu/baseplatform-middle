// import CONFIG from '../../../../common/js/config';
import ApiActions from '../data/Api';
import AppAlertAction from '../UI/AppAlertAction'
import { init } from 'echarts';
import Api from '../data/Api';
const GET_CURRENT_SEMESTER_INFO = "GET_CURRENT_SEMESTER_INFO";//获取当前学年学期的信息
const SEMESTER_LOADING_HIDE = "SEMESTER_LOADING_HIDE";//loading界面的展示或消失
const REFRESH_SEMESTER_INFO = "REFRESH_SEMESTER_INFO"//刷新学期信息
const GET_CURRENT_SCHOOL_INFO = "GET_CURRENT_SCHOOL_INFO"//获取当前学校信息
const REFRESH_SCHOOL_INFO = "REFRESH_SCHOOL_INFO"//刷新当前学校信息
const CET_CURRENT_SUBSYSTEM_INFO = "CET_CURRENT_SUBSYSTEM_INFO"//获取子系统详情
const REFRESH_SUBSYSTEM_INFO = "REFRESH_SUBSYSTEM_INFO"//刷新当前子系统信息
const INIT_PERIOD_LIST = "INIT_PERIOD_LIST"//初始化学制选择表
// const UPDATA_SCHOOL_LOGOURL="UPDATA_SCHOOL_LOGOURL"//更新学校校徽
const GET_SERVER_ADDRESS="GET_SERVER_ADDRESS"//获取服务器地址





const getCurrentSemester = (SchoolID) => {

    return dispatch => {
        // dispatch({
        //     type: SEMESTER_LOADING_HIDE,
        //     data: true
        // })
        const url = `/SysMgr/Setting/GetCurrentTermInfo?SchoolID=${SchoolID}`;


        ApiActions.getMethod(url).then(json => {
            let semesterInfo = json.Data;

            console.log(semesterInfo);

            for (let item in semesterInfo) {
                if (item === "Term") {
                    let termNum = semesterInfo[item][semesterInfo[item].length - 1]
                    // console.log(semesterInfo[item]);
                    let ChineseName = termNum === "1" ? "第一学期" : "第二学期"
                    let TermArr = semesterInfo[item].split('-');


                    semesterInfo = {
                        ...semesterInfo,
                        TermStartYear:TermArr[0],
            TermEndYear:TermArr[1].slice(0,TermArr[1].length-2),
                        "termNum": termNum,
                        "ChineseName": ChineseName,
                        defaultTerm: item
                    }
                }
                else if (item === "TermStartDate") {
                    semesterInfo = {
                        ...semesterInfo,
                        "StartYear": new Date(semesterInfo[item].replace(/-/g, '/')).getFullYear().toString(),
                        "StartMonth": new Date(semesterInfo[item].replace(/-/g, '/')).getMonth() + 1,
                        "StartDay": new Date(semesterInfo[item].replace(/-/g, '/')).getDate(),
                        defaultStartDate: semesterInfo.TermStartDate
                    }

                }
                else if (item === "TermEndDate") {

                    semesterInfo = {
                        ...semesterInfo,
                        "EndYear": new Date(semesterInfo[item].replace(/-/g, '/')).getFullYear(),
                        "EndMonth": new Date(semesterInfo[item].replace(/-/g, '/')).getMonth() + 1,
                        "EndDay": new Date(semesterInfo[item].replace(/-/g, '/')).getDate(),
                        defaultEndDate: semesterInfo.TermEndDate

                    }

                }
            }

            let SemesterName = `${semesterInfo.TermStartYear}-${semesterInfo.TermEndYear}`
            semesterInfo = {
                ...semesterInfo,
                "SemesterName": SemesterName

            }
            console.log(typeof semesterInfo.StartYear);
            console.log(typeof semesterInfo.StartMonth);
            console.log(semesterInfo)
            if (json.StatusCode === 200) {
                dispatch({
                    type: GET_CURRENT_SEMESTER_INFO,
                    data: semesterInfo
                })
                dispatch({
                    type: SEMESTER_LOADING_HIDE,
                    data: false
                })


            }
            else {
                dispatch(AppAlertAction.alertError({ title: `数据加载发生错误：${json.Msg}` }))
                console.log("错误提示: " + json.Msg)
                console.log(json.StatusCode)
            }




        });


    }
}
//获取服务器地址
 const getServerAdd=()=>{
     return dispatch=>{
         const url ="/Base/GetBaseServerAddr"
         ApiActions.getMethod(url,1).then(json=>{
             if(json.StatusCode===200){
                 let serverAdd=json.Data.ResHttp
                 dispatch({
                     type:GET_SERVER_ADDRESS,
                     data:serverAdd
                 })
             }
             else{
                  dispatch(AppAlertAction.alertError({ title: `数据加载发生错误：${json.Msg}` }))
             }
         })
     }
 }



//获取当前学校详情

const getCurrentSchoolInfo = (SchoolID) => {
    return dispatch => {
        // dispatch({
        //     type: SEMESTER_LOADING_HIDE,
        //     data: true
        // })
        const url = `/SysMgr/Setting/GetSchoolInfo?SchoolID=${SchoolID}`;
        ApiActions.getMethod(url).then(json => {
            let schoolInfo = json.Data;
            let periodInfo = [
                { ID: "P1", Name: "小学", Period: "", checked: false },
                { ID: "P2", Name: "初中", Period: "", checked: false },
                { ID: "P3", Name: "高中", Period: "", checked: false }
            ]
            let arr = schoolInfo.SchoolSessionType.split('/')

            if (json.StatusCode === 200) {
                for (let item in schoolInfo) {
                    if (item === "SchoolSessionType") {
                        let firstParam = schoolInfo[item].split('/')[0]//表示小学的学制长  0表示没有初中
                        let secondParam = schoolInfo[item].split('/')[1]//表示初中的学制长 0表示没有初中
                        let thirdParam = schoolInfo[item].split('/')[2]//表示高中的学制长 0表示没有高中
                        //默认是六年制小学与三年制初中搭配，五年制小学与四年制高中搭配
                        if (firstParam === "5") {
                            //如果第一个参数是5，无论第二第三个参数是什么，都设置为如下
                            schoolInfo = {
                                ...schoolInfo,
                                primaryType: "五年制小学",
                                middleType: "四年制初中",
                                primaryNum: "5",
                                middleNum: "4",

                            }
                        }
                        else if (firstParam === "6") {
                            //如果第一个参数是6，无论第二第三个参数是什么，都设置为如下
                            schoolInfo = {
                                ...schoolInfo,
                                primaryType: "六年制小学",
                                middleType: "三年制初中",
                                primaryNum: "6",
                                middleNum: "3"
                            }
                        }
                        else if (firstParam === "0" && secondParam === "3") {
                            /*   如果参数为03X 表示只有初中或者初中+高中，但默认绑定六年制小学
                                 绑定时的数据只在修改学校基础信息中体现。
                                 举个例子,当前情况下学校只有初中，但想添加一个小学，此时需要点击小学的选项卡，
                                 如果此时初中为三年制，则点击小学后，绑定的就是六年制的小学，而不是无对应显示或五年制小学
                                 下面的情况以此类推 
                             */

                            schoolInfo = {
                                ...schoolInfo,
                                primaryType: "六年制小学",
                                middleType: "三年制初中",
                                primaryNum: "6",
                                middleNum: "3",

                            }
                        }
                        else if (firstParam === "0" && secondParam === "4") {
                            //如上面判断类似
                            schoolInfo = {
                                ...schoolInfo,
                                primaryType: "五年制小学",
                                middleType: "四年制初中",
                                primaryNum: "5",
                                middleNum: "4",

                            }

                        }
                        else if (firstParam === "0" && secondParam === "0" && thirdParam === "3") {
                            //如果只有参数为003，则表示只有高中，默认绑定是六年制小学与三年制初中,只是在修改学校基础信息上起作用
                            schoolInfo = {
                                ...schoolInfo,
                                primaryType: "六年制小学",
                                middleType: "三年制初中",
                                primaryNum: "6",
                                middleNum: "3",

                            }

                        }
                    }


                    else if (item === "SchoolType") {
                        if (schoolInfo[item] === 7) {
                            schoolInfo = {
                                ...schoolInfo,
                                highType: "三年制高中",
                                highNum: "3"
                            }

                            for (let i of periodInfo) {
                                i.checked = true
                            }
                        }
                        else if (schoolInfo[item] === 1) {
                            periodInfo[0].checked = true
                        }
                        else if (schoolInfo[item] === 2) {
                            periodInfo[1].checked = true
                        }
                        else if (schoolInfo[item] === 3) {
                            periodInfo[0].checked = true
                            periodInfo[1].checked = true
                        }
                        else if (schoolInfo[item] === 4) {
                            periodInfo[2].checked = true
                        } else if (schoolInfo[item] === 6) {

                            periodInfo[1].checked = true
                            periodInfo[2].checked = true
                        }
                        else {
                            for (let i of periodInfo) {
                                i.checked = false
                            }
                        }
                    }
                }




                dispatch({
                    type: GET_CURRENT_SCHOOL_INFO,
                    data: schoolInfo,

                })
                dispatch({
                    type: INIT_PERIOD_LIST,
                    data: periodInfo
                })
                // console.log(schoolInfo)
                dispatch({
                    type: SEMESTER_LOADING_HIDE,
                    data: false
                })
            }
            else {
                dispatch(AppAlertAction.alertError({ title: `数据加载发生错误：${json.Msg}` }))
                console.log("错误提示: " + json.Msg)
                console.log(json.StatusCode)

            }
        });


    }

}


//获取子系统详情
const getCurrentSbusystemInfo = ({ UserType, IsOpened, keyword }) => {
    UserType = UserType ? UserType : "";
    IsOpened = IsOpened ? IsOpened : "2";
    keyword = keyword ? keyword : "";

    return dispatch => {
        // dispatch({
        //     type: SEMESTER_LOADING_HIDE,
        //     data: true
        // })
        const url = `/SysMgr/Setting/GetAccessInfo?UserType=${UserType}&IsOpened=${IsOpened}&keyword=${keyword}`;
        ApiActions.getMethod(url).then(json => {
            // let subsystemInfo = json.Data;
            // console.log(subsystemInfo)

            if (json.StatusCode === 200) {
                let subsystemInfo = json.Data;
                // 计算有多少个子系统Total
                let Total = subsystemInfo.List.length;
                //计算子系统关闭的数量
                let closeNum = 0;
                let overside=0

                subsystemInfo.List.map((item, key) => {
                    //暂时存放UserType解析出来的(数字转成对应的中文)
                    let userTypeString = [];
                    //暂存的item
                    let tempitem = item
                    if (item.SubSystemStatus === 0) {
                        closeNum++;

                    }
                    if(item.CanBeClose===false){
                        overside++
                    }
                    //将每个子系统的UserType解析出来的(数字转成对应的中文)
                    //0：管理员，1：教师，2：学生，3：家长，7：领导、
                    userTypeString = item.UserType.replace(/\,/g, "、").replace("0", "管理员").replace("1", "教师").replace("2", "学生").replace("7", ";领导")

                    tempitem = {
                        ...tempitem,
                        UserTypeString: userTypeString
                    }

                    subsystemInfo.List.splice(key, 1, tempitem)

                })
                //将计算值添加到数据结构中
                subsystemInfo = {
                    ...subsystemInfo,
                    Total: Total-overside,
                    TotalClose: closeNum
                }


                dispatch({
                    type: CET_CURRENT_SUBSYSTEM_INFO,
                    data: subsystemInfo
                })
                dispatch({
                    type: SEMESTER_LOADING_HIDE,
                    data: false
                })
            }
            else {
                console.log("错误提示：" + json.Msg)
                console.log(json.StatusCode)
            }
        });

    }
}
//测试使用 无效
// const getCurrentSbusystemInfo1 = () => {
//     return dispatch => {
//         const url = `/temp/SystemInfo`;
//         ApiActions.tempGetMethod(url).then(json => {
//             let subsystemInfo = json.Data;
//             // console.log(subsystemInfo)

//             //计算有多少个子系统Total
//             let Total = subsystemInfo.List.length;
//             //转换英文to中文用户类型
//             let zhUserName = ""
//             let namelist = []
//             //计算子系统关闭的数量
//             let closeNum = 0
//             subsystemInfo.List.map((item, key) => {
//                 // let count = 0;
//                 if (item.SubSystemStatus === 1) {
//                     closeNum++;
//                     // console.log("找到了")
//                 }
//                 // namelist=item.UserType.split(',')


//             })
//             // console.log(count)
//             //将计算值添加到数据结构中
//             subsystemInfo = {
//                 ...subsystemInfo,
//                 "Total": Total,
//                 "TotalClose": closeNum
//             }






//             dispatch({
//                 type: CET_CURRENT_SUBSYSTEM_INFO,
//                 data: subsystemInfo
//             })
//             dispatch({
//                 type: SEMESTER_LOADING_HIDE
//             })


//             // console.log("错误提示："+json.Msg)
//             // console.log(json.StatusCode)

//         });

//     }
// }









export default {
    GET_CURRENT_SEMESTER_INFO,
    getCurrentSemester,
    REFRESH_SEMESTER_INFO,
    SEMESTER_LOADING_HIDE,
    getCurrentSchoolInfo,
    GET_CURRENT_SCHOOL_INFO,
    REFRESH_SCHOOL_INFO,
    getCurrentSbusystemInfo,
    // getCurrentSbusystemInfo1,
    CET_CURRENT_SUBSYSTEM_INFO,
    REFRESH_SUBSYSTEM_INFO,
    INIT_PERIOD_LIST,
    // UPDATA_SCHOOL_LOGOURL
    GET_SERVER_ADDRESS,
    getServerAdd

}