import React from 'react';

import PowershellRunner from './runner';
import SearchBox from './components/SearchBox';
import HostList from './components/HostList';


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
            <HostList data={this.state.searchResults}/>
          )}

        </div>
      </div>
    </div>);
  }
}
