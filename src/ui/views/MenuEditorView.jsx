import React from 'react';
import { observer, } from 'mobx-react'
import Button from 'react-bootstrap/Button';
import store from '../../store/RootStore'
import EditableMenuElement from '../components/EditableMenu';
import { MenuItemContainer } from '../../core/helpers/MenuItems'
import { MenuItemDetail, MenuItemDetailToolBar } from '../components/MenuItemEditor';
import Api from "../../core/api"
import { writeFile } from "fs"
import './MenuEditorView.scss'
import api from '../../core/api';



@observer
export default class MenuEditorView extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedElement: null,
      editableMenu: MenuItemContainer.fromObject(store.menuConfig) || {}
    }
    this.onMenuElementClick = this.onMenuElementClick.bind(this);
    this.saveMenuAs = this.saveMenuAs.bind(this);
  }

  onMenuElementClick(e, elt){
    const { element } = elt.props
    console.log('onmenuelementclick ', element);
    if (this.state.selectedElement === element){
      this.setState({ selectedElement: null });
    } else {
      this.setState({ selectedElement: element });
    }
  }

  saveMenuAs(){
    const filePath = api.dialog.showSaveDialogSync({
      title: "Save this Menu as",
      filters:["*.js","*.json"]
    });
    console.log('saving menu as ', filePath);
    const data = JSON.stringify(this.state.editableMenu.toObject());
    if (!filePath) return;
    writeFile(filePath, data, (err) => {
      if (err) throw err;
      console.log('The file has been saved to ' + filePath + ' !');
    });
  }

  render() {
    const {uiState} = store;
    console.log('store',uiState);
    const context = {
      _datasource: {
        mainColumnProperty: "hostname",
        pingableProperty: "ip",
      },
      hostname:"somehost",
      ip:"127.0.0.1"
    };
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <button onClick={_=> {store.uiState.setCurrentView('Main')}}>Main</button>
            <button onClick={_=> {store.uiState.setCurrentView('Configuration')}}>Configuration</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Button variant="primary" onClick={this.saveMenuAs} >Save Menu As</Button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-7">
            <EditableMenuElement 
              onClick={ this.onMenuElementClick}
              element={this.state.editableMenu} 
              context={ context } 
              collapsed={false}
              selected={this.state.selectedElement}
            />
          </div>
          <div className="col-sm-5">
            <MenuItemDetailToolBar element={this.state.selectedElement} />
            <MenuItemDetail element={this.state.selectedElement} />
          </div>
        </div>
      </div>
    );
  }
}

