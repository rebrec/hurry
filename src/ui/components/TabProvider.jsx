import React from 'react';
import './Menu.scss';
import { observer } from 'mobx-react'
import store from '../../store/RootStore'


@observer
class TabProvider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {tabs, selected}= this.props;
    let selectedTab = {content:(<div></div>)};
    const elts = [];
    for (let i=0;i<tabs.length;i++){
      const tab = tabs[i];
      elts.push(
        <TabElement key={i} onClick={this.props.onClick} element={tab} selected={tab.caption === selected}/>
      );
      if (tab.caption === selected){ selectedTab = tab }
    }
    return (
      <>
        <div className="row">
          <ul className="col-sm-12 nav nav-tabs">
            {elts}
          </ul>
        </div>
        <div className="row">
          {selectedTab.content}
        </div>
      </>
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
export default TabProvider;
