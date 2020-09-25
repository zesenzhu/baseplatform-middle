import React, { memo } from "react";

import "es6-shim";

import "antd/dist/antd.min.css";
import "./index.scss";
import "./scss/_left_menu.scss";
import { HashRouter as Router, NavLink, withRouter } from "react-router-dom";

import "./js/leftMenu";
import {
  Radio as AntRadio,
  Checkbox as AntCheckBox,
  Table as AntTable,
  Pagination as AntPagination,
  Button as AntdButton,
  Input as AntdInput,
  Modal as AntdModal,
  Icon,
  ConfigProvider,
  Spin,
  Tooltip,
} from "antd";

import { Scrollbars } from "react-custom-scrollbars";

import zhCN from "antd/es/locale/zh_CN";

import moment from "moment";

import CONFIG from "./js/config";

import "moment/locale/zh-cn";

import {getQueryVariable} from './js/disconnect/index';


const $ = require("jquery");

const history = require("history");

const hashHistory = history.createHashHistory();



moment.locale("zh-cn");
/*
 * 组件：按钮组
 * params
 *style:样式
 * func:方法
 * details:内容
 * type:按钮颜色类型
 * size:按钮大小
 * */

/*
 * 按钮组件
 * */

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type /*type:primary、default、默认primary*/,
      size: props.size /*size:large、normal、small默认normal*/,
      disabled: props.disabled ? true : false,
      color: props.color,
      value: props.value,
      shape: props.shape /*shape:round、circle、默认border-radius:4px*/,
      onClick: props.onClick,
      onChange: props.onChange,
      style: props.style,
      className: props.className ? props.className : "",
    };
  }
  componentWillReceiveProps(props){
    this.setState({
      type: props.type /*type:primary、default、默认primary*/,
      size: props.size /*size:large、normal、small默认normal*/,
      disabled: props.disabled ? true : false,
      color: props.color,
      value: props.value,
      shape: props.shape /*shape:round、circle、默认border-radius:4px*/,
      onClick: props.onClick,
      onChange: props.onChange,
      style: props.style,
      className: props.className ? props.className : "",
    })
  }

  /*
   * size筛选:large、normal、small，不写默认为normal
   * */
  HandleSize = (size) => {
    switch (size) {
      case "large":
        return "btn-large";
      case "normal":
        return "btn-normal";
      case "small":
        return "btn-small";
      default:
        return "btn-size";
    }
  };

  /*
   * color筛选:orange、green、blue、red、mazarine(深蓝色)，不写默认为blue
   * */
  HandleColor = (color, disabled, type) => {
    if (type === "primary") {
      if (disabled) return "btn-disabled";
      else {
        switch (color) {
          case "orange":
            return "btn-orange";
          case "green":
            return "btn-green";
          case "blue":
            return "btn-blue";
          case "red":
            return "btn-red";
          case "mazarine":
            return "btn-mazarine";
          default:
            return "btn-orange";
        }
      }
    } else if (type === "default") {
      if (disabled) return "btn-disabled-default";
      else {
        switch (color) {
          case "orange":
            return "btn-orange-default";
          case "green":
            return "btn-green-default";
          case "blue":
            return "btn-blue-default";
          case "red":
            return "btn-red-default";
          case "mazarine":
            return "btn-mazarine-default";
          default:
            return "btn-orange-default";
        }
      }
    } else {
      if (disabled) return "btn-disabled";
      else {
        switch (color) {
          case "orange":
            return "btn-orange";
          case "green":
            return "btn-green";
          case "blue":
            return "btn-blue";
          case "red":
            return "btn-red";
          case "mazarine":
            return "btn-mazarine";
          default:
            return "btn-orange";
        }
      }
    }
  };

  handleHeight = (height) => {
    return {
      height: height + "px",
      lineHeight: height + "px",
    };
  };
  handleWidth = (width) => {
    return {
      width: width + "px",
    };
  };

  handleStyle = () => {
    let style = this.state.style ? this.state.style : {};
    if (this.props.height) {
      style = Object.assign({}, style, this.handleHeight(this.props.height));
    }
    if (this.props.width) {
      style = Object.assign({}, style, this.handleWidth(this.props.width));
    }
    // console.log(style)
    return { style };
  };
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <AntdButton
          className={`Button ${this.HandleSize(
            this.state.size
          )} ${this.HandleColor(
            this.state.color,
            this.state.disabled,
            this.state.type
          )} ${this.state.className}`}
          shape={this.state.shape}
          disabled={this.state.disabled}
          onClick={this.state.onClick}
          style={this.state.style}
          block={this.props.block}
          href={this.props.href}
          target={this.props.target}
        >
          {this.props.children ? this.props.children : this.state.value}
        </AntdButton>
      </ConfigProvider>
    );
  }
}

/*
 * 输入框
 * */

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      className: props.className,
      style: props.style,
      size: props.size ? props.size : "default",
      value: props.value,
      placeholder: props.placeholder,
      rows: props.rows ? props.rows : "5",
      cols: props.cols ? props.cols : "30",
      disabled: props.disabled ? true : false,
      name: props.name,
      prefix: props.prefix /*前置图标*/,
      suffix: props.suffix /*后置图标*/,
      onClick: props.onClick,
      onChange: props.onChange ? props.onChange : this.onInputChange.bind(this),
      onFocus: props.onFocus,
      onKeyDown: props.onKeyDown,
      onBlur: props.onBlur,
      onInput: props.onInput,
      onKeyUp: props.onKeyUp,
      autocomplete: props.autocomplete,
    };
  }

  //onChange
  onInputChange = (e) => {
    // console.log(e.target.value)
    if (this.props.onChange) {
      e.target.value = e.target.value.trim();
      this.props.onChange(e);
      // console.log(e.target.value)
    } else {
      this.setState({
        value: e.target.value.trim(),
      });
    }
  };
  /*
   * 根据type选择组件
   * */

  SelectInput = (type, AntdInput) => {
    let Input = AntdInput;
    if (type === "textarea") {
      Input = (
        <AntdInput.TextArea
          rows={this.state.rows}
          value={this.state.value}
          cols={this.state.cols}
          placeholder={this.state.placeholder}
          style={{ resize: "none" }}
          className={this.state.className}
          disabled={this.state.disabled}
          name={this.state.name}
          suffix={this.state.suffix}
          prefix={this.state.prefix}
          onClick={this.state.onClick}
          onChange={this.state.onChange}
          onFocus={this.state.onFocus}
          onKeyDown={this.state.onKeyDown}
          onBlur={this.state.onBlur}
          onInput={this.state.onInput}
          onKeyUp={this.state.onKeyUp}
        ></AntdInput.TextArea>
      );
    } else if (type === "password") {
      Input = (
        <AntdInput
          type="password"
          value={this.state.value}
          placeholder={this.state.placeholder}
          className={this.state.className}
          disabled={this.state.disabled}
          name={this.state.name}
          suffix={this.state.suffix}
          prefix={this.state.prefix}
          onClick={this.state.onClick}
          onChange={this.state.onChange}
          onFocus={this.state.onFocus}
          onKeyDown={this.state.onKeyDown}
          onBlur={this.state.onBlur}
          onInput={this.state.onInput}
          onKeyUp={this.state.onKeyUp}
          autoComplete={this.state.autocomplete}
        />
      );
    } else {
      Input = (
        <AntdInput
          type={this.state.type}
          value={this.state.value}
          placeholder={this.state.placeholder}
          className={this.state.className}
          disabled={this.state.disabled}
          name={this.state.name}
          suffix={this.state.suffix}
          prefix={this.state.prefix}
          onClick={this.state.onClick}
          onChange={this.state.onChange}
          onFocus={this.state.onFocus}
          onKeyDown={this.state.onKeyDown}
          onBlur={this.state.onBlur}
          onInput={this.state.onInput}
          onKeyUp={this.state.onKeyUp}
        />
      );
    }
    return Input;
  };

  componentWillMount() {
    this.setState({
      MyInput: this.SelectInput(this.state.type, AntdInput),
    });
  }

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <AntdInput
          style={{ display: this.state.type !== "textarea" ? "block" : "none" }}
          type={this.state.type}
          value={this.state.value}
          placeholder={this.state.placeholder}
          className={`MyAntdInput ${this.state.className}`}
          disabled={this.state.disabled}
          name={this.state.name}
          suffix={this.state.suffix}
          prefix={this.state.prefix}
          onClick={this.state.onClick}
          onChange={this.state.onChange}
          onFocus={this.state.onFocus}
          onKeyDown={this.state.onKeyDown}
          onBlur={this.state.onBlur}
          onInput={this.state.onInput}
          onKeyUp={this.state.onKeyUp}
        />

        <AntdInput.TextArea
          style={{
            resize: "none",
            display: this.state.type === "textarea" ? "block" : "none",
          }}
          rows={this.state.rows}
          value={this.state.value}
          cols={this.state.cols}
          placeholder={this.state.placeholder}
          className={`MyAntdInput ${this.state.className}`}
          disabled={this.state.disabled}
          name={this.state.name}
          suffix={this.state.suffix}
          prefix={this.state.prefix}
          onClick={this.state.onClick}
          onChange={this.state.onChange}
          onFocus={this.state.onFocus}
          onKeyDown={this.state.onKeyDown}
          onBlur={this.state.onBlur}
          onInput={this.state.onInput}
          onKeyUp={this.state.onKeyUp}
        ></AntdInput.TextArea>
      </ConfigProvider>
    );
  }
}

/*
 * 空数据提示
 * */
class Empty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      title: props.title,
      style: props.style,
      className: props.className ? props.className : "",
      noTitle: props.noTitle,
      className_1: "tips-error-1",
      imageStyle: props.imageStyle,
      titleStyle: !props.noTitle
        ? props.titleStyle
          ? props.titleStyle
          : ""
        : "noTitle",
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { style } = nextProps;

    this.setState({
      title: nextProps.title,
      style: style,
    });
    this.selectType(this.state.type);
  }

  selectType = (type) => {
    let className_1 = "tips-error-1";
    switch (type) {
      case "1":
        if (!this.state.title) this.setState({ title: "请选择要查看的学校" });
        className_1 = "tips-error-1";
        break;
      case "2":
        if (!this.state.title) this.setState({ title: "早起的鸟儿有虫吃~" });
        className_1 = "tips-error-2";
        break;
      case "3":
        if (!this.state.title)
          this.setState({ title: "空空如也，暂时还没有资源～" });
        className_1 = "tips-error-3";
        break;
      case "4":
        if (!this.state.title)
          this.setState({ title: "空空如也，暂时还没有资料～" });
        className_1 = "tips-error-4";
        break;
      case "5":
        if (!this.state.title)
          this.setState({ title: "无搜索结果，换个词试试吧~" });
        className_1 = "tips-error-5";
        break;
      default:
        if (!this.state.title) this.setState({ title: "请选择要查看的学校" });
        className_1 = "tips-error-1";
        break;
    }

    this.setState({
      className_1: className_1,
    });
  };

  componentWillMount() {
    this.selectType(this.state.type);
  }

  render() {
    return (
      <div
        className={`emptyBox ${this.state.className}`}
        style={this.state.style}
      >
        <i
          style={this.state.imageStyle}
          className={`empty ${this.state.className_1}`}
        ></i>
        <span className={`initTitle ${this.state.titleStyle}`}>
          {this.state.title}
        </span>
      </div>
    );
  }
}

