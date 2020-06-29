import React,{Component} from 'react';

import { Loading } from "../../../../common";

import Base from './Base';

import Safe from './Safe';

import Author from './Author';

import { connect } from 'react-redux';

class ManagerContent extends Component{

    constructor(props) {

        super(props);



    }


    render() {

        const { ModuleCommonInfo } = this.props;

        return (

           <React.Fragment>

               {

                   ModuleCommonInfo.menuActive === 'base'? <Base></Base>:''

               }

               {

                   ModuleCommonInfo.menuActive === 'safe'? <Base></Base>:''

               }

               {

                   ModuleCommonInfo.menuActive === 'author'? <Base></Base>:''

               }

           </React.Fragment>

        );

    }

}


const mapStateToProps = (state) => {

  const { ModuleCommonInfo } = state;

  return {

      ModuleCommonInfo

  }

};

export default connect(mapStateToProps)(ManagerContent);