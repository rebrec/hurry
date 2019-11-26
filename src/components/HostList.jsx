import React from 'react';

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
    const data = this.props.data;

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const trElements = [];
      for (let j = 0; j < columns.length; j++) {
        const col = columns[j];
        const colValue = d[col.property];
        trElements.push(<td key={colValue}>{colValue}</td>);
      }
      tbodyElements.push(<tr>{trElements}</tr>);
    }
    return <tbody>{tbodyElements}</tbody>;
  }

  render() {
    console.log(`data = ${JSON.stringify(this.props.data)}`);
    return (
      <div className="row">
        <div className="col-sm-1"/>
        <table className="table col-sm-10">
          {this.renderHeader()}
          {this.renderBody()}
        </table>
        <div className="col-sm-1"/>
      </div>
    );
  }
}

class HostListLine extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}


export default HostList;
