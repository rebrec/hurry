import React from 'react';
import { observer } from 'mobx-react'
import store from '../store/RootStore'
import config from '../config'
import { getFiles } from '../core/helpers/helpers'
import { basename } from 'path'
import $ from "jquery";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faFolder, faFolderOpen, faTerminal, faChevronLeft, faTimes} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faFolder, faFolderOpen, faTerminal, faChevronLeft, faTimes)
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

