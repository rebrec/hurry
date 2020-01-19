import React from 'react';
import { observer } from 'mobx-react'
import store from '../store/RootStore'
import config from '../config'
import { getFiles } from '../core/helpers'
import { basename } from 'path'
import $ from "jquery";
// import ViewManager from '../core/ViewManager'

import Viewer from './Viewer'
import Main from './views/Main'
import Configuration from './views/Configuration'

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    store.uiState.addView('Main', Main);
    store.uiState.addView('Configuration', Configuration);
    
    store.uiState.setCurrentView('Main');

  }

  render() {
    const {uiState} = store;
    console.log('store',uiState);

    return (<Viewer/>);
  }
}

