import React, { Component } from "react";
import { connect } from "react-redux";


import Aniamtion from '../../../common/js/Aniamtion/index'
//import { urlAll, proxy } from './config'

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
     colors:['#fff','#fff'],
     deviation:70
    };
  }

  componentWillMount() {
    console.log(Aniamtion)
  }
  
  onDeviationBlur = (e) => {
    
  }
  onDeviationChange = (e) => {
    this.setState({
      deviation:e.target.value
    })
  }
  
  render() {
  
    return (
      <div style={{width:'100%',height:'100%'}}>
       <Aniamtion.WaveRound 
      //  width='250' height='250'
        background = {this.state.colors} number='50'></Aniamtion.WaveRound>
       <input onChange={this.onDeviationChange.bind(this)} onBlur={this.onDeviationBlur.bind(this)} value={this.state.deviation}></input>
      </div>
    );
  }
}
const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};
export default connect(mapStateToProps)(App);
