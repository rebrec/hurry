import React from 'react';

class CollapsiblePanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="fixed-bottom debug-console">
          { this.props.children }
      </div>
    );
  }
}


export default CollapsiblePanel;
