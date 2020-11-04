import React, {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
  memo,
  useImperativeHandle,
  forwardRef,
  useLayoutEffect,
} from "react";
import ReactDOM from "react-dom";
function WaveRound(props, ref) {
  let { className, id, width, height, ...other } = props;
  let CanvasRef = useRef();
  useEffect(()=>{
      let ctx = CanvasRef.current.getContext('2d')
      console.log(CanvasRef.current,ctx)

  },[])
  return (
    <div ref={ref} className={`waveRound ${className?className:''}`} {...other}>
      <canvas
        ref={CanvasRef}
        width={width ? width : 114}
        height={height ? height : 114}
      ></canvas>
    </div>
  );
}
export default memo(forwardRef(WaveRound));
