import React from "react";
import { Button } from "antd";
import "../../../../scss/Card.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import tool from "../../../../images/tool.png";
import App from "../../../../images/App.png";
import database from "../../../../images/database.png";
import Website from "../../../../images/Website.png";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrue: true,
      isWord: true,
      ramdon:Math.random()
    };
  }
  //图片加载成功调用
  ImgLoad(e, imgData) {
    const { dispatch } = this.props;
    this.setState({
      // isTrue: true,
      isWord: false
    });
    // console.log(e,imgData,'true')
  }

  //图片加载失败调用
  ImgErrorLoad(e, imgData) {
    const { dispatch } = this.props;
    this.setState({
      isTrue: false,
      isWord: false
    });
    // console.log(e,imgData,'false',this.state.isTrue)
  }
  // 点击跳转
  onLinkClick = data => {
    if(data.type==='database'){
      return
    }
    let Url = data.Url;
    window.open(Url);
  };
  render() {
    //console.log(this.props.data)
    let data = this.props.data;
    let number = Math.random() * 3;
    let myColor = number > 2 ? "blue" : number > 1 ? "orange" : "green";
    let ImgDefault = Website;
    if (data.type === "Website") {
      ImgDefault = Website;
    } else if (data.type === "App") {
      ImgDefault = App;
    } else if (data.type === "tool") {
      ImgDefault = tool;
    } else if (data.type === "database") {
      ImgDefault = database;
    }
    // console.log(this.state.isTrue)
    // console.log((this.props.type === "alter"&&data.type === "Website") ?'Card-alter':'Card-other')
    return (
      <div
        ref={this.props.provided.innerRef}
        {...this.props.provided.draggableProps}
        {...this.props.provided.dragHandleProps}
        className={`Card `}
        style={this.props.style}
      >
        <div
          onClick={this.onLinkClick.bind(this, data)}
          className={`img-box ${data.type === "Website"||!this.state.isTrue ? data.myColor : ""} ${
            this.state.isWord ? data.type : ""
          }`}
        >
          {this.state.isTrue ? (
            // <span><img
            //     className='card-default'
            //     style={{display:this.state.isWord?'inline-block':'none'}}
            //     alt={''}
            //     src={ImgDefault}
            // ></img>
            <img
              className="card-img"
              alt={""}
              style={{ display: !this.state.isWord ? "inline-block" : "none" ,maxWidth:data.type === "Website"?'48px':'80px',maxHeight:data.type === "Website"?'48px':'80px',width:data.type === "Website"?'auto':'80px',height:data.type === "Website"?'auto':'80px'}}
              src={data.Img}
              onLoad={this.ImgLoad.bind(this, data)}
              onError={this.ImgErrorLoad.bind(this, data)}
            ></img>
          ) : (
            // {/* </span> */}
            <span className="inErrorText">
              {data.Name ? data.Name.split("")[0] : ""}
            </span>
          )}
        </div>
        <p
          onClick={this.onLinkClick.bind(this, data)}
          className="card-name"
          title={this.props.data.Name}
        >
          <i
            style={{
              display: this.props.data.IsCreatedByMe ? "inline-block" : "none"
            }}
            className="isSelf"
          ></i>
          <span
            style={{
              paddingLeft: this.props.data.IsCreatedByMe ? "12px" : "0"
            }}
          >
            {this.props.data.Name}
          </span>
        </p>
        {this.props.type === "main" ? (
          <span
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              this.props.onEditClick();
            }}
            className="main-btn"
          >
            移除
          </span>
        ) : (
          <span
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              this.props.onAddClick();
            }}
            className="alter-btn"
          >
            添加至桌面
          </span>
        )}
        {this.props.data.IsCreatedByMe ? (
          <div className="handle-box">
            <span
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                this.props.onDeleteClick();
              }}
              className="delete"
            ></span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                this.props.onResetClick(data);
              }}
              className="reset"
            ></span>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
Card.defaultProps = {
  type: "main",
  custom: "Website"
};

export default Card;
