import React,{createContext,useReducer} from 'react';

import reducer,{defaultState} from '../store/index';

export const StateContext  = createContext({});

const  ReduxContainer = (props) => {

    const [state,dispatch] = useReducer(reducer,defaultState);

    return  <StateContext.Provider value={{state,dispatch}}>

        {props.children}

    </StateContext.Provider>

};

export default ReduxContainer;