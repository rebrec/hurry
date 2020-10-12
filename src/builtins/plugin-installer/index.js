import Plugin from '../../../src/core/Plugin'
// import Plugin from 'hurry-plugin-definition'
import PluginInstallerView from './views/PluginInstallerView.jsx'

export default class PluginInstaller extends Plugin{

    constructor(api, context){
        super(api, context)
        api.store.uiState.addView('PluginInstallerView', PluginInstallerView(api));
        api.menu.insertMenuItem('File',{label: "&Install Plugin", click: () => api.store.uiState.showModal('PluginInstallerView')}, {after: 'Settings'});
    }

    getPluginsAvailable(){

    }

    downloadPlugin(pluginName){
        
    }

    installPlugin(tgzPath){ 

    }



}






