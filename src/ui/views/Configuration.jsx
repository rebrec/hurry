import React from 'react';
import { observer } from 'mobx-react'
import store from '../../store/RootStore'
import './Configuration.scss'


const APP_STATUS = {
  WAITING_FOR_SEARCH: 1,
  SEARCHING: 2,
  DISPLAYING_RESULTS: 3,
};



export default class Configuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-sm-12">
                  <button onClick={_=>{store.uiState.setCurrentView('Main')}}>Main</button>
                    configuration
                </div>
            </div>
        </div>);
  }
}

