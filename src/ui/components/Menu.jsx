import React from 'react';
import './Menu.scss';
import { observer } from 'mobx-react'
import store from '../../store/RootStore'

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
        console.log('running command : ', elt.commands);
        store.runners.powershell.runTemplate(elt.commands[0], store.uiState.search.selectedResult);

        break;
      default:
    }
  }

  handleTabProviderClick(e, element){
    store.uiState.selectMenuTab(element.caption);
  }

  render() {
    const tabs = [
      {
        caption: "Action",
        content: (
          <div className="col-sm-12 ">
            <div className="row">
              <div className="col-sm-1">
                <button onClick={this.goBack} className="btn button "
                        disabled={this.state.dataLHistory.length === 0}>Up
                </button>
              </div>

            </div>
            <div className="row menu-container">
              <CommandPanelLeft data={this.state.dataL} selected={this.state.panelLeftSelection}
                                onClick={this.handlePanelLeftClick}/>
              <CommandPanelRight data={this.state.dataR} selected={this.state.panelRightSelection}
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
      <div className="menu row">
        <button onClick={store.uiState.hideMenu} className="menu-close-button">X</button>

        <div className="col-sm-12">
          <div className="row ">
            <div className="col-sm-12">
              <h3>{store.uiState.search.selectedResult.hostname.toUpperCase()}</h3>
            </div>
          </div>

          <div className="row ">
            <TabProvider tabs={tabs} onClick={this.handleTabProviderClick} selected={store.uiState.app.menu.selectedTab}/>
          </div>

        </div>

      </div>
    );
  }
}


class TabProvider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {tabs, selected}= this.props;
    let selectedTab;
    const elts = [];
    for (let i=0;i<tabs.length;i++){
      const tab = tabs[i];
      elts.push(
        <TabElement key={i} onClick={this.props.onClick} element={tab} selected={tab.caption === selected}/>
      );
      if (tab.caption === selected){ selectedTab = tab }
    }
    return (
      <div className="col-sm-12">
        <div className="row">
          <ul className="col-sm-12 nav nav-tabs">
            {elts}
          </ul>
        </div>
        <div className="row">
          {selectedTab.content}
        </div>

      </div>
    );
  }
}

class TabElement extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }
  handleClick = (e)=>{
    this.props.onClick(e, this.props.element);
  }
  render(){
    const {selected, element} = this.props;
    return (
      <li className="nav-item">
        <a className={"nav-link" + (selected ? " active" : "")} href="#"
           onClick={this.handleClick}>{element.caption}</a>
      </li>
    )
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
    const selected = this.props.selected ? 'arrow_box' : '';
    return (
      <div className="row">
        <div className={`col-sm-12 menu-item-${this.props.data.type.toLowerCase()} ${selected}` } {...{[this.props.handlerOn]: this.handleClick}}>
          {this.props.data.type.toLowerCase()} : {this.props.data.caption}
        </div>
      </div>
    );
  }
}


export default Menu;
