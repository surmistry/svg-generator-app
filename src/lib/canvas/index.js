// // import { Rsvg } from 'rsvg';
import InlineSVG from 'svg-inline-react';
import React, { Component } from 'react';
import { createCanvas } from 'canvas';

class Canvas extends Component {
  constructor(props) {
    super(props);
  }

  loadSvgTemplate = () => {
    return (
      < div className="canvas-image">
        <InlineSVG src={this.props.imageData} />
      </div>
    )
  }

  render() {
    console.log(this);
    return (
      <div className="canvas-container">
        {this.props.imageData ? this.loadSvgTemplate() : ''}
      </div>
    );
  }
}

export default Canvas;