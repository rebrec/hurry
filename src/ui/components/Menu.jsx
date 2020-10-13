import React from 'react';
import './Menu.scss';
import { observer } from 'mobx-react'
import TabProvider from './TabProvider'
import api from '../../core/api'
const {config, store} = api
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
    this.handleMenuHistoryLinkClick = this.handleMenuHistoryLinkClick.bind(this);
    
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

  handleMenuHistoryLinkClick(e, element){
    console.log('laaallll');
    const {menustate, history} = element;
    this.setState({
      dataL: menustate.dataL,
      dataR: menustate.dataR,
      panelLeftSelection: menustate.panelLeftSelection,
      dataLHistory: history,
    });
  }

  genHistoryTree(){
    if (this.state.dataLHistory.length === 0) return;
    const history = this.state.dataLHistory;
    const elts = [];
    for (let i=0;i<history.length;i++){
      const elt = history[i];
      const newHistory = history.slice(0,i);
      elts.push(<FontAwesomeIcon key={'f'+ i} icon="chevron-right" />)
      elts.push(<MenuHistoryLink key={'l' + i} menustate={elt} history={newHistory} onClick={this.handleMenuHistoryLinkClick} />)
    }
    return elts
  }

  render() {
    const selectedResult = this.props.context;
    const leftPanelMouseHandlerType = config.menu.submenuShowOnClick ? "onClick" : "onMouseOver"
    // const tree = this.genHistoryTree();
    const tabs = [
      {
        caption: "Action",
        content: (
          <div className="col-sm-12 ">
            <div className="row">
              <div className="col-sm-1">
                {/* <button onClick={this.goBack} className="btn button "
                        disabled={this.state.dataLHistory.length === 0}>
                          <FontAwesomeIcon icon="chevron-left" />
                </button> */}
              </div>
              <div className="col-sm-11">
              
                  <ul className="list-inline">
                    <li className="list-inline-item">/</li>
                    {this.genHistoryTree()}
                  </ul>

              </div>

            </div>
            <div className="row menu-container">
              <CommandPanel data={this.state.dataL} 
                            context={this.props.context}
                            selected={this.state.panelLeftSelection}
                            onClick={this.handlePanelLeftClick}
                            extraclass="menu-command-panel-left"
                            handlerType={leftPanelMouseHandlerType}
              />
              <CommandPanel data={this.state.dataR}
                            context={this.props.context}
                            selected={this.state.panelRightSelection}
                            onClick={this.handlePanelRightClick}
                            extraclass="menu-command-panel-right"
                            handlerType="onClick"
              />
            </div>
          </div>
        )
      },
      {
        caption: "Favorites",
        content: (
          <div className="col-sm-12 ">Rien n'est encore défini
          </div>
        )
      }
    ];
    return (
      <>
        <div className="row ">
          <div className="col-sm-12">
            <h3>{ selectedResult[selectedResult.datasource.mainColumnProperty].toUpperCase()}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <TabProvider tabs={tabs} onClick={this.handleTabProviderClick} selected={store.uiState.app.menu.selectedTab}/>
          </div>
        </div>
      </>
    );
  }
}


class MenuHistoryLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = (e) => {this.props.onClick(e, this.props)};
  }

  render() {
    const state = this.props.menustate;
    const selection = state.panelLeftSelection;

    return (
      <li className="list-inline-item" ><a href="#" onClick={this.handleClick}>{selection.caption}</a></li>
    );
  }
}
// elts.push(<MenuHistoryLink elelement={elt} />)
//     this.setState({
//       dataL: historyElt.dataL,
//       dataR: historyElt.dataR,
//       panelLeftSelection: historyElt.panelLeftSelection,
//       dataLHistory: newHistory,
//     });

class CommandPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data, extraclass, selected, handlerType, context}= this.props;
    const handlerList = ['onClick', 'onMouseOver'];
    if (handlerList.indexOf(handlerType)<=-1) {
      return (
        <div>
          {"Valid Handler types are: " + JSON.stringify(handlerList)}
        </div>
      )
    }
    let elts = [];
    for (let i=0;i<data.length;i++){
      const elt = data[i];
      if (elt.hasOwnProperty('datasources')) {
        if ((elt.datasources.length >0) && elt.datasources.indexOf(context.datasource.name)<0) continue; 
      }
      if (elt.hasOwnProperty('platform') && elt.platform != store.platform) continue;
      if (elt.hasOwnProperty('datasource') && elt.datasource !== this.props.context.datasource.name) continue;

      elts.push(<MenuElement 
        key={i} 
        data={data[i]} 
        onClick={this.props.onClick}
        handlerOn={handlerType}
        selected={selected != null ? (selected.caption === elt.caption) : false } />);
    }
    return (
      <div className={"col-sm-6 " + extraclass}>
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
