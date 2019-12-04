import React from 'react';
import { observer } from 'mobx-react'
import store from '../../store/RootStore'

@observer
class HostList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      { columnName: 'Hostname', property: 'hostname' },
      { columnName: 'Username', property: 'username' },
      { columnName: 'Something', property: 'something' },
    ];
  }

  renderHeader() {
    const elts = [];
    const columns = this.columns;
    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      elts.push(<th key={col.columnName}>{col.columnName}</th>);
    }
    return <thead><tr>{elts}</tr></thead>;
  }

  renderBody() {
    const tbodyElements = [];
    const columns = this.columns;
    const results = store.uiState.search.results;

    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      console.log('rendering line with data', r);
      tbodyElements.push(<HostListLine key={i} store={store} element={r} columns={columns} />);
    }
    return <tbody>{tbodyElements}</tbody>;
  }

  render() {
    console.log("blah")
    const search = store.uiState.search;
    return (
      <div className="row">
        <div className="col-sm-1"/>
        { (!search.results.length === 0) ? (
            <span>No result found for {store.uiState.currentSearch}.</span>
         ) : (
          <table className="table col-sm-10">
            {this.renderHeader()}
            {this.renderBody()}
          </table>
        )}
        <div className="col-sm-1"/>
      </div>
    );
  }
}

@observer
class HostListLine extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    const {uiState} = this.props.store;
    uiState.selectHost(this.props.element);
  }
  render() {
    const columns = this.props.columns;
    const trElements = [];
    const elt = this.props.element;
    for (let j = 0; j < columns.length; j++) {
      const col = columns[j];
      const colValue = elt[col.property];
      trElements.push(<td key={colValue}>{colValue}</td>);
    }
    return (
      <tr onClick={this.handleClick}>{trElements}</tr>
    );
  }
}


export default HostList;
