import React from 'react';
import { observer } from 'mobx-react'
import store from '../../store/RootStore'
import './Configuration.scss'
import Api from "../../core/api"
// import {remote} from "electron"
// const Api = remote.require("./core/api");
import Form from "react-jsonschema-form";
import schema from "../../modules/config-schema"
import config from "../../config"
import { saveConfig } from "../../core/helpers/helpers"

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

  onSubmitted(data){
    saveConfig(data.formData);
    Api.reloadBrowserWindow();

  }

  render() {

    const log = (type) => console.log.bind(console, type);

    return (
        <div className="container-fluid">
          <div className="row">
              <div className="col-sm-12">
                { config.isValid ? 
                  (
                    <>
                      <button onClick={_=>{store.uiState.setCurrentView('Main')}}>Main</button>
                      <button onClick={_=>{store.uiState.setCurrentView('MenuEditorView')}}>Edit Menu</button>
                    </>
                  ) : (
                    <h1>First Run Configuration</h1>               
                  )
                }
              </div>
          </div>
            
          <div className="row">
            <div className="col-sm-12">
              <Form 
                schema={schema}
                formData={config}
                onSubmit={this.onSubmitted}
                onError={log("errors")} 
              />
            </div>
          </div>
        </div>);
  }
}

