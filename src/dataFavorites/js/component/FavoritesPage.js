import React, { Component } from "react";
import { Search, DropDown, Empty, Modal } from "../../../common/index";
import { DatePicker, Button, Input, Pagination, Tree, Tooltip } from "antd";
import { connect } from "react-redux";
import { Loading } from "../../../common/index";
import "../../sass/favoritesPage.scss";
import AppAlertAction from "../action/AppAlertAction";
import ApiAction from "../action/Api";
import LoadingAction from "../action/LoadingAction";
import CollectorAction from "../action/CollectorAction";
import { Scrollbars } from "react-custom-scrollbars";

const { TreeNode } = Tree;
const { RangePicker } = DatePicker;

class FavoritesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: "", //搜索框中的关键字
      typeDropValue: "", //来源筛选框的默认value
      typeDropTitle: "全部来源", //来源筛选框的默认title
      startDate: "", //日历筛选中的开始时间的字符串形式
      Mstart: null, //日历筛选中的开始时间的Monent形式
      Mend: null, //日历筛选中的结束时间的Monent形式
      endDate: "", //日历筛选中的结束时间的字符串形式
      currentPath: [{ folderId: "", folderName: "资料收藏夹" }], //存储用户当前所在路径
      ModalShow: false, //重命名或添加目录弹层的显示控制
      modalInput: "", //重命名中输入框中的值
      modalOptionType: "", //当前操作重命名或添加目录弹层的操作类型
      newName: "", //新目录或者新资料名称
      modalTitle: "", //重命名或添加目录弹层的名称
      moveModalShow: false, //移动提示弹层的显示控制
      selectAll: false, //全选框的状态控制
      MoveOptionType: "", //当前操作移动功能弹层的操作类型
      beMoveID: "", //当前被移动的目录或者资料ID
      currentPage: 1, //默认请求收藏夹第一页的数据
      selectedFolder: "", //移动目录弹层中被选中的目录Id
      emptyTips: "目录中空空如也，快去添加更多的收藏吧~", //当搜索或者打开空目录时的提示用语
      overNameTipsShow: false //超过20个字符的提示语
    };
  }
  //监听搜索框的查询事件
  keywordSearch = e => {
    const { dispatch } = this.props;
    let currFoleder = this.state.currentPath[this.state.currentPath.length - 1]
      .folderId;

    if (e.value === "") {
      dispatch(
        AppAlertAction.alertTips({
          title: "关键字不能为空!",
          cancelTitle: "知道了"
        })
      );
    } else {
      this.setState({
        emptyTips: "没有符合条件的资料喔~",
        currentPath: [{ folderId: "", folderName: "资料收藏夹" }],
        selectAll: false //以下所有关于这个变量的，目的之一是：当在某一页面上点击了全选，进入新目录或者做其他操作后，全选框的状态要恢复false
      });
      dispatch({
        type: CollectorAction.UPDATE_CURRENT_PATH,
        data: this.state.currentPath
      });

      dispatch(
        CollectorAction.getFolderResInfo(
          { typeId: "", startTime: "", endDate: "", keyword: e.value },
          "searchAll"
        )
      );
    }
  };
  //监听搜索框中的输入值的变化
  keywordChange = e => {
    this.setState({
      searchKeyword: e.target.value.trim()
    });
  };
  //监听搜索框中取消搜索按钮的点击事件
  cancelSearch = () => {
    const { dispatch } = this.props;
    let currFoleder = this.state.currentPath[this.state.currentPath.length - 1]
      .folderId;
    this.setState(
      {
        searchKeyword: "",
        selectAll: false
      },
      () => {
        dispatch(
          CollectorAction.getFolderResInfo({
            typeId: "",
            folderID: currFoleder,
            startTime: "",
            endDate: "",
            keyword: "",
            pageIndex: this.state.currentPage
          })
        );
      }
    );
  };

  //监听来源下拉框的改变事件
  typeChange = (checked, value) => {
    const { dispatch } = this.props;
    //获取当前所在目录的目录id
    let currFoleder = this.state.currentPath[this.state.currentPath.length - 1]
      .folderId;
    this.setState(
      {
        typeDropValue: checked.value,
        typeDropTitle: checked.title,
        emptyTips: "没有符合条件的资料喔~",
        selectAll: false
      },
      () => {
        dispatch(
          CollectorAction.getFolderResInfo({
            typeId: checked.value,
            folderID: currFoleder,
            startTime: this.state.startDate,
            endDate: this.state.endDate,
            keyword: "",
            pageIndex: this.state.currentPage
          })
        );
      }
    );
  };
  /* 监听日历控件的范围变化事件
    @param1 选择日期后回调函数返回的moment对象
    @param2 选择日期后回调函数返回的日期的字符串数组
     */

  dateChange = (dates, dateStrings) => {
    const { dispatch } = this.props;
    let currFoleder = this.state.currentPath[this.state.currentPath.length - 1]
      .folderId;
    this.setState({
      Mstart: dates[0],
      Mend: dates[1],
      startDate: dateStrings[0],
      endDate: dateStrings[1],
      selectAll: false,

      emptyTips: "没有符合条件的资料喔~"
    });
    console.log(dates[0], typeof dates[0]);
    // console.log(dateStrings[1]  ,typeof (this.state.endDate))
    // dispatch(CollectorAction.getFolderResInfo({ typeId: '', folderID: currFoleder, startTime: dateStrings[0], endDate: dateStrings[1], keyword: "" }))

    dispatch(
      CollectorAction.getFolderResInfo({
        folderID: currFoleder,
        startTime: dateStrings[0],
        endDate: dateStrings[1],
        pageIndex: this.state.currentPage
      })
    );
  };

  /* 监听目录的点击事件
    @param1 当前的操作类型(pathClick)从所在目录路径上点击,(contentClick)从内容区中点击
    @param2 被点击的目录对应的目录ID
    @param3 被点击的目录对应的目录名，从来更新当前用户所在目录的路径
     */
  skipToNewFolder = (type, folderId, folderName) => {
    const { dispatch } = this.props;
    //根据点击类型进行数据处理

    if (type === "pathClick") {
      //如果输在路径区点击
      //查找被点击的目录在currentPath中索引,并删除该索引后面所有数据,
      let targetIndex = "";
      this.state.currentPath.map((item, index) => {
        if (item.folderId === folderId) {
          targetIndex = index;
          return;
        }
      });
      let newPath = this.state.currentPath.splice(0, targetIndex + 1);
      //更新内容区渲染的内容
      this.setState(
        {
          currentPath: newPath
          // selectAll:false,
        },
        () => {
          dispatch({
            type: CollectorAction.UPDATE_CURRENT_PATH,
            data: newPath
          });
          // dispatch(CollectorAction.getFolderResInfo({ typeId: '', folderID: folderId, startTime: "", endDate: "", keyword: "" }))

          dispatch(
            CollectorAction.getFolderResInfo({
              folderID: folderId,
              pageIndex: this.state.currentPage
            })
          );
        }
      );
    } else if (type === "contentClick") {
      //如果是在内容区点击
      let newPath = this.state.currentPath;
      newPath.push({ folderId: folderId, folderName: folderName });
      this.setState(
        {
          currentPath: newPath
          // selectAll:false,
        },
        () => {
          dispatch({
            type: CollectorAction.UPDATE_CURRENT_PATH,
            data: newPath
          });
          dispatch(
            CollectorAction.getFolderResInfo({
              folderID: folderId,
              pageIndex: this.state.currentPage
            })
          );
          // dispatch(CollectorAction.getFolderResInfo({ typeId: '', folderID: folderId, startTime: "", endDate: "", keyword: "" }))
        }
      );
    }
    this.setState({
      startDate: "",
      endDate: "",
      Mstart: null,
      Mend: null,
      selectAll: false,
      typeDropValue: "",
      typeDropTitle: "全部来源",
      emptyTips: "目录中空空如也，快去添加更多的收藏吧~"
    });
  };

  //返回上一层的点击事件
  fallback = () => {
    const { dispatch } = this.props;
    // let newPath=this.state.currentPath.splice(this.state.currentPath.length)
    let currFoleder = "";
    if (this.state.currentPath.length === 1) {
      return;
    } else {
      //先删掉路径数组中最后一个元素
      this.state.currentPath.pop();
      //获取当前所在的目录ID，因为删除了最后一个，所以此时数组的最后一个就是当前所在的
      currFoleder = this.state.currentPath[this.state.currentPath.length - 1]
        .folderId;
      this.setState(
        {
          currentPath: this.state.currentPath,
          startDate: "",
          endDate: "",
          Mstart: null,
          Mend: null,
          typeDropValue: "",
          typeDropTitle: "全部来源",
          selectAll: false
        },
        () => {
          dispatch({
            type: CollectorAction.UPDATE_CURRENT_PATH,
            data: this.state.currentPath
          });
          dispatch(
            CollectorAction.getFolderResInfo({
              folderID: currFoleder,
              pageIndex: this.state.currentPage
            })
          );
        }
      );
    }
  };
  //单个资料的点击事件
  skipByLink = address => {
    window.open(address, "top");
  };

  /* 添加目录按钮的点击事件
    @param1 当前用户操作的类型，因为共用一个弹层，所以根据操作类型区分对应的弹层
    @param2 当前被操作的目录或者资料的ID
    @param3 被操作的资料或者目录名
    */
  modalClick = (optionType, ID, Name) => {
    console.log(optionType);
    let title = ""; //弹层的title
    let tips = ""; //弹层中输入框前的提示
    if (optionType === "addFolder") {
      title = "添加目录";
      tips = "目录名称";
    } else if (optionType === "reNameFolder") {
      title = "重命名";
      tips = "目录名称";
    } else {
      title = "重命名";
      tips = "资料名称";
    }
    this.setState({
      ModalShow: true,
      modalOptionType: optionType,
      modalTitle: title,
      newName: tips,
      beRenameID: ID,
      modalInput: Name ? Name : "",
      targetName: Name
    });
    // console.log(this.state.modalOptionType)
  };
  /* 添加目录或重命名弹层确认的事件回调
    @param1 当前操作弹层的类型addFolder(添加目录)、重命名目录（reNameFolder)、重命名资料（reNameCollect）
     */
  modalComfirm = () => {
    let optionType = this.state.modalOptionType;
    //被选中需要重命名的目录或者资料的ID
    let ID = this.state.beRenameID;
    const { dispatch, folderResInfo, rightSelect } = this.props;
    let currFoleder = this.state.currentPath[this.state.currentPath.length - 1]
      .folderId;

    // 当前用户操作的是添加目录操作

    if (optionType === "addFolder") {
      //当前用户操作的是添加目录操作
      if (this.state.modalInput === "") {
        dispatch(
          AppAlertAction.alertTips({
            title: "目录名称不能为空！",
            cancelTitle: "确定"
          })
        );
        return;
      }
      if (this.state.modalInput.length > 20) {
        dispatch(
          AppAlertAction.alertError({
            title: "目录名称过长",
            cancelTitle: "确定"
          })
        );

        return;
      } else {
        let flag = true;
        for (let item of folderResInfo.List) {
          if (item.IsFolder === true && item.Name === this.state.modalInput) {
            dispatch(
              AppAlertAction.alertError({ title: "该目录名称已被占用!" })
            );
            flag = false;
            break;
          }
        }
        if (flag) {
          dispatch({
            type: LoadingAction.FAV_LOADING_SHOW,
            data: true
          });
          let url = `/SysMgr/Favorite/AddFolderInfo`;
          ApiAction.postMethod(url, {
            FolderName: this.state.modalInput,
            pid: currFoleder,
            sysId: "蓝鸽浏览器收藏"
            // sysId: ""
          }).then(data => {
            if (data === 0) {
              this.setState(
                {
                  ModalShow: false,
                  modalInput: "",
                  selectAll: false
                },
                () => {
                  dispatch(
                    AppAlertAction.alertSuccess({ title: "添加目录成功" })
                  );
                  //dispatch(CollectorAction.getFolderResInfo({ typeId: "", folderID: currFoleder, startTime: '', endDate: '', keyword: "" }))
                  dispatch(
                    CollectorAction.getFolderResInfo({
                      folderID: currFoleder,
                      pageIndex: this.state.currentPage
                    })
                  );
                }
              );
            } else {
              dispatch({
                type: LoadingAction.FAV_LOADING_SHOW,
                data: false
              });

              dispatch(
                AppAlertAction.alertError({ title: data ? data : "未知异常" })
              );
            }
          });
        }
      }
    } else if (optionType === "reNameFolder") {
      //当前操作是重命名目录
      let flag = true;

      if (this.state.targetName === this.state.modalInput) {
        dispatch(
          AppAlertAction.alertTips({
            title: "未进行任何修改",
            cancelTitle: "确定"
          })
        );
        //this.ModalClose()
        flag = false;
        return;
      }
      for (let item of folderResInfo.List) {
        if (item.IsFolder === true && item.Name === this.state.modalInput) {
          dispatch(AppAlertAction.alertError({ title: "该目录名称已被占用!" }));
          flag = false;
          break;
        }
      }
      if (this.state.modalInput === "") {
        dispatch(
          AppAlertAction.alertTips({
            title: "目录名不能为空",
            cancelTitle: "确定"
          })
        );
        flag = false;
        return;
      }
      if (this.state.modalInput.length > 20) {
        dispatch(
          AppAlertAction.alertError({
            title: "目录名称过长",
            cancelTitle: "确定"
          })
        );
        flag = false;
        return;
      }
      console.log(flag);
      if (flag === true) {
        dispatch({
          type: LoadingAction.FAV_LOADING_SHOW,
          data: true
        });
        const url = `/SysMgr/Favorite/UpdateFolderName`;
        ApiAction.postMethod(
          url,
          { folderId: ID, newFolderName: this.state.modalInput },
          2,
          dispatch
        ).then(data => {
          if (data === 0) {
            this.setState(
              {
                ModalShow: false,
                modalInput: "",
                selectAll: false
              },
              () => {
                dispatch(
                  AppAlertAction.alertSuccess({ title: "目录重命名成功" })
                );
                //dispatch(CollectorAction.getFolderResInfo({ typeId: "", folderID: currFoleder, startTime: '', endDate: '', keyword: "" }))

                dispatch(
                  CollectorAction.getFolderResInfo({
                    folderID: currFoleder,
                    pageIndex: this.state.currentPage
                  })
                );
              }
            );
          } else {
            dispatch({
              type: LoadingAction.FAV_LOADING_SHOW,
              data: false
            });

            dispatch(
              AppAlertAction.alertError({ title: data ? data : "未知异常" })
            );
          }
        });
      }
    } else {
      //当前操作是重命名资料
      let flag = true;
      if (this.state.targetName === this.state.modalInput) {
        dispatch(
          AppAlertAction.alertTips({
            title: "未进行任何修改",
            cancelTitle: "确定"
          })
        );
        // console.log("没有修改")
        flag = false;
        return;
      }
      for (let item of folderResInfo.List) {
        if (item.IsFolder === false && item.Name === this.state.modalInput) {
          dispatch(AppAlertAction.alertError({ title: "该资料名称已被占用!" }));
          flag = false;
          break;
        }
      }
      if (this.state.modalInput === "") {
        dispatch(
          AppAlertAction.alertTips({
            title: "目录名不能为空",
            cancelTitle: "确定"
          })
        );
        flag = false;
        return;
      }
      if (this.state.modalInput.length > 20) {
        dispatch(
          AppAlertAction.alertError({
            title: "目录名称过长",
            cancelTitle: "确定"
          })
        );
        flag = false;
        return;
      }
      if (flag) {
        dispatch({
          type: LoadingAction.FAV_LOADING_SHOW,
          data: true
        });
        const url = `/SysMgr/Favorite/UpdateCollectionName`;
        ApiAction.postMethod(url, {
          resId: ID,
          newName: this.state.modalInput
        }).then(data => {
          if (data === 0) {
            this.setState(
              {
                ModalShow: false,
                modalInput: "",
                selectAll: false
              },
              () => {
                dispatch(
                  AppAlertAction.alertSuccess({ title: "资料重命名成功" })
                );
                //dispatch(CollectorAction.getFolderResInfo({ typeId: "", folderID: currFoleder, startTime: '', endDate: '', keyword: "" }))
                dispatch(
                  CollectorAction.getFolderResInfo({
                    folderID: currFoleder,
                    pageIndex: this.state.currentPage
                  })
                );
                if (rightSelect === "recent") {
                  dispatch(CollectorAction.getRecentCollection());
                }
              }
            );
          } else {
            dispatch({
              type: LoadingAction.FAV_LOADING_SHOW,
              data: false
            });

            dispatch(
              AppAlertAction.alertError({ title: data ? data : "未知异常" })
            );
          }
        });
      }
    }
  };

  /*  目录的删除或资料的取消收藏事件  
         @param1 操作类型 ，区分当前操作是删除目录（deleteFolder）还是取消收藏（cancelCollect）的提示框
    */
  cancelEvent = (optionType, ID) => {
    const { dispatch } = this.props;
    //用户当前所在目录的目录ID（用来刷新当前目录状态）
    let currFoleder = this.state.currentPath[this.state.currentPath.length - 1]
      .folderId;

    if (optionType === "deleteFolder") {
      //用户当前操作是删除目录
      dispatch(
        AppAlertAction.alertQuery({
          title: "是否删除该目录!",
          ok: () => {
            return this.deleteFoleder.bind(this, currFoleder, ID);
          },
          okTitle: "是",
          cancelTitle: "否"
        })
      );
    } else {
      dispatch(
        AppAlertAction.alertQuery({
          title: "是否取消该收藏",
          ok: () => {
            return this.cancelcollect.bind(this, currFoleder, ID);
          },
          okTitle: "是",
          cancelTitle: "否"
        })
      );
    }
  };

  /* 删除目录 
        @param1 被删除的目录所在的当前目录（父目录）
        @param2 被删除的目录ID
    */
  deleteFoleder = (currFoleder, ID) => {
    const { dispatch, rightSelect } = this.props;
    const url = `/SysMgr/Favorite/DeleteFolderInfo`;
    dispatch({
      type: LoadingAction.FAV_LOADING_SHOW,
      data: true
    });
    ApiAction.postMethod(url, { FolderId: ID }).then(data => {
      if (data === 0) {
        dispatch(AppAlertAction.alertSuccess({ title: "删除目录成功" }));
        //dispatch(CollectorAction.getFolderResInfo({ typeId: "", folderID: currFoleder, startTime: '', endDate: '', keyword: "" }))
        dispatch(
          CollectorAction.getFolderResInfo({
            folderID: currFoleder,
            pageIndex: this.state.currentPage
          })
        );

        if (rightSelect === "recent") {
          // 删除目录后，会删除目录中的所有项，意味着当前收藏的资料，会被取消收藏
          //所以会影响右侧收藏排行和最近收藏的内容显示，所以做出以下判断
          //如果当前右侧内容区是'最近收藏'则刷新"最近收藏"的内容
          dispatch(CollectorAction.getRecentCollection());
        } else {
          //如果当前右侧内容区是'收藏排行榜'则刷新"收藏排行榜"的内容
          dispatch(CollectorAction.getCollectionRankList());
        }
      } else {
        dispatch({
          type: LoadingAction.FAV_LOADING_SHOW,
          data: false
        });

        dispatch(
          AppAlertAction.alertError({ title: data ? data : "未知异常" })
        );
      }
    });
  };
  /* 取消收藏
        @param1 被取消收藏的资料所在的当前目录（父目录）
        @param2 被取消收藏的资料ID
    */
  cancelcollect = (currFoleder, ID) => {
    const { dispatch, rightSelect } = this.props;
    const url = `/SysMgr/Favorite/CancelCollectRes`;
    dispatch({
      type: LoadingAction.FAV_LOADING_SHOW,
      data: true
    });
    ApiAction.postMethod(url, { resIds: ID }).then(data => {
      if (data === 0) {
        dispatch(AppAlertAction.alertSuccess({ title: "取消收藏成功" }));
        //dispatch(CollectorAction.getFolderResInfo({ typeId: "", folderID: currFoleder, startTime: '', endDate: '', keyword: "" }))
        dispatch(
          CollectorAction.getFolderResInfo({
            folderID: currFoleder,
            pageIndex: this.state.currentPage
          })
        );
        if (rightSelect === "recent") {
          // 取消收藏后会影响到右侧内容区的内容显示，所以做出以下判断
          //如果当前右侧内容区是'最近收藏'则刷新"最近收藏"的内容
          dispatch(CollectorAction.getRecentCollection());
        } else {
          //如果当前右侧内容区是'收藏排行榜'则刷新"收藏排行榜"的内容
          dispatch(CollectorAction.getCollectionRankList());
        }
      } else {
        dispatch({
          type: LoadingAction.FAV_LOADING_SHOW,
          data: false
        });
        dispatch(
          AppAlertAction.alertError({ title: data ? data : "未知异常" })
        );
      }
    });
  };

  //点击关闭弹层或取消的回调
  ModalClose = () => {
    this.setState({
      ModalShow: false,
      modalInput: "",
      moveModalShow: false,
      overNameTipsShow: false
    });
  };

  //重命名弹层或添加目录弹层输入框中的值的数据绑定显示
  NameChange = e => {
    this.setState({
      modalInput: e.target.value
    });

    if (e.target.value.length > 20) {
      this.setState({
        overNameTipsShow: true
      });
    } else {
      this.setState({
        overNameTipsShow: false
      });
    }
  };
  enterComfirm = e => {
    // console.log("what")
    if (e.keyCode === 108 || e.keyCode === 13) {
      this.modalComfirm();
    }
  };
  /* 移动目录和资料弹层的显示与隐藏
        作用：用来控制移动目录或者资料弹层的显示与隐藏，同时记录当前操作弹层的类型
        @param1 当前操作移动 弹层的类型 "folder","single","batch"
                表示移动目录，移动资料，批量移动
        @param2 被移动的目录 或者资料的ID，当optionType为"batch"时，不传入，默认设置为空        
    */
  MoveModal = (optionType, ID) => {
    const { dispatch } = this.props;
    this.setState(
      {
        moveModalShow: true,
        MoveOptionType: optionType,
        beMoveID: ID ? ID : ""
      },
      () => {
        dispatch(CollectorAction.getfolderInfo());
      }
    );
  };

  /* 移动目录或者资料弹层的确认事件
    @param1 当前操作的类型(folder,single,batch)
    @param2 被选中的目录或者资料ID（参数为batch，该参数无用）
     */
  moveModalConfirm = () => {
    let { dispatch, folderResInfo, folderInfo } = this.props;
    let optionType = this.state.MoveOptionType;
    let ID = this.state.beMoveID;
    let currFoleder = this.state.currentPath[this.state.currentPath.length - 1]
      .folderId;
    dispatch({
      type: LoadingAction.FAV_LOADING_SHOW,
      data: true
    });

    if (optionType === "single" || optionType === "folder") {
      if (this.state.beMoveID === this.state.selectedFolder) {
        dispatch(AppAlertAction.alertError({ title: "目标目录不能为本目录" }));
        dispatch({
          type: LoadingAction.FAV_LOADING_SHOW,
          data: false
        });
        return false;
      }

      const url = `/SysMgr/Favorite/TransferResInfo`;
      ApiAction.postMethod(url, {
        resIds: ID,
        oldFolderID: currFoleder,
        newFolderID:
          this.state.selectedFolder === "0-0" ? "" : this.state.selectedFolder
      }).then(data => {
        if (data === 0) {
          dispatch(AppAlertAction.alertSuccess({ title: "移动成功!" }));
          // dispatch(CollectorAction.getFolderResInfo({
          //     typeId: "",
          //     folderID: currFoleder,
          //     startTime: '',
          //     endDate: '',
          //     keyword: ""
          // }))
          this.setState(
            {
              moveModalShow: false,
              selectAll: false
            },
            () => {
              dispatch(
                CollectorAction.getFolderResInfo({
                  folderID: currFoleder,
                  pageIndex: this.state.currentPage
                })
              );
            }
          );
        } else {
          dispatch({
            type: LoadingAction.FAV_LOADING_SHOW,
            data: false
          });
          dispatch(
            AppAlertAction.alertError({ title: data ? data : "未知异常" })
          );
        }
      });
    } else if (optionType === "batch") {
      let resIdsList = [];
      let flag = true;
      folderResInfo.List.map(item => {
        if (item.checked === true) {
          resIdsList.push(item.ID);
        }
      });

      for (let item of resIdsList) {
        if (item === this.state.selectedFolder) {
          dispatch(
            AppAlertAction.alertError({ title: "目标目录不能为本目录" })
          );
          dispatch({
            type: LoadingAction.FAV_LOADING_SHOW,
            data: false
          });
          flag = false;
          break;
        }
      }
      // console.log(flag)

      if (resIdsList.length === 0) {
        dispatch(
          AppAlertAction.alertTips({
            title: "请先选中需要进行批量移动的项！",
            cancelTitle: "确定"
          })
        );
        dispatch({
          type: LoadingAction.FAV_LOADING_SHOW,
          data: false
        });
        return false;
      }
      if (flag) {
        const url = `/SysMgr/Favorite/TransferResInfo`;
        dispatch({
          type: LoadingAction.FAV_LOADING_SHOW,
          data: true
        });
        ApiAction.postMethod(url, {
          resIds: resIdsList.join(","),
          oldFolderID: currFoleder,
          newFolderID:
            this.state.selectedFolder === "0-0" ? "" : this.state.selectedFolder
        }).then(data => {
          if (data === 0) {
            dispatch(AppAlertAction.alertSuccess({ title: "移动成功!" }));
            // dispatch(CollectorAction.getFolderResInfo({
            //     typeId: "",
            //     folderID: currFoleder,
            //     startTime: '',
            //     endDate: '',
            //     keyword: ""
            // }))
            this.setState(
              {
                moveModalShow: false,
                selectAll: false
              },
              () => {
                dispatch(
                  CollectorAction.getFolderResInfo({
                    folderID: currFoleder,
                    pageIndex: this.state.currentPage
                  })
                );
              }
            );
          } else {
            dispatch({
              type: LoadingAction.FAV_LOADING_SHOW,
              data: false
            });
            dispatch(
              AppAlertAction.alertError({ title: data ? data : "未知异常" })
            );
          }
        });
      }
    }
  };

  // renderTreeNodes = data =>
  //     data.map(item => {
  //         if (item.children) {
  //             return (
  //                 <TreeNode title={item.title} key={item.key} dataRef={item}>
  //                     {this.renderTreeNodes(item.children)}
  //                 </TreeNode>
  //             );
  //         }
  //         return <TreeNode key={item.key} {...item} />;
  //     });

  /* 单个内容的选中事件
        @param1 当前被点击的选中框对应的资料或者目录ID
        @param2 当前项的选中状态（已选中或为选中） 
    */
  boxClick = (ID, isCheck) => {
    let { dispatch, folderResInfo } = this.props;
    let count = 0; //记录当前被选中的项
    let length = folderResInfo.List.length; //记录收藏夹当前页的内容条数

    let newList = folderResInfo.List.map(item => {
      if (item.checked === true) {
        count++;
      }
      if (item.ID === ID) {
        if (!isCheck === false) {
          //如果点击前的状态取反 ==false：就是说单反有一项被取消选中
          //此时被选中项count -1,否则+1
          count--;
        } else {
          count++;
        }
        return {
          ...item,
          checked: !isCheck
        };
      } else {
        return item;
      }
    });
    console.log(count, length);
    //当count===length时，表示全部项已选中，全选按钮状态为true
    //当count=0||count<length是，表示有部分未选中的项或者全部都没选，全选按钮状态为false
    if (count === length) {
      this.setState({
        selectAll: true
      });
    } else {
      this.setState({
        selectAll: false
      });
    }
    folderResInfo = {
      ...folderResInfo,
      List: newList
    };

    dispatch({
      type: CollectorAction.REFRESH_FOLDERRES_INFO,
      data: folderResInfo
    });
  };

  //全选按钮的点击事件
  selectAll = () => {
    let { dispatch, folderResInfo } = this.props;
    //记录全选框为点击前的状态，如果未选中，则点击后，所有项都选中，如果前是选中状态，则点击后为取消所有项的点击
    let isChecked = !this.state.selectAll;
    this.setState({ selectAll: !this.state.selectAll }, () => {
      let newList = folderResInfo.List.map(item => {
        return {
          ...item,
          checked: isChecked
        };
      });
      folderResInfo = {
        ...folderResInfo,
        List: newList
      };
      dispatch({
        type: CollectorAction.REFRESH_FOLDERRES_INFO,
        data: folderResInfo
      });
    });
  };
  /*   监听分页显示事件
    @param1 当前跳转到的页码数
    @param2 每页显示的内容条数
     */
  togglePage = (page, pagesize) => {
    let { dispatch, folderResInfo } = this.props;
    let currFoleder = this.state.currentPath[this.state.currentPath.length - 1]
      .folderId;
    //刷新当前所在目录的对应页码上的内容
    this.setState({
      currentPage: page
    });
    dispatch(
      CollectorAction.getFolderResInfo({
        folderID: currFoleder,
        pageIndex: page
      })
    );
  };

  //打开移动目录弹层时，渲染收藏夹整体目录结构
  //传入的初始data是从接口获取的存放在redux中整个收藏夹整体目录的数组
  //递归中的的的data是目录的子目录
  renderTreeNodes = data =>
    data.map(item => {
      if (item.child) {
        return (
          <TreeNode title={item.FolderName} key={item.FolderId} dataRef={item}>
            {this.renderTreeNodes(item.child)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.FolderID} {...item} />;
    });

  /* 移动目录弹层中目录的点击事件
        @param1 是一个数组，存储当前在弹层中被目录的ID
    */
  folderSelect = (selectedkey, e) => {
    this.setState({
      selectedFolder: selectedkey[0]
    });
  };

  render() {
    const {
      searchKeyword,
      typeDropValue,
      typeDropTitle,
      currentPath,
      ModalShow,
      modalInput,
      modalOptionType,
      newName,
      modalTitle,
      Mstart,
      Mend,
      moveModalShow,
      selectAll,
      emptyTips,
      overNameTipsShow
    } = this.state;
    const { folderResInfo, typeList, favoriteLoading, folderInfo } = this.props;
    let collectRes = "";
    let tipInfo = "";
    let exeit = "0";
    if (folderResInfo.List) {
      if (folderResInfo.List.length === 0) {
        // console.log("不存在")
        tipInfo = <Empty type="3" className="Empty" title={emptyTips} />;
        exeit = "1";
      }
      //渲染收藏内容区
      collectRes = folderResInfo.List.map(item => {
        return (
          <li className={`collector-type ${item.fileType}`}>
            <span
              className={`selected-box ${
                item.checked === true ? "checked" : ""
              }`}
              onClick={() => this.boxClick(item.ID, item.checked)}
            ></span>
            <span className={`typelogo ${item.fileType}`}></span>
            <span className="createtime">{item.CreateTime}</span>

            <div
              className={`resource-name ${item.fileType}`}
              title={item.Name}
              onClick={
                item.fileType === "folder"
                  ? () =>
                      this.skipToNewFolder("contentClick", item.ID, item.Name)
                  : () => this.skipByLink(item.ResLinkForWeb)
              }
            >
              {item.Name}
              {item.IsFolder === false ? (
                <div className="resremark">{item.TypeName}</div>
              ) : (
                ""
              )}
            </div>

            <div className={`option-logo ${item.fileType}`}>
              <span
                className="rename"
                onClick={
                  item.fileType === "folder"
                    ? () => this.modalClick("reNameFolder", item.ID, item.Name)
                    : () => this.modalClick("reNameCollect", item.ID, item.Name)
                }
              ></span>
              <span
                className="move"
                onClick={
                  item.fileType === "folder"
                    ? () => this.MoveModal("folder", item.ID)
                    : () => this.MoveModal("single", item.ID)
                }
              ></span>
              <span
                className="decancel"
                onClick={
                  item.fileType === "folder"
                    ? () => this.cancelEvent("deleteFolder", item.ID)
                    : () => this.cancelEvent("cancelCollect", item.ID)
                }
              ></span>
            </div>
          </li>
        );
      });
    }

    //渲染来源列表
    let resTypeList = typeList.map(item => {
      return { value: item.TypeId, title: item.TypeName };
    });

    resTypeList.unshift({ value: "", title: "全部来源" });

    //渲染用户当前所在目录路径
    let PathRes = currentPath.map((item, key) => {
      //如果当前项不是目录路径数组中最后一个
      if (key !== currentPath.length - 1) {
        return (
          <React.Fragment>
            <span
              className="path"
              title={item.folderName}
              onClick={() => this.skipToNewFolder("pathClick", item.folderId)}
            >
              {" "}
              {item.folderName}{" "}
            </span>{" "}
            &gt;{" "}
          </React.Fragment>
        );
      } else {
        return ` ${item.folderName}`;
      }
    });

    return (
      <div className="collector-content clearfix">
        <div className="current-path">
          <span
            className={`fallback ${
              currentPath.length === 1 ? "root" : "havenext"
            }`}
            onClick={this.fallback}
          >
            返回上一级
          </span>{" "}
          &nbsp;&nbsp;|&nbsp;&nbsp;
          {PathRes}
        </div>
        <Search
          placeHolder="输入关键词搜索..."
          onClickSearch={this.keywordSearch}
          onCancelSearch={this.cancelSearch}
          Value={searchKeyword}
          onChange={this.keywordChange}
        ></Search>
        <div className="splitline"></div>

        <div style={{ position: "relative" }}>
          <DropDown
            title="来源:"
            width={120}
            height={100}
            type="simple"
            dropSelectd={{ value: typeDropValue, title: typeDropTitle }}
            dropList={resTypeList}
            style={{ zIndex: 10 }}
            onChange={this.typeChange}
          ></DropDown>
          <div className="rangeDate-picker">
            日期:
            <RangePicker
              placeholder={["开始日期", "结束日期"]}
              value={[Mstart, Mend]}
              // value={[null, null]}
              onChange={this.dateChange}
              suffixIcon={<span className="calender-logo"></span>}
            ></RangePicker>
          </div>

          <Button
            className="add-newfolder"
            title="添加目录"
            onClick={() => this.modalClick("addFolder")}
          >
            + 添加目录
          </Button>
        </div>

        <Modal
          type="1"
          title={modalTitle}
          visible={ModalShow}
          width={"551px"}
          bodyStyle={{ height: "136px" }}
          onCancel={this.ModalClose}
          onOk={() => this.modalComfirm()}
          destroyOnClose={true}
        >
          <div className="modal-contain">
            {newName}:
            <Tooltip
              visible={overNameTipsShow}
              placement="topRight"
              title={"最多只能输入20个字符"}
            >
              <Input
                placeholder="最多输入20个字符"
                value={modalInput}
                onKeyUp={this.enterComfirm}
                onChange={this.NameChange}
              />
            </Tooltip>
          </div>
        </Modal>
        {exeit === "0" ? (
          <div className="collector-header ">
            <span>名称:</span>
            <span>收藏时间:</span>
          </div>
        ) : (
          ""
        )}
        <ul className="collector-detail">
          <Loading spinning={favoriteLoading} opacity={false} tip="请稍后...">
            {collectRes}
            {tipInfo}
          </Loading>
        </ul>
        {exeit === "0" ? (
          <div className="collector-bottom ">
            <span
              className={`select-all ${selectAll === true ? "checked" : ""}`}
              onClick={this.selectAll}
            ></span>
            全选
            <Button
              className="batch-move"
              title="批量移动"
              onClick={() => this.MoveModal("batch")}
            >
              批量移动
            </Button>
            <Pagination
              onChange={this.togglePage}
              total={folderResInfo.total}
              current={this.state.currentPage}
              showQuickJumper={true}
              hideOnSinglePage={true}
              defaultPageSize={10}
            />
          </div>
        ) : (
          ""
        )}

        <Modal
          type="1"
          title="移动到"
          visible={moveModalShow}
          width={"551px"}
          bodyStyle={{ height: "344px" }}
          onOk={this.moveModalConfirm}
          onCancel={this.ModalClose}
          className="moveModal"
          destroyOnClose={true}
        >
              <Scrollbars style={{height:'100%', width: "100%" }}>
          
            <Tree
              // checkable
              // onExpand={this.onExpand}
              // expandedKeys={this.state.expandedKeys}
              // autoExpandParent={this.state.autoExpandParent}
              // onCheck={this.onCheck}
              // checkedKeys={this.state.checkedKeys}
              onSelect={this.folderSelect}
              // selectedKeys={this.state.selectedKeys}
              showIcon={true}
              icon={<i className="folder"></i>}
              switcherIcon={<i className="open"></i>}
            >
              {this.renderTreeNodes(folderInfo)}
            </Tree>
            </Scrollbars>
        </Modal>

        {/* <div className="batch-move"></div> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { CollectorDataChange, UILoading } = state;
  const {
    folderResInfo,
    typeList,
    folderInfo,
    rightSelect
  } = CollectorDataChange;
  const { favoriteLoading } = UILoading;
  // console.log(CollectDataChange)
  return {
    folderResInfo,
    typeList,
    favoriteLoading,
    folderInfo,
    rightSelect
  };
};

export default connect(mapStateToProps)(FavoritesPage);
