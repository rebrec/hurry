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
      tbodyElements.push(<HostListLine key={i} onClick={this.props.onClick} element={d} columns={columns} />);
    }
    return <tbody>{tbodyElements}</tbody>;
  }

  render() {
    console.log(`data = ${JSON.stringify(this.props.data)}`);
    return (
      <div className="row">
        <div className="col-sm-1"/>
        { (!this.props.data || !this.props.data.length || this.props.data.length === 0) ? (
            <span>No result found for {this.props.keyword}.</span>
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

class HostListLine extends React.Component {
  constructor(props) {
    super(props);
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
      <tr onClick={(e) => {this.props.onClick(e, this.props.element)}}>{trElements}</tr>
    );
  }
}


export default HostList;
