import React from 'react';
import './EditableMenu.scss';
import { observer } from 'mobx-react'
import store from '../../store/RootStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const menuIcons = {
  'CONTAINER':          (<FontAwesomeIcon icon="folder" />),
  'CONTAINER-SELECTED': (<FontAwesomeIcon icon="folder-open" />),
  'COMMAND':            (<FontAwesomeIcon icon="terminal" />),
  'COMMAND-SELECTED':   (<FontAwesomeIcon icon="terminal" />),
};

@observer
class EditableMenuElement extends React.Component {
  constructor(props) {
    super(props);
    const {element} = this.props;
    this.isContainer = element.properties.type === "CONTAINER"
    this.isRoot = (this.isContainer && element.parent === null);
    this.state = {
      collapsed: this.isRoot === false
    };
    this.toggleContainer = this.toggleContainer.bind(this);
    this.onElementClick = this.onElementClick.bind(this);
  }

  onElementClick(e){
    this.props.onClick(e, this);
    this.setState({collapsed: false});
  }

  toggleContainer(e, elt){
    this.setState({collapsed: !this.state.collapsed});
  }
  renderChildren(){
    const {element} = this.props;
    const children = [];
    for (let i=0; i<element.children.length;i++){
      const child = element.children[i];
      children.push(<EditableMenuElement key={child.properties.caption + i} element={child} onClick={this.props.onClick} selected={this.props.selected} />);
    }
    return children;
  }

  render() {
    const {element} = this.props;
    const {properties} = element;
    
    const icon = menuIcons[properties.type];
    
    const res = [];

    let cssClass = "editablemenu-" + properties.type.toLowerCase();
    cssClass += this.props.selected === element ? " editablemenu-selected" : "";
    cssClass += element.properties.locked === true ? " editablemenu-locked" : "";

    if (!this.isRoot){
      res.push(
        <li key={"li" + properties.caption}  className={cssClass}>
          <span onClick={this.isContainer ? this.toggleContainer : undefined }>{icon}</span> <span onClick={this.onElementClick}>{properties.caption}</span>
        </li>
      );
    }
    if (this.isContainer && !this.state.collapsed){
      res.push(
        <ul key={"ul" + properties.caption} className="editablemenu-children">
          {this.renderChildren()}
        </ul>
      );
    }

    return (
      <>
        {res}
      </>
    )
  }
}


export default EditableMenuElement;
