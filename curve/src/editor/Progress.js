import React from "react";
import BezierEasing from "./../ease/index";
import BezierComponent from "./BezierComponent";

export default class Progress extends BezierComponent {
  easing = BezierEasing(...this.props.value);
  
  componentDidUpdate(){
    this.props.progressCustomProp((this.easing(this.props.input / 100) * 100).toFixed(0));
  }

  shouldComponentUpdate(nextProps) {
    if (super.shouldComponentUpdate(nextProps)) return true;
    const { value, progress, progressColor } = this.props;
    return (
      nextProps.progress !== progress ||
      nextProps.progressColor !== progressColor ||
      nextProps.value !== value
    );
  }

  UNSAFE_componentWillUpdate(props) {
    
    if (this.props.value !== props.value) {
      this.easing = BezierEasing(...props.value);
    }
  }

  render() {
    
    const { progress, progressColor } = this.props;
    if (!progress) return <path />;
    const sx = this.x(0); // standard
    const sy = this.y(0); 
    const px = this.x(progress);
    const py = this.y(this.easing ? this.easing(progress) : 0);
    const prog = `M${px},${sy} L${px},${py} L${sx},${py}`; 
    // move to point on X-axis, draw line up to chart, draw line left to point on y axis
    
    const ix = this.x(this.props.input / 100); // input
    const iy =  this.y(this.easing ? this.easing(this.props.input / 100) : 0);
    const inputProgX = `M${ix},${iy} L${sx},${iy}`;
    const inputProgY = `M${ix},${sy} L${ix},${iy}`;
    

    return (
      <g>
      <path fill="none" strokeWidth="1px" stroke={progressColor} d={prog} />
      <path fill="none" strokeDasharray="4,4" strokeWidth="2px" stroke="#4285f4" d={inputProgX} />
      <path fill="none" strokeDasharray="4,4" strokeWidth="2px" stroke="#4285f4" d={inputProgY} />
      {/* <text x="20" y="90">{(this.easing(this.props.input / 100) * 100).toFixed(0)}%</text> */}
      </g>
    );
  }
}
