import React,{useEffect,useRef,useState} from 'react';

export function useStateValue(data,setData) {

    const ref = useRef();

    useEffect(()=>{

        ref.current = data

    },[data]);

    return ref;

}

export function useSetState(data,single) {

    const [state,setState] = useState(data);

    if (single){

        return [state,(dataSource)=>setState(dataSource)];

    }else{

        return [state,(dataSource)=>setState(d=>({...d,...dataSource}))];

    }

}

