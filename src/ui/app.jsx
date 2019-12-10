import React from 'react';
import { observer } from 'mobx-react'
import store from '../store/RootStore'
import SearchBox from './components/SearchBox';
import HostList from './components/HostList';
import SplitPane from 'react-split-pane';
import CollapsiblePanel from './components/CollapsiblePanel';
import RunnerDebugConsole from './components/RunnerDebugConsole';
import Menu from './components/Menu';
import menuConfig from '../modules/menuConfig.js'

import './app.scss'


const APP_STATUS = {
  WAITING_FOR_SEARCH: 1,
  SEARCHING: 2,
  DISPLAYING_RESULTS: 3,
};


@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: APP_STATUS.WAITING_FOR_SEARCH,
      searchKeyword: '',
    };




    // this.handleChange = this.handleChange.bind(this)
    this.handleOnSearchClick = this.handleOnSearchClick.bind(this);
    this.handleSearchResultRowClick= this.handleSearchResultRowClick.bind(this);
  }

  handleOnSearchClick(keyword) {
    this.setState({ status: APP_STATUS.SEARCHING });

  }

  // handleChange(e) {
  //     this.setState({searchedText: e.target.value});
  // }
  //
  // handleSubmit(event) {
  //     this.props.onSearchClick(this.state.searchedText);
  //     event.preventDefault();
  // }
  handleSearchResultRowClick(e, data){
    console.log('displaying menu for ', data);
  }

  render() {
    const {uiState} = store;
    console.log('store',uiState);

    return (<div>

      {/*<RunnerDebugConsole history={store.runners.powershell.ps.history} />*/}
      <SplitPane split="horizontal" minSize={200} defaultSize={600} primary="second">

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <SearchBox />
            </div>

            {/*{(store.uiState.app.status === APP_STATUS.SEARCHING) && (*/}
            {/*  <div>Searching for {this.state.searchKeyword} ...</div>)}*/}
          </div>

          <div className="row">
            <div className="col-sm-12">
              {(uiState.app.status === APP_STATUS.DISPLAYING_RESULTS) && (
                <HostList
                  onClick={this.handleSearchResultRowClick}
                />
              )}

            </div>
          </div>
          {uiState.app.menu.visible && (
            <Menu data={menuConfig} />

          )}
        </div>
        <div className="console-panel">
          <RunnerDebugConsole history={store.runners.powershell.ps.history} />
        </div>
      </SplitPane>
    </div>);
  }
}