/*
 * 弹出框
 * */
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      afterClose: props.afterClose /*Modal 完全关闭后的回调*/,
      bodyStyle: props.bodyStyle /*Modal body 样式*/,
      closable: props.closable /*是否显示右上角的关闭按钮*/,
      footer:
        props.footer /*底部内容，当不需要默认底部按钮时，可以设为 footer={null}*/,
      mask: props.mask /*是否展示遮罩*/,
      maskClosable: props.maskClosable
        ? props.maskClosable
        : false /*Modal 完全关闭后的回调*/,
      maskStyle: props.maskStyle /*遮罩样式*/,
      okText: props.okText /*确认按钮文字*/,
      okType: props.okType /*确认按钮类型*/,
      style: props.style /*可用于设置浮层的样式，调整浮层位置等*/,
      title: props.title /*标题*/,
      width: props.width /*宽度*/,
      onCancel: props.onCancel /*点击遮罩层或右上角叉或取消按钮的回调*/,
      onOk: props.onOk /*点击确定回调*/,
      visible: props.visible /*对话框是否可见*/,
      className: props.className ? props.className : "" /**/,
      destroyOnClose: props.destroyOnClose ? props.destroyOnClose : true,
      ModalStyle:"Modal-1"
    };
  }

  selectType(type) {
    let width = 810;
    let ModalStyle = "Modal-1";
    switch (type) {
      case "1":
        width = 810;
        ModalStyle = "Modal-1";
        break;
      case "2":
        width = 810;
        ModalStyle = "Modal-2";
        this.setState({
          footer: null,
        });
        break;
      case "3":
        width = 588;
        ModalStyle = "Modal-3";
        break;
      default:
        width = 810;
        ModalStyle = "Modal-1";
    }
    this.setState({
      width: this.props.width ? this.props.width : width,
      ModalStyle: ModalStyle
    });
  }

  componentWillMount() {
    this.selectType(this.props.type);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    const { title,bodyStyle,className,footer,mask } = nextProps;

    this.selectType(this.props.type);

    this.setState({ title: title,bodyStyle,className,footer,mask});

  }
  // 拖拽modal

  componentDidMount() {
    //         let modalHeader = $('.ant-modal-header');
    //         let modal = $(this.refs.Modal);
    //         console.log(modalHeader,modal)
    //         modal.click((e)=>{
    // console.log(e)
    //         })
    //         modal.mousedown(function(e) {
    //             // e.pageX
    //             console.log('215')
    //             var positionDiv = $(this).offset();
    //             var distenceX = e.pageX - positionDiv.left;
    //             var distenceY = e.pageY - positionDiv.top;
    //             //alert(distenceX)
    //             // alert(positionDiv.left);
    //             $(document).mousemove(function(e) {
    //                 var x = e.pageX - distenceX;
    //                 var y = e.pageY - distenceY;
    //                 if (x < 0) {
    //                     x = 0;
    //                 } else if (x > $(document).width() - modal.outerWidth(true)) {
    //                     x = $(document).width() - modal.outerWidth(true);
    //                 }
    //                 if (y < 0) {
    //                     y = 0;
    //                 } else if (y > $(document).height() - modal.outerHeight(true)) {
    //                     y = $(document).height() - $modal.outerHeight(true);
    //                 }
    //                 modal.css({
    //                     'left': x + 'px',
    //                     'top': y + 'px'
    //                 });
    //             });
    //             $(document).mouseup(function() {
    //                 $(document).off('mousemove');
    //             });
    //         });
    /* $('.ant-modal').each((index,that)=>{

            console.log($(that).width());

            $(that).css({

                left:($(window).width()-$(that).width()/2)+'px',

                top:($(window).height()-$(that).height()/2)+'px',

            });

        });

        let xTemp, yTemp;

        let can_move = false;

        $(document).on('dragstart', '.ant-modal-header', function(e) { return false; });

        $(document).on('mousedown', '.ant-modal-header', function(event) {

            let $win = $(event.target).closest('.ant-modal');

            can_move = true;

            $(event.target).css('cursor', 'move');

            let mx = event.pageX;

            let my = event.pageY;

            xTemp = mx - parseInt($win.offset().left);

            yTemp = my - parseInt($win.offset().top);

            console.log(xTemp,yTemp);

        });
        //var win;
        ///MSIE 8.0/.test(window.navigator.userAgent) ? win = document : win = window;

        $(window).mousemove(function(event) {

            if (can_move) {

                let $win = $(event.target).closest('.ant-modal');

                let $window = $(window);

                let mx = event.pageX;

                let my = event.pageY;

                if (mx - xTemp > 0 && mx - xTemp < $window.width() - $win.width()) {

                    console.log(mx - xTemp);

                    $win.css('left', mx - xTemp+'px');

                }

                if (my - yTemp > 0 && my - yTemp < $window.height() - $win.height()) {

                    console.log(my - yTemp);

                    $win.css('top', my - yTemp+'px');

                }



            }

        }).mouseup(function(event) {

            can_move = false;

            $('.ant-modal-header').css('cursor', 'default');

        });*/
  }

  render() {
    return (
      <AntdModal
        // ref={ref=>this.Modal=ref}
        ref="Modal"
        onOk={this.state.onOk}
        onCancel={this.state.onCancel}
        title={this.state.title}
        className={`initModel ${this.state.ModalStyle} ${this.state.className}`}
        style={this.state.style}
        okText={this.state.okText}
        maskClosable={this.state.maskClosable}
        mask={this.state.mask}
        maskStyle={this.props.maskStyle}
        closable={this.state.closable}
        destroyOnClose={this.state.destroyOnClose}
        bodyStyle={this.state.bodyStyle}
        afterClose={this.state.afterClose}
        visible={this.props.visible}
        centered={this.props.centered ? this.props.centered : true}
        width={this.state.width}
        zIndex={this.state.zIndex}
        closeIcon={this.state.ModalStyle==='Modal-1'?<i className={"modal-close-icon"}></i>:null}
        footer={
          this.state.footer === null
            ? null
            : this.state.footer
            ? this.state.footer
            : [
                <Button
                  key="onOk"
                  type="primary"
                  size="small"
                  color="green"
                  onClick={this.state.onOk}
                >
                  {this.props.okText ? this.props.okText : "确定"}
                </Button>,
                <Button
                  key="onCancel"
                  size="small"
                  color="blue"
                  onClick={this.state.onCancel}
                >
                  {this.props.cancelText ? this.props.cancelText : "取消"}
                </Button>,
              ]
        }
        id="AntdModal"
      >
        {this.props.children}
      </AntdModal>
    );
  }
}

/*
 * 选择组件（单选、多选、全选） start
 * */
class Radio extends React.Component {
  render() {
    const { children, type, ...reset } = this.props;

    let ClassName = "";

    switch (type) {
      case "gray":
        ClassName = "ant-radio-gray";

        break;

      case "green":
        ClassName = "ant-radio-green";

        break;

      default:
        ClassName = "";
    }

    return (
      <ConfigProvider locale={zhCN}>
        <AntRadio className={ClassName} {...reset}>
          {children}
        </AntRadio>
      </ConfigProvider>
    );
  }
}
class RadioGroup extends React.Component {
  render() {
    const { children, ...reset } = this.props;
    return (
      <ConfigProvider locale={zhCN}>
        <AntRadio.Group {...reset}>{children}</AntRadio.Group>
      </ConfigProvider>
    );
  }
}
class CheckBox extends React.Component {
  render() {
    const { children, className, type, ...reset } = this.props;

    let CheckClassName = "";

    switch (type) {
      case "gray":
        CheckClassName = "ant-checkbox-gray";

        break;

      case "circle":
        CheckClassName = "ant-checkbox-circle";

        break;

      default:
        CheckClassName = "";
    }

    return (
      <ConfigProvider locale={zhCN}>
        <AntCheckBox
          className={`${className ? className : ""} ${CheckClassName}`}
          {...reset}
        >
          {children}
        </AntCheckBox>
      </ConfigProvider>
    );
  }
}
class CheckBoxGroup extends React.Component {
  render() {
    const { children, ...reset } = this.props;
    return (
      <ConfigProvider locale={zhCN}>
        <AntCheckBox.Group {...reset}>{children}</AntCheckBox.Group>
      </ConfigProvider>
    );
  }
}
/*
 * 选择组件（单选、多选、全选） end
 * */

/*
 * table组件 start
 * */
class Table extends React.Component {
  render() {
    const { children, ...reset } = this.props;
    return (
      <ConfigProvider locale={zhCN}>
        <AntTable {...reset}>{children}</AntTable>
      </ConfigProvider>
    );
  }
}
/*
 * table组件 end
 * */
/*
 * 分页组件 start
 * */
class PageComponent extends React.Component {
  render() {
    const { children, size, className, showSizeChanger, ...reset } = this.props;

    return (
      <ConfigProvider locale={zhCN}>
        <AntPagination
          className={`${className ? className : ""} ${
            size && size === "micro" ? "micro" : ""
          } `}
          size={size}
          showSizeChanger={showSizeChanger}
          showTotal={
            showSizeChanger
              ? (total) => (
                  <span>
                    共<span style={{ color: "#ff6600" }}>{total}</span>条
                  </span>
                )
              : () => {}
          }
          {...reset}
        >
          {children}
        </AntPagination>
      </ConfigProvider>
    );
  }
}
/*
 * 分页组件 end
 * */
