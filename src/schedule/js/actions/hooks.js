import React,{useEffect,useRef,useState} from 'react';

export function useStateValue(data,setData) {

    const ref = useRef();

    useEffect(()=>{

        ref.current = data

    },[data]);

    return ref;

}

