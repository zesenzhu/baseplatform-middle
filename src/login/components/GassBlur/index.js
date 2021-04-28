/**
 * @description: 高斯模糊层
 * @param {*}
 * @return {*}
 */
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { connect } from "react-redux";
import "./index.scss";
import $ from "jquery";
import G from "glob";

function GassBlur(props) {
  const { commSetting, introduce } = props;
  const { skin } = commSetting;
  const { changeForCanvas } = introduce;
  const { active } = introduce && introduce[skin] ? introduce[skin] : {};
  const canvasRef = useRef(null);

  //不想动他的轮播数据结构，直接点，获取
  const [ImgList, setImgList] = useState({});
  const [ImgObjList, setImgObjList] = useState({});
  const [Ctx, setCtx] = useState(null);
  const [NowImage, setNowImage] = useState(null);
  const [MyImage, setMyImage] = useState(null);
  //   const [width, heigth] = useMemo(() => {
  //     return [window.outerWidth, window.outerHeight];
  //   }, []);
  useLayoutEffect(() => {
    if (!changeForCanvas) {
      return;
    }
    if (skin === "cloud_schoolroom") {
      //网上课堂
      let ImageDom = $(".cloud_schoolroom_bg").css("background-image");
      let url = ImageDom.substring(
        ImageDom.indexOf('"') + 1,
        ImageDom.indexOf('")')
      );
      setMyImage(url);
      return;
    }

    if (skin === "dark_tech") {
      //黑暗风
      let ImageDom = $(".dark_tech_bg").css("background-image");
      let url = ImageDom.substring(
        ImageDom.indexOf('"') + 1,
        ImageDom.indexOf('")')
      );
      setMyImage(url);
      return;
    }
    let url = "";
    let ImageDom = "";
    if (skin === "ai_practice") {
      //练习
      let dom = $(".bottom_wrapper");
      ImageDom = dom.find(".active").css("background-image");

      // setMyImage(url);
    } else {
      let dom = $(".slick-active");
      ImageDom = dom.find(".swiper-slide").css("background-image");
    }
    if (!ImageDom) {
      return;
    }
    url = ImageDom.substring(ImageDom.indexOf('"') + 1, ImageDom.indexOf('")'));
    if (!ImgList[active]) {
      if (
        Object.keys(ImgList).some((c) => {
          if (ImgList[c] === url) {
            setNowImage(ImgObjList[c]);
            return true;
          }
        })
      ) {
        return;
      }
      setMyImage(url);
      return;
    } else {
      //   setNowImage(ImgObjList[active]);
      setMyImage(ImgList[active]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, changeForCanvas, skin]);
  //获取canvas
  useLayoutEffect(() => {
    // let ctx = canvasRef.current.getContext("2d");
    // setCtx(ctx);
    // console.log(ctx);
  }, []);
  // useEffect(() => {
  //   let height = window.outerHeight;
  //   let width = window.outerWidth;
  //   console.log(NowImage, active, ImgObjList, ImgList);

  //   if (Ctx && NowImage) {
  //     //   Ctx.clearRect(0, 0, width, height);
  //     Ctx.drawImage(NowImage, 0, 0);
  //     //   var data = Ctx.getImageData(0, 0, width, height);
  //     //   var emptyData = gaussBlur(data, 200);
  //     //   //将模糊的图像数据再渲染到画布上面
  //     //   Ctx.putImageData(emptyData, 0, 0);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [Ctx, NowImage]);

  return (
    // <canvas
    //   style={{
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     width: "100vw",
    //     height: "100vh",
    //   }}
    //   ref={canvasRef}
    // ></canvas>
    <>
      {MyImage && (
        <img
          alt={MyImage}
          src={MyImage}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          ref={canvasRef}
        ></img>
      )}
      <div className="mask"></div>
    </>
  );
}
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(GassBlur);
