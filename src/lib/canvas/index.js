import InlineSVG from 'svg-inline-react';
import React, { Component } from 'react';

class Canvas extends Component {

  loadSvgTemplate = () => {
    console.log(this.props.imageData)
    return (
      < div className="canvas-image">
        <InlineSVG src={this.props.imageData} />
      </div>
    )
  }

  render() {
    return (
      <div className="canvas-container">
        {this.props.imageData ? this.loadSvgTemplate() : ''}
      </div>
    );
  }
}

export default Canvas;