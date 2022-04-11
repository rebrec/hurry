import React from 'react'
window.React1 = React;
import { observer } from 'mobx-react'
import api from '../core/api'
const { store } = api
import { getFiles } from '../core/helpers/helpers'
import { basename } from 'path'
import $ from "jquery";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faFolder, faFolderOpen, faTerminal, faChevronLeft, faChevronRight, faTimes, faDesktop, faReply } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faFolder, faFolderOpen, faTerminal, faChevronLeft, faChevronRight, faTimes, faDesktop, faReply )
// import ViewManager from '../core/ViewManager'

import { APP_STATUS } from '../store/UiState'

import Viewer from './Viewer'
import Main from './views/Main'
import Configuration from './views/Configuration'
import MenuEditorView from './views/MenuEditorView'
import ModalDialog from './components/ModalDialog'

import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    
    store.uiState.addView('Main', Main);
    store.uiState.addView('Configuration', Configuration);
    store.uiState.addView('MenuEditorView', MenuEditorView);
    if (api.config.isValid) {
      store.uiState.setCurrentView(api.config.debug.defaultView);
    } else {
      store.uiState.setCurrentView('Configuration');
    }

  }

  render() {
    const {uiState} = store;
    const { status } = uiState.app;
    const ModalView = uiState.getModalView();
    return (<>
      <ReactNotifications />
      {ModalView && (
        <ModalDialog onClose={uiState.hideModal} zIndex="50">
          <ModalView />
        </ModalDialog> 
      )}
      {(status === APP_STATUS.INITIALIZING) && (
        <h1>Loading...</h1>
      )}
      {(status !== APP_STATUS.INITIALIZING) && (
        <Viewer/>
      )}
    </>);
  }
}

