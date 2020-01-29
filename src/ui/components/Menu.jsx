import React from 'react';
import './Menu.scss';
import { observer } from 'mobx-react'
import TabProvider from './TabProvider'
import store from '../../store/RootStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


@observer
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataL: this.props.data.children,
      panelLeftSelection: null,
      dataLHistory:[],
      dataR: [],
      panelRightSelection: null,
    };
    this.handlePanelLeftClick = this.handlePanelLeftClick.bind(this);
    this.handlePanelRightClick = this.handlePanelRightClick.bind(this);
    this.handleTabProviderClick = this.handleTabProviderClick.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  saveToHistory(elt){
    const historyElt = {
      dataL: this.state.dataL,
      dataR: this.state.dataR,
      panelLeftSelection: this.state.panelLeftSelection
    }
    const newHistory = [...this.state.dataLHistory];
    newHistory.push(historyElt);

    this.setState({
      dataLHistory: newHistory
    });

  }
  goBack(){
    if (this.state.dataLHistory.length === 0) return;
    const newHistory = [...this.state.dataLHistory];
    const historyElt = newHistory.pop();

    this.setState({
      dataL: historyElt.dataL,
      dataR: historyElt.dataR,
      panelLeftSelection: historyElt.panelLeftSelection,
      dataLHistory: newHistory,
    });
    return
  }

  handlePanelLeftClick(e, elt){
    // debugger;
    switch (elt.type) {
      case 'CONTAINER':
        this.setState({
          dataR: elt.children,
          panelLeftSelection: elt,
        });
        // this.saveToHistory(elt);
        break;
      case 'COMMAND':
        console.log('running command : ', elt.commands);
        break;
      default:
    }
  }

  handlePanelRightClick(e, elt){
    switch (elt.type) {
      case 'CONTAINER':
        this.saveToHistory();
        this.setState({
          dataL: this.state.dataR,
          dataR: elt.children,
          panelLeftSelection: elt,
        });
        break;
      case 'COMMAND':
        store.shellManager.runCommand(elt, this.props.context);
        break;
      default:
    }
  }

  handleTabProviderClick(e, element){
    store.uiState.selectMenuTab(element.caption);
  }

  render() {
    const selectedResult = this.props.context;
    const tabs = [
      {
        caption: "Action",
        content: (
          <div className="col-sm-12 ">
            <div className="row">
              <div className="col-sm-1">
                <button onClick={this.goBack} className="btn button "
                        disabled={this.state.dataLHistory.length === 0}>
                          <FontAwesomeIcon icon="chevron-left" />
                </button>
              </div>

            </div>
            <div className="row menu-container">
              <CommandPanelLeft data={this.state.dataL} context={this.props.context} selected={this.state.panelLeftSelection}
                                onClick={this.handlePanelLeftClick}/>
              <CommandPanelRight data={this.state.dataR} context={this.props.context}  selected={this.state.panelRightSelection}
                                 onClick={this.handlePanelRightClick}/>
            </div>
          </div>
        )
      },
      {
        caption: "Infos",
        content: (
          <div className="col-sm-12 ">Rien n'est encore défini
          </div>
        )
      }
    ];
    return (
      <div className="menu-background-parent" onClick={store.uiState.hideMenu}>
        <div className="menu row">
          <button onClick={store.uiState.hideMenu} className="menu-close-button"><FontAwesomeIcon icon="times" /></button>

          <div className="col-sm-12" onClick={(e)=>{e.stopPropagation();}}>
            <div className="row ">
              <div className="col-sm-12">
                <h3>{ selectedResult[selectedResult._datasource.mainColumnProperty].toUpperCase()}</h3>
              </div>
            </div>

            <div className="row ">
              <TabProvider tabs={tabs} onClick={this.handleTabProviderClick} selected={store.uiState.app.menu.selectedTab}/>
            </div>

          </div>

        </div>
      </div>
    );
  }
}


class CommandPanelLeft extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data, selected}= this.props;
    let elts = [];
    for (let i=0;i<data.length;i++){
      const elt = data[i];
      if (elt.type === 'COMMAND') continue;
      if (elt.hasOwnProperty('platform') && elt.platform !== store.platform) continue;
      if (elt.hasOwnProperty('datasource') && elt.datasource !== this.props.context._datasource.name) continue;
      
      elts.push(<MenuElement
        key={i}
        data={elt}
        onClick={this.props.onClick}
        handlerOn="onMouseOver"
        selected={selected != null ? (selected.caption === elt.caption) : false } />);
    }
    return (
      <div className="col-sm-6 menu-command-panel-left">
        {elts}
      </div>
    );
  }
}

class CommandPanelRight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data}= this.props;
    let elts = [];
    for (let i=0;i<data.length;i++){
      const elt = data[i];
      if (elt.hasOwnProperty('platform') && elt.platform != store.platform) continue;
      if (elt.hasOwnProperty('datasource') && elt.datasource !== this.props.context._datasource.name) continue;

      elts.push(<MenuElement key={i} data={data[i]} onClick={this.props.onClick} handlerOn="onClick" />);
    }
    return (
      <div className="col-sm-6 menu-command-panel-right">
        {elts.length > 0 ? elts : "Nothing here."}
      </div>
    );
  }
}

class MenuElement extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = (e) => {this.props.onClick(e, this.props.data)};
  }

  render() {
    const {data, selected} = this.props;
    let icons = {
      'CONTAINER':          (<FontAwesomeIcon icon="folder" />),
      'CONTAINER-SELECTED': (<FontAwesomeIcon icon="folder-open" />),
      'COMMAND':            (<FontAwesomeIcon icon="terminal" />),
      'COMMAND-SELECTED':   (<FontAwesomeIcon icon="terminal" />),
    };
    

    const selectedClass = selected ? 'arrow_box' : '';
    return (
      <div className="row">
        <div className={`col-sm-12 menu-item-${this.props.data.type.toLowerCase()} ${selectedClass}` } {...{[this.props.handlerOn]: this.handleClick}}>
          {icons[data.type + (selected ? "-SELECTED": "")]} {data.caption}
        </div>
      </div>
    );
  }
}


export default Menu;
