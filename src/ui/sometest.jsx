import React from 'react';
import { observer } from 'mobx-react'
import store from '../store/RootStore'

@observer
class SomeTest extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    store.uiState.setSearchedText(e.target.value);
  }

  handleSubmit(event) {
    // this.props.onSearchClick(this.state.searchedText);
    event.preventDefault();
  }
  
  render() {
      //debugger;
    return (
      <div className="row">
        {/*<div className="col-sm-1"/>*/}
          <form className="col-sm-12" onSubmit={this.handleSubmit}>
            <div className="row">
              <input
                className="col-sm-10"
                name="searchField"
                value={ store.uiState.searchedText }
                placeholder="Enter Keyword (Computer, User, etc.)"
                onChange={ this.handleChange }
              />
              <input className="col-sm-2 btn" type="submit" value="Submit" />
            </div>
          </form>
        {/*<div className="col-sm-1"/>*/}
      </div>
    );
  }

}

export default SomeTest;