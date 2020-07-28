import React,{Component} from 'react';
import {Button} from "../../../common";
class Banner extends Component{
    render() {

        const {addClass,Import} = this.props;

        return (
               <React.Fragment>

                   <Button size="small" color="blue" className="import-admteacher"  shape="round" onClick={()=>Import(2)}>导入班主任及班长</Button>

                   <Button size="small" color="blue"  className="import-teacher"   shape="round" onClick={()=>Import(1)}>导入任课教师</Button>

                   <Button size="small" color="blue" className="add-class"  onClick={()=>addClass()}  shape="round">添加班级</Button>

               </React.Fragment>
        );
    }
}
export default Banner;