/*
 * 搜索 start
 * */
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectShow: false,
      selectdValue: "",
      cancleShow: false,
      inputFocus: false,
      Value: "",
      SearchBlank: false,
    };
  }

  InputChange(e) {
    this.setState({ Value: e.target.value });
  }

  componentDidMount() {
    const { select } = this.props;
    if (select) {
      document.addEventListener("click", (e) =>
        this.outSpanClickHandler({
          that: this,
          target: e.target,
          spanDom: this.refs.search_select_span,
          ulDom: this.refs.search_select_ul,
        })
      ); //点击其他地方将需要进行判断的元素传输给事件outSpanClickHandler
    }
  }

  toggleSelectd(e) {
    //切换下拉和上拉
    this.setState({ selectShow: !this.state.selectShow }, () => {
      $(this.refs.search_select_ul).slideToggle("fast");
    });
  } //切换下拉状态为slideDown和slideUp
  changeSelect(e) {
    const { selectChange } = this.props;

    this.setState({ selectdValue: { value: e.value, title: e.title } });
    this.setState({ selectShow: !this.state.selectShow }, () => {
      $(this.refs.search_select_ul).hide();

      selectChange(e);
    });
  } //改变选项
  outSpanClickHandler(e) {
    const { target, ulDom, that, spanDom } = e;
    if (spanDom && !spanDom.contains(target)) {
      that.setState({ selectShow: false }, () => {
        $(ulDom).hide();
      });
    }
  } //点击其他地方将下拉收起
  onInputFocus() {
    this.setState({ inputFocus: true });
  } //input focus事件

  //点击搜索按钮事件

  SearchClick() {
    const { onClickSearch, select, selectOptions } = this.props;

    if (this.SearchInput.value.trim()) {
      this.setState({ cancleShow: true, SearchBlank: false }, () => {
        if (onClickSearch) {
          onClickSearch({
            selectdValue: select
              ? this.state.selectdValue
                ? this.state.selectdValue.value
                : selectOptions.selectdValue.value
              : null,
            value: this.SearchInput.value,
          });
        }
      });
    } else {

      this.setState({ SearchBlank: true });

      this.SearchInput.focus();
    }
  }

  onInputBlur() {
    this.setState({ inputFocus: false, SearchBlank: false });
  } //input blur事件
  handleEnterKey(e) {

    const { select, selectOptions, onClickSearch,onSearchKeyUp } = this.props;

    if (e.nativeEvent.keyCode === 13) {
      if (this.SearchInput.value.trim()) {
        this.setState({ cancleShow: true, SearchBlank: false }, () => {
          if (onClickSearch) {
            return onClickSearch({
              selectdValue: select
                ? this.state.selectdValue
                  ? this.state.selectdValue.value
                  : selectOptions.selectdValue.value
                : null,
              value: this.SearchInput.value,
            });
          }
        });
      } else {

        this.setState({ SearchBlank: true });

        this.SearchInput.focus();
      }

    }else{

      if(onSearchKeyUp){

          onSearchKeyUp();

      }

    }


  } //键盘enter事件
  render() {
    const {
      width,
      select,
      selectChange,
      placeHolder,
      selectOptions,
      onClickSearch,
      onCancelSearch,
      className,
      CancelBtnShow,
      Value,
      onChange,
    } = this.props;

    let CancelBtnDisplay = CancelBtnShow
      ? CancelBtnShow === "y"
        ? "block"
        : "none"
      : this.state.cancleShow === true
      ? "block"
      : "none";

    return (
      <div
        className={`search_container ${className ? className : ""}  ${
          this.state.SearchBlank ? "border" : ""
        }`}
        style={{
          width: width ? width : "",
          borderColor: this.state.SearchBlank
            ? "#ff0000"
            : this.state.inputFocus
            ? "#5897ed"
            : "#bac7d9",
        }}
      >
        <table className="search_wrapper_table">
          <tbody>
            <tr>
              {
                //控制下拉部分的宽度
                select ? (
                  <td
                    style={{
                      width:
                        selectOptions && selectOptions.width
                          ? selectOptions.width
                          : "86px",
                    }}
                  >
                    <div className="search_select_wrapper">
                      <span
                        className="search_select_span"
                        ref="search_select_span"
                        onClick={this.toggleSelectd.bind(this)}
                        style={{
                          width:
                            selectOptions && selectOptions.width
                              ? selectOptions.width - 14
                              : "",
                        }}
                      >
                        <span
                          className={`search_select_icon ${
                            this.state.selectShow === true
                              ? "search_slide_icon"
                              : ""
                          }`}
                        ></span>
                        {
                          // 判断是否有state的选中值（this.state.selectdValue）?使用state.selectdValue值：(判断是否有外界传值)?使用外界传值:''

                          selectOptions && selectOptions.selectdValue ? (
                            <span
                              className="search_select_text"
                              data-value={selectOptions.selectdValue.value}
                              title={selectOptions.selectdValue.title}
                            >
                              {selectOptions.selectdValue.title}
                            </span>
                          ) : this.state.selectdValue ? (
                            <span
                              className="search_select_text"
                              data-value={this.state.selectdValue.value}
                              title={this.state.selectdValue.title}
                            >
                              {this.state.selectdValue.title}
                            </span>
                          ) : (
                            ""
                          )
                        }
                      </span>
                      <ul className="search_select_ul" ref="search_select_ul">
                        {
                          //选项列表 (是否外界传值)？：使用外界值：''
                          selectOptions && selectOptions.selectList
                            ? selectOptions.selectList.map((item, k) => {
                                return (
                                  <li
                                    key={k}
                                    onClick={this.changeSelect.bind(this, {
                                      value: item.value,
                                      title: item.title,
                                    })}
                                    className="search_select_li"
                                    data-value={item.value}
                                    title={item.title}
                                  >
                                    {item.title}
                                  </li>
                                );
                              })
                            : ""
                        }
                      </ul>
                      <span className="search_select_gap"></span>
                    </div>
                  </td>
                ) : null
              }
              <td className="search_left_td">
                <input
                  ref={(ref) => (this.SearchInput = ref)}
                  className={`search_text_input`}
                  type="text"
                  placeholder={placeHolder ? placeHolder : "输入关键词快速搜索"}
                  onFocus={this.onInputFocus.bind(this)}
                  onBlur={this.onInputBlur.bind(this)}
                  onKeyUp={this.handleEnterKey.bind(this)}
                  value={Value ? Value : this.state.Value}
                  onChange={
                    onChange?onChange: this.InputChange.bind(this)
                  }
                />
                <input
                  className="search_cancel_input"
                  type="button"
                  onClick={() => {
                    this.setState({ cancleShow: false, Value: "" }, () => {
                      this.SearchInput.value = "";
                      if (onCancelSearch) {
                        onCancelSearch({
                          selectdValue: select
                            ? this.state.selectdValue
                              ? this.state.selectdValue.value
                              : selectOptions.selectdValue.value
                            : null,

                          value: "",
                        });
                      }
                    });
                  }}
                  style={{ display: CancelBtnDisplay }}
                />
              </td>
              <td className="search_right_td">
                <div
                  className="search_btn_input"
                  onClick={(e) => this.SearchClick(e)}
                ></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
/*
 * 搜索 end
 * */
/*
 * 下拉 start
 * */
class DropComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropSelectd: props.dropSelectd ? props.dropSelectd : "",
      dropListShow: false,
      range2ListShow: "",
      range2ListActive: "",
        simpleSearchList:[],
        simpleSearchShow:false,
        simpleSearchValue:''
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    const { dropSelectd,dropList,type } = nextProps;

      let simpleSearchList = [];

      if (type!=='multiple'){

          simpleSearchList = dropList;

      }

      this.setState({ dropSelectd: dropSelectd,simpleSearchList });

  }

  onToggleDropList() {
    this.setState({ dropListShow: !this.state.dropListShow }, () => {
      $(this.refs.dropdown_select_ul).slideToggle("fast");
    });
  } //展示或者隐藏下拉列表

  onSimpleDropChange(e) {
    const { activeValue } = this.props;

    const { onChange, value, title } = e;

    this.setState(
      { dropListShow: false, dropSelectd: { value, title } },
      () => {
        $(this.refs.dropdown_select_ul).hide();
        if (onChange) {
          onChange({ value, title });
        }
      }
    );
  }

  //改变下拉选项的时候调用
  onMultipleRang2DropChange(e) {
    const { id, name, onChange } = e;
    this.setState(
      {
        //点击选项之后
        dropListShow: false,
        dropSelectd: {
          value: id,
          title: name,
        },
        range2ListActive: id,
      },
      () => {
        $(this.refs.dropdown_select_ul).hide(); //隐藏下拉框
        if (onChange) {
          onChange({ value: name, id: id }); //调用外部传入的行数
        }
      }
    );
  } //二级下拉改变下拉的时候调用

  onRange2ListShow(k1) {
    if (this.state.range2ListShow === k1) {
      this.setState({ range2ListShow: "" });
    } else {
      this.setState({ range2ListShow: k1 });
    }
  } //在二级的时候展开下拉

  componentDidMount() {
    document.addEventListener("click", (e) =>
      this.outDropClick({
        that: this,
        target: e.target,
        ulDom: this.refs.dropdown_select_ul,
        spanDom: this.refs.dropdown_default_span,
      })
    ); //当点击事件发生在下拉之外的时候
  }

  outDropClick(e) {
    const { that, target, ulDom, spanDom } = e;

      const {dropList=[]} = this.props;

    if (ulDom && spanDom) {
      //在该界面上已有该组件才这样展示
      if (!spanDom.contains(target) && !ulDom.contains(target)) {
        that.setState({
            dropListShow: false,
            simpleSearchList:dropList,
            simpleSearchShow:false,
            simpleSearchValue:''

        }, () => {
          $(ulDom).hide();
        });
      }
    }
  } //当点击事件发生在下拉组件之外的时候
  onClickSearch(e) {
    const { mutipleOptions } = this.props;
    if (e.value) {
      if (mutipleOptions && mutipleOptions.dropClickSearch) {
        mutipleOptions.dropClickSearch(e);
      }
    } else {
      if (mutipleOptions && mutipleOptions.dropClickSearch) {
        mutipleOptions.dropClickSearch(e);
      }
    }
  } //点击搜索之后
  onCancelSearch(e) {
    const { mutipleOptions } = this.props;

    if (mutipleOptions && mutipleOptions.dropCancelSearch) {
      mutipleOptions.dropCancelSearch();
    }
  }


    simpleSearch() {

        const { dropList } = this.props;

        if (this.state.simpleSearchValue) {

            const list =  dropList.filter(i=>{

                if(typeof(i.title)==='string'||typeof(i.title)==='number'){

                    return i.title.toString().includes(this.state.simpleSearchValue);

                }else{

                    let hasValue = this.recursive(i.title);

                    return hasValue;

                }

            });

            const simpleSearchList = list.length>0?list:[{value:'symbol_none_value',title:'无数据'}];

            this.setState({simpleSearchShow:true,simpleSearchList});

        }

    }

    //递归函数
    recursive(reactDom){

        let hasValue = false;

        if(typeof(reactDom.props.children)==='string'||typeof(reactDom.props.children)==='number'){

            if(reactDom.props.children.toString().includes(this.state.simpleSearchValue)){

                hasValue = true;

            }

        }else{

            for (let i = 0;i<=reactDom.props.children.length-1;i++){

                if (!hasValue){

                    if(typeof(reactDom.props.children[i])==='string'||typeof(reactDom.props.children[i])==='number') {

                        if(reactDom.props.children[i].toString().includes(this.state.simpleSearchValue)){

                            hasValue = true;

                        }

                    }else{

                        hasValue =  this.recursive(reactDom.props.children[i]);

                    }

                }

            }

        }


        return hasValue;

    }

    //简单搜索的值发生变化
    simpleSearchValueChange(e){

        this.setState({

            simpleSearchValue:e.target.value

        });

    }

    //简单搜索关闭

    simpleSearchClose(){

        const {dropList} = this.props;

        this.setState({simpleSearchValue:'',simpleSearchShow:false,simpleSearchList:dropList});

    }



  render() {
    const {
      Title,
      TitleShow,
      title,
      width,
      height,
      activeValue,
      disabled,
      dropSelectd,
      dropList,
      onChange,
      type,
      className,
      mutipleOptions,
      dropLoadingShow,
      dropSimpleSearch,
      ...reset
    } = this.props;


    let simpleSearchList = [];

    if (type!=='multiple'&&this.state.simpleSearchShow){

      simpleSearchList = this.state.simpleSearchList;

    }else{

        simpleSearchList = dropList;

    }


    let dropContainer = "";

    let selectUlWidth =
      mutipleOptions && mutipleOptions.width ? mutipleOptions.width : 540;

    let selectUlHeight =
      mutipleOptions && mutipleOptions.height ? mutipleOptions.height : 280;

    let searchWidth =
      mutipleOptions && mutipleOptions.searchWidth
        ? mutipleOptions.searchWidth
        : 320;

    let scrollWrapperWidth =
      mutipleOptions && mutipleOptions.width ? mutipleOptions.width - 20 : 520;

    let scrollWrapperHeight =
      mutipleOptions && mutipleOptions.height
        ? mutipleOptions.height - 72
        : 228;

    let searchOpen =
      mutipleOptions && mutipleOptions.searchOpen
        ? mutipleOptions.searchOpen
        : false;

    //所需的参数
    let dropMultipleList = "";

    //判断等级渲染相对应的元素
    if (searchOpen) {
      //如果开启搜索的话

      dropMultipleList = (
        <ul className="dropdown_list_ul3 clearfix" style={{ display: "block" }}>
          <Loading
            tip="加载中..."
            opacity={false}
            spinning={
              mutipleOptions && mutipleOptions.searchLoadingShow
                ? mutipleOptions.searchLoadingShow
                : false
            }
          >
            {mutipleOptions.searchList.length > 0 ? (
              mutipleOptions.searchList.map((item, ks) => {
                let CanActive = "";

                if (mutipleOptions.dropSelectd) {
                  CanActive =
                    mutipleOptions.dropSelectd.value === item.id
                      ? "active"
                      : "";
                } else {
                  CanActive =
                    this.state.range2ListActive === item.id ? "active" : "";
                }

                return (
                  <li
                    key={ks}
                    className={`dropdown_item3_li ${CanActive}`}
                    onClick={this.onMultipleRang2DropChange.bind(this, {
                      name: item.name,
                      id: item.id,
                      onChange: mutipleOptions.dropMultipleChange,
                    })} //绑定点击事件
                    title={TitleShow ? (Title ? Title : item.name) : ""}
                  >
                    <span className="dropdown_item3_name">{item.name}</span>
                  </li>
                );
              })
            ) : (
              <Empty
                type="5"
                title={
                  mutipleOptions.empSearchTitle
                    ? mutipleOptions.empSearchTitle
                    : "暂未有相关数据"
                }
              ></Empty>
            )}
          </Loading>
        </ul>
      );
    } else if (mutipleOptions && mutipleOptions.range === 2) {
      //如果range的等级为2

      //内容是否为空
      if (
        mutipleOptions.dropMultipleList &&
        mutipleOptions.dropMultipleList.length > 0
      ) {
        dropMultipleList = mutipleOptions.dropMultipleList.map((item1, k1) => {
          //遍历第一个数组

          return (
            <li key={k1} className="dropdown_list_item1">
              <div
                className={`dropdown_item1_name ${
                  this.state.range2ListShow === k1 ? "slide" : ""
                }`} //判断是否是活动状态
                title={TitleShow ? (Title ? Title : item1.name) : ""}
                onClick={this.onRange2ListShow.bind(this, k1)}
              >
                {item1.name}
              </div>
              <ul
                ref={`dropdown_list_ul3_${k1}`}
                className={`dropdown_list_ul3 clearfix`}
                style={{
                  display: `${
                    this.state.range2ListShow === k1 ? "block" : "none"
                  }`,
                }}
              >
                {
                  //遍历第二个数组
                  item1.list.map((item2, k2) => {
                    let CanActive = "";

                    if (mutipleOptions.dropSelectd) {
                      CanActive =
                        mutipleOptions.dropSelectd.value === item2.id
                          ? "active"
                          : "";
                    } else {
                      CanActive =
                        this.state.range2ListActive === item2.id
                          ? "active"
                          : "";
                    }

                    return (
                      <li
                        key={k2}
                        className={`dropdown_item3_li ${CanActive}`} //判断是否是active
                        title={TitleShow ? (Title ? Title : item2.name) : ""}
                        onClick={this.onMultipleRang2DropChange.bind(this, {
                          name: item2.name,
                          id: item2.id,
                          onChange: mutipleOptions.dropMultipleChange,
                        })} //绑定点击事件
                      >
                        <span className="dropdown_item3_name">
                          {item2.name}
                        </span>
                      </li>
                    );
                  })
                }
              </ul>
            </li>
          );
        });
      } else {
        dropMultipleList = (
          <Empty
            type="3"
            title={
              mutipleOptions.empTitle
                ? mutipleOptions.empTitle
                : "暂未有相关数据"
            }
          ></Empty>
        );
      }
    } else if (mutipleOptions && mutipleOptions.range === 3) {
      //等待后期扩展使用
    }

    if (type && type === "multiple") {
      dropContainer = (
        <div
          ref="dropdown_select_ul"
          className="dropdown_select_ul"
          style={{ width: selectUlWidth }}
        >
          <div className="dropdown_multiple_container">
            <div className="dropdown_search_wrapper">
              <Search
                placeHolder={
                  mutipleOptions && mutipleOptions.searchPlaceholder
                    ? mutipleOptions.searchPlaceholder
                    : null
                }
                width={searchWidth}
                onClickSearch={this.onClickSearch.bind(this)}
                onCancelSearch={this.onCancelSearch.bind(this)}
                CancelBtnShow={mutipleOptions.CancelBtnShow}
                Value={mutipleOptions.inputValue}
              ></Search>
            </div>

            <Scrollbars
              renderTrackHorizontal={(props) => {
                return <span style={{ display: "none" }}></span>;
              }}
              renderThumbHorizontal={(props) => {
                return <span style={{ display: "none" }}></span>;
              }}
              autoHeight
              autoHeightMin={160}
              autoHeightMax={scrollWrapperHeight}
              style={{ width: scrollWrapperWidth }}
            >
              <Loading
                opacity={false}
                spinning={
                  mutipleOptions && mutipleOptions.dropLoadingShow
                    ? mutipleOptions.dropLoadingShow
                    : false
                }
              >
                <ul className="dropdown_list_ul">{dropMultipleList}</ul>
              </Loading>
            </Scrollbars>
          </div>
        </div>
      );
    } else {
      dropContainer = (
        <ul
          className="dropdown_select_ul"
          ref="dropdown_select_ul"
          style={{ width: width, overflow: "initial" }}
        >
          <Loading opacity={false} spinning={dropLoadingShow}>

              {

                  dropList&&dropList.length>12?

                      <li className={"dropdown_select_search"}>

                          <AntdInput value={this.state.simpleSearchValue} onChange={this.simpleSearchValueChange.bind(this)} onPressEnter={this.simpleSearch.bind(this)}  className={"search-input"}/>

                          <i onClick={this.simpleSearchClose.bind(this)} className={"dropdown_search_close"} style={{display:`${this.state.simpleSearchShow?'block':'none'}`}}></i>

                          <i onClick={this.simpleSearch.bind(this)} className={"drop_search_btn"} style={{display:`${this.state.simpleSearchShow?'none':'block'}`}}></i>

                      </li>

                      :null

              }

            <Scrollbars
              autoHeight
              autoHeightMin={0}
              autoHeightMax={height?height:288}
              // style={{height:height?(this.state.simpleSearchList.length*24<height?this.state.simpleSearchList.length*24:height):'auto'}}
              renderTrackHorizontal={(props) => {
                return <span style={{ display: "none" }}></span>;
              }}
              renderThumbHorizontal={(props) => {
                return <span style={{ display: "none" }}></span>;
              }}
            >
              {



                  simpleSearchList.map((item, key) => {

                  return (
                    <li
                      key={key}
                      className={`dropdown_select_li ${
                        activeValue && activeValue === item.value
                          ? "active"
                          : dropSelectd.value === item.value
                          ? "active"
                          : ""
                      }`}
                      title={TitleShow ? (Title ? Title : item.title) : ""}
                      data-vaule={item.value}
                      onClick={item.value==='symbol_none_value'?()=>{}:this.onSimpleDropChange.bind(this, {
                        onChange: onChange,
                        value: item.value,
                        title: item.title,
                      })}
                    >
                      {item.title}
                    </li>
                  );
                })

              }
            </Scrollbars>
          </Loading>
        </ul>
      );
    }

    return (
      <div
        className={`dropdown_container ${className ? className : ""}`}
        {...reset}
      >
        <span className="dropdown_title_span">{title}</span>
        <span className="dropdown_wrapper" style={{ width: width }}>
          <span
            ref="dropdown_default_span"
            className={`dropdown_default_span ${disabled ? "disabled" : ""}`}
            onClick={
              //点击展示和隐藏下拉列表
              disabled ? () => {} : this.onToggleDropList.bind(this)
            }
            style={{ width: width }}
          >
            <span
              className={`dropdown_icon_span ${
                this.state.dropListShow ? "slide" : ""
              }`}
            ></span>
            {
              //判断this.state.dropSelectd?this.state.dropSelectd:(判断外界传入的dropSelectd？外界传入的dropSelectd:'')
              this.state.dropSelectd ? (
                <span
                  data-value={this.state.dropSelectd.value}
                  className="dropdown_text_span"
                  title={
                    TitleShow
                      ? Title
                        ? Title
                        : this.state.dropSelectd.title
                      : ""
                  }
                >
                  {this.state.dropSelectd.title}
                </span>
              ) : dropSelectd ? (
                <span
                  data-value={dropSelectd.value}
                  className="dropdown_text_span"
                  title={TitleShow ? (Title ? Title : dropSelectd.title) : ""}
                >
                  {dropSelectd.title}
                </span>
              ) : (
                ""
              )
            }
          </span>

          {dropContainer}
        </span>
      </div>
    );
  }
}
/*
 * 下拉 end
 * */
