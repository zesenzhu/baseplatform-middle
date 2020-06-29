import UpDataState from  '../../actions/UpDataState';
// userInfo数据类型：
// "UserID":'T0001',
//         "UserName":'李老师',
//         "Gender":'男',
//         "PhotoPath":'http:\\xxxxxxxxxxxxx',//头像
//         "PhotoPath_NoCache":'http:\\xxxxxxxxxxxxx?t=xxxx',//头像，带随机数用于去缓存
//         "UserType":1, //用户类型，0：管理员，1：教师，2：学生，3：家长，7：领导
//         "TitleName":'一级教师',//职称，当UserType==1时，该值有效
//         "SubjectNames":'数学，英语', //所教学科，当UserType==1时，该值有效
//         "GradeName":'一年级',//所属年级，当UserType==2时，该值有效
//         "ClassName":'1班',//所属班级，当UserType==2时，该值有效
//         "ClassNameQM":'一年级>1班',//班级全名，当UserType==2时，该值有效
//         "Sign":'十年树木百年树人',//个性签名，
//         "Position":null,//行政职务，当UserType==7时，该值有效
//         "Source":null,//档案来源，当UserType==2时，该值有效
//         "IDCardNo":'4524241991000000',
//         "Email":'280681432@qq.com',
//         "Telephone":'13066330062',
//         "HomeAddress":'广州市白云区北太路',
//         "SchoolID":'school1',
//         "SchoolName":'白云一中',
//例子：
// ClassID: null
// ClassName: null
// ClassNameQM: null
// Email: ""
// Gender: "保密"
// GradeID: null
// GradeName: null
// GroupID: null
// GroupName: null
// HomeAddress: ""
// IDCardNo: ""
// InnerID: ""
// OperatorID: ""
// OperatorIP: ""
// OperatorName: ""
// PhotoPath: "http://192.168.129.1:30101/lgftp/UserInfo/Photo/Default/Nopic001.jpg?t=1573140444.88665"
// PhotoPath_NoCache: "http://192.168.129.1:30101/lgftp/UserInfo/Photo/Default/Nopic001.jpg?t=1573140444.88665"
// Position: null
// Pwd: ""
// RoleNames: null
// SchoolID: "S27-511-AF57"
// SchoolName: "一体化教育云平台哒哒哒哒哒哒搜索多多多多"
// ShortName: "JackSon"
// Sign: "我就是我，不一样的潇洒！！！！！！！！！！"
// Source: null
// StudentID: null
// StudentName: null
// SubjectIDs: null
// SubjectNames: null
// Telephone: "15626248624"
// TitleID: null
// TitleName: null
// UserClass: 2
// UserID: "adminzzs"
// UserName: "祝泽森校管"
// UserType: 0
const UserInfo = (state = {}, actions)=>{
    switch (actions.type) {
        case UpDataState.GET_USER_INFO:
            
            return Object.assign({},state,{...actions.data});
        default:
            return state;
    }
};

export default UserInfo;