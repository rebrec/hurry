import React from 'react';
import { observer } from 'mobx-react'
import store from '../../store/RootStore'
import Menu from '../components/Menu';
import MenuItemDetail from '../components/MenuItemEditor';
import menuConfig from '../../modules/menuConfig.js'

import './MenuEditor.scss'


@observer
export default class MenuEditor extends React.Component {
  constructor(props) {
    super(props);
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
          <div className="col-sm-7">
            <Menu data={menuConfig} context={ context } />
          </div>
          <div className="col-sm-5">
            <MenuItemDetail item={""} />
          </div>
        </div>
      </div>
    );
  }
}

