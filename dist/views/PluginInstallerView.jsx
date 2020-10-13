
const PluginInstaller = require('../PluginInstaller')
import PluginSearchBar from '../components/PluginSearchBar'
import PluginList from '../components/PluginList'
import PluginDetail from '../components/PluginDetail'
// import search from 'libnpmsearch'
import React from 'react';
import { observer } from 'mobx-react'
import './PluginInstallerView.scss'

export default function (api){ 
    return class PluginInstallerView extends React.Component {
        state = {availablePlugins:[]}

        constructor(props) {
            super(props);
            this.state = {
                status: "READY",
                availablePlugins: [],
                downloadStatus: "",
                pluginInfos: null
            };
            this.onSearch = this.onSearch.bind(this);
            this.onSelectPlugin = this.onSelectPlugin.bind(this);
            this.onDownloadPackageButtonClick = this.onDownloadPackageButtonClick.bind(this);
        }

        onDownloadPackageButtonClick(pluginInfos){
            const {pluginName} = pluginInfos;
            console.log('PluginInstaller.downloadNpmPackage', pluginName)
            this.setState({downloadStatus: "Downloading"});
            PluginInstaller.downloadNpmPackage(pluginName)
            .then(filename => {
                this.setState({downloadStatus: "Installing"});
                return PluginInstaller.installNpmPackage(filename, api.config.pluginsPath);
            })
            .then(filename => {
                this.setState({downloadStatus: "Installed"});
                console.log('Package Installed to', api.config.pluginsPath);
            })
        }

        onSelectPlugin(pluginName){
            // get plugin information
            this.setState({downloadStatus: ""});
            this.setState({selected: pluginName});
            
            PluginInstaller.getPluginInfos(pluginName)
            .then(infos => {
                console.log(infos);
                this.setState({pluginInfos: infos})
            });

        }

        onSearch(text){
            this.setState({status: "LOADING"});
            this.setState({downloadStatus: ""});
            PluginInstaller.searchPlugin(text)
            .then(res =>{
                this.setState({status: "READY"})
                this.setState({availablePlugins:res});
                console.log('result:', res);
            })
        }

        render() {
            const {pluginInfos, downloadStatus} = this.state;
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                        <h1>Plugin Installer</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className="row">
                                <div className="col">
                                    <PluginSearchBar 
                                        onSearch={this.onSearch}
                                        status={this.state.status}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <PluginList plugins={this.state.availablePlugins} selected={this.state.selected} onClick={this.onSelectPlugin} />
                                </div>
                            </div>
                        </div>
                        <div className="col-9">
                            <PluginDetail 
                                pluginInfos={pluginInfos} 
                                onDownloadclick={this.onDownloadPackageButtonClick}
                                downloadStatus={downloadStatus} />
                        </div>
                    </div>
                </div>);
        }
    }
}


  


  