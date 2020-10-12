import React from "react";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./PluginSearchBar.scss";

export default class PluginSearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.state = {text:""};
    this.onSearch = this.onSearch.bind(this)
  }

  handleChange(e) {
    this.setState({text:e.target.value});
  }

  onSearch(e){
    this.props.onSearch(this.state.text);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.onSearch();
      e.preventDefault();
    }
  }

  render() {
    return (
      <>
        <div className="row no-gutters">
            <div className="col">
                  <input 
                    className="form-control border-secondary border-right-0 rounded-0" 
                    placeholder="Enter Keyword" 
                    type="search" 
                    value={this.state.text} 
                    id="search" 
                    onChange={this.handleChange}
                    onKeyPress={ this.onKeyPress }
                  />
            </div>
            <div className="col-auto">
                  <button className="btn btn-outline-secondary border-left-0 rounded-0 rounded-right" type="button" onClick={this.onSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>                  
            </div>
        </div>
        { this.props.status === 'LOADING' && (
          <div className="row"><div className="col">Loading...</div></div>
        )}
      </>
    );
  }

}
