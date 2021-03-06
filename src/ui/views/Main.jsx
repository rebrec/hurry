import React from 'react';
import { observer } from 'mobx-react'
import store from '../../store/RootStore'
import SearchBox from '../components/SearchBox';
import HostList from '../components/HostList';
import SplitPane from 'react-split-pane';
import RunnerDebugConsole from '../components/RunnerDebugConsole';
import HistoryViewer from '../components/HistoryViewer';
import Menu from '../components/Menu';
import ModalDialog from '../components/ModalDialog';



import './Main.scss'


const APP_STATUS = {
  WAITING_FOR_SEARCH: 1,
  SEARCHING: 2,
  DISPLAYING_RESULTS: 3,
};


@observer
export default class Main extends React.Component {
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
    const menuConfig = store.contextMenu.getMenu();
    console.log('store',uiState);

    return (<div>

      {/*<RunnerDebugConsole history={store.runners.powershell.ps.history} />*/}
      
      {/* <button onClick={_=>{store.uiState.setCurrentView('Configuration')}}>Configuration</button>
       */}
      <SplitPane split="vertical" primary="second" minSize={300} >

        <SplitPane split="horizontal" minSize={5} defaultSize={600} onChange={ size => { store.uiState.setDebuggerConsoleHeight(window.innerHeight - size)}}>

          <div className="container-fluid main-hostlist-area">
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
              <ModalDialog onClose={uiState.hideMenu}>
                  <Menu data={menuConfig} context={ store.uiState.search.selectedResult } />
              </ModalDialog> 
            )}
            </div>
          <div className="container-fluid console-panel">
            <div className = "row">
              <div className="col-sm-12">
                <RunnerDebugConsole shellManager={store.shellManager} />
              </div>
            </div>
          </div>
        </SplitPane>
        <div className="container-fluid">
            <HistoryViewer />
        </div>
      </SplitPane>
    </div>);
  }
}

