import React from "react";
import { connect } from "react-redux";
import {
  CheckBox,
  CheckBoxGroup,
  Tips,
  DropDown,
  Button,
} from "../../../../common";
import { Input } from "antd";
import actions from "../../actions";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import ClassCropperModal from "../../../../common/js/CropperModal";

import "../../scss/SchoolModal.scss";
const { UpDataState, UpUIState } = actions;

// require("../../../common/js/PicUpload/juqery.cp.picUploader");
class SchoolModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentWillMount() {
    const { dispatch, DataState, UIState } = this.props;
 
 
  }
  componentDidMount() {
    const { dispatch, DataState, UIState } = this.props;
  }
  
   
  render() {
    const { DataState, UIState } = this.props;
     
    return (
      <div className="SchoolModal" id="SchoolModal">
         
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState,
  };
};
export default connect(mapStateToProps)(SchoolModal);
