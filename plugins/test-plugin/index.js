import Plugin from '../../src/core/Plugin'
import Test from './Test.jsx'
import datasourceDefinition from './datasource.definition'

export default class PluginBoilerplate extends Plugin{
    constructor(api, context ){
        super(api); 
        api.store.uiState.addView('Test', Test(api) ); 
        api.menu.insertMenuItem('Help',{label: "&Test", click: () => api.store.uiState.setCurrentView('Test')})
        api.store.datasourceManager.addDatasourceDefinition(datasourceDefinition, context.pluginDir);
    }
} 