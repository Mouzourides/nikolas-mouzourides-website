import React from "react";
import Player from "../Player/Player";

class Canvas extends React.Component {
  state = { canvasHeight: 0, canvasWidth: 0, x: 0, y: 0 };

  componentDidMount() {
    this.setState({
      canvasHeight: document.getElementById("content").offsetHeight,
      canvasWidth: document.getElementById("content").offsetWidth,
      y: -document.getElementById("content").offsetHeight / 2 - 100
    });
  }

  getCanvasPosition = (event) => {
    // mouse position on auto-scaling canvas
    // https://stackoverflow.com/a/10298843/1232793

    const svg = document.getElementById("canvas");
    const point = svg.createSVGPoint();

    point.x = event.clientX;
    point.y = event.clientY;
    const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());
    this.setState({ x: x, y: y });
  };


  render() {
    return (
      <div>
        <svg
          id="canvas"
          preserveAspectRatio="xMaxYMax none"
          onMouseMove={this.getCanvasPosition.bind(this)}
          viewBox={[window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, this.state.canvasHeight]}
        >
          <Player x={-this.state.canvasWidth / 2 + 50} y={this.state.y}/>
          <text x={this.state.canvasWidth / 2 - 300} y={-500} className="text">Hello world</text>
        </svg>
        {console.log("x: " + this.state.x + ", y: " + this.state.y + ", canvasWidth: " + this.state.canvasWidth + ", canvasHeight: " + this.state.canvasHeight)}
      </div>
    );
  }
}

export default Canvas;