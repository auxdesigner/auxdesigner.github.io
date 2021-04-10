import React, { Component } from "react";
import PropTypes from "prop-types";

import Grid from "./Grid";
import Handle from "./Handle";
import Progress from "./Progress";
import Curve from "./Curve";

function onEnterHandle(h) {
  if (!this.state.down) {
    this.setState({
      hover: h,
    });
  }
}
function onDownHandle(h, e) {
  e.preventDefault();
  this.setState({
    hover: null,
    down: h,
  });
}

function onLeaveHandle() {
  if (!this.state.down) {
    this.setState({
      hover: null,
    });
  }
}

export default class BezierEditor extends Component {
  static propTypes = {
    value: PropTypes.array,
    input: PropTypes.number,
    onChange: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.array,
    handleRadius: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
    progress: PropTypes.number,
    handleStroke: PropTypes.number,
    background: PropTypes.string,
    gridColor: PropTypes.string,
    curveColor: PropTypes.string,
    curveWidth: PropTypes.number,
    handleColor: PropTypes.string,
    color: PropTypes.string,
    textStyle: PropTypes.object,
    progressColor: PropTypes.string,
    readOnly: PropTypes.bool,
  };

  static defaultProps = {
    value: [0.25, 0.25, 0.75, 0.75],
    width: 300,
    height: 300,
    padding: [25, 5, 25, 18],
    progress: 0,
    background: "#1d1d1d",
    color: "#000", // FIXME what is color?
    gridColor: "#3d3d3d",
    curveColor: "#fff",
    progressColor: "#9d9d9d",
    handleColor: "#4285f4",
    curveWidth: 2,
    handleRadius: 5,
    handleStroke: 2,
    textStyle: {
      fontSize: "10px",
      fill: "#6d6d6d"
    },
    pointers: {
      down: "none",
      hover: "pointer",
      def: "default",
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      inputBox: 50
    };
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      inputBox: evt.target.value
    });
  }


  state = {
    down: 0,
    hover: 0,
    output: "waiting"
  };

  handleProgressData = (value) => {
    this.setState({
      output: value
    });
  }

  onEnterHandle1 = onEnterHandle.bind(this, 1);
  onEnterHandle2 = onEnterHandle.bind(this, 2);
  onLeaveHandle1 = onLeaveHandle.bind(this, 1);
  onLeaveHandle2 = onLeaveHandle.bind(this, 2);
  onDownHandle1 = onDownHandle.bind(this, 1);
  onDownHandle2 = onDownHandle.bind(this, 2);

  onDownLeave = e => {
    if (this.state.down) {
      this.onDownMove(e);
      this.setState({
        down: null,
      });
    }
  };

  onDownMove = e => {
    if (this.state.down) {
      e.preventDefault();
      const i = 2 * (this.state.down - 1);
      const value = [].concat(this.props.value);
      const [x, y] = this.positionForEvent(e);
      value[i] = this.inversex(x);
      value[i + 1] = this.inversey(y);
      this.props.onChange(value);
    }
  };

  onDownUp = () => {
    // this.onDownMove(e);
    this.setState({
      down: 0,
    });
  };

  positionForEvent = e => {
    const rect = this.refs.root.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top];
  };

  x = value => {
    const padding = this.props.padding;
    const w = this.props.width - padding[1] - padding[3];
    return Math.round(padding[3] + value * w);
  };

  inversex = x => {
    const padding = this.props.padding;
    const w = this.props.width - padding[1] - padding[3];
    return Math.max(0, Math.min((x - padding[3]) / w, 1));
  };

  y = value => {
    const padding = this.props.padding;
    const h = this.props.height - padding[0] - padding[2];
    return Math.round(padding[0] + (1 - value) * h);
  };

  inversey = y => {
    const { height, handleRadius, padding } = this.props;
    const clampMargin = 2 * handleRadius;
    const h = height - padding[0] - padding[2];
    y = Math.max(clampMargin, Math.min(y, height - clampMargin));
    return 1 - (y - padding[0]) / h;
  };

  render() {
    const { x, y } = this;
    const {
      value,
      width,
      height,
      handleRadius,
      style,
      className,
      progress,
      handleStroke,
      background,
      gridColor,
      curveColor,
      curveWidth,
      handleColor,
      textStyle,
      progressColor,
      readOnly,
      pointers,
    } = this.props;

    

    const { down, hover } = this.state;

    const sharedProps = {
      xFrom: x(0),
      yFrom: y(0),
      xTo: x(1),
      yTo: y(1),
    };

    const cursor = { ...pointers };

    const styles = {
      background,
      cursor: down ? cursor.down : hover ? cursor.hover : cursor.def,
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      ...style,
    };

    const containerEvents = readOnly || !down
      ? {}
      : {
          onMouseMove: this.onDownMove,
          onMouseUp: this.onDownUp,
          onMouseLeave: this.onDownLeave,
        };
    const handle1Events = readOnly || down
      ? {}
      : {
          onMouseDown: this.onDownHandle1,
          onMouseEnter: this.onEnterHandle1,
          onMouseLeave: this.onLeaveHandle1,
        };
    const handle2Events = readOnly || down
      ? {}
      : {
          onMouseDown: this.onDownHandle2,
          onMouseEnter: this.onEnterHandle2,
          onMouseLeave: this.onLeaveHandle2,
        };

        
    return (
      <div id="container">
        <svg
        ref="root"
        className={className}
        style={styles}
        width={width}
        height={height}
        {...containerEvents}
      >
        <Grid
          {...sharedProps}
          background={background}
          gridColor={gridColor}
          textStyle={{ ...BezierEditor.defaultProps.textStyle, ...textStyle }}
        />
        <Progress
          {...sharedProps}
          value={value}
          input={this.state.inputBox}
          progressCustomProp={this.handleProgressData}
          progress={progress}
          progressColor={progressColor}
        />
        <Curve
          {...sharedProps}
          value={value}
          curveColor={curveColor}
          curveWidth={curveWidth}
        />
        {this.props.children}
        {readOnly
          ? undefined
          : <g>
              <Handle
                {...sharedProps}
                {...handle1Events}
                index={0}
                xval={value[0]}
                yval={value[1]}
                handleRadius={handleRadius}
                handleColor={handleColor}
                down={down === 1}
                hover={hover === 1}
                handleStroke={handleStroke}
                background={background}
              />
              <Handle
                {...sharedProps}
                {...handle2Events}
                index={1}
                xval={value[2]}
                yval={value[3]}
                handleRadius={handleRadius}
                handleColor={handleColor}
                down={down === 2}
                hover={hover === 2}
                handleStroke={handleStroke}
                background={background}
              />
            </g>}
      </svg>
        
        <div id="ui">
          <label>Time %</label>
          <div id="inputRow">
            <input type="text" id="inputBox" name="inputBox" onChange={this.handleChange} value={this.state.inputBox} autoComplete="off" autoFocus={true} />
          </div>

          <label>Progress %</label>
          <div id="outputRow">
            <div id="outputNum">{this.state.output}</div>
          </div>
        </div>
      
      </div>
    );
  }
}
