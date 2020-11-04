import React,{ Component } from 'react';


class ClassTab extends Component{

    render() {

        const  { ClassList,ActiveID,ClassChange } = this.props;

        return (

            <div className="class-top-change-tab">

                <div className="class-top-wrapper clearfix">

                    {

                        ClassList.map((item,key) => {

                            return  <div key={key} className={`tab-item ${ActiveID===item.ClassID?'active':''}`}  title={item.ClassName} onClick={e=>ClassChange(item.ClassID,item)}>{item.ClassName}</div>

                        })

                    }

                </div>

            </div>

        );

    }

}

export default ClassTab;