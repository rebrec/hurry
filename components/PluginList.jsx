import React from "react";
import "./PluginList.scss";

export default class PluginList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPluginList(){
    const res = [];
    const { plugins } = this.props;
    for (let i=0;i<plugins.length;i++){
        const pluginName = plugins[i];
        const cssSelected = pluginName === this.props.selected ? ' plugin-list-line-selected': '';
        res.push(
          <li className={"plugin-list-line" + cssSelected} key={"available-plugin-" + i} onClick={this.props.onClick.bind(this, pluginName)}>
            {pluginName}
          </li>
        )
    }
    return res;
}

  render() {
    return (
      <>
        <ul className="plugin-list">{ this.renderPluginList() }</ul>
      </>
    );
  }

}

