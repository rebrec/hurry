import React from "react";
import { observer } from "mobx-react";
import store from "../../store/RootStore";
import "./SearchBox.scss";

@observer
export default class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    store.uiState.setSearchedText(e.target.value);
  }

  handleSubmit(event) {
    //this.props.onSearchClick(this.state.searchedText);
    store.uiState.startSearch();
    event.preventDefault();
  }

  render() {
    const search = store.uiState.search;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row form-group" style={{height: "160px"}}>
          <div className="col-8 offset-2 align-self-center ">
            <div className="form-row">
              <input
                className="form-control col-9 "
                name="searchField"
                value={search.text}
                placeholder="Enter Keyword (Computer, User, etc.)"
                onChange={this.handleChange}
              />
              <button type="button"
                      class="btn btn-primary col mx-3 dropdown-toggle"
                      id="dropdownDatasourceButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
              >Search</button>
              <div class="dropdown-menu" aria-labelledby="dropdownDatasourceButton">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
      ;
  }

}

