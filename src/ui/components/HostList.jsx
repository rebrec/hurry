import React from 'react';
import { observer } from 'mobx-react'
import store from '../../store/RootStore'
import './HostList.scss'

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
      // tbodyElements.push(<HostListLine key={i}  element={r} columns={columns} />);
      tbodyElements.push(<HostListLine key={i} selected={r === store.uiState.search.selectedResult} element={r} columns={columns} />);
    }
    return <tbody>{tbodyElements}</tbody>;
  }

  render() {
    const search = store.uiState.search;
    return (
      <div className="row">

        { (!search.results.length === 0) ? (
            <span>No result found for {store.uiState.currentSearch}.</span>
         ) : (
          <table className="table col-10 offset-1">
            {this.renderHeader()}
            {this.renderBody()}
          </table>
        )}

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
    store.uiState.selectHost(this.props.element);
  }
  render() {
    const trElements = [];
    const {columns, element, selected}= this.props;
    for (let j = 0; j < columns.length; j++) {
      const col = columns[j];
      const colValue = element[col.property];
      trElements.push(<td key={colValue}>{colValue}</td>);
    }
    return (

      <tr onClick={this.handleClick} className={selected ? "hostlistline-selected":""}>{trElements}</tr>
    );
  }
}


export default HostList;
