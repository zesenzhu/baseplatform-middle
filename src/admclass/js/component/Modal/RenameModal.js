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

import "../../../scss/Modal/RenameModal.scss";
const { UpDataState, UpUIState } = actions;

// require("../../../common/js/PicUpload/juqery.cp.picUploader");
class RenameModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { dispatch, DataState, UIState } = this.props;
  }
  componentDidMount() {
    const { dispatch, DataState, UIState } = this.props;
  }

  render() {
    const {
      type,
      editName,
      onEditNameChange,
      onEditNameBlur,
      tipsVivible,
      tipsTitle,
      className,
      children,
      ...params
    } = this.props;
    let title = "";
    let placeholder = '请输入名称'
    if (type === "grade") {
      title = "年级名称";
      placeholder = '请输入年级名称'
    } else if (type === "class") {
      title = "班级名称";
      placeholder = '请输入班级名称'
    }else {
      title = "名称";

    }
    return (
      <div className={`RenameModal ${className}`} id="RenameModal" {...params}>
        <div className="modal-row">
          <span className="row-left">{title+':'}</span>
          <span className="row-right">
            <Tips
              overlayClassName="tips"
              placement={"right"}
              getPopupContainer={(e) => e.parentNode}
              autoAdjustOverflow={false}
              visible={tipsVivible}
              title={tipsTitle}
            >
              <Input
                className="rename-input"
                maxLength={20}
                placeholder={placeholder}
                width={'200px'}
                type="text"
                name={"rename"+type}
                value={editName}
                onChange={ (e)=>onEditNameChange(e)}
                onBlur={(e)=> onEditNameBlur(e)}
              />
            </Tips>
          </span>
        </div>
        {children}
      </div>
    );
  }
}

RenameModal.defaultProps = {
  className: "",
  onEditNameBlur:()=>{},
  onEditNameChange:()=>{},
  editName:'',
  tipsTitle:'名称不能为空',
  tipsVivible:false
};
export default RenameModal;
