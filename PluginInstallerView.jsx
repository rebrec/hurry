
const PluginInstaller = require('./PluginInstaller')
import PluginSearchBar from './components/PluginSearchBar'
// import search from 'libnpmsearch'
import React from 'react';
import { observer } from 'mobx-react'
import './PluginInstallerView.scss'

export default function (api){ 
    return class PluginInstallerView extends React.Component {
        state = {availablePlugins:[]}

        constructor(props) {
            super(props);
            this.trySearch = this.search.bind(this);
        }

        onDownloadPackageButtonClick(pluginName){
            console.log('PluginInstaller.downloadNpmPackage', pluginName)
            PluginInstaller.downloadNpmPackage(pluginName)
            .then(filename => {
                return PluginInstaller.installNpmPackage(filename, api.config.pluginsPath);
            })
            .then(filename => {
                console.log('Package Installed to', api.config.pluginsPath);
            })
        }

        search(){
            PluginInstaller.searchPlugin()
            .then(res =>{
                this.setState({availablePlugins:res});
            })
            // const keyword = '';
            // search('keywords:hurry-admin-plugin ' + keyword)
            // .then(res=>{
            //     console.log("RESULT:", res);
            // });
        }

        renderPluginList(){
            const res = [];
            const { availablePlugins } = this.state;
            for (let i=0;i<availablePlugins.length;i++){
                const pluginName = availablePlugins[i];
                res.push(<li key={"available-plugin-" + i}>
                    <button type="button" className="btn btn-primary" onClick={this.onDownloadPackageButtonClick.bind(this, pluginName)}></button>
                    {pluginName}
                </li>)
            }
            return res;
        }

        render() {

            return (
                <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                    <h1>Plugin Installer</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <PluginSearchBar onSearch={text=>{console.log('Search Text', text)}}/>

                        <button type="button" className="btn btn-primary" onClick={this.search}>Get Plugin List</button>
                        <ul>{ this.renderPluginList() }</ul>
                    </div>
                    <div className="col-9"></div>
                </div>
                </div>);
        }
    }
}


  


  