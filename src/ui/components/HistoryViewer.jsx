import React from "react";
import { observer } from "mobx-react";
import store from "../../store/RootStore";
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
    this.handleCommandClick = this.handleCommandClick.bind(this);
    this.handleContextClick = this.handleContextClick.bind(this);
  }

  handleCommandClick(e){
    const {command, context} = this.props.item;
    store.shellManager.runCommand(command, context);
  }
  handleContextClick(e){
    const {command, context} = this.props.item;
    store.uiState.selectHost(context);
  }
  render() {
    console.log('HISTORY', this.props.item);
    const { command, context } = this.props.item;
    const { caption: commandCaption, description} = command;
    const mainColumnProperty = context[context._datasource.mainColumnProperty];

    return (

        <div className="row history-row">
           <div className="col-lg-12" >
              <span className="history-view-context" onClick={this.handleContextClick}>{ mainColumnProperty }</span>
              {" "}
              <span className="history-view-command-caption" onClick={this.handleCommandClick}>{ commandCaption }</span>
            </div>
        </div>

    );
  }
}