import React from "react";
import { Button } from "antd";
import "../../../../scss/Card.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class CombineCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrue: [true, true, true, true, true, true, true, true]
    };
  }
  //图片加载成功调用
  ImgLoad(e, imgData) {
    const { dispatch } = this.props;

    // console.log(e,imgData,'true')
  }

  //图片加载失败调用
  ImgErrorLoad(imgData, index) {
    const { dispatch } = this.props;
    let isTrue = this.state.isTrue;
    isTrue[index] = false;
    this.setState({
      isTrue: isTrue
    });
    // console.log(imgData,'false',this.state.isTrue,index)
  }
  // 点击打开分组
  onCardClick = data => {
    // console.log(data)
    this.props.onCardClick(data);
  };
  // 点击跳转
  onLinkClick = data => {
    let Url = data.Url;
    window.open(Url);
  };

  render() {
    //console.log(this.props.data)
    let data = this.props.data;
    let number = Math.random() * 3;
    let myColor = number > 2 ? "blue" : number > 1 ? "orange" : "green";
    // console.log(this.props.data)
    let List = data.List;
    console.log(List);
    if (List.length === 0) {
      return;
    }
    return (
      <div
        ref={this.props.provided.innerRef}
        {...this.props.provided.draggableProps}
        {...this.props.provided.dragHandleProps}
        className="Card "
        onClick={this.onCardClick.bind(this, data)}
        style={this.props.style}
      >
        <div className={`CombineCard-box`}>
          {List instanceof Array &&
            List[0].List instanceof Array &&
            List[0].List.map((child, index) => {
              return (
                <div  key={index} className={`img-box ${data.myColor}`}>
                  {this.state.isTrue[index] ? (
                    <img
                      className="card-img"
                      key={index}
                      alt={""}
                      src={child.Img}
                      onLoad={this.ImgLoad.bind(this, child)}
                      onError={this.ImgErrorLoad.bind(this, child, index)}
                    ></img>
                  ) : (
                    <span key={index} className="inErrorText">
                      {child.Name ? child.Name.split("")[0] : ""}
                    </span>
                  )}
                </div>
              );
            })}
        </div>
        <p
          
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

        <span
          onClick={e => {
            this.props.onEditClick(e);
          }}
          className="main-btn"
        >
          移除
        </span>

        {/* {this.props.data.IsCreatedByMe ? (
          <div className="handle-box">
            <span
              onClick={() => {
                this.props.onDeleteClick();
              }}
              className="delete"
            ></span>
            <span
              onClick={() => {
                this.props.onResetClick(data);
              }}
              className="reset"
            ></span>
          </div>
        ) : (
          ""
        )} */}
      </div>
    );
  }
}
CombineCard.defaultProps = {
  type: "main",
  custom: "Website"
};

export default CombineCard;
