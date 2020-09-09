import React,{useEffect,useCallback,useMemo,useRef,useState,memo,useImperativeHandle,forwardRef} from 'react';

import {useDispatch} from 'react-redux';

import {Tips,DropDown} from "../../../common";

import {GetProvince,GetCity,GetCounty} from "../../actions/apiActions";

import './index.scss';

function AreaCheck(props,ref) {

    //省份

    const [province,setProvince] = useState({

        dropSelectd:{ value:'',title:'请选择省份' },

        dropList:[],

        tip:false

    });

    //城市

    const [city,setCity] = useState({

        dropSelectd:{value:'',title:'请选择城市' },

        dropList:[],

        tip:false,

        show:true,

        disabled:true

    });

    //市区

    const [county,setCounty] = useState({

        dropSelectd:{ value:'',title:'请选择区县' },

        dropList:[],

        tip:false,

        disabled:true

    });

    const dispatch = useDispatch();


    const {ProvinceID,CityID,CountyID} = props;

    const {areaValueChange=()=>{}} = props;

    const provinceRef = useRef(province);

    const cityRef = useRef(city);

    const countyRef = useRef(county);



    useEffect(()=>{


        if (ProvinceID&&CityID&&CountyID){//当已选区域的时候

            const getProvince = GetProvince({dispatch});

            const getCity = GetCity({dispatch,ProvinceID});

            const getCounty = GetCounty({dispatch,CityID});

            Promise.all([getProvince,getCity,getCounty]).then(res=>{

                if (res[0]){

                    const data = res[0];

                    const list = data&&data.length>0?data.map(i=>({value:i.AreaID,title:i.AreaName})):[];

                    const dropSelectd = list.find(i=>i.value===ProvinceID)?list.find(i=>i.value===ProvinceID):{value:'',title:'请选择省份'};

                    setProvince(d=>{

                        provinceRef.current = {...d,dropList:list,dropSelectd};

                        return {...d,dropList:list,dropSelectd}

                    });

                }

                if (res[1]){

                    const data = res[1];

                    const list = data&&data.length>0?data.map(i=>({value:i.AreaID,title:i.AreaName})):[];

                    const dropSelectd = list.find(i=>i.value===CityID)?list.find(i=>i.value===CityID):{value:'',title:'请选择城市'};

                    setCity(d=>{

                        const show = list.length>1;

                        cityRef.current = {...d,dropList:list,dropSelectd,show,disabled:false};

                        return {...d,dropList:list,dropSelectd,show,disabled:false}

                    });

                }

                if (res[2]){

                    const data = res[2];

                    const list = data&&data.length>0?data.map(i=>({value:i.AreaID,title:i.AreaName})):[];

                    const dropSelectd = list.find(i=>i.value===CountyID)?list.find(i=>i.value===CountyID):{value:'',title:'请选择区县'};

                    setCounty(d=>{

                        countyRef.current = {...d,dropList:list,dropSelectd,disabled:false};

                        return {...d,dropList:list,dropSelectd,disabled:false}

                    });

                }

            })

        }else{ //当没有选择区域的时候

            GetProvince({dispatch}).then(data=>{

                const list = data&&data.length>0?data.map(i=>({value:i.AreaID,title:i.AreaName})):[];

                setProvince(d=>{

                    provinceRef.current = {...d,dropList:list};

                    return {...d,dropList:list}

                });

            });

        }

    },[ProvinceID,CityID,CountyID]);


    //选择省份
    const provinceChange = useCallback((data)=>{

        const {value,title} = data;

        setProvince(d=>{

            provinceRef.current = {...d,dropSelectd:data,tip:false};

            setCounty(data=>{

                countyRef.current =  {...data,dropSelectd:{value:'',title:'请选择区县'},tip:false,disabled:true};

                getCity();

                areaValueChange({

                    provinceID:provinceRef.current.dropSelectd.value,

                    provinceName:provinceRef.current.dropSelectd.title,

                    showProvinceTip:()=>setProvince(d=>{

                        provinceRef.current = {...d,tip:true};

                        return {...d,tip:true};

                    }),

                    hideProvinceTip:()=>setProvince(d=>{

                        provinceRef.current = {...d,tip:false};

                        return {...d,tip:false};

                    }),

                    cityID:cityRef.current.dropSelectd.value,

                    cityName:cityRef.current.dropSelectd.title,

                    showCityTip:()=>setCity(d=>{

                        cityRef.current = {...d,tip:true};

                        return {...d,tip:true};

                    }),

                    hideCityTip:()=>setCity(d=>{

                        cityRef.current = {...d,tip:false};

                        return {...d,tip:false};

                    }),

                    countyID:countyRef.current.dropSelectd.value,

                    countyName:countyRef.current.dropSelectd.title,

                    showCountyTip:()=>setCounty(d=>{

                        countyRef.current = {...d,tip:true};

                        return {...d,tip:true};

                    }),

                    hideCountyTip:()=>setCounty(d=>{

                        countyRef.current = {...d,tip:false};

                        return {...d,tip:false};

                    }),

                });

                return {...data,dropSelectd:{value:'',title:'请选择区县'},tip:false,disabled:true};

            });

            return {...d,dropSelectd:data,tip:false};

        });

    },[]);

    //城市列表变化

    const getCity = ()=>{

        GetCity({dispatch,ProvinceID:provinceRef.current.dropSelectd.value}).then(data=>{

            const list = data&&data.length>0?data.map(i=>({value:i.AreaID,title:i.AreaName})):[];

            if (list.length===1){

                setCity(d=>{

                    cityRef.current = { ...d,tip:false,show:false,dropSelectd:list[0]};

                    getCounty();

                    return { ...d,tip:false,show:false,dropSelectd:list[0]};

                });

            }else{

                setCity(d=>{

                    cityRef.current = { ...d,disabled:false,dropList:list,tip:false,show:true,dropSelectd:{value:'',title:'请选择城市'}};

                    return { ...d,disabled:false,dropList:list,tip:false,show:true,dropSelectd:{value:'',title:'请选择城市'}};

                });

            }

        });

    };


    //城市选择变化
    const cityChange = useCallback((data)=>{

        setCity(d=>{

            cityRef.current = { ...d,dropSelectd:data,tip:false };

            areaValueChange({

                provinceID:provinceRef.current.dropSelectd.value,

                provinceName:provinceRef.current.dropSelectd.title,

                showProvinceTip:()=>setProvince(d=>{

                    provinceRef.current = {...d,tip:true};

                    return {...d,tip:true};

                }),

                hideProvinceTip:()=>setProvince(d=>{

                    provinceRef.current = {...d,tip:false};

                    return {...d,tip:false};

                }),

                cityID:cityRef.current.dropSelectd.value,

                cityName:cityRef.current.dropSelectd.title,

                showCityTip:()=>setCity(d=>{

                    cityRef.current = {...d,tip:true};

                    return {...d,tip:true};

                }),

                hideCityTip:()=>setCity(d=>{

                    cityRef.current = {...d,tip:false};

                    return {...d,tip:false};

                }),

                countyID:countyRef.current.dropSelectd.value,

                countyName:countyRef.current.dropSelectd.title,

                showCountyTip:()=>setCounty(d=>{

                    countyRef.current = {...d,tip:true};

                    return {...d,tip:true};

                }),

                hideCountyTip:()=>setCounty(d=>{

                    countyRef.current = {...d,tip:false};

                    return {...d,tip:false};

                }),

            });

            getCounty();

            return { ...d,dropSelectd:data,tip:false };

        })

    },[]);


    //获取区县
    const getCounty = () =>{

        const CityID = cityRef.current.dropSelectd&&cityRef.current.dropSelectd.value?cityRef.current.dropSelectd.value:'';

        GetCounty({dispatch,CityID}).then(data=>{

            const list = data&&data.length>0?data.map(i=>({value:i.AreaID,title:i.AreaName})):[];

            setCounty(d=>{

                countyRef.current = { ...d,tip:false,dropSelectd:{value:'',title:'请选择区县'},disabled:false,dropList:list};

                return { ...d,tip:false,dropSelectd:{value:'',title:'请选择区县'},disabled:false,dropList:list}

            });

        });
    };

    //区县变化

    const countyChange = useCallback((data)=>{

        setCounty(d=>{

            countyRef.current = { ...d,tip:false,dropSelectd:data};

            areaValueChange({

                provinceID:provinceRef.current.dropSelectd.value,

                provinceName:provinceRef.current.dropSelectd.title,

                showProvinceTip:()=>setProvince(d=>{

                    provinceRef.current = {...d,tip:true};

                    return {...d,tip:true};

                }),

                hideProvinceTip:()=>setProvince(d=>{

                    provinceRef.current = {...d,tip:false};

                    return {...d,tip:false};

                }),

                cityID:cityRef.current.dropSelectd.value,

                cityName:cityRef.current.dropSelectd.title,

                showCityTip:()=>setCity(d=>{

                    cityRef.current = {...d,tip:true};

                    return {...d,tip:true};

                }),

                hideCityTip:()=>setCity(d=>{

                    cityRef.current = {...d,tip:false};

                    return {...d,tip:false};

                }),

                countyID:countyRef.current.dropSelectd.value,

                countyName:countyRef.current.dropSelectd.title,

                showCountyTip:()=>setCounty(d=>{

                    countyRef.current = {...d,tip:true};

                    return {...d,tip:true};

                }),

                hideCountyTip:()=>setCounty(d=>{

                    countyRef.current = {...d,tip:false};

                    return {...d,tip:false};

                }),

            });

            return { ...d,tip:false,dropSelectd:data}

        });

    },[]);


    useImperativeHandle(ref,()=>({

        provinceID:province.dropSelectd.value,

        provinceName:province.dropSelectd.title,

        showProvinceTip:()=>setProvince(d=>{

            provinceRef.current = {...d,tip:true};

            return {...d,tip:true};

        }),

        hideProvinceTip:()=>setProvince(d=>{

            provinceRef.current = {...d,tip:false};

            return {...d,tip:false};

        }),

        cityID:city.dropSelectd.value,

        cityName:city.dropSelectd.title,

        showCityTip:()=>setCity(d=>{

            cityRef.current = {...d,tip:true};

            return {...d,tip:true};

        }),

        hideCityTip:()=>setCity(d=>{

            cityRef.current = {...d,tip:false};

            return {...d,tip:false};

        }),

        countyID:county.dropSelectd.value,

        countyName:county.dropSelectd.title,

        showCountyTip:()=>setCounty(d=>{

            countyRef.current = {...d,tip:true};

            return {...d,tip:true};

        }),

        hideCountyTip:()=>setCounty(d=>{

            countyRef.current = {...d,tip:false};

            return {...d,tip:false};

        })

    }));


    return(

        <span className={"area-check-wrapper"} ref={ref}>

            <Tips visible={province.tip} title={"请选择省份"}>

                <DropDown width={160} onChange={provinceChange} dropSelectd={province.dropSelectd} dropList={province.dropList}>


                </DropDown>

            </Tips>

            {

                city.show?

                    <Tips visible={city.tip} title={"请选择城市"}>

                        <DropDown width={160} onChange={cityChange} disabled={city.disabled} dropSelectd={city.dropSelectd} dropList={city.dropList}>


                        </DropDown>

                    </Tips>

                    :null

            }

            <Tips visible={county.tip} title={"请选择区县"}>

                <DropDown onChange={countyChange} width={160} disabled={county.disabled} dropSelectd={county.dropSelectd} dropList={county.dropList}>


                </DropDown>

            </Tips>

        </span>

    )

}



export default memo(forwardRef(AreaCheck));