/*
 * 加载中 start
 * */

class Loading extends React.Component {
  render() {
    const {
      type,
      size,
      tip,
      opacity,
      spinning,
      wrapperClassName,
      children,
      ...reset
    } = this.props;

    let Fragments = "";

    let opacityClass = "";

    if (opacity) {
      //透明度为true意味透明
      if (opacity === true) {
        opacityClass = "ant-spin-transparent";
      }
    } else {
      if (opacity === undefined) {
        //透明度为false意味不透明
        opacityClass = "";
      } else {
        opacityClass = "ant-spin-opaque";
      }
    }

    if (type) {
      if (type === "point") {
        //自己写的loading

        Fragments = (
          <div className={`loading_mask ${opacityClass}`}>
            <div className="loading_point_container">
              <div className="point_container">
                <span className="point1 point"></span>
                <span className="point2 point"></span>
                <span className="point3 point"></span>
                <span className="point4 point"></span>
              </div>
              <div className="point_loading_text">{tip}</div>
            </div>
          </div>
        );
      } else {
        //icon图标的loading
        let antIcon = <Icon type={type} spin {...reset} />;
        Fragments = (
          <Spin
            indicator={antIcon}
            spinning={spinning}
            size={size}
            tip={tip}
            wrapperClassName={`${
              wrapperClassName ? wrapperClassName : ""
            } ${opacityClass}`}
          >
            {children}
          </Spin>
        );
      }
    } else {
      //默认loading
      Fragments = (
        <Spin
          {...reset}
          size={size}
          spinning={spinning}
          tip={tip}
          wrapperClassName={`${
            wrapperClassName ? wrapperClassName : ""
          } ${opacityClass}`}
        >
          {children}
        </Spin>
      );
    }
    return (
      <React.Fragment>
        {" "}
        {/*空标签*/}
        {Fragments}
      </React.Fragment>
    );
  }
}
/*
 * 加载中 end
 * */
