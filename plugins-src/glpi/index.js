import Plugin from '../../src/core/Plugin'
import datasourceDefinition from './datasource.definition'


export default class Glpi extends Plugin{
    constructor(api, context){
        super(api);
        api.store.datasourceManager.addDatasourceDefinition(datasourceDefinition, context.pluginDir);
    }

    
} 