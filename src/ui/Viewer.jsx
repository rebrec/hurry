import React from 'react';
import { observer } from 'mobx-react'
import store from '../store/RootStore'

@observer
export default class Viewer extends React.Component {
  render() {
    console.log('STORE=',store);
    const views = store.uiState.app.views;
    const view = views.available.get(views.current);
    
    console.log('view = ', view);
    return React.createElement(view);
  }
}