/*
 * 弹出框 start
 * */

class AppAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      left: 0,

      top: 0,

      xTemp: 0,

      yTemp: 0,

      can_move: false,

      readyShow: false,
    };
  }

  //关闭按钮
  closeAlert(e) {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }
  //点击ok
  ok(e) {
    const { onOk } = this.props;
    if (onOk) {
      onOk();
    }
  }
  //点击cancel按钮
  cancel(e) {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }

  componentDidUpdate() {
    const { show, type, onHide } = this.props;

    if (show) {
      if (
        type === "success" ||
        type === "error" ||
        type === "tips" ||
        type === "warn"
      ) {
        if (onHide) {
          setTimeout(onHide, 1000);
        }
      }
    }

    /*if(this.AlertBody&&show&&!this.state.readyShow){

            this.setState({readyShow:true,left:($(window).width() - this.AlertBody.clientWidth) /2,top:($(window).height() - this.AlertBody.clientHeight)/ 2});

        }

        if(!show&&this.state.readyShow){

            this.setState({can_move:false,readyShow:false});

        }*/

    //新的尝试 new try

    if (this.AlertBody && show && !this.state.readyShow) {
      this.AlertBody.style.left =
        ($(window).width() - this.AlertBody.clientWidth) / 2 + "px";

      this.AlertBody.style.top =
        ($(window).height() - this.AlertBody.clientHeight) / 2 + "px";

      this.setState({ readyShow: true });

      $(".alert_dialog_footer input.cancel").focus();
    }

    if (!show && this.state.readyShow) {
      this.setState({ readyShow: false });
    }
  }

  componentDidMount() {
    const { show } = this.props;

    /* if(this.AlertBody&&show&&!this.state.readyShow){

             this.setState({readyShow:true,left:($(window).width() - this.AlertBody.clientWidth) /2,top:($(window).height() - this.AlertBody.clientHeight)/ 2});

         }

         if(!show&&this.state.readyShow){

             this.setState({can_move:false,readyShow:false});

         }

         const that = this;

         $(document).on('dragstart', '.alert_dialog_wrapper', function(e) { return false; });

         $(document).on('mousedown', '.alert_dialog_wrapper', function(event) {

             let $win = $(event.target).closest('.alert_dialog_wrapper');

             $win.css('cursor', 'move');

             let mx = event.clientX;

             let my = event.clientY;

             let can_move = true;

             let xTemp = mx - parseInt($win.offset().left-$(window).scrollLeft());

             let yTemp = my - parseInt($win.offset().top-$(window).scrollTop());

             that.setState({

                 can_move,xTemp,yTemp

             })

         });
         //var win;
         ///MSIE 8.0/.test(window.navigator.userAgent) ? win = document : win = window;

         $(window).mousemove(function(event) {

             if (that.AlertBody) {

                 if (that.state.can_move){

                     let $win = $(event.target).closest('.alert_dialog_wrapper');

                     let $window = $(window);

                     let mx = event.clientX;

                     let my = event.clientY;



                     if (mx - that.state.xTemp > 0 && mx - that.state.xTemp < $window.width() - $win.width()) {

                         /!*$win.css('left', mx - xTemp+'px');*!/

                         that.setState({left:mx - that.state.xTemp});



                     }

                     if (my - that.state.yTemp > 0 && my - that.state.yTemp < $window.height() - $win.height()) {

                         /!*$win.css('top', my - yTemp+'px');*!/

                         that.setState({top:my - that.state.yTemp});



                     }

                 }

             }

         }).mouseup(function(event) {

             if (that.AlertBody){

                 that.setState({can_move:false});

                 $('.alert_dialog_wrapper').css('cursor', 'default');

             }

         });
 */

    //新的尝试 new try

    if (this.AlertBody && show && !this.state.readyShow) {
      this.AlertBody.style.left =
        ($(window).width() - this.AlertBody.clientWidth) / 2 + "px";

      this.AlertBody.style.top =
        ($(window).height() - this.AlertBody.clientHeight) / 2 + "px";

      this.setState({ readyShow: true });
    }

    if (!show && this.state.readyShow) {
      this.setState({ readyShow: false });
    }

    $(function () {
      var xTemp, yTemp;

      var can_move = false;

      $(document).on("dragstart", ".alert_dialog_dragheader", function () {
        return false;
      });

      $(document).on("mousedown", ".alert_dialog_dragheader", function (event) {
        let $win = $(event.target).closest(".alert_dialog_wrapper");

        can_move = true;

        $(".alert_dialog_wrapper").css("cursor", "move");

        var mx = event.pageX;

        var my = event.pageY;

        xTemp = mx - parseInt($win.css("left"));

        yTemp = my - parseInt($win.css("top"));
      });

      $(window)
        .mousemove(function (event) {
          if (can_move) {
            let $win = $(event.target).closest(".alert_dialog_wrapper");

            var $window = $(window);

            var mx = event.pageX;

            var my = event.pageY;

            if (mx - xTemp > 0 && mx - xTemp < $window.width() - $win.width()) {
              $win.css("left", mx - xTemp);
            }

            if (
              my - yTemp > 0 &&
              my - yTemp < $window.height() - $win.height()
            ) {
              $win.css("top", my - yTemp);
            }
          }
        })
        .mouseup(function () {
          can_move = false;

          $(".alert_dialog_wrapper").css("cursor", "default");
        });
    });
  }

  render() {
    const {
      type,
      title,
      abstract,
      okTitle,
      cancelTitle,
      show,
      contentMaxWidth,
      className,
    } = this.props;

    let { cancelShow, okShow } = this.props;

    let maskShow = false;

    let okContent,
      cancelContent = "";

    switch (type) {
      case "btn-success":
      case "btn-error":
      case "btn-warn":
        maskShow = true;
        okShow = okShow === "n" ? false : true;
        cancelShow = cancelShow === "n" ? false : true;
        okContent = okTitle ? okTitle : "确定";
        cancelContent = cancelTitle ? cancelTitle : "取消";
        break;
      case "btn-query":
        maskShow = true;
        okShow = okShow === "n" ? false : true;
        cancelShow = cancelShow === "n" ? false : true;
        okContent = okTitle ? okTitle : "确定";
        cancelContent = cancelTitle ? cancelTitle : "取消";
        break;
      case "btn-tips":
        maskShow = true;
        okShow = false;
        cancelShow = cancelShow === "n" ? false : true;
        cancelContent = cancelTitle ? cancelTitle : "我知道了";
        break;
      default:
        maskShow = false;
        cancelShow = false;
        okShow = false;
        okContent = "确定";
        cancelContent = "取消";
    }

    return (
      <React.Fragment>
        {show ? (
          maskShow ? (
            <React.Fragment>
              <div
                className={`alert_dialog_mask ${className ? className : ""}`}
                style={{ display: `${show ? "block" : "none"}` }}
              ></div>
              <div
                className={`alert_dialog_tab ${className ? className : ""}`}
                style={{ display: `${show ? "block" : "none"}` }}
              >
                <div
                  ref={(ref) => (this.AlertBody = ref)}
                  className="border alert_dialog_wrapper"
                  id="alert_dialog_wrapper"
                >
                  {/*style={{left:this.state.left,top:this.state.top}} 这个地方应该是AlertBody的行内样式*/}

                  <div className="alert_dialog_dragheader"></div>

                  <div
                    className="alert_close_btn"
                    onClick={this.closeAlert.bind(this)}
                  ></div>
                  <div
                    className={`alert_dialog_content ${
                      abstract ? "has-abstract" : ""
                    }`}
                  >
                    {abstract ? (
                      <div className={`big_icon ${type}`}></div>
                    ) : (
                      <div className={`left-icon ${type}`}></div>
                    )}
                    <div
                      className={`alert_dialog_msg ${abstract ? "big" : type}`}
                    >
                      {title}
                    </div>
                    {abstract ? (
                      <div className="alert_dialog_abstract">{abstract}</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="alert_dialog_footer">
                    {okShow ? (
                      <input
                        type="button"
                        className="ok"
                        onClick={this.ok.bind(this)}
                        value={okContent}
                      />
                    ) : (
                      ""
                    )}
                    {cancelShow ? (
                      <input
                        type="button"
                        className="cancel"
                        onClick={this.cancel.bind(this)}
                        value={cancelContent}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div
              className={`alert_tips_tab ${show ? "animation" : ""} ${
                className ? className : ""
              }`}
              ref="alert_tips_tab"
            >
              <div className="border">
                <div
                  className={`alert_tab_content ${type}`}
                  style={contentMaxWidth ? { maxWidth: contentMaxWidth } : {}}
                >
                  {title}
                </div>
              </div>
            </div>
          )
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
/*
 * 弹出框 end
 * */
/*
 * 左侧菜单
 * */

class Menu extends React.Component {
  constructor(props) {
    super(props);

    window.AppRightContentChange = this.AppRightContentChange.bind(this);

    this.state = {
      Height: "auto",
    };
  }

  /*参数解构*/
  paramsDeconstruction(props) {
    if (!props.params) return;

    const { initParams, ...reset } = props.params;
    let { children, MenuBox } = { ...reset };
    let layer = 1;
    /*级数*/

    this.setState({
      initParams: initParams,
      menuDom: this.objectDeconstruction(children, layer),
      MenuBoxWidth: MenuBox.width ? MenuBox.width + "px" : 240 + "px",
      MenuBoxShow: MenuBox.display ? "block" : "none",
      MenuBoxTopPic: "menu_top_" + MenuBox.MenuBoxTopPic,
    });
  }

  AppRightContentChange(ContentHeight) {
    if (ContentHeight > 0 && this.LeftMenu) {
      let DefalutHeight = window.innerHeight;

      let maxHeight = 0;

      let LeftHeight = this.LeftMenu.clientHeight;

      if (ContentHeight + 60 < DefalutHeight) {
        maxHeight = ContentHeight - 88;
      } else {
        maxHeight = DefalutHeight - 80;
      }

      this.setState({ Height: maxHeight });
    }
  }

  /*多层对象解构*/
  objectDeconstruction = (object, layer, ulDisbled) => {
    let myLayer = layer;
    /*级数*/
    if ("object" === typeof object && isNaN(object.length)) {
      // console.log(object)

      if (object.children) {
        /*有下一级*/
        const { children, ...params } = object;
        if (myLayer === 1) {
          return (
            <React.Fragment key={object.key}>
              <div
                className={`frame_leftmenu_mainitem ${
                  object.active ? "active" : ""
                } ${object.selected ? "selected" : ""} `}
              >
                <span
                  className={`frame_leftmenu_mainitem_name ${object.icon} ${
                    object.active ? "active" : ""
                  } `}
                  onClick={() => object.onTitleClick(object.key)}
                  title={object.title}
                >
                  {object.title}
                </span>

                <span
                  className={`frame_leftmenu_arrow ${
                    object.selected ? "spread" : ""
                  }`}
                ></span>
              </div>
              <div
                className="frame_leftmenu_nextgrade_container"
                style={{ display: object.selected ? "block" : "none" }}
              >
                {this.objectDeconstruction(children, myLayer + 1)}
              </div>
            </React.Fragment>
          );
        } else if (myLayer === 2) {
          return (
            <div className="frame_leftmenu_twograde_container" key={object.key}>
              <div className="frame_leftmenu_twograde_grounp">
                <span className="frame_leftmenu_twograde_arrow"></span>
                <span
                  className="frame_leftmenu_twograde_text"
                  onClick={() => object.onTitleClick(object.key)}
                  title={object.title}
                >
                  {object.title}
                </span>
                <span className="frame_left_menu_right_arrow"></span>
              </div>
              {this.objectDeconstruction(children, myLayer + 1, true)}
            </div>
          );
        }
      } else {
        if (myLayer === 1) {
          /*最后一级*/
          // console.log(object)
          return (
            <div
              className={`frame_leftmenu_mainitem no_child ${
                object.active ? "active" : ""
              } ${object.selected ? "selected" : ""} ${
                object.select ? "selectd active" : ""
              } `}
              key={object.key}
            >
              <span
                className={`frame_leftmenu_mainitem_name ${object.icon} ${
                  object.active ? "active" : ""
                } `}
                onClick={() => object.onTitleClick(object.key)}
                title={object.title}
              >
                {object.title}
              </span>
            </div>
          );
        } else if (myLayer === 2) {
          return (
            <li
              className={`clearfix ${object.active ? "active" : ""} ${
                object.selected ? "selected" : ""
              } `}
              key={object.key}
            >
              <span
                className={`frame_leftmenu_point ${
                  object.active ? "active" : ""
                } ${object.selected ? "selected" : ""} `}
              ></span>
              <span
                className={`frame_leftmenu_onegrade_name frame_ellipsis ${
                  object.active ? "active" : ""
                } ${object.selected ? "selected" : ""} `}
                onClick={() => object.onTitleClick(object.key)}
                title={object.title}
              >
                {object.title}
              </span>
            </li>
          );
        } else {
          return (
            <li className="clearfix" key={object.key}>
              <span className="frame_leftmenu_point"></span>
              <span
                className="frame_leftmenu_onegrade_name frame_ellipsis"
                onClick={() => object.onTitleClick(object.key)}
                title={object.title}
              >
                {object.title}
              </span>
            </li>
          );
        }
      }
    } else if (object instanceof Array) {
      /*children数组，进行拆分*/
      let end = true;
      const listItem = object.map((child) => {
        if (child.children) end = false;
        return this.objectDeconstruction(child, myLayer);
      });
      if (end) {
        if (layer === 1) return listItem;
        else if (ulDisbled)
          return (
            <ul
              className="frame_leftmenu_lastgrade_ul"
              style={{ display: "none" }}
            >
              {listItem}
            </ul>
          );
        else return <ul className="frame_leftmenu_onegrade_ul">{listItem}</ul>;
      } else return listItem;
    }
  };

  componentWillMount() {
    //为左侧菜单设置固定高
    let height = window.innerHeight;
    this.setState({
      height: height - 100,
    });
    this.paramsDeconstruction(this.props);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.paramsDeconstruction(nextProps); //props有变化时执行
  }

  render() {
    return (
      <div
        className={`MenuBox`}
        style={{
          width: this.state.MenuBoxWidth,
          display: this.state.MenuBoxShow,
        }}
      >
        <div className={`MenuBox_top ${this.state.MenuBoxTopPic}`}></div>

        <div
          id="frame_left_menu_container"
          ref={(ref) => (this.LeftMenu = ref)}
          className="frame_left_menu_container"
        >
          <Scrollbars
            autoHeight
            autoHeightMax={this.state.Height}
            style={{ width: 240 }}
          >
            {this.state.menuDom}
          </Scrollbars>
        </div>
      </div>
    );
  }
}

class MenuLeft extends React.Component {
  constructor(props) {
    super(props);

    window.AppRightContentChange = this.AppRightContentChange.bind(this);

    this.state = {
      Height: "auto",
    };
  }

  AppRightContentChange(ContentHeight) {
    if (ContentHeight > 0 && this.LeftMenu) {
      let DefalutHeight = window.innerHeight;

      let maxHeight = 0;

      let LeftHeight = this.LeftMenu.clientHeight;

      if (ContentHeight + 60 < DefalutHeight) {
        maxHeight = ContentHeight - 88;
      } else {
        maxHeight = DefalutHeight - 80;
      }

      this.setState({ Height: maxHeight });
    }
  }

  render() {
    //传递的参数的数据
    const { Menu, Icon, menuClick } = this.props;
    //history.pathname路由
    const pathname = this.props.history.location.pathname;

    return (
      <Router>
        <div className="frame_left_menu_pin">
          <div className={`frame_left_menu_pic ${Icon ? Icon : "pic1"}`}></div>

          <div
            id="frame_left_menu_container"
            ref={(ref) => (this.LeftMenu = ref)}
            className="frame_left_menu_container"
          >
            <Scrollbars
              autoHeight
              autoHeightMax={this.state.Height}
              style={{ width: 240 }}
            >
              {Menu &&
                Menu.map((item, key) => {
                  //如果有第二级别
                  if (item.List) {
                    //active状态的类名
                    let activeClass = "";

                    if (pathname === `${item.link}`) {
                      activeClass = "active selected";
                    } else if (pathname.indexOf(`${item.link}`) === 0) {
                      activeClass = "selected";
                    }

                    return (
                      <React.Fragment key={key}>
                        {/* {第二级别块}*/}
                        <div
                          className={`frame_leftmenu_mainitem ${activeClass}`}
                        >
                          <NavLink
                            exact
                            to={{
                              pathname: item.link,
                              params: { id: item.id, name: item.name },
                            }}
                            className={`frame_leftmenu_mainitem_name ${
                              item.menu ? item.menu : ""
                            }`}
                          >
                            {item.name}
                          </NavLink>

                          <span
                            className={`frame_leftmenu_arrow ${
                              activeClass === "selected" ? "spread" : ""
                            }`}
                          ></span>
                        </div>
                        <div
                          className="frame_leftmenu_nextgrade_container"
                          style={{
                            display: `${
                              activeClass === "selected" ? "block" : "none"
                            }`,
                          }}
                        >
                          <ul className="frame_leftmenu_onegrade_ul">
                            {item.List &&
                              item.List.map((i, k) => {
                                return (
                                  <li
                                    key={k}
                                    className={`clearfix ${
                                      pathname.indexOf(i.link) === 0
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    <span
                                      className={`frame_leftmenu_point ${
                                        pathname.indexOf(i.link) === 0
                                          ? "active"
                                          : ""
                                      }`}
                                    ></span>

                                    <NavLink
                                      to={{
                                        pathname: i.link,
                                        params: { id: i.id, name: i.name },
                                      }}
                                      className={`frame_leftmenu_onegrade_name frame_ellipsis ${
                                        pathname.indexOf(i.link) === 0
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      {i.name}
                                    </NavLink>
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  } else {
                    //如果没有第二级直接返回，同时pathname和NavLink的参数相同处于活动状态
                    return (
                      <div
                        key={key}
                        className={`frame_leftmenu_mainitem no_child ${
                          pathname.includes(item.link) ? "active selected" : ""
                        }`}
                      >
                        <NavLink
                          onClick={(e) =>
                            menuClick({ id: item.id, name: item.name })
                          }
                          to={{
                            pathname: item.link,
                            state: { id: item.id, name: item.name },
                          }}
                          className={`frame_leftmenu_mainitem_name ${
                            item.menu ? item.menu : ""
                          }`}
                        >
                          {item.name}
                        </NavLink>
                      </div>
                    );
                  }
                })}
            </Scrollbars>
          </div>
        </div>
      </Router>
    );
  }
}

class MenuLeftNoLink extends React.Component {
  constructor(props) {
    super(props);

    window.AppRightContentChange = this.AppRightContentChange.bind(this);

    this.state = {
      Height: "auto",
    };
  }

  AppRightContentChange(ContentHeight) {
    if (ContentHeight > 0 && this.LeftMenu) {
      let DefalutHeight = window.innerHeight;

      let maxHeight = 0;

      let LeftHeight = this.LeftMenu.clientHeight;

      if (ContentHeight + 60 < DefalutHeight) {
        maxHeight = ContentHeight - 88;
      } else {
        maxHeight = DefalutHeight - 80;
      }

      this.setState({ Height: maxHeight });
    }
  }

  render() {
    //menu和icon图标
    const { Menu, Icon, menuClick } = this.props;

    return (
      <div className="frame_left_menu_pin">
        <div className={`frame_left_menu_pic ${Icon ? Icon : "pic1"}`}></div>

        <div
          id="frame_left_menu_container"
          ref={(ref) => (this.LeftMenu = ref)}
          className="frame_left_menu_container"
        >
          <Scrollbars
            autoHeight
            autoHeightMax={this.state.Height}
            style={{ width: 240 }}
          >
            {Menu &&
              Menu.map((item, key) => {
                //如果有第二级别
                if (item.List && item.List.length > 0) {
                  //active状态的类名

                  return (
                    <React.Fragment key={key}>
                      {/* {第二级别块}*/}
                      <div
                        className={`frame_leftmenu_mainitem`}
                        data-id={item.id}
                      >
                        <span
                          title={item.name}
                          className={`frame_leftmenu_mainitem_name ${
                            item.menu ? item.menu : ""
                          }`}
                          onClick={() => {
                            menuClick({
                              ident: item.ident,
                              id: item.id,
                              name: item.name,
                            });
                          }}
                        >
                          {item.name}
                        </span>

                        <span className={`frame_leftmenu_arrow`}></span>
                      </div>

                      <div
                        className="frame_leftmenu_nextgrade_container"
                        style={{ display: "none" }}
                      >
                        <ul className="frame_leftmenu_onegrade_ul">
                          {item.List &&
                            item.List.map((i, k) => {
                              return (
                                <li
                                  key={k}
                                  className={`clearfix`}
                                  data-id={i.id}
                                >
                                  <span
                                    className={`frame_leftmenu_point`}
                                  ></span>

                                  <span
                                    className={`frame_leftmenu_onegrade_name frame_ellipsis`}
                                    onClick={() => {
                                      menuClick({
                                        ident: i.ident,
                                        id: i.id,
                                        preId: item.id,
                                        preName: item.name,
                                        name: i.name,
                                      });
                                    }}
                                    title={i.name}
                                  >
                                    {i.name}
                                  </span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                } else {
                  //如果没有第二级直接返回，同时pathname和NavLink的参数相同处于活动状态
                  return (
                    <div
                      key={key}
                      className={`frame_leftmenu_mainitem no_child ${
                        item.default ? "active selected" : ""
                      }`}
                      data-id={item.id}
                    >
                      <span
                        className={`frame_leftmenu_mainitem_name ${
                          item.menu ? item.menu : ""
                        }`}
                        onClick={() => {
                          menuClick({
                            ident: item.ident,
                            id: item.id,
                            name: item.name,
                          });
                        }}
                        title={item.name}
                      >
                        {item.name}
                      </span>
                    </div>
                  );
                }
              })}
          </Scrollbars>
        </div>
      </div>
    );
  }
}

/*界面框架*/
class Frame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fixed: false,
      isFrame:false,
      isWorkPlantform:false,
      isInitGuide:false
    };
  }

  /*componentDidMount() {

    $(window).scroll(() => {
      let scrollTop = $(window).scrollTop();

      if (scrollTop > 216) {
        this.setState({ fixed: true });
      } else {
        this.setState({ fixed: false });
      }
    });

  }*/

  UNSAFE_componentWillReceiveProps(){

        if(window.AppRightContentChange){

            window.AppRightContentChange(this.RightContent.clientHeight);

        }

        if(getQueryVariable('isWorkPlantform')){

            this.setState({isWorkPlantform:true});

        }

        if(getQueryVariable('isInitGuide')){

            this.setState({isInitGuide:true});

        }

    }

  render() {
    const {
      children,
      register,
      WebIndexUrl,
      WebRootUrl,
      ProductName = "",
      ProVersion = "",
      type,
      module,
      userInfo,
      msg,
      showLeftMenu,
      showBarner = true,
      onLogOut,
      contentShow = true,
      MessageShow = false,
      showTop = true,
      showBottom = true,
      logo,
      topRightContent,
      ...reset
    } = this.props;

    let bgAnimateDom = "";
    let beyondAnimateDom = "";
    let timeBarner = "";
    let leftMenu = "";
    let rightContent = "";
    let otherDom = "";
    if (children && children instanceof Array) {
      children.map((item) => {
        switch (item.ref) {
          case "frame-time-barner":
            timeBarner = item;
            break;
          case "frame-left-menu":
            leftMenu = item;
            break;
          case "frame-right-content":
            rightContent = item;
            break;
          default:
            otherDom = item;
        }
      });
    } else {
      rightContent = children;
    }

    switch (type) {
      case "oblong":
        bgAnimateDom = <div className="frame-oblong-animation"></div>;
        break;
      case "circle":
        bgAnimateDom = (
          <React.Fragment>
            <div className="frame-circle-animation1"></div>
            <div className="frame-circle-animation2"></div>
            <div className="frame-circle-animation3"></div>
            <div className="frame-circle-animation4"></div>
            <div className="frame-circle-animation5"></div>
            <div className="frame-circle-animation6"></div>
          </React.Fragment>
        );
        break;
      case "square":
        beyondAnimateDom = (
          <ul className="frame-square-wrapper">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        );
        break;
      case "triangle":
        beyondAnimateDom = (
          <ul className="frame-triangle-wrapper">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        );
        break;
      default:
        bgAnimateDom = "";
        beyondAnimateDom = "";
    }

    const token = localStorage.getItem("token");

    return (

      <div className={`frame-drag-flag ${this.state.isInitGuide?'isInitGuide':''}  ${this.state.isWorkPlantform?'in-work-plant-form':''}`}   {...reset}>

          {

            showTop?

                <div className="frame-header-wrapper">
                    <div className={`frame-header-bg ${type ? type : ""}`}>
                        <div className="frame-header-star-bg">{bgAnimateDom}</div>{" "}
                        {/*星星的背景图*/}
                    </div>
                    {beyondAnimateDom}
                    <div className="frame-home-header">
                        <div className="frame-home-header-content">
                            <div
                                className="frame-home-logo"
                                style={{ backgroundImage:`url(${logo?logo:CONFIG.logo})` }}
                            >
                                <a href={`${WebIndexUrl}?lg_tk=${token}`}>{ProductName}</a>
                            </div>

                {!register ? (
                  <div className="frame-home-header-menus">
                    <div className="frame-home-header-menu">
                      <input
                        className="frame-home-logout"
                        title="退出"
                        type="button"
                        onClick={onLogOut ? () => onLogOut() : () => {}}
                        value=""
                      />


                      <a
                        href={`${WebRootUrl}/html/personalMgr?lg_tk=${token}`}
                        target="_blank"
                        className="frame-home-username"
                        title={userInfo &&userInfo.name?userInfo.name : ""}
                      >
                        {userInfo && userInfo.name ? userInfo.name : ""}
                      </a>

                        {

                            userInfo&&userInfo.image?

                                <a
                                    href={`${WebRootUrl}/html/personalMgr?lg_tk=${token}`}
                                    target="_blank"
                                    className="frame-home-userpic"
                                    style={{backgroundImage: `url(${userInfo.image})`,
                                    }}>

                                </a>

                                :null

                        }


                    </div>

                    {MessageShow ? (
                      <div className="frame-home-header-menu">
                        <span
                          id="Assistant_infoCenter"
                          className={`frame-home-msg-menu ${msg ? "msg" : ""}`}
                          title="我的消息"
                        ></span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
                    <div
                      className={`frame-block-wrapper ${
                        module && module.className ? module.className : ""
                      }`}
                      style={{
                        backgroundImage: `url(${
                          module && module.image ? module.image : ""
                        })`,
                      }}
                    >
                      <div className="frame-block-zh-name clearfix">

                        <div className={"frame-block-title"}>{module && module.cnname ? module.cnname : ""}</div>

                          {

                              module.subtitle?

                                  <div className={"frame-block-subtitle"}>{module.subtitle}</div>

                                  :null

                          }

                      </div>
                      <div className="frame-block-en-name">
                        {module && module.enname ? module.enname : ""}
                      </div>

                      <div className={"frame-top-right-content"}>{topRightContent}</div>

                    </div>

              </div>
         :
          ""
        }

        {showBarner ? (
          <div className={`frame-time-bar ${this.state.isWorkPlantform?'in-work-plant-form':''}`}>
            <div className="frame-nav-content">{timeBarner}</div>
          </div>
        ) : (
          ""
        )}
        <div
          className={`frame-content-wrapper clearfix ${
            showBarner ? "" : "barnerHide"
          } ${this.state.isWorkPlantform?'in-work-plant-form':''}

          ${this.state.isInitGuide?'isInitGuide':''}

          `}
        >
          <div
            className={`frame-content-leftside ${
              showLeftMenu ? "" : "frame-hide"
            } ${this.state.fixed ? "fix" : ""}`}
          >
            {leftMenu}
          </div>

          {contentShow ? (
            <div
              ref={(ref) => (this.RightContent = ref)}
              id="frame-content-rightside"
              className={`frame-content-rightside ${
                showLeftMenu ? "" : "frame-fluid"
              }`}
            >
              {rightContent}
            </div>
          ) : (
            ""
          )}
        </div>

          {

            showBottom?

                <div className={`frame-bottom ${module.subtitle?'no-title':''}`}>{!module.subtitle?ProVersion:''}</div>

                :''

          }
      </div>
    );
  }
}

class DetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      examineFooter: "",
      mask: props.mask ? props.mask : true,
      module: props.module ? props.module : 2, //1为档案，2为账号
    };
  }

  render() {
    let { type, data, children, ...params } = this.props;
    // console.log(params)
    if (type === "student") {
    }
    // if(data){
    //     data = {
    //         userName: null,
    //         userImg: null,
    //         Gende: null,
    //         userText: null,
    //         userID: null,
    //         userGrade: null,
    //         userClass: null,
    //         userIDCard: null,
    //         userPhone: null,
    //         userMail: null,
    //         userAddress: null
    //     };
    // }
    return (
      <AntdModal
        bodyStyle={{ padding: 0 }}
        width={400}
        mask={this.state.mask}
        footer={
          type === "examine" || type === "examineTeacher"
            ? [
                <Button
                  key="agree"
                  className="antdModal-btn-footer left"
                  color="blue"
                  onClick={params.onOk ? params.onOk.bind(this, data) : ""}
                >
                  通过
                </Button>,
                <Button
                  key="refuse"
                  className="antdModal-btn-footer right"
                  color="red"
                  onClick={params.onFail ? params.onFail.bind(this, data) : ""}
                >
                  不通过
                </Button>,
              ]
            : null
        }
        className="DetailsMsgModal"
        {...params}
      >
        <div className="modal-top">
          <div
            className="top-img"
            alt={data.userName}
            style={{
              backgroundColor: "#fff",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${data.userImg})`,
              backgroundPosition: "center center",
              backgroundSize: "80px",
              // ,background:`url(${data.userImg}) no-repeat center center / 80px`
            }}
          ></div>
          <p className="top-userName" title={data.userName}>
            {data.userName}
            <span style={{ opacity: 0.64, marginLeft: 3 + "px" }}>
              {data.Gende === "男" ? "♂" : data.Gende === "女" ? "♀" : ""}
            </span>
          </p>
          <p className="top-userText" title={data.userText}>
            {data.userText}
          </p>
        </div>
        <div className="modal-content">
          <div className="content-box">
            <div className="row">
              <span className="col-left">
                {type === "student" ||
                type === "graduate" ||
                (type === "examine" && this.state.role !== "teacher")
                  ? "学号"
                  : type === "parents"
                  ? "编号"
                  : "工号"}
              </span>
              <span className="col-right" title={data.userID}>
                {data.userID ? (
                  data.userID
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            <div
              style={{ display: type === "parents" ? "block" : "none" }}
              className="row"
            >
              <span className="col-left">{"子女学号"}</span>
              <span className="col-right" title={data.StudentID}>
                {data.StudentID ? (
                  data.StudentID
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            {/* <div style={{ display: type === 'parents' ? 'block' : 'none' }} className='row'>
                            <span className='col-left'>
                                {'子女姓名'}
                            </span>
                            <span className='col-right' title={data.StudentName}>{data.StudentName ? data.StudentName : <span className='content-null'>未填写</span>}</span>
                        </div> */}
            <div
              className="row"
              style={{ display: type === "graduate" ? "block" : "none" }}
            >
              <span className="col-left">{"毕业年份"}</span>
              <span className="col-right" title={data.year + "年"}>
                {data.year ? (
                  data.year + "年"
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            <div
              className="row"
              style={{ display: type === "graduate" ? "block" : "none" }}
            >
              <span className="col-left">{"班级"}</span>
              <span className="col-right" title={data.userClass}>
                {data.userClass ? (
                  data.userClass
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            <div
              className="row"
              style={{
                display:
                  type !== "leader" && type !== "graduate" && type !== "admin"
                    ? "block"
                    : "none",
              }}
            >
              <span className="col-left">
                {type === "student" || type === "examine"
                  ? "班级"
                  : type === "parents"
                  ? "子女班级"
                  : "所教学科"}
              </span>
              <span
                className="col-right"
                title={
                  type === "student" || type === "examine" || type === "parents"
                    ? data.userGrade && data.userClass
                      ? data.userGrade + " > " + data.userClass
                      : ""
                    : data.subjectName
                    ? data.subjectName
                    : ""
                }
              >
                {type === "student" ||
                type === "examine" ||
                type === "parents" ? (
                  data.userGrade && data.userClass ? (
                    data.userGrade + " > " + data.userClass
                  ) : (
                    <span className="content-null">未填写</span>
                  )
                ) : data.subjectName ? (
                  data.subjectName
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            <div
              className="row"
              style={{
                display:
                  type === "teacher" || type === "examineTeacher"
                    ? "block"
                    : "none",
              }}
            >
              <span className="col-left">{"职称"}</span>
              <span className="col-right" title={data.titleName}>
                {data.titleName ? (
                  data.titleName
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            <div
              className="row"
              style={{ display: type === "leader" ? "block" : "none" }}
            >
              <span className="col-left">{"行政职务"}</span>
              <span className="col-right" title={data.Position}>
                {data.Position ? (
                  data.Position
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            <div
              className="row"
              style={{ display: type === "graduate" ? "block" : "none" }}
            >
              <span className="col-left">{"毕业去向"}</span>
              <span
                className="col-right"
                title={
                  (data.jobType ? data.jobType : "") +
                  " " +
                  (data.discription ? data.discription : "")
                }
              >
                {data.hasTrack ? (
                  <span className="text-overflow">
                    <span className="text" style={{ marginRight: 10 + "px" }}>
                      {data.jobType}
                    </span>
                    <span className="text">{data.discription}</span>
                  </span>
                ) : (
                  <span className="content-null">--</span>
                )}
              </span>
            </div>

            {/* 用户档案 */}
            <div
              className="row"
              style={{
                display: this.state.module === 1 ? "block" : "none",
                marginTop: 20 + "px",
              }}
            >
              <span className="col-left">{"身份证号码"}</span>
              <span className="col-right" title={data.userIDCard}>
                {data.userIDCard ? (
                  data.userIDCard
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            <div
              className="row"
              style={{ display: this.state.module === 1 ? "block" : "none" }}
            >
              <span className="col-left">{"预留电话"}</span>
              <span className="col-right" title={data.userPhone}>
                {data.userPhone ? (
                  data.userPhone
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            <div
              className="row"
              style={{ display: this.state.module === 1 ? "block" : "none" }}
            >
              <span className="col-left">{"电子邮箱"}</span>
              <span className="col-right" title={data.userMail}>
                {data.userMail ? (
                  data.userMail
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            <div
              className="row row-adress"
              style={{ display: this.state.module === 1 ? "block" : "none" }}
            >
              <span className="col-left">{"家庭住址"}</span>
              <span className="col-right" title={data.userAddress}>
                {data.userAddress ? (
                  data.userAddress
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            {/* end */}
            <div
              className="row"
              style={{
                marginTop: 20 + "px",
                display: type === "examine" ? "block" : "none",
              }}
            >
              <span className="col-left">{"注册时间"}</span>
              <span className="col-right" title={data.userRegisterTime}>
                {data.userRegisterTime ? (
                  data.userRegisterTime
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            <div
              className="row"
              style={{
                marginBottom: 20 + "px",
                display: type === "examine" ? "block" : "none",
              }}
            >
              <span className="col-left">{"注册IP"}</span>
              <span className="col-right" title={data.userRegisterIP}>
                {data.userRegisterIP ? (
                  data.userRegisterIP
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>

            {/* 用户账号 */}
            <div
              className="row"
              style={{
                marginTop: 20 + "px",
                display: this.state.module === 2 ? "block" : "none",
              }}
            >
              <span className="col-left">{"QQ"}</span>
              <span className="col-right" title={data.QQ}>
                {data.QQ ? (
                  data.QQ
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            <div
              className="row"
              style={{ display: this.state.module === 2 ? "block" : "none" }}
            >
              <span className="col-left">{"微信"}</span>
              <span className="col-right" title={data.Weixin}>
                {data.Weixin ? (
                  data.Weixin
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            <div
              className="row"
              style={{ display: this.state.module === 2 ? "block" : "none" }}
            >
              <span className="col-left">{"微博"}</span>
              <span className="col-right" title={data.Weibo}>
                {data.Weibo ? (
                  data.Weibo
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            <div
              className="row"
              style={{
                marginBottom: 20 + "px",
                display: this.state.module === 2 ? "block" : "none",
              }}
            >
              <span className="col-left">{"联系电话"}</span>
              <span className="col-right" title={data.Telephone}>
                {data.Telephone ? (
                  data.Telephone
                ) : (
                  <span className="content-null">未填写</span>
                )}
              </span>
            </div>
            {/* end */}
          </div>
        </div>
      </AntdModal>
    );
  }
}

// 文字气泡提示

class Tips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      placement = "right",
      getPopupContainer = (triggerNode) => triggerNode.parentNode,
      children,
      overlayStyle,
      ...params
    } = this.props;
    // console.log(params)
    return (
      <Tooltip
        placement={placement}
        getPopupContainer={getPopupContainer}
        overlayStyle={overlayStyle}
        className="Tooltips-red"
        {...params}
      >
        {children}
      </Tooltip>
    );
  }
}

const LeftMenu = withRouter(MenuLeft);

const PagiNation = memo(PageComponent);

const Alert = memo(AppAlert);

const DropDown = memo(DropComponent);

PagiNation.defaultProps = {
  showQuickJumper: true,

  showSizeChanger: false,

  hideOnSinglePage: true,

  pageSizeOptions: ["10", "20", "50", "100"],

  total: 0,

  pageSize: 10,

  current: 1,
};

DropDown.defaultProps = {
  dropList: [],
  TitleShow: true,

  width: 120,
  dropLoadingShow: false,

  dropSimpleSearch: false,

  //simpleSearchChange:()=>{}
};

export {
  Radio,
  RadioGroup,
  CheckBox,
  CheckBoxGroup,
  Table,
  PagiNation,
  Search,
  DropDown,
  Button,
  Input,
  Empty,
  Modal,
  Menu,
  Loading,
  Alert,
  Frame,
  LeftMenu,
  DetailsModal,
  Tips,
  MenuLeftNoLink,
};
