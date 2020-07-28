import React,{Component} from 'react';

import { connect } from 'react-redux';

import ImportExcel from '../../../common/js/Import/ImportExcel';

import AppLoadingActions from '../actions/AppLoadingActions';



class Import extends Component{

    constructor(props){

        super(props);

        const { dispatch } = props;

        const Hash = location.hash;

        const  HashParam = Hash.split('/')[2];

        if (HashParam.includes('Teacher')) {

            this.state={

                ImportTitle:'导入任课教师',

                ImportTarget:'courseteacher'

            };

            document.title='导入任课教师';

        }else if(HashParam.includes('Genger')){

            /*this.setState({ ImportTitle:'导入班主任班长',ImportTarget:'gangermonitor'});
*/
            this.state={

                ImportTitle:'导入班主任及班长',

                ImportTarget:'gangermonitor'

            };

            document.title='导入班主任及班长';

        }else if(HashParam.includes('Student')){

            this.state={

                ImportTitle:'导入学生',

                ImportTarget:'student'

            };

            document.title='导入学生';

        }



    }

    UNSAFE_componentWillReceiveProps(props) {

        const {ModuleSetting, UIState,dispatch} = props;

        const {AppLoading} = UIState;

        if (AppLoading.show&&(!ModuleSetting.ShowLeftMenu)&&(!ModuleSetting.ShowBarner)) {

            dispatch(AppLoadingActions.hide());

        }

    }




    render(){

        const { LoginUser } = this.props;

        return <div id="import-wrapper">

            <ImportExcel ImportTitle={this.state.ImportTitle} ImportTarget={this.state.ImportTarget}></ImportExcel>

        </div>

    }

}

const  mapStateToProps = (state) => {

    let { LoginUser,ModuleSetting,UIState } = state;

    return {

        LoginUser,ModuleSetting,UIState

    }

};

export default connect(mapStateToProps)(Import);