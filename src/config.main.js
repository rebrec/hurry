import Path from 'path';
import { existsSync, copyFileSync} from 'fs'

function getConfig(profileDir){
    let customSettings = {};
    
    const configPath = Path.join(profileDir, 'config.js');
    
    if (existsSync(configPath)){
        console.log('Importing custom configuration');
        customSettings = __non_webpack_require__(configPath);
    } else {
        customSettings.projectRoot = ".";
        console.log('No custom configuration file found at ' + configPath);
    }
    
    delete customSettings.isValid;
    
    console.log('projectRoot exist : ', existsSync(customSettings.projectRoot));
    
    
    customSettings.pluginsPath = Path.join(customSettings.projectRoot, "..", "plugins-src")
    return customSettings; 
}

export default getConfig;