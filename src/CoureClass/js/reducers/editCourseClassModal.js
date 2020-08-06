const IS_WALKING_CLASS = 'IS_WALKING_CLASS';

const IS_NOT_WALKING_CLASS = 'IS_NOT_WALKING_CLASS';

export const isWalkingClass = () =>{

    return { type:IS_WALKING_CLASS };


};

export const isNotWalkingClass = () =>{

    return { type:IS_NOT_WALKING_CLASS };


};

const defaultState = {

  isWalkingClass:false

};

const editCourseClassModal = (state=defaultState,actions) =>{

  switch (actions.type) {

      case IS_NOT_WALKING_CLASS:

          return {...state,isWalkingClass:false};

      case IS_WALKING_CLASS:

          return { ...state,isWalkingClass:true };

      default:

          return state;

  }

};

export default editCourseClassModal;