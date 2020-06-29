export const NOT_BUSY_ROOM_MODAL_SHOW = 'NOT_BUSY_ROOM_MODAL_SHOW';

export const NOT_BUSY_ROOM_MODAL_HIDE = 'NOT_BUSY_ROOM_MODAL_HIDE';

export const showNotBusyRoomModal = () =>{

    return { type:NOT_BUSY_ROOM_MODAL_SHOW };

};

export const hideNotBusyRoomModal = () =>{

    return { type:NOT_BUSY_ROOM_MODAL_HIDE };

};

const defaultState = {

    show:false

};


const NotBusyRoomModal = (state=defaultState,actions) => {

    switch (actions.type) {

        case NOT_BUSY_ROOM_MODAL_SHOW:

            return {...state,show:true};

        case NOT_BUSY_ROOM_MODAL_HIDE:

            return {...state,show:false};

        default:

            return state;

    }

};

export default NotBusyRoomModal;