import SCGCRActions from  '../../actions/Teacher/SCGCRActions';
//学科，课时、年级、教室reducer
const SubjectCourseGradeClassRoom = (state={},actions) => {

    switch (actions.type) {

        case SCGCRActions.SCGCR_INFO_INIT:

            return {...state,...actions.data};

        case SCGCRActions.SCGCR_INFO_UPDATE:

            return actions.data;

        default:

            return state;

    }

};

export default SubjectCourseGradeClassRoom;