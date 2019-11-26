import React from 'react';

import PowershellRunner from './runner';
import SearchBox from './components/SearchBox';


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
    this.setState({ searchKeyword: keyword });

    let a= this.runner.run(`$dummy.search('${keyword}')`);
    console.log(a);
      // .then( res => {
      //   console.log(res);
      // });
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
      <SearchBox onSearchClick={this.handleOnSearchClick} />

      {(this.state.status === APP_STATUS.SEARCHING) ? (
        <div>Searching for {this.state.searchKeyword} ...</div>) : (null)}

    </div>);
  }
}
