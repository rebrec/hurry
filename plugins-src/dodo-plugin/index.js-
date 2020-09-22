import Plugin from '../../src/core/Plugin'
import datasourceDefinition from './datasource.definition'


export default class DodoPlugin extends Plugin{
    constructor(api){
        super(api);
        api.store.datasourceManager.addDatasourceDefinition(datasourceDefinition, require('path').resolve(__dirname));
    }

    
} 