import React from 'react';


export default class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { searchedText: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ searchedText: e.target.value });
  }

  handleSubmit(event) {
    this.props.onSearchClick(this.state.searchedText);
    event.preventDefault();
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-1"/>
          <form className="col-sm-10" onSubmit={this.handleSubmit}>
            <div className="row">
              <input
                className="col-sm-10"
                name="searchField"
                value={ this.state.searchedText }
                placeholder="Enter Keyword (Computer, User, etc.)"
                onChange={ this.handleChange }
              />
              <input className="col-sm-2" type="submit" value="Submit" />
            </div>
          </form>
        <div className="col-sm-1"/>
      </div>
    );
  }

}

