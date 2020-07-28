import React,{Component} from 'react';
class ContentWrapper extends Component{
    render() {
        const {children} = this.props;
        return (
            <div className="admclass-content-wrapper clearfix">
                {children}
            </div>
        );
    }
}
export default ContentWrapper;