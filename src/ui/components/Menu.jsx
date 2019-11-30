import React from 'react';
import './Menu.css';
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
    console.log('goback, history will become : ',{
      dataL: historyElt.dataL,
      dataR: historyElt.dataR,
      panelLeftSelection: historyElt.panelLeftSelection,
      dataLHistory: newHistory,
    });
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
        console.log('ELT=',elt);
        this.setState({
          dataL: this.state.dataR,
          dataR: elt.children,
          panelLeftSelection: elt,
        });
        break;
      case 'COMMAND':
        console.log('running command : ', elt.commands);
        break;
      default:
    }
  }

  render() {
    return (
      <div>
        <div className="menu-container row">
          <div className="col-sm-1">
            <button onClick={this.goBack} disabled={this.state.dataLHistory.length === 0}>Up</button>
          </div>
        </div>
        <div className="menu-container row">
          <PanelLeft data={this.state.dataL} selected={this.state.panelLeftSelection} onClick={this.handlePanelLeftClick}/>
          <PanelRight data={this.state.dataR} selected={this.state.panelRightSelection} onClick={this.handlePanelRightClick}/> }
        </div>
      </div>
    );
  }
}

class PanelLeft extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data, selected}= this.props;
    console.log('data=',data);
    console.log('selected=',selected);
    let elts = [];
    for (let i=0;i<data.length;i++){
      const elt = data[i];
      elts.push(<MenuElement
        key={i}
        data={elt}
        onClick={this.props.onClick}
        selected={selected != null ? (selected.caption === elt.caption) : false } />);
    }
    return (
      <div className="col-sm-6">
        {elts}
      </div>
    );
  }
}

class PanelRight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data}= this.props;
    let elts = [];
    for (let i=0;i<data.length;i++){
      elts.push(<MenuElement key={i} data={data[i]} onClick={this.props.onClick} />);
    }
    return (
      <div className="col-sm-6">
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
    const selected = this.props.selected ? 'menu-item-selected' : '';
    return (
      <div className={`menu-item-${this.props.data.type.toLowerCase()} ${selected}` } onClick={this.handleClick}>
        {this.props.data.type.toLowerCase()} : {this.props.data.caption}
      </div>
    );
  }
}


export default Menu;
