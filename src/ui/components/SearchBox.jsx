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
                className="form-control col-5 "
                name="searchField"
                value={search.text}
                placeholder="Enter Keyword (Computer, User, etc.)"
                onChange={this.handleChange}
              />
              <DatasourceButton />
            </div>
          </div>
        </div>
      </form>
    )
      ;
  }

}

class DatasourceButton extends React.Component{
  constructor(props) {
    super(props);    
  }

  renderDropDown(id){
    return (
      <div class="dropdown-menu" aria-labelledby={id}>
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    );

  }

  render(){
    return (
      <div class="btn-group ml-3 col-3">
        <button type="button" className="btn btn-primary">Action</button>
        <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        {this.renderDropDown("dropdownDatasourceButton")}
      </div>
    )
  }
}