import React from 'react';

class RunnerDebugConsole extends React.Component {
  constructor(props) {
    super(props);
  }

  /*
  this.ps.history[] = [{commands: TXT, hadErrors:bool,results: BUFFER]

   */
  render() {
    const history = this.props.ps.history;

    return (
      <div>
        { history.map((item, i) => {
          <CommandHistory item={item} />;
        })}
      </div>
    );
  }
}


class CommandHistory extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { commands, hadErrors, results } = this.props.command;
    const commandOutput = results.toString();
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 command-input">{commands}</div>
        </div>
        <div className="row">
          <div className="col-lg-12 command-output">{commandOutput}</div>
        </div>
      </div>
    );
  }
}
