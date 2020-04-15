import React from "react";
import { observer } from "mobx-react";
import store from "../../store/RootStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./HistoryViewer.scss";

@observer
export default class HistoryViewer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const commands = store.historyStore.commands;
    const lines = [];
    for (let i = commands.length - 1; i >=0 ; i--) { // iterate from end to first
      const item = commands[i];
      lines.push(<HistoryCommand key={i} item={item} />);
    }
    return (
      <>
        <div className="row">
          <div className="col-lg-12 history-header">
            History
          </div>
        </div>
        {lines}
      </>
    )
      ;
  }

}


@observer
class HistoryCommand extends React.Component {
  constructor(props) {
    super(props);
    this.handleRunAgainCommandClick = this.handleRunAgainCommandClick.bind(this);
    this.handleRunSameCommandClick = this.handleRunSameCommandClick.bind(this);
    this.handleSelectSameHostClick = this.handleSelectSameHostClick.bind(this);
  }

  handleRunAgainCommandClick(e){
    const {command, context} = this.props.item;
    store.shellManager.runCommand(command, context);
  }
  handleRunSameCommandClick(e){
    const {command} = this.props.item;
    
    if (store.uiState.app.menu.visible) {
      const context = store.uiState.search.selectedResult;
      store.shellManager.runCommand(command, context);
    } else {
      console.log('No host selected');
    }
    
  }
  handleSelectSameHostClick(e){
    const {context} = this.props.item;
    store.uiState.selectHost(context);
  }
  render() {
    console.log('HISTORY', this.props.item);
    const { command, context } = this.props.item;
    const { caption: commandCaption, description} = command;
    const mainColumnProperty = context[context._datasource.mainColumnProperty];

    return (

        <div className="row h-100 history-row">
            <div className="col-sm-4 my-auto history-view-context" title={ mainColumnProperty } onClick={this.handleContextClick}>{ mainColumnProperty }</div>
            <div className="col-sm-4 my-auto history-view-command-caption" title={ commandCaption } onClick={this.handleCommandClick}>{ commandCaption }</div>
            <div className="col-sm-4 my-auto text-right">
              <span className="btn btn-outline-light history-view-btn" title={"Select " + mainColumnProperty + " to use another command"} onClick={this.handleSelectSameHostClick}><FontAwesomeIcon className="fa-fw" icon="desktop" /></span>
              <span className="btn btn-outline-light history-view-btn" title="Run the same command on current host" onClick={this.handleRunSameCommandClick}><FontAwesomeIcon className="fa-fw" icon="terminal" /></span>
              <span className="btn btn-outline-light history-view-btn" title="Run again (same host and same command)" onClick={this.handleRunAgainCommandClick}><FontAwesomeIcon className="fa-fw" icon="reply" /></span>
            </div>
        </div>

    );
  }
}