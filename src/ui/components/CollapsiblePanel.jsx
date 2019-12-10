import React from 'react';
import { observer } from 'mobx-react'

@observer
class CollapsiblePanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.setState({isResizing:false})
  }

  _getRelativeCoordinates(e){
    const rect = e.target.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    return {x: relX, y:relY}
  }

  handleMouseMove(e){
    const {x, y} = this._getRelativeCoordinates(e);
    if (this.state.isResizing === true){
      console.log("resize : ",y);
    }
  }
  handleMouseUp(e) {
    const {x, y} = this._getRelativeCoordinates(e);
    const {settings} = this.props;
    if (this.state.isResizing === true) {
      this.setState({ isResizing: false });
    }
  }
  handleMouseDown(e) {
    const { x, y } = this._getRelativeCoordinates(e);
    const { settings } = this.props;
    // case "bottom"
    console.log('y='+y+' resize='+settings.resizeSensibility);
    if (y <= settings.resizeSensibility) {
      console.log('resizing=true');
      this.setState({ isResizing: true });
    }
  }

  render() {
    const {settings} = this.props;
    return (
      <div className="fixed-bottom debug-console"
           style={{height: settings.height}}
           onMouseDown={this.handleMouseDown}
           onMouseMove={this.handleMouseMove}
           onMouseUp={this.handleMouseUp} >
          { this.props.children }
      </div>
    );
  }
}


export default CollapsiblePanel;
