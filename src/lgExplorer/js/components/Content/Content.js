import React, { Component } from "react";
import "../../../sass/content.scss";
import { connect } from "react-redux";
import { Loading } from "../../../../common";
import { Input } from "antd";
import HomeData from "../../action/HomeData";

import AppAlertAction from "../../action/AppAlertAction";
import pic from "../../../images/default_web.png";
import publicMethod from "../../../../common/js/public.js";

const url2 =
  " http://192.168.2.202:7300/mock/5db974a3a1aded10689632eb/example/interface4";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "P1",
      searchValue: "",
      imgShow: false,
    };
  }
  //监听网站资源页面中搜索框框中的内容改变
  inputChange = (event) => {
    // const { dispatch } = this.props;
    // // dispatch({ type: LoadingData.WORD_CHANGE, word: event.target.value })
    this.setState({
      searchValue: event.target.value,
    });
    // event.target.style.color = "black";
  };

  //如果网站图片加载失败，取网站名第一个字作为图标
  // linkImgLoading(event, { TypeID, ID, name }) {

  //     // 在0到图片数组最大索引值之间随机生成一个整数，作为选中图片的索引号
  //     let bgIndexs = bgList.length - 1
  //     let ranNum = Math.floor(Math.random() * (bgIndexs - 0 + bgIndexs)) + 0;
  //     //将随机获取的索引号，对应的图片地址给目标的src
  //     event.target.src = bgList[ranNum];
  //     const { linkArr, dispatch } = this.props;
  //     const newInformation = linkArr.map(item => {

  //         if (TypeID === item.TypeID) {

  //             let list = item.Item.map(i => {

  //                 if (i.id === ID) {

  //                     i.word = name[0];

  //                     return i;

  //                 } else {

  //                     return i;

  //                 }

  //             });

  //             return {

  //                 ...item,

  //                 Item: list

  //             }

  //         } else {

  //             return item;

  //         }

  //     });

  //     dispatch({ type: LoadingData.LINK_ARRUPDATE, linkArr: newInformation });

  // }

  // baseImgLoading({ ID, name }) {
  //     //获取修改前的原生数组
  //     const { dispatch, baseArr } = this.props;
  //     //为没有加载到图片的添加一个Word属性,值为名字的第一个字
  //     const newResource = baseArr.map(item => {
  //         if (ID === item.id) {
  //             item.word = name[0];
  //             return item;
  //         }
  //         else {
  //             return item;
  //         }
  //     });
  //     dispatch({ type: LoadingData.RESOURCE_ARRUPDATE, resourceArr: newResource });
  // }

  /*网站资源对应的图标加载失败的回调方法 
        @prama1 e ,事件对象
        @typeID 当前网站资源类的ID ，
        @ID 该类中网址的ID
        @Name 该网址对应的名称 
    */

  webPicLoadError = (e, { GroupID, ID, Name }) => {
    e.target.src = "";
    const { WebsiteResLink, dispatch } = this.props;
    const newWebResbLink = WebsiteResLink.map((item) => {
      if (GroupID === item.GroupID) {
        let list = item.List.map((i) => {
          if (i.Id === ID) {
            i.word = Name[0];
            i.imgShow = "2";

            return i;
          } else {
            return i;
          }
        });

        return {
          ...item,

          List: list,
        };
      } else {
        return item;
      }
    });
    dispatch({
      type: HomeData.REFRESH_WEBSITELINK_RESOURCE,
      data: newWebResbLink,
    });
  };

  /* 监听图片的onLoad事件
        @param1 事件对象
        @param2 GroupID 是图片所属的（组别）分类
                ID      图片对应资源的ID
    */
  webPicLoading = (e, { GroupID, ID }) => {
    const { WebsiteResLink, dispatch } = this.props;
    const newWebResbLink = WebsiteResLink.map((item) => {
      if (GroupID === item.GroupID) {
        let list = item.List.map((i) => {
          if (i.Id === ID) {
            i.imgShow = "1";
            return i;
          } else {
            return i;
          }
        });

        return {
          ...item,

          List: list,
        };
      } else {
        return item;
      }
    });
    dispatch({
      type: HomeData.REFRESH_WEBSITELINK_RESOURCE,
      data: newWebResbLink,
    });
  };

  /* 监听年级信息栏
    @param1 学段ID（小、初、高）
    */
  periodChange = (PeriodId) => {
    let { dispatch, WebsiteResLink, SubjectId } = this.props;
    WebsiteResLink = [];
    dispatch({
      type: HomeData.REFRESH_WEBSITELINK_RESOURCE,
      data: WebsiteResLink,
    });

    this.setState(
      {
        active: PeriodId,
      },
      () => {
        dispatch(HomeData.getLinkData(PeriodId, SubjectId));
      }
    );
  };
  //搜索框按钮的点击事件
  handelSearch = () => {
    window.location.href = ` http://www.baidu.com/s?wd=${this.state.searchValue}`;
  };
  //处理资源库中数据的图标的加载事件
  resPicLoadError = ({ Name }) => {
    const { dispatch, ResLinkList } = this.props;
    //为没有加载到图片的添加一个Word属性,值为名字的第一个字
    const newResLinkList = ResLinkList.map((item) => {
      if (Name === item.Name) {
        item.word = Name[0];
        return item;
      } else {
        return item;
      }
    });
    dispatch({
      type: HomeData.REFRESH_RESOURCELINK_INFO,
      data: newResLinkList,
    });
  };
  enterSearch = (e) => {
    if (e.keyCode === 13 || e.keyCode === 108) {
      window.location.href = ` http://www.baidu.com/s?wd=${this.state.searchValue}`;
    }
  };

  //监听资源的每个项的点击事件
  myReslibary = ({ Name, AccessParam, AccessType }) => {
    // const { dispatch } = this.props
    // dispatch(AppAlertAction.alertQuery({
    //     title: `是否要打开${Name}`,
    //     okTitle: "是",
    //     cancelTitle: "否",
    //     ok: () => { return this.myResClick.bind(this, AccessParam, AccessType) }
    // }))
    // this.myResClick.bind( AccessParam, AccessType)
    // window.external.MyMessageBox&&
    window.external.MyMessageBox(AccessType, AccessParam);
  };

  /*  当我的资料库中的内容被点击的时候向浏览器发送参数
   @param1 访问类型
   @param2 访问参数
   */
  sendParam = (AccessType, AccessParam) => {
    // window.external.MyMessageBox&&
    window.external.MyMessageBox(AccessType, AccessParam);
    // alert(param);
  };

  render() {
    // const colorList = ["red", "green", "blue"];
    // const colorIndex = colorList.length - 1;
    const {
      tabActive,
      WebsiteResLink,
      PeriodList,
      ResLinkList,
      MyResLibList,
      defaultLoading,
      periodWebsiteLoading,
      resourceLoading,
    } = this.props;
    // })
    // console.log(PeriodList,this.state.active);
    let periodResult='';
   if(PeriodList.some((item)=>{ return item.PeriodId==this.state.active||this.state.active=='isMine'})){
     periodResult = PeriodList.map((item, index) => {
      if (index !== PeriodList.length - 1) {
        return (
          <li
            key={item.PeriodName}
            className={`${
              item.PeriodId === this.state.active ? "selected" : ""
            }`}
            onClick={() => this.periodChange(item.PeriodId)}
          >
            {item.PeriodName}{" "}
          </li>
        );
      } else {
        return (
          <React.Fragment key={index}>
            <li
              key={item.PeriodName}
              className={`${
                item.PeriodId === this.state.active ? "selected" : ""
              }`}
              onClick={() => this.periodChange(item.PeriodId)}
            >
              {item.PeriodName}{" "}
            </li>
            <li
              className={`${"isMine" === this.state.active ? "selected" : ""}`}
              onClick={() => this.periodChange("isMine")}
            >
              {'我的'}{" "}
            </li>
          </React.Fragment>
        );
      }
    });
   }else{
     if(PeriodList.length>0){
      this.setState({active:PeriodList[0].PeriodId},()=>{
         periodResult = PeriodList.map((item, index) => {
          if (index !== PeriodList.length - 1) {
            return (
              <li
                key={item.PeriodName}
                className={`${
                  item.PeriodId === this.state.active ? "selected" : ""
                }`}
                onClick={() => this.periodChange(item.PeriodId)}
              >
                {item.PeriodName}{" "}
              </li>
            );
          } else {
            return (
              <React.Fragment key={index}>
                <li
                  key={item.PeriodName}
                  className={`${
                    item.PeriodId === this.state.active ? "selected" : ""
                  }`}
                  onClick={() => this.periodChange(item.PeriodId)}
                >
                  {item.PeriodName}{" "}
                </li>
                <li
                  className={`${"isMine" === this.state.active ? "selected" : ""}`}
                  onClick={() => this.periodChange("isMine")}
                >
                  {'我的'}{" "}
                </li>
              </React.Fragment>
            );
          }
        });
       })
     }
   }
  

    //渲染学段对应的资源
    let linkResultRender = WebsiteResLink.map((item, key) => {
      return (
        <div key={key} className="wall">
          <p>{item.GroupName}</p>
          <div className="group-contain clearfix">
            {item.List.map((i, index) => {
              return (
                <div key={i.Id} className="link">
                  <div className={`img-box ${i.backgroundColor}`}>
                    <img
                      src={pic}
                      alt=""
                      style={{
                        display: `${i.imgShow === "0" ? "block" : "none"}`,
                      }}
                    />
                    {i.word === "" ? (
                      <img
                        src={`${publicMethod.UrlGetIcon(i.Url)}/favicon.ico`}
                        alt="" /* alt="图片加载失败"  */
                        onLoad={(e) =>
                          this.webPicLoading(e, {
                            GroupID: item.GroupID,
                            ID: i.Id,
                          })
                        }
                        onError={(e) =>
                          this.webPicLoadError(e, {
                            GroupID: item.GroupID,
                            ID: i.Id,
                            Name: i.Name,
                          })
                        }
                        style={{
                          display: `${
                            i.imgShow === "2" || i.imgShow === "1"
                              ? "block"
                              : "none"
                          }`,
                        }}
                      />
                    ) : (
                      ""
                    )}
                    <span>{i.word}</span>
                  </div>
                  <a href={i.Url} title={i.Name} target="_self">
                    {i.Name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      );
    });

    /*
     *获取接口1中的网址数据对象,
     *解析其中的类别,URL,URL对应的网站名字
     *返回循坏后所得到的html代码
     */

    // let gradeCategory = graderList.map((ite, key) => {
    //     return (

    //         <div className={ite.id === current ? `${ite.id} selected` : ite.id} key={key}>
    //             {
    //                 linkArr.map((item, key) => {
    //                     return <React.Fragment>
    //                         <div className="wall">
    //                             <p>{item.TypeName}</p>
    //                             <div className={item.TypeID} key={key} >
    //                                 {
    //                                     item.Item.map((i, key) => {
    //                                         let ranIndex = Math.floor(Math.random() * (colorIndex + 1));
    //                                         return <React.Fragment>
    //                                             <div className="link" key={key}>
    //                                                 <div className={`img-box ${colorList[ranIndex]}`}>
    //                                                     {
    //                                                         i.word === "" ?
    //                                                             <img src={`${i.url}favicon.ico `} title={i.name} onError={(e) => this.linkImgLoading(e, { TypeID: item.TypeID, ID: i.id, name: i.name })} />
    //                                                             : ""
    //                                                     }

    //                                                     <span>{i.word}</span>
    //                                                 </div>

    //                                                 <a href={i.url} title={i.name} target="_blank">{i.name}</a>
    //                                             </div>
    //                                         </React.Fragment>
    //                                     })
    //                                 }

    //                             </div>
    //                         </div>
    //                     </React.Fragment>
    //                 })
    //             }
    //         </div>
    //     );
    // })

    /*
     *获取接口2中的数据内容(资源库)
     *解析数据中的 URL,和URL对应的网站名字
     */

    // let base = baseArr.map((item, key) => {
    //     let ranIndex = Math.floor(Math.random() * (colorIndex + 1));

    //     return <React.Fragment>
    //         <div className="base" key={key}>
    //             <div className={`img-box ${colorList[ranIndex]}`}>
    //                 {
    //                     item.word === '' ?
    //                         <img src={`${item.url}favicon.ico`} alt="图片丢失" title={item.name} onError={
    //                             (e) => this.baseImgLoading({ ID: item.id, name: item.name })} />

    //                         : ''
    //                 }
    //                 <span title={item.name}>{item.word}</span>
    //             </div>
    //             <a href={item.url} title={item.name} target="_blank">{item.name}</a>
    //         </div>
    //     </React.Fragment>
    // })

    //渲染资源库中的内容
    let ResResust = ResLinkList.map((item) => {
      // let ranIndex = Math.floor(Math.random() * (colorIndex + 1));
      return (
        <div
          className="base"
          onClick={() => this.sendParam(item.AccessType, item.AccessParam)}
        >
          <div className={`img-box ${item.backgroundColor}`}>
            {item.word === "" ? (
              <img
                src={`${publicMethod.UrlGetIcon(item.LogoPath)}/favicon.ico`}
                alt=""
                /* alt="图片丢失" */ title={item.name}
                onError={(e) => this.resPicLoadError({ Name: item.Name })}
              />
            ) : (
              ""
            )}
            <span>{item.word}</span>
          </div>
          <a href="#"> {item.Name}</a>
        </div>
      );
    });

    //渲染我的资源库中的内容
    let myResLibResult = MyResLibList.map((item) => {
      // console.log(item, MyResLibList);
      let ClassName = "";
      if (item.Name === "资料收藏夹") {
        ClassName = "store";
      } else if (item.Name === "教学方案") {
        ClassName = "tecplan";
      } else if (item.Name === "个人网盘") {
        ClassName = "personal";
      } else if (item.Name === "本地电脑") {
        ClassName = "desktop";
      }
      if (
        item.Name === "资料收藏夹" ||
        item.Name === "个人网盘" ||
        item.Name === "教学方案"
      ) {
        return "";
      }
      return (
        <li
          key={item.Name}
          className={`MyResLib ${ClassName}`}
          onClick={() =>
            this.myReslibary({
              Name: item.Name,
              AccessParam: item.AccessParam,
              AccessType: item.AccessType,
            })
          }
        >
          <p>{item.Name}</p>{" "}
        </li>
      );
    });

    // console.log(myResLibResult);

    return (
      // <div></div>

      <div className="content">
        <div
          className="page-one"
          style={{ display: `${tabActive === "website" ? "block" : "none"}` }}
        >
          <Loading spinning={defaultLoading} opacity={false} tip="请稍后...">
            <div className="serach">
              <Input
                placeholder="搜你想搜的..."
                onChange={this.inputChange}
                className="input-search"
                type="text"
                value={this.state.searchValue}
                onKeyDown={this.enterSearch}
              />

              <button onClick={this.handelSearch}>搜索</button>
            </div>
            <ul className="grade">{periodResult}</ul>

            <div className="main-content">
              <Loading
                spinning={periodWebsiteLoading}
                opacity={false}
                tip="请稍后..."
              >
                {linkResultRender}
              </Loading>
            </div>
          </Loading>
        </div>

        <div
          className="page-two"
          style={{
            display: `${tabActive === "resourceBase" ? "block" : "none"}`,
          }}
        >
          <div className="base-resource clearfix">
            <Loading spinning={resourceLoading} opacity={false} tip="请稍后...">
              {ResResust}
            </Loading>
          </div>
        </div>

        <div
          className="page-three"
          style={{
            display: `${tabActive === "myResourceBase" ? "block" : "none"}`,
          }}
        >
          <Loading spinning={resourceLoading} opacity={false} tip="请稍后...">
            <div className="pic-box">
              <ul>{myResLibResult}</ul>
            </div>
          </Loading>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { Toggle, HomeDataUpdate } = state;
  // console.log(HomeDataUpdate.ResLinkList)
  return {
    tabActive: Toggle.tabActive,

    WebsiteResLink: HomeDataUpdate.WebsiteResLink,
    PeriodList: HomeDataUpdate.PeriodList,
    ResLinkList: HomeDataUpdate.ResLinkList,
    MyResLibList: HomeDataUpdate.MyResLibList,
    defaultLoading: HomeDataUpdate.defaultLoading,
    periodWebsiteLoading: HomeDataUpdate.periodWebsiteLoading,
    resourceLoading: HomeDataUpdate.resourceLoading,
    SubjectId: HomeDataUpdate.SubjectId,
  };
};

export default connect(mapStateToProps)(Content);
