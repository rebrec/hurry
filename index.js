import Plugin from '../../src/core/Plugin'
// import Plugin from 'hurry-plugin-definition'
import PluginInstallerView from './PluginInstallerView.jsx'

export default class PluginInstaller extends Plugin{

    constructor(api, context){
        super(api, context)
        api.store.uiState.addView('PluginInstallerView', PluginInstallerView(api));
        api.menu.insertMenuItem('File',{label: "&Install Plugin", click: () => api.store.uiState.showModal('PluginInstallerView')});
    }

    getPluginsAvailable(){

    }

    downloadPlugin(pluginName){
        
    }

    installPlugin(tgzPath){ 

    }



}






