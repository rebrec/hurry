import Plugin from '../../src/core/Plugin'
import Test from './Test.jsx'
import datasourceDefinition from './datasource.definition'


export default class TestPlugin extends Plugin{
    constructor(api, context ){
        super(api); 
        api.store.uiState.addView('Test', Test(api)); 
        api.menu.insertMenuItem('Help',{label: "&Test Plugin", click: () => api.store.uiState.showModal('Test')})
        api.store.datasourceManager.addDatasourceDefinition(datasourceDefinition, context.pluginDir);
    }
} 