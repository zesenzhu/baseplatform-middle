import React,{Component} from 'react';



class ModulesContent extends Component{

    render() {

        const { Modules,ModuleClick } = this.props;



        return (

            <div className="content-wrapper">

                {

                    Modules.map((item,key)=>{

                        return <div key={key} className="modules-row">

                            <div className="modules-wrapper">

                                <div className="modules-type">{item.GroupName}</div>

                                <div className="module-item-wrapper clearfix">

                                    {

                                        item.Modules.map((i,k)=>{

                                            return <div  key={k} className="module-item" onClick={()=>{ ModuleClick({AccessType:i.AccessType,AccessParam:i.AccessParam,ModuleStatus:i.ModuleStatus,SysID:i.SysID})}}>

                                                        <div className="module-bg">

                                                            <div className="module-icon" style={{backgroundImage:`url(${i.ModuleLogoPath})`}}></div>

                                                        </div>

                                                        <div className="title">{i.ModuleName}</div>

                                                    </div>

                                        })

                                    }

                                </div>

                            </div>

                        </div>

                    })

                }

            </div>

        )

    }

}

export default ModulesContent;