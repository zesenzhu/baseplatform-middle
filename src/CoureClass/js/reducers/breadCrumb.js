const GRADE_BREADCRUMB_CHANGE = 'GRADE_BREADCRUMB_CHANGE';

const BREADCRUMB_INIT = 'BREADCRUMB_INIT';

const SUBJECT_BREADCRUMB_CHANGE = 'SUBJECT_BREADCRUMB_CHANGE';

const MANAGE_BREADCRUMB_CHANGE = 'MANAGE_BREADCRUMB_CHANGE';



export const gradeBreadCrumbChange = (payLoad) =>{

    return { type:GRADE_BREADCRUMB_CHANGE,data:payLoad };

};


export const subjectBreadCrumbChange = (payLoad) => {

    return { type:SUBJECT_BREADCRUMB_CHANGE,data:payLoad };

};

export const manageBreadCrumbChange = (payLoad) => {

  return {type:MANAGE_BREADCRUMB_CHANGE,data:payLoad};

};


export const breadCrumbInit = ()=>{

    return {type:BREADCRUMB_INIT};

};


const defaultState = {

   grade:{

      gradeID:'',

      gradeName:''

   },

   subject:{

       subjectID:'',

       subjectName:''

   },

    manage:{

        subjectID:'',

        subjectName:'',

        gradeID:'',

        gradeName:'',

        teacherID:'',

        teacherName:''

    }

};

const breadCrumb = (state=defaultState,actions) =>{

    switch (actions.type) {

        case GRADE_BREADCRUMB_CHANGE:

            return {

                grade:{

                    ...state.grade,

                    ...actions.data

                },

                subject:{

                    subjectID:'',

                    subjectName:''

                },

                manage:{

                    subjectID:'',

                    subjectName:'',

                    gradeID:'',

                    gradeName:'',

                    teacherID:'',

                    teacherName:''

                }

            };

        case SUBJECT_BREADCRUMB_CHANGE:

            return {

                grade:{

                    gradeID:'',

                    gradeName:''

                },

                subject:{

                    ...state.subject,

                    ...actions.data

                },

                manage:{

                    subjectID:'',

                    subjectName:'',

                    gradeID:'',

                    gradeName:'',

                    teacherID:'',

                    teacherName:''

                }

            };

        case MANAGE_BREADCRUMB_CHANGE:

            return {

                grade:{

                    gradeID:'',

                    gradeName:''

                },

                subject:{

                    ...state.subject,

                    ...actions.data

                },

                manage:{

                    ...state.manage,

                    ...actions.data

                }

            };

        case BREADCRUMB_INIT:

            return {

                ...state,

                grade:{

                    gradeID:'',

                    gradeName:''

                },

                subject:{

                    ...state.subject,

                    ...actions.data

                },

                manage:{

                    subjectID:'',

                    subjectName:'',

                    gradeID:'',

                    gradeName:'',

                    teacherID:'',

                    teacherName:''

                }

            };

        default:

            return state;

    }

};

export default breadCrumb;