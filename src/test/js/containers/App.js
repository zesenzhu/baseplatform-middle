import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import Aniamtion from "../../../common/js/Aniamtion/index";
import WaveRound from "../../../common/js/Aniamtion/ReactCanvas/waveRound/index.js";
//import { urlAll, proxy } from './config'

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      colors: ["#fff", "#fff"],
      deviation: 70,
    };
    this.canvas = createRef();
  }

  componentWillMount() {
    console.log(Aniamtion);
  }
  componentDidMount() {
    console.log(this.canvas.current);
    this.canvas.current.addEventListener("mousedown", (e) => {
      console.log(e);
    });
  }
  onDeviationBlur = (e) => {};
  onDeviationChange = (e) => {
    this.setState({
      deviation: e.target.value,
    });
  };

  render() {
    return (
      <div ref={this.canvas} style={{ width: "100%", height: "100%" }}>
        <Aniamtion.WaveRound
          //  width='250' height='250'
          background={this.state.colors}
          number="50"
        ></Aniamtion.WaveRound>
        <input
          onChange={this.onDeviationChange.bind(this)}
          onBlur={this.onDeviationBlur.bind(this)}
          value={this.state.deviation}
        ></input>

        <WaveRound name={'测试'} type={'blue'} data={115}></WaveRound>
        <WaveRound name={'测试'} type={'green'} data={115}></WaveRound>
        <WaveRound name={'测试'} type={'orange'} data={115}></WaveRound>
        <WaveRound name={'测试'} type={'purple'} data={115}></WaveRound>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState,
  };
};
export default connect(mapStateToProps)(App);
