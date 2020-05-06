import React from 'react';
import { observer } from 'mobx-react'
import './RunnerDebugConsole.scss';
import TabProvider from './TabProvider'
import store from '../../store/RootStore'


@observer
class RunnerDebugConsole extends React.Component {
  constructor(props) {
    super(props);
    // setInterval(_=>{this.forceUpdate()},1000)
  }

  handleTabProviderClick(e, element){
    store.uiState.selectRunnerConsoleTab(element.caption);
  }

  render() {
    const shells = this.props.shellManager.getShells();
    const tabs = [];
    if (shells.length === 0) {
      shells.push({
        caption: "no process", content: (<div>No Processes are running yet !</div>)
      });
    }
    console.log("Shell Entries ", Object.entries(shells))
    for (const [shellName, shellObj] of Object.entries(shells)){
      const { monitorManager } = shellObj;
      if (!monitorManager) continue;

      for (const monitor of monitorManager.monitors) {
        const { pid } = monitor;
        const processProxy = monitor._process;

      // }
        // const pids = monitorManager._pid2processMap
        // for (const [pid, processProxy] of Object.entries(pids)){
          tabs.push({
          caption: `${shellName} (${pid})`,
          content: (
            <>
              {/* <ProcessConsole shellName={shellName} pid={pid} processProxy={processProxy} /> */}
              <ConsoleMonitor monitor={monitor} />
              
            </>
          )
        });
      }
    }
    return (
      <div className="row runner-debugger-console" style={ {height: store.uiState.app.runnerConsole.settings.height} }>
        <div className="col-lg-12">
          <TabProvider tabs={tabs} onClick={this.handleTabProviderClick} selected={store.uiState.app.runnerConsole.selectedTab}/>
        </div>
    </div>
    );
  }
}

@observer
class ConsoleMonitor extends React.Component {
  constructor(props) {
    super(props);setInterval(_=>{this.forceUpdate()},1000);
  }
  render(){
    const { monitor } = this.props;
    const { output } = monitor;
    const res = [];
    for (const [i, stream] of output.entries()){
      const { type, data } = stream;
      const lines = data.split('\n');
      for (const [j, line] of lines.entries()){
        res.push(
          <div key={"console-" + i + '-' + j} className={"process-console-" + type}>
            {line}
          </div>
        );
      }

    }
    
    return (
        <div className="process-console row  console-command-history console-row">
          <div className="col-lg-12" >
            { res }
          </div>
        </div>
    );
  }
}


@observer
class ProcessConsole extends React.Component {
  constructor(props) {
    super(props);setInterval(_=>{this.forceUpdate()},1000);
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
      <div className="process-console">
        { lines }
      </div>
    );
  }

}

@observer
class ConsoleCommandHistory extends React.Component {
  constructor(props) {
    super(props);
    // setInterval(_=>{this.forceUpdate()},1000)
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

        <div className="row  console-command-history console-row">
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
