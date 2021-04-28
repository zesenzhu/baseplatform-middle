(function ($) {
  var _up_obj = {
    resWebUrl: "http://localhost:3542/",
    userType: "Student",
    token: "0",
    uploadUrl: "UpLoadForPC.ashx",
    defultPreImgPath: "UserInfo/Photo/Default/Nopic.jpg",
    uploadSubmitUrl: "UploadSubmit.ashx",
    perviewImgUrl: "",
    curImgPath: "",
    userID: "",
    gender: "-1",
    isUploading: false,
    crop: true,
    isUsingDefault: false,
    allowLoad: true,
    UploadType: "Photo",
  };

  $.fn.extend({
    picUploader: function (options) {
      var html =
        '<div class="up_area ' +
        (options.size ? options.size : "big") +
        '">' +
        '			<div class="up_img_container">' +
        '				<div id="UserPhoto_Current" data-src="" class="up_img_current" title="当前头像" ></div>' +
        '				<div ID="up_img_preview" class="up_img_preview" style="display: none;" title="预览头像" ></div>' +
        '				<div id="up_loading" class="up_loading" style="display:none;">' +
        '					<div class="up_loading_img">' +
        "				</div > " +
        "			</div>" +
        '			<input id="up_btn_del" class="up_btn_del" style="display:none;" type="button" title="删除当前这张照片" />' +
        "		</div>" +
        '		<div id="up_btn_container">' +
        '			<div class="up_btn_container">' +
        '				<input id="up_btn_load" class="up_btn frame_new_two_color_btn" type="button" value="上传照片" />' +
        '				<input id="up_btn_default" class="up_btn frame_new_two_color_btn" type="button" value="使用默认" />' +
        '				<input id="up_file" style="display:none" type="file" accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png" />' +
        "			</div>" +
        '			<div class="up_tip_container">' +
        "				<p>上传要求:大小≤2MB,分辨率≥358px*441px,限JPG/JPEG/GIF/BMP/PNG格式。</p>" +
        "			</div>" +
        "		</div>" +
        "</div>" +
        '<input id="btn_openCut" type="button" data-toggle="modal" data-target="#modal_photoCut" value="" style="display:none" />' +
        '<div id="modal_photoCut" style="display: none;" >' +
        '     <div class="modal_dialog" style="width:538px;height:500px;">' +
        '         <div class="modal_border"></div>' +
        '     <div class="modal_content">' +
        '     <div class="modal_content_header">' +
        '         <span class="modal_content_title">上传照片</span>' +
        '         <span id="btn_close_cut" class="modal_blank_closebtn" data-close="modal">&nbsp;</span>' +
        "     </div>" +
        '     <div class="modal_content_body">' +
        '         <div id="photoWrap">' +
        "                <div>" +
        '                    <input id="btn_select_pic" class="frame_upload_pic_btn" type="button" value="选择本地照片">' +
        '                    <span class="crop_tips">限JPG/JPEG/GIF/BMP/PNG格式。</span>' +
        "                 </div>" +
        '                 <div id="crop_area">' +
        '                        <img id="crop_img" alt="头像" style="display: none;width:100%" />' +
        "                 </div>" +
        '                 <div id="preview_area" >' +
        '                    <div id="preview_large_wrap">' +
        "                    </div>" +
        '                    <div id="preview_title">头像预览</div>' +
        '                       <input id="crop_zoomIn" type="button" style="display: none;" />' +
        '                       <input id="crop_zoomOut" type="button" style="display: none;" />' +
        "                    </div>" +
        "                </div>" +
        "           </div>" +
        '           <div class="modal_content_footer" style="position: relative;">' +
        '                 <input id="btn_cut" class="frame_popup_btn" type="button" value="确认上传" />' +
        '                 <input id="btn_close_cut2" class="frame_popup_btn frame_btn_cancel" type="button" value="关闭" data-close="modal" />' +
        "           </div>" +
        "        </div>" +
        "    </div>" +
        "</div>" +
        '<div class="frame_mask" style="z-index:1000;display: none"></div>';
      $(this).html(html);

      if (options.UploadType === "Avatar") {
        // html =  '<div class="up_area '+(options.size?options.size:"big")+'">'
        // + '			<div class="up_img_container">'
        // + '				<div id="UserPhoto_Current" data-src="" class="up_img_current" title="当前头像" ></div>'
        // + '				<div ID="up_img_preview" class="up_img_preview" style="display: none;" title="预览头像" ></div>'
        // + '				<div id="up_loading" class="up_loading" style="display:none;">'
        // + '					<div class="up_loading_img">'
        // + '				</div > '
        // + '			</div>'
        // + '			<input id="up_btn_del" class="up_btn_del" style="display:none;" type="button" title="删除当前这张照片" />'
        // + '		</div>'
        // + '		<div id="up_btn_container">'
        // + '			<div class="up_btn_container">'
        // + '				<input id="up_btn_load" class="up_btn frame_new_two_color_btn" type="button" value="上传照片" />'
        // + '				<input id="up_btn_default" class="up_btn frame_new_two_color_btn" type="button" value="使用默认" />'
        // + '				<input id="up_file" style="display:none" type="file" accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png" />'
        // + '			</div>'
        // + '			<div class="up_tip_container">'
        // + '				<p>上传要求:大小≤2MB,分辨率≥358px*441px,限JPG/JPEG/GIF/BMP/PNG格式。</p>'
        // + '			</div>'
        // + '		</div>'
        // + '</div>'
        // + '<input id="btn_openCut" type="button" data-toggle="modal" data-target="#modal_photoCut" value="" style="display:none" />'
        // + '<div id="modal_photoCut" style="display: none;" >'
        // + '     <div class="modal_dialog" style="width:538px;height:500px;">'
        // + '         <div class="modal_border"></div>'
        // + '     <div class="modal_content">'
        // + '     <div class="modal_content_header">'
        // + '         <span class="modal_content_title">上传照片</span>'
        // + '         <span id="btn_close_cut" class="modal_blank_closebtn" data-close="modal">&nbsp;</span>'
        // + '     </div>'
        // + '     <div class="modal_content_body">'
        // + '         <div id="photoWrap">'
        // + '                <div>'
        // + '                    <input id="btn_select_pic" class="frame_upload_pic_btn" type="button" value="选择本地照片">'
        // + '                    <span class="crop_tips">限JPG/JPEG/GIF/BMP/PNG格式。</span>'
        // + '                 </div>'
        // + '                 <div id="crop_area">'
        // + '                        <img id="crop_img" alt="头像" style="display: none;width:100%" />'
        // + '                 </div>'
        // + '                 <div id="preview_area" >'
        // + '                    <div id="preview_large_wrap">'
        // + '                    </div>'
        // + '                    <div id="preview_title">头像预览</div>'
        // + '                       <input id="crop_zoomIn" type="button" style="display: none;" />'
        // + '                       <input id="crop_zoomOut" type="button" style="display: none;" />'
        // + '                    </div>'
        // + '                </div>'
        // + '           </div>'
        // + '           <div class="modal_content_footer" style="position: relative;">'
        // + '                 <input id="btn_cut" class="frame_popup_btn" type="button" value="确认上传" />'
        // + '                 <input id="btn_close_cut2" class="frame_popup_btn frame_btn_cancel" type="button" value="关闭" data-close="modal" />'
        // + '           </div>'
        // + '        </div>'
        // + '    </div>'
        // + '</div>'
        // + '<div class="frame_mask" style="z-index:1000;display: none"></div>';
        $(".up_img_current").css({ width: "130px", height: "130px" });
        $(".up_img_preview").css({ width: "130px", height: "130px" });
        $("#preview_large_wrap").css({ width: "130px", height: "130px" });
        console.log($(".up_img_current"));
      }

      _userPhoto_reset(options);

      //_userPhoto_checkH5();

      if (!_up_obj.allowLoad) {
        $("#up_btn_container").hide();
        return;
      }

      $("#btn_close_cut,#btn_close_cut2").click(function () {
        $(".modal_dialog")
          .removeClass("frame_modal_open")
          .addClass("frame_modal_close");

        setTimeout(() => {
          $("#modal_photoCut").hide();
        }, 200);

        $(".frame_mask").hide();
      });

      $("#up_btn_load").click(function () {
        $(".modal_dialog")
          .removeClass("frame_modal_close")
          .addClass("frame_modal_open");

        _userPhoto_appendFileInput();

        if (_up_obj.crop === true) {
          $("#crop_img").next().hide();
          $("#preview_large_wrap img").hide();
          $("#crop_zoomIn,#crop_zoomOut").hide();
          $("#btn_openCut").click();
          $("#modal_photoCut").show();

          $(".frame_mask").show();
        } else {
          $("#up_file").click();
        }
      });

      $("#btn_select_pic").click(function () {
        _userPhoto_appendFileInput();
        $("#up_file").click();
      });

      $(document).on("change", "#up_file", function (event) {
        var $fileInput = $("#up_file");

        if ($fileInput.val() === "") {
          return;
        }

        if (!_userPhoto_checkFileType($fileInput)) {
          //cpMsgbox({ type: 2, content: '文件格式不正确' });
          alert("文件格式不正确");
          $fileInput.val("");
          $("#up_file").remove();
          return;
        }

        if (_up_obj.crop) {
          var files = this.files;
          var file;
          var URL = window.URL || window.webkitURL;
          var blobURL;
          //$("#preview_area").show();
          if (files && files.length) {
            file = files[0];
            if (/^image\/\w+/.test(file.type)) {
              if (blobURL) {
                URL.revokeObjectURL(blobURL);
              }
              blobURL = URL.createObjectURL(file);
              $("#crop_img").cropper("replace", blobURL);
              $("#crop_img").next().show();
              $("#preview_large_wrap img").show();
              $("#crop_zoomIn,#crop_zoomOut").show();
            } else {
              //cpMsgbox({ type: 2, content: '请选择图片文件' });
              alert("请选择图片文件");
            }
          }
          return;
        }

        if (!_userPhoto_checkFileSize(event)) {
          //cpMsgbox({ type: 2, content: '照片文件大小超出限制' });
          alert("照片文件大小超出限制");
          $fileInput.val("");
          $("#up_file").remove();
          return;
        }

        var formData = new FormData();
        formData.append("UserPhoto", $fileInput[0].files[0]);
        formData.append("UserType", _up_obj.userType);
        formData.append("Token", _up_obj.token);
        formData.append("UserID", _up_obj.userID);
        formData.append("Crop", false);
        formData.append("UploadType", _up_obj.UploadType);

        _up_obj.isUploading = true;

        $.ajax({
          type: "post",
          url: _up_obj.uploadUrl,
          dataType: "JSON",
          data: formData,
          processData: false, //设置为false。因为data值是FormData对象，不需要对数据做处理。
          contentType: false, //设置为false。告诉jQuery不要去设置Content-Type请求头
          success: function (data, textStatus, jqXHR) {
            if (data.Status === 200) {
              $(".up_img_current").hide();
              var timestamp = Date.parse(new Date());
              $("#up_img_preview")
                .css(
                  "background-image",
                  "url(" +
                    _up_obj.resWebUrl +
                    data.Data[0] +
                    "?t=" +
                    timestamp.toString() +
                    ")"
                )
                .show();
              _up_obj.userID = data.Data[1];
              $("#up_btn_del").show();
              _userPhoto_setUsingDefaultVal(false);
            } else {
              $fileInput.val("");
              //cpMsgbox({ type: 2, content: data.Message });
              alert(data.Message);
              console.log(data.Message);
            }
            $("#up_file").remove();
            _up_obj.isUploading = false;
            $("#up_loading").hide();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            $("#up_file").remove();
            console.log(jqXHR);
            console.log(textStatus);
            _up_obj.isUploading = false;
            $("#up_loading").hide();
          },
          beforeSend: function () {
            $("#up_loading").show();
          },
          complete: function () {
            $("#up_loading").hide();
          },
        });
      });

      /*$('#up_btn_del').click(function () {
                var imgSrc = $('.up_img_current').show().attr('data-src');
                $('#up_img_preview,#up_btn_del').hide();
                _up_obj.perviewImgUrl = '';
                _userPhoto_setUsingDefaultVal(imgSrc.indexOf('Photo/Default') > -1);
            });*/

      $("#up_btn_del").click(function () {
        var imgSrc = $(".up_img_current").show().attr("data-src");
        $("#up_img_preview,#up_btn_del").hide();
        _up_obj.perviewImgUrl = "";

        if (imgSrc.indexOf("Photo/Default") > -1) {
          _userPhoto_setUsingDefaultVal(true);
          $(".up_img_current").hide();
          $("#up_img_preview")
            .css(
              "background-image",
              "url(" + _userPhoto_getDefaultPhoto() + ")"
            )
            .show();
        } else {
          _userPhoto_setUsingDefaultVal(false);
        }
      });

      $("#up_btn_default").click(function () {
        if (_userPhoto_isUsingDefault()) {
          return;
        }

        var perview = _userPhoto_getDefaultPhoto();
        var current = $(".up_img_current").attr("data-src");
        var index = current.lastIndexOf("?t=");
        if (index > -1) {
          current = current.substr(0, index);
        }

        if (perview !== current && !_userPhoto_isUsingDefault()) {
          $("#up_btn_del").show();
        } else {
          $("#up_btn_del").hide();
        }

        _userPhoto_setUsingDefaultVal(true);
        $(".up_img_current").hide();
        $("#up_img_preview")
          .css("background-image", "url(" + perview + ")")
          .show();
      });

      if (!_userPhoto_isUsingDefault()) {
        $("#up_btn_default").show();
      }

      $("#btn_cut").click(function () {
        var cas = $("#crop_img").cropper("getCroppedCanvas", {
          width: 358,
          height: 441,
        });

        var base64url = cas.toDataURL("image/png");
        $("#btn_close_cut").click();
        //$('.up_img_current').hide();
        //$('#up_img_preview').css('background-image', 'url(' + base64url + ')').show();
        //$('#up_btn_del').show();

        var formData = new FormData();
        formData.append("UserPhoto", base64url);
        formData.append("UserType", _up_obj.userType);
        formData.append("Token", _up_obj.token);
        formData.append("UserID", _up_obj.userID);
        formData.append("Crop", true);
        formData.append("UploadType", _up_obj.UploadType);

        _up_obj.isUploading = true;

        $.ajax({
          type: "post",
          url: _up_obj.resWebUrl + "UploadForCrop.ashx",
          dataType: "JSON",
          data: formData,
          processData: false, //设置为false。因为data值是FormData对象，不需要对数据做处理。
          contentType: false, //设置为false。告诉jQuery不要去设置Content-Type请求头
          success: function (data, textStatus, jqXHR) {
            if (data.Status === 200) {
              var timestamp = Date.parse(new Date());
              $(".up_img_current").hide();

              $("#up_img_preview")
                .css(
                  "background-image",
                  "url(" +
                    _up_obj.resWebUrl +
                    data.Data[0] +
                    "?t=" +
                    timestamp.toString() +
                    ")"
                )
                .show();
              _up_obj.userID = data.Data[1];
              $("#up_btn_del").show();
              _userPhoto_setUsingDefaultVal(false);
            } else {
              $fileInput.val("");
              //cpMsgbox({ type: 2, content: data.Message });
              alert(data.Message);
            }
            $("#up_file").remove();
            _up_obj.isUploading = false;
            $("#up_loading").hide();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            $("#up_file").remove();
            _up_obj.isUploading = false;
            $("#up_loading").hide();
          },
          beforeSend: function () {
            $("#up_loading").show();
          },
          complete: function () {
            $("#up_loading").hide();
            $(".frame_mask").hide();
          },
        });
      });

      $("#crop_zoomOut").click(function () {
        $("#crop_img").cropper("zoom", -0.1);
      });

      $("#crop_zoomIn").click(function () {
        $("#crop_img").cropper("zoom", 0.1);
      });

      if (_up_obj.crop) {
        $("#crop_img").cropper({
          aspectRatio: _up_obj.UploadType === "Avatar" ? 5 / 5 : 358 / 441,
          viewMode: 1,
          dragMode: "move",
          wheelZoomRatio: 0.2,
          preview: "#preview_large_wrap",
        });

        $(".up_tip_container p").text(
          "上传要求:2M以内JPG/JPEG/GIF/BMP/PNG格式。"
        );
      }

      if (_up_obj.crop && $("#btn_openCut").length > 0) {
        $("#btn_close_cut").click();
        $("#crop_zoomIn,#crop_zoomOut").hide();
      }
    },
  });

  function _userPhoto_checkH5() {
    _userPhoto_appendFileInput();
    var $fileInput = $("#up_file");
    var feature = {};
    //检查是否支持html5 api
    feature.fileapi = $fileInput.get(0).files !== undefined;
    feature.formdata = typeof window.FormData !== "undefined";
    var vsersion = _userPhoto_versionOfIE();

    if (!feature.fileapi || !feature.formdata) {
      $(".up_btn_container").html(
        "<span>Sorry，您使用的浏览器版本过低不支持上传功能</span>"
      );
      $fileInput.remove();
    }

    //if (_userPhoto_isIE() && vsersion != "IE11" && vsersion != "Edge") {
    //    $(".up_btn_container").html("<span>Sorry，您使用的浏览器版本过低不支持上传功能</span>");
    //}
  }

  //浏览器验证文件大小
  function _userPhoto_checkFileSize(evt) {
    if (
      evt.target === undefined ||
      evt.target === null ||
      evt.target.files === null
    ) {
      return false;
    }
    if (evt.target.files[0].size <= 0) {
      return false;
    } else if (evt.target.files[0].size < 1024 * 1024 * 2) {
      return true;
    } else {
      return false;
    }
  }

  function _userPhoto_getDefaultPhoto() {
    if (_up_obj.UploadType === "Photo") {
      return _up_obj.resWebUrl + "UserInfo/Photo/Default/Nopic.jpg";
    }

    if (_up_obj.userType === "Admin") {
      return _up_obj.resWebUrl + "UserInfo/Avatar/Default/Nopic001.jpg";
    }

    var int_userType;
    var genderFlag = _up_obj.gender == "-1" ? "2" : _up_obj.gender;
    switch (_up_obj.userType) {
      case "Teacher":
        int_userType = "1";
        break;
      case "Student":
        int_userType = "2";
        break;
      case "Parent":
        int_userType = "3";
        break;
      case "Expert":
        int_userType = "4";
        break;
      case "EduLeader":
        int_userType = "5";
        break;
      case "SchoolLeader":
        int_userType = "7";
        break;
      case "AreaLeader":
        int_userType = "8";
        break;
      case "Supervisor":
        int_userType = "9";
        break;
      default:
        int_userType = "0";
        break;
    }

    var photoUrl =
      _up_obj.resWebUrl +
      "UserInfo/Avatar/Default/Nopic" +
      int_userType +
      genderFlag +
      "1.jpg";
    return photoUrl;
  }

  function _userPhoto_checkFileType($obj) {
    var fileType = $obj.val();
    fileType = fileType.substr(fileType.lastIndexOf(".") + 1).toUpperCase();
    var canUploadType = "JPG,JPEG,GIF,BMP,PNG"; //图片
    var Types = canUploadType.split(",");
    for (var i = 0; i < Types.length; i++) {
      if (fileType === Types[i]) {
        return true;
      }
    }

    return false;
  }

  function _userPhoto_reset(options) {
    _up_obj.userID = "";
    _up_obj.perviewImgUrl = "";
    _up_obj.curImgPath = "";
    _up_obj.gender = "-1";
    _up_obj.isUsingDefault = false;

    _up_obj = $.extend({}, _up_obj, options); //使用jQuery.extend 覆盖插件默认参数

    _up_obj.isUsingDefault = _up_obj.curImgPath.indexOf("Photo/Default") > -1;

    if (_up_obj.resWebUrl.substr(_up_obj.resWebUrl.length - 1, 1) !== "/") {
      _up_obj.resWebUrl += "/";
    }

    _up_obj.uploadUrl = _up_obj.resWebUrl + "UpLoadForPC.ashx";
    if (_up_obj.UploadType === "Photo") {
      _up_obj.defultPreImgPath =
        _up_obj.resWebUrl + "UserInfo/Photo/Default/Nopic.jpg";
    } else {
      _up_obj.defultPreImgPath = _userPhoto_getDefaultPhoto();
    }
    _up_obj.uploadSubmitUrl = _up_obj.resWebUrl + "UploadSubmit.ashx";

    $("#up_loading").hide();
    $("#up_btn_del,#up_img_preview").hide();
    $(".up_img_current").show();

    if (_up_obj.crop && $("#btn_openCut").length > 0) {
      $("#btn_close_cut").click();
      $("#crop_zoomIn,#crop_zoomOut").hide();
    }

    if (_up_obj.curImgPath === "") {
      $(".up_img_current")
        .attr("data-src", _up_obj.defultPreImgPath)
        .css("background-image", "url(" + _up_obj.defultPreImgPath + ")");
      _userPhoto_setUsingDefaultVal(true);
    } else {
      $(".up_img_current")
        .attr("data-src", _up_obj.curImgPath)
        .css("background-image", "url(" + _up_obj.curImgPath + ")");
    }
  }

  //动态插入input file标签
  function _userPhoto_appendFileInput() {
    if ($("#up_file").length === 0) {
      $(".up_btn_container").append(
        "<input id='up_file' accept='image/jpg,image/jpeg,image/gif,image/bmp,image/png' style='display:none' type='file' />"
      );
    }
  }

  function _userPhoto_setGender(gender) {
    if (gender === null || gender === "") {
      return;
    }

    switch (gender) {
      case "男":
        _up_obj.gender = "0";
        break;
      case "女":
        _up_obj.gender = "1";
        break;
      case "保密":
        _up_obj.gender = "-1";
        break;

      default:
        _up_obj.gender = "-1";
        break;
    }

    if (_userPhoto_isUsingDefault()) {
      $(".up_img_current").hide();
      $("#up_img_preview")
        .css("background-image", "url(" + _userPhoto_getDefaultPhoto() + ")")
        .show();
      _userPhoto_setUsingDefaultVal(true);
    }
  }

  function _userPhoto_isUsingDefault() {
    return _up_obj.isUsingDefault;
  }

  function _userPhoto_setUsingDefaultVal(value) {
    _up_obj.isUsingDefault = value;
  }

  function _userPhoto_uploadSubmit() {
    if (_userPhoto_isUsingDefault() || !_userPhoto_isChanged()) {
      return true;
    }

    var result = false;
    var formData = new FormData();
    formData.append("UserType", _up_obj.userType);
    formData.append("Token", _up_obj.token);
    formData.append("UserID", _up_obj.userID);
    formData.append("UploadType", _up_obj.UploadType);

    $.ajax({
      type: "post",
      url: _up_obj.uploadSubmitUrl,
      dataType: "JSON",
      async: false,
      data: formData,
      processData: false, //设置为false。因为data值是FormData对象，不需要对数据做处理。
      contentType: false, //设置为false。告诉jQuery不要去设置Content-Type请求头
      success: function (data, textStatus, jqXHR) {
        if (data.Status === 200) {
          _up_obj.perviewImgUrl = _up_obj.resWebUrl + data.Data;
          result = true;
        } else {
          //console.group("确认照片请求失败");
          //console.info(data.Status);
          //console.info(data.Message)
          result = false;
          //console.groupEnd();
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        //console.group("确认照片请求异常")
        //console.error(jqXHR);
        //console.error(textStatus);
        //console.error(errorThrown);
        //console.groupEnd();
      },
    });

    return result;
  }

  function _userPhoto_isChanged() {
    var isChanged = $("#up_btn_del").is(":visible");
    return isChanged;
  }

  function _userPhoto_isUploading() {
    return _up_obj.isUploading;
  }

  function _userPhoto_getCurImgPath() {
    let tempResult, index;

    if (_up_obj.perviewImgUrl === "") {
      if (_userPhoto_isUsingDefault()) {
        return "";
      }
      tempResult = _up_obj.curImgPath.substr(
        _up_obj.curImgPath.lastIndexOf("/UserInfo/") + 1
      );
      index = tempResult.indexOf("?");
      return index > -1
        ? tempResult.substring(0, tempResult.indexOf("?"))
        : tempResult;
    } else {
      if (_userPhoto_isUsingDefault()) {
        return "";
      }
      tempResult = _up_obj.perviewImgUrl.substr(
        _up_obj.perviewImgUrl.lastIndexOf("/UserInfo/") + 1
      );
      index = tempResult.indexOf("?");
      return index > -1
        ? tempResult.substring(0, tempResult.indexOf("?"))
        : tempResult;
    }
  }

  //判断是否是IE浏览器
  function _userPhoto_isIE() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE =
      userAgent.indexOf("compatible") > -1 &&
      userAgent.indexOf("MSIE") > -1 &&
      !isOpera; //判断是否IE浏览器
    return isIE;
  }

  //获取IE浏览器版本
  function _userPhoto_versionOfIE() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE =
      userAgent.indexOf("compatible") > -1 &&
      userAgent.indexOf("MSIE") > -1 &&
      !isOpera; //判断是否IE浏览器
    var isEdge =
      userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion === 7) {
        return "IE7";
      } else if (fIEVersion === 8) {
        return "IE8";
      } else if (fIEVersion === 9) {
        return "IE9";
      } else if (fIEVersion === 10) {
        return "IE10";
      } else if (fIEVersion === 11) {
        return "IE11";
      } else {
        return "unknown";
      } //IE版本过低
    } else if (isEdge) {
      return "Edge";
    } else {
      return "unknown"; //非IE
    }
  }

  function _userPhoto_setCurImgPath(imgUrl, userID, userType) {
    _up_obj.userType = userType;

    if (imgUrl === "") {
      imgUrl = _userPhoto_getDefaultPhoto();
    }

    _up_obj.userID = userID;
    _up_obj.curImgPath = imgUrl;

    var time = new Date().getTime();
    var src = imgUrl + "?t=" + time;

    $(".up_img_current")
      .attr("data-src", src)
      .css("background-image", "url(" + src + ")");
    _userPhoto_setUsingDefaultVal(imgUrl.indexOf("Photo/Default") > -1);

    _userPhoto_reset();
  }

  function _userPhoto_getCurImgFullPath() {
    return _up_obj.resWebUrl + _userPhoto_getCurImgPath();
  }

  $.fn.picUploader.getCurImgPath = _userPhoto_getCurImgPath;

  $.fn.picUploader.getCurImgFullPath = _userPhoto_getCurImgFullPath;
  $.fn.picUploader.isChanged = _userPhoto_isChanged;
  $.fn.picUploader.uploadSubmit = _userPhoto_uploadSubmit;
  $.fn.picUploader.setGender = _userPhoto_setGender;
  $.fn.picUploader.reset = _userPhoto_reset;
  $.fn.picUploader._up_obj = _up_obj;
})(jQuery);
