import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Cropper from "react-cropper"; // 引入Cropper
import "cropperjs/dist/cropper.css"; // 引入Cropper对应的css
import { Modal } from "../../index.js";
import "./ClassCropperModal.scss";
import { postData } from "../fetch";
import { ErrorAlert } from "../fetch/util";
const MAX_FILE_SIZE = 2 * 1024 * 1024; //文件最大限制为2MB
export default class ClassCropperModal extends Component {
  static propTypes = {
    // uploadedImageFile: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // onCheck: PropTypes.func.isRequired,
    Visiable: PropTypes.bool.isRequired,
    UpDataUrl: PropTypes.string.isRequired
    // isPaused:PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      classModalVisible: props.Visiable,
      classModalFile: null,
      title: props.title ? props.title : "上传图片",
      bodyStyle: props.bodyStyle ? props.bodyStyle : {},
      filename: props.filename ? props.filename : "",
      baseUrl: props.baseUrl ? props.baseUrl : "http://192.168.129.1:30101", //图片上传基地址
      aspectRatio: props.aspectRatio ? props.aspectRatio : 1,
      isPaused: props.isPaused ? props.isPaused : false,
      diskName: props.diskName ? props.diskName : SubjectResMgr //保存位置，默认为学科资源
      // 提供如下选项：
      // - SubjectResMgr：学科资源管理
      // - Base：基础平台相关资源
      // - SubjectResMgr：学科资源管理
      // - ImportWord：
      // - PersonDisk：学科资源管理
      // - ResShare：学科资源管理
      // - SysSetting：系统设置
      // - uEditor：编辑器相关
      // - UserInfo：用户信息管理
    };
  }

  componentWillMount() {
    const fileReader = new FileReader();
    fileReader.onload = e => {
      const dataURL = e.target.result;
      this.setState({ src: dataURL });
    };
    if (this.state.classModalFile !== null) {
      fileReader.readAsDataURL(this.state.classModalFile);
    }

    // console.log(this.props.Visiable)
  }

  handleSubmit = () => {
    if (this.state.classModalFile === null) {
      let title = "请先选择需要上传的图片";
      ReactDOM.render(
        <ErrorAlert
          //   key={"alert" + "400-" + Math.round(Math.random() * 10000)}
          show={true}
          title={title}
        />,
        document.getElementById("alert")
      );
      return false;
    }
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
          var canvas = this;
          setTimeout(function() {
            var binStr = atob( canvas.toDataURL(type, quality).split(',')[1] );
            var len = binStr.length;
            var arr = new Uint8Array(len);
     
            for (var i = 0; i < len; i++) {
              arr[i] = binStr.charCodeAt(i);
            }
     
            callback(new Blob([arr], { type: type || 'image/png' }));
          });
        }
      });
    }
   
    if (!this.state.submitting) {
      // let url = `/homepage_images` // 你要上传的url
      // 拿到文件名
      // let filename = this.props.uploadedImageFile.name

      // TODO: 这里可以尝试修改上传图片的尺寸
       this.cropper.getCroppedCanvas().toBlob(blob => {
        // // 创造提交表单数据对象
        const formData = new FormData();
        // 添加要上传的文件
        formData.append(
          "file",
          blob,
          this.state.filename + "1." + blob.type.split("/")[1]
        );
        formData.append("diskName", this.state.diskName);
        // console.log(formData)
        // console.log(
        //   blob.type,
        //   blob.type.split("/")[1],
        //   this.state.filename + "." + blob.type.split("/")[1]
        // );

        // 提示开始上传 (因为demo没有后端server, 所以这里代码我注释掉了, 这里是上传到服务器并拿到返回数据的代码)
        // this.setState({submitting: true})
        // 上传图片
        // const resp = await http.post(url, formData)
        // 拿到服务器返回的数据(resp)
        // console.log(resp)
        // 提示上传完毕
        // this.setState({submitting: false})
        fetch(this.props.UpDataUrl, {
          method: "POST",
          // mode: "cors",
          // cache: "no-cache",
          // credentials: "omit",
          body: formData
          // redirect: "follow",
          // headers:{
          //     "Content-Type": "multipart/form-data"
          // }
        })
          .then(response => {
            //当请求成功时直接返回response，失败则进行json解析返回失败信息
            if (response.status === 200) {
              return response;
            } else {
              return response.json().then(json => {
                // console.log(json)
                return Promise.reject(json);
              });
            }
          })

          .then(
            res => {
              let json = res.json();
              // console.log(json);

              if (json) return json;
              else return false;
            },
            err => {
              // console.log(err)
              let title = "服务器出现未知异常，请重试或联系管理员";
              ReactDOM.render(
                // eslint-disable-next-line react/react-in-jsx-scope
                <ErrorAlert
                  //   key={"alert" + "400-" + Math.round(Math.random() * 10000)}
                  show={true}
                  title={title}
                />,
                document.getElementById("alert")
              );
              return false;
            }
          )
          .then(json => {
            //   console.log(json)
            if (!json) {
              let title = "服务器出现未知异常，请重试或联系管理员";
              ReactDOM.render(
                // eslint-disable-next-line react/react-in-jsx-scope
                <ErrorAlert
                  //   key={"alert" + "400-" + Math.round(Math.random() * 10000)}
                  show={true}
                  title={title}
                />,
                document.getElementById("alert")
              );
              return false;
            }
            if (json.result) {
              this.props.onSubmit(blob, json.filePath);
              this.props.onClose();
              this.setState({
                classModalFile: null
              });
            } else {
              console.log(json);
            }
          })
          .catch(e => {
            //获取错误信息并弹出
            console.log(e.message);
            // notification.error({
            //   message: e.message
            // });
          });
        //把选中裁切好的的图片传出去

        // 关闭弹窗
      });
    }
  };
  cancelSubmit = () => {
    this.props.onClose();
    this.setState({
      classModalFile: null
    });
  };

  handleClassFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        this.setState(
          {
            classModalFile: file // 先把上传的文件暂存在state中
          },
          () => {
            const fileReader = new FileReader();
            fileReader.onload = e => {
              const dataURL = e.target.result;
              this.setState({ src: dataURL });
            };

            fileReader.readAsDataURL(this.state.classModalFile);
          }
        );
      } else {
        ReactDOM.render(
          // eslint-disable-next-line react/react-in-jsx-scope
          <ErrorAlert
            //   key={"alert" + "400-" + Math.round(Math.random() * 10000)}
            show={true}
            title={"文件过大"}
          />,
          document.getElementById("alert")
        );

        //   this.props.onCheck("overSize")
        // console.log("文件过大");
      }
    }
    console.log(this.state.classModalFile);
  };

  render() {
    const { classModalVisible, classModalFile } = this.state;

    // console.log(this.props.Visiable,this.state.src);

    return (
      <Modal
        ref="handleAdminMadal"
        bodyStyle={{
          //   width: "724px",
          height: "425px",
          padding: 0,
          ...this.state.bodyStyle
        }}
        type="1"
        width="774"
        destroyOnClose={true}
        title={this.state.title}
        visible={this.props.Visiable}
        onOk={this.handleSubmit}
        onCancel={this.cancelSubmit}
      >
        {/* <div className="class-cropper-modal"> */}
        <div className="modal-panel">
          {/* <div className="modal-top">
                            <span className="modal-title">上传图片</span>'
                            <span className="modal-close" onClick={this.cancelSubmit}></span>
                        </div> */}
          <div className="upload-tips">
            <label className="btn choose-pic">
              <span className="inputBox">选择本地图片</span>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={this.handleClassFileChange}
                accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png"
                className="btn choose-pic"
              />
            </label>
            上传要求：请上传png/jpg格式的图片，图片大小不能超过2MB
          </div>
          <div className="cropper-container-container">
            <div
              className={`cropper-container ${
                classModalFile === null ? "default" : ""
              }`}
            >
              {classModalFile !== null ? (
                <Cropper
                  src={this.state.src}
                  className="cropper"
                  ref={cropper => (this.cropper = cropper)}
                  // Cropper.js options
                  viewMode={1}
                  zoomable={true}
                  aspectRatio={this.state.aspectRatio} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
                  guides={true}
                  preview=".cropper-preview"
                  movable={true}
                  rotatable={false}
                  // zoomOnTouch={true}
                  // cropBoxMovable={true}
                  center={true}
                  highlight={true}
                  modal={false}
                  rotateTo={-90}
                  // scalable={true}
                  // toggleDragModeOnDblclick={true}
                  // moveTo={true}
                  // zoomOnWheel={true}
                  // responsive={true}
                  // background={false}
                />
              ) : (
                ""
              )}
            </div>

            <div className="preview-container default">
              {/* <div className="cropper-preview " ></div> */}
              {/* <div className="cropper-preview" ><div> */}
              {classModalFile !== null ? (
                <div className="cropper-preview"></div>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* <div className="button-row">
                            <button className="submit-button" onClick={this.handleSubmit}>点击提交</button>
                            <button className="cancel-button" onClick={this.cancelSubmit}>取消</button>
                        </div> */}
        </div>
        {/* </div>{" "} */}
      </Modal>
    );
  }
}
