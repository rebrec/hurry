import { DatasourceBase } from '../Datasource/DatasourceBase'
import Shell from '../Shell/Shell'


export default class Entity {
    public name = "";
    public multiInstances = false;
    public maxInstances = 0;
    
    isDatasource() {
        return this instanceof DatasourceBase;
    }
    isShell() {
        return this instanceof Shell;
    }

    getConfigurationSchema(){
        return {};
    }

}