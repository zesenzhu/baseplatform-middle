import React,{Component} from 'react';
class TitleBar extends Component{
    render() {
        const {title,type,abstract} = this.props;

        return (
            <div className={`title-bar ${type}`}>
                <div className="title-word">{title}<span className="title-abstract" style={{display:`${abstract?'inline':'none'}`}}>{abstract}</span> </div>
            </div>
        );
    }
}
export default TitleBar;