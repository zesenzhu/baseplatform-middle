import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import '../../scss/ShowCard.scss'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';

class ShowCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let To = '';
        if (this.props.type === 'subject') {
            To = '/Subject/' + this.props.params.SubjectID + '/all';
        } else if (this.props.type === 'class') {
            To = '/Subject/' + this.props.subject + '/Class/' + this.props.params.GradeID;
        }

        return (
            <Router>
                <Link className='ShowCard-box ' to={To}>

                    <div className='box-3'></div>
                    <div className='box-2'></div>

                    <div className='box-main'>
                        <div className='main-content'>
                            <p title={this.props.type === 'subject' ? this.props.params.SubjectName + '教学班' : this.props.params.GradeName} className='content-tips'>{this.props.type === 'subject' ? this.props.params.SubjectName + '教学班' : this.props.params.GradeName}</p>
                            <div className='content-hr' ></div>
                            <div className='content-details'>
                                <div className='details-row clearfix'>
                                    <span className='left'>教学班数量：</span>
                                    <span className='right'>{this.props.params.CourseClassCount}个</span>
                                </div>
                                <div className='details-row clearfix'>
                                    <span className='left'>任课教师数量：</span>
                                    <span className='right'>{this.props.params.TeacherCount}人</span>
                                </div>
                                <div className='details-row clearfix'>
                                    <span className='left'>学生数量：</span>
                                    <span className='right'>{this.props.params.StudentCount}人</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </Link>
            </Router>
        )
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(ShowCard);