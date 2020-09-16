import React from 'react';
import { observer } from 'mobx-react'
import store from '../store/RootStore'

@observer
export default class Viewer extends React.Component {
  render() {
    const views = store.uiState.app.views;
    const view = views.available.get(views.current);
    
    return React.createElement(view);
  }
}

