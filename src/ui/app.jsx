import React from 'react';

import PowershellRunner from '../modules/runner';
import SearchBox from './components/SearchBox';
import HostList from './components/HostList';
import CollapsiblePanel from './components/CollapsiblePanel';
import RunnerDebugConsole from './components/RunnerDebugConsole';

import './app.css'


const APP_STATUS = {
  WAITING_FOR_SEARCH: 1,
  SEARCHING: 2,
  DISPLAYING_RESULTS: 3,
};


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: APP_STATUS.WAITING_FOR_SEARCH,
      searchKeyword: '',
    };

    this.runner = new PowershellRunner();


    // this.handleChange = this.handleChange.bind(this)
    this.handleOnSearchClick = this.handleOnSearchClick.bind(this);
    this.handleSearchResultRowClick= this.handleSearchResultRowClick.bind(this);
  }

  handleOnSearchClick(keyword) {
    this.setState({ status: APP_STATUS.SEARCHING });

    this.runner.run(`$dummy.search('${keyword}')`)
      .then((res) => {
        console.log('res = ', res);
        this.setState({
          status: APP_STATUS.DISPLAYING_RESULTS,
          searchKeyword: keyword,
          searchResults: res,
        });
      });
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
    return (<div>
      <div className="row">
        <div className="col-sm-12">
          <SearchBox onSearchClick={this.handleOnSearchClick}/>
        </div>

        {(this.state.status === APP_STATUS.SEARCHING) && (
          <div>Searching for {this.state.searchKeyword} ...</div>)}
      </div>
      <div className="row">
        <div className="col-sm-12">
          {(this.state.status === APP_STATUS.DISPLAYING_RESULTS) && (
            <HostList
              onClick={this.handleSearchResultRowClick}
              keyword={this.state.searchKeyword}
              data={this.state.searchResults}
            />
          )}

        </div>
        <CollapsiblePanel position="bottom">
          <RunnerDebugConsole history={this.runner.ps.history} />
        </CollapsiblePanel>
      </div>
    </div>);
  }
}
