import React, { Component } from "react";
import raf from "raf";
import BezierEditor from "./editor/BezierEditor";
import './App.css';

class App extends Component {
  state = {
    value: [ Math.random()/2, Math.random()/2, (1+Math.random())/2, (1+Math.random())/2 ],
    progress: 0,
    activeID: null,
  };

  componentDidMount() {
    const loop = (t) => {
      this._loopId = raf(loop);
      this.setState({
        progress: (t/2000) % 1, // t/2000 is 2s per loop;
        
      });
      
    };
    this._loopId = raf(loop);
  }

  componentWillUnmount() {
    raf.cancel(this._loopId);
  }

  onChange = (value) => {
    this.setState({ value });
    this.setState({ activeID: null });
  }

  field = (index) => (e) => {
    let { value } = this.state;
    value[index] = e.target.value;
    this.setState({ value });
  };

  ease = () => {
    this.setState({ value: [0.25, 0.1, 0.25, 1] });
    this.setState({ activeID:'ease' });
  }
  
  easeIn = () => {
    this.setState({ value: [0.42, 0, 1, 1] });
    this.setState({ activeID:'easeIn' });
  }

  easeOut = () => {
    this.setState({ value: [0, 0, 0.58, 1] });
    this.setState({ activeID:'easeOut' });
  }

  easeInOut = () => {
    this.setState({ value: [0.42, 0, 0.58, 1] });
    this.setState({ activeID:'easeInOut' });
  }

  

  render() {
    var {
      value,
      progress,
    } = this.state;

    
    return <div id="content">
      
      <BezierEditor
        className="bezier"
        value={value}
        onChange={this.onChange}
        progress={progress}
        handleStroke={3}
        handleRadius={6}
        curveWidth={3}
      >
      </BezierEditor>
      <div id="value">   
        {this.state.value.map((val, i) => (
          <span key={i}>       
              <input
                
                type="text"
                onChange={this.field(i)}
                value={Number(val).toFixed(2)}
              />
          </span>
        ))}
      </div>
      

      <div id="buttons">
        <button id="ease" onClick={this.ease} className={ this.state.activeID === 'ease' ? 'active' : null }>Ease</button>
        <button id="easeIn" onClick={this.easeIn} className={ this.state.activeID === 'easeIn' ? 'active' : null }>Ease in</button>
        <button id="easeOut" onClick={this.easeOut} className={ this.state.activeID === 'easeOut' ? 'active' : null }>Ease out</button>
        <button id="easeInOut" onClick={this.easeInOut} className={ this.state.activeID === 'easeInOut' ? 'active' : null }>Ease in out</button>
      </div>
    </div>;
  }
}

export default App;
