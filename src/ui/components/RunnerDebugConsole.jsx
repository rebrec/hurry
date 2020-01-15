import React from 'react';
import { observer } from 'mobx-react'
import './RunnerDebugConsole.scss';
import TabProvider from './TabProvider'
import store from '../../store/RootStore'

@observer
class RunnerDebugConsole extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTabProviderClick(e, element){
    store.uiState.selectRunnerConsoleTab(element.caption);
  }

  render() {
    const shells = this.props.shellManager.getShells();
    const tabs = [{
      caption: "no process", content: (<div>No Processes are running yet !</div>)
    }];
    console.log("!!! SHELLS ", Object.keys(shells));
    console.log("!!! SHELLS ", Object.entries(shells))
    for (const [shellName, shellObj] of Object.entries(shells)){
      const { runner } = shellObj;
      const pids = runner._pid2processMap
      console.log("!!! SHELLS ", shellName, Object.keys(pids));
      for (const [pid, processProxy] of Object.entries(pids)){
        tabs.push({
          caption: `${shellName} (${pid})`,
          content: (
            <div className="col-sm-12 ">
              <div className="row">
                <div className="col-sm-12 ">
                  <ProcessConsole shellName={shellName} pid={pid} processProxy={processProxy} />
                </div>    
              </div>
            </div>
          )
        });
      }
    }
    console.log("!!! SHELLS ", tabs);
    return (
      <div className="row ">
      <TabProvider tabs={tabs} onClick={this.handleTabProviderClick} selected={store.uiState.app.runnerConsole.selectedTab}/>
    </div>
    );
  }
}
@observer
class ProcessConsole extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const { shellName, pid, processProxy } = this.props;
    const history = processProxy._commandHistory;
    const lines = [];
    // for (let i = 0; i < history.length; i++) {
    for (let i = history.length - 1; i >=0 ; i--) { // iterate from end to first
      const item = history[i];
      lines.push(<ConsoleCommandHistory key={i} item={item} />);
    }
    
    return (
      <div className="row ">
        { lines }
      </div>
    );
  }

}

@observer
class ConsoleCommandHistory extends React.Component {
  constructor(props) {
    super(props);
    console.log('item=', this.props.item);
  }
  render() {
    const { 
      _command: commands,
      _completed: completed,
      _startedAt: startedAt,
      _finishedAt: finishedAt,
      _stdout: stdout,
      _stderr: stderr
    } = this.props.item;
    const hadErrors = (stderr !== "")
    return (

        <div className="row console-row">
          <div className="col-lg-12" >
            <div className="row">
              <div className={`col-lg-12 command-input${hadErrors ? '-error' : ''}`} >
                <span className="shell-prompt">></span>
                {commands}
              </div>
            </div>
            <div className="row">
              <div className={`col-lg-12 command-output${hadErrors ? '-error' : ''}`} >{stdout}</div>
            </div>
            <div className="row">
              <div className={`col-lg-12 command-output${hadErrors ? '-error' : ''}`} >{stderr}</div>
            </div>
          </div>
        </div>

    );
  }
}

export default RunnerDebugConsole;
