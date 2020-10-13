import React from "react";
import fetch from 'node-fetch'
import marked from 'marked'
import "./PluginDetail.scss";
import PluginInstaller from "..";

export default class PluginDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onDownloadClick = this.onDownloadClick.bind(this);
  }

  onDownloadClick(){
    const {pluginInfos} = this.props;
    console.log('PLUGININFO',pluginInfos);
    console.log('onDownloadClick',this.props.onDownloadclick);
    console.log('props',this.props);
    this.props.onDownloadclick(pluginInfos);
  }
 

  renderInfos(){
    const {pluginInfos: infos} = this.props;
    
    return (
      <>
        <button className="btn btn-primary" onClick={this.onDownloadClick}>Download</button>
        <br/>
        Name: {infos.name}
        <br/>
        Version: {infos['dist-tags'].latest}
        <br/>
        HomePage: {infos.homepage}
        <br/>
        Readme:
        <br/>
        {infos.readme && (
          <div onClick={ e=>{e.preventDefault()}} dangerouslySetInnerHTML={{__html: marked(infos.readme)}} />
        )}
        
        
      </>
    )
  }

  render() {
    const {pluginInfos, downloadStatus} = this.props;
    return (
      <div className="row">
        <div className="col">
          <div>{downloadStatus}</div>
          {pluginInfos && this.renderInfos()}
        </div>
      </div>
    );
  }

}

