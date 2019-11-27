import React from 'react';
import './RunnerDebugConsole.css';

class RunnerDebugConsole extends React.Component {
  constructor(props) {
    super(props);
  }

  /*
  this.ps.history[] = [{commands: TXT, hadErrors:bool,results: BUFFER]

   */
  render() {
    const history = this.props.history;
    console.log('history=', history);
    const lines = [];
    for (let i = 0; i < history.length; i++) {
      const item = history[i];
      lines.push(<CommandHistory item={item} />);
    }
    return (
      <div>
        { lines }
      </div>
    );
  }
}


class CommandHistory extends React.Component {
  constructor(props) {
    super(props);
    console.log('item=', this.props.item);
  }
  render() {
    const { commands, hadErrors, results } = this.props.item;
    const commandOutput = results.toString();
    return (
      <div>
        <div className="row">
          <div className={`col-lg-12 command-input${hadErrors ? '-error' : ''}`} >
            <span className="shell-prompt">></span>
            {commands}
          </div>
        </div>
        <div className="row">
          <div className={`col-lg-12 command-output${hadErrors ? '-error' : ''}`} >{commandOutput}</div>
        </div>
      </div>
    );
  }
}

export default RunnerDebugConsole;
