import React from "react";
import { observer } from "mobx-react";
import store from "../../store/RootStore";
import "./SearchBox.scss";

@observer
export default class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  handleChange(e) {
    store.uiState.setSearchedText(e.target.value);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      store.uiState.startSearch();
      e.preventDefault();
    }
  }

  render() {
    const search = store.uiState.search;
    return (
      <form onSubmit={ _=> {return false}}>
        <div className="row form-group" style={{height: "160px"}}>
          <div className="col-8 offset-2 align-self-center ">
            <div className="form-row">
              <input
                className="form-control col-5 "
                name="searchField"
                value={search.text}
                placeholder="Enter Keyword (Computer, User, etc.)"
                onChange={this.handleChange}
                onKeyPress={ this.onKeyPress }

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

@observer
class DatasourceButton extends React.Component{
  constructor(props) {
    super(props);    
  }

  onButtonClick(e){
    store.uiState.startSearch();
    e.preventDefault();
  }

  onDropDownClick(datasource){
    store.uiState.setDatasource(datasource);
  }

  renderDropDown(id){
    const datasources = store.datasourceManager.getDatasourcesAvailable();
    const items = [];
    for (const [i, datasource] of Object.entries(datasources)) {
      const caption = datasource.getName();
      items.push(<a className="dropdown-item" key={i} onClick={this.onDropDownClick.bind(this, datasource)} href="#">{caption}</a>);
    }
    return (
      <div className="dropdown-menu" aria-labelledby={id}>
        {items}
      </div>
    );

  }

  render(){
    const { datasource } = store.uiState.app;
    return (
      <div className="btn-group ml-3 col-3">
        <button type="button" className="btn btn-primary" onClick={this.onButtonClick}>{ datasource.getName() }</button>
        <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        {this.renderDropDown("dropdownDatasourceButton")}
      </div>
    )
  }
}