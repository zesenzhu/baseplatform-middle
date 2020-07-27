const COLLEGE_BREADCRUMB_CHANGE = 'COLLEGE_BREADCRUMB_CHANGE';

const BREADCRUMB_INIT = 'BREADCRUMB_INIT';

const COURSE_BREADCRUMB_CHANGE = 'COURSE_BREADCRUMB_CHANGE';

const TEACHER_BREADCRUMB_CHANGE = 'TEACHER_BREADCRUMB_CHANGE';


const MANAGE_BREADCRUMB_CHANGE = 'MANAGE_BREADCRUMB_CHANGE';



export const collegeBreadCrumbChange = (payLoad) =>{

    return { type:COLLEGE_BREADCRUMB_CHANGE,data:payLoad };

};

export const courseBreadCrumbChange = (payLoad) =>{

    return { type:COURSE_BREADCRUMB_CHANGE,data:payLoad };

};

export const teacherBreadCrumbChange = (payLoad) => {

    return { type:TEACHER_BREADCRUMB_CHANGE,data:payLoad };

};

export const manageBreadCrumbChange = (payLoad) => {

  return {type:MANAGE_BREADCRUMB_CHANGE,data:payLoad};

};


export const breadCrumbInit = ()=>{

    return {type:BREADCRUMB_INIT};

};


const defaultState = {

   college:{

      collegeID:'',

      collegeName:''

   },

   course:{

       subjectID:'',

       subjectName:'',

       courseType:'',

       courseTypeName:''

   },

   teacher:{

       teachingRoomID:'',

       teacherRoomName:''

   },

    manage:{

        collegeID:'',

        collegeName:'',

        gradeID:'',

        gradeName:'',

        subjectID:'',

        subjectName:'',

        courseType:'',

        courseTypeName:'',

        courseName:'',

        courseID:'',

        teachingRoomID:'',

        teachingRoomName:'',

        teacherID:'',

        teacherName:''

    }

};

const breadCrumb = (state=defaultState,actions) =>{

    switch (actions.type) {

        case COLLEGE_BREADCRUMB_CHANGE:

            return {

                college:{

                    ...state.college,

                    ...actions.data

                },

                course:{

                    subjectID:'',

                    subjectName:'',

                    courseType:'',

                    courseTypeName:''

                },

                teacher:{

                    teachingRoomID:'',

                    teacherRoomName:''

                },

                manage:{

                    collegeID:'',

                    collegeName:'',

                    gradeID:'',

                    gradeName:'',

                    subjectID:'',

                    subjectName:'',

                    courseType:'',

                    courseTypeName:'',

                    courseName:'',

                    courseID:'',

                    teachingRoomID:'',

                    teachingRoomName:'',

                    teacherID:'',

                    teacherName:''

                }

            };


        case COURSE_BREADCRUMB_CHANGE:

            return {

                college:{

                    collegeID:'',

                    collegeName:''

                },

                teacher:{

                    teachingRoomID:'',

                    teacherRoomName:''

                },

                manage:{

                    collegeID:'',

                    collegeName:'',

                    gradeID:'',

                    gradeName:'',

                    subjectID:'',

                    subjectName:'',

                    courseType:'',

                    courseTypeName:'',

                    courseName:'',

                    courseID:'',

                    teachingRoomID:'',

                    teachingRoomName:'',

                    teacherID:'',

                    teacherName:''

                },

                course:{

                    ...state.course,

                    ...actions.data

                }

            };

        case TEACHER_BREADCRUMB_CHANGE:

            return {

                college:{

                    collegeID:'',

                    collegeName:''

                },

                teacher:{

                    ...state.teacher,

                    ...actions.data

                },

                course:{

                    subjectID:'',

                    subjectName:'',

                    courseType:'',

                    courseTypeName:''

                },

                manage:{

                    collegeID:'',

                    collegeName:'',

                    gradeID:'',

                    gradeName:'',

                    subjectID:'',

                    subjectName:'',

                    courseType:'',

                    courseTypeName:'',

                    courseName:'',

                    courseID:'',

                    teachingRoomID:'',

                    teachingRoomName:'',

                    teacherID:'',

                    teacherName:''

                }

            };

        case MANAGE_BREADCRUMB_CHANGE:

            return {

                college:{

                    collegeID:'',

                    collegeName:''

                },

                teacher:{

                   teachingRoomID:'',

                   teachingRoomName:''

                },

                course:{

                    subjectID:'',

                    subjectName:'',

                    courseType:'',

                    courseTypeName:''

                },

                manage:{

                    ...state.manage,

                    ...actions.data

                }

            };

        case BREADCRUMB_INIT:

            return {

                ...state,

                college:{

                    collegeID:'',

                    collegeName:''

                },

                course:{

                    subjectID:'',

                    subjectName:'',

                    courseType:'',

                    courseTypeName:''

                },

                teacher:{

                    teachingRoomID:'',

                    teacherRoomName:''

                },

                manage:{

                    collegeID:'',

                    collegeName:'',

                    gradeID:'',

                    gradeName:'',

                    subjectID:'',

                    subjectName:'',

                    courseType:'',

                    courseTypeName:'',

                    courseName:'',

                    courseID:'',

                    teachingRoomID:'',

                    teachingRoomName:'',

                    teacherID:'',

                    teacherName:''

                }

            };

        default:

            return state;

    }

};

export default breadCrumb;