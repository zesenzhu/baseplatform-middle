import UpDataState from '../../actions/UpDataState';

function handleData(data) {
    let Grades = data.Grades;


    let Grade = [{ value: 0, title: '全部' }];
    let Class = {0:[{ value: 0, title: '全部' }]}

    Grades instanceof Array && Grades.map((child,index) => {
        Grade.push({
            value:child.GradeID,
            title:child.GradeName
        })
        let childClass = [{ value: 0, title: '全部班级' }]
        child.Classes instanceof Array && child.Classes.map((child,index) => {
            childClass.push({
                value:child.ClassID,
                title:child.ClassName,
                GradeID:child.GradeID
            })
        })
        Class[child.GradeID] = childClass;
    })
    return {Grade:Grade,Class:Class}
}
const GetGraduateGradeClassMsg = (state = { Grade: [{ value: 0, title: '全部' }], Class:{0:[{ value: 0, title: '全部' }]}}, actions) => {
    // let returnData = {grades:null};
    switch (actions.type) {
        case UpDataState.GET_GRADUATE_GRADE_CLASS_MSG:
            let returnData = handleData(actions.data);
            // console.log(returnData)
            return Object.assign({}, state, { ...returnData });
        default:
            return state;
    }
};


export default GetGraduateGradeClassMsg;