import Plugin from '../../src/core/Plugin'
import Test from './Test.jsx'
import psinit from './scripts/init1.ps1'


export default class PluginBoilerplate extends Plugin{
    constructor(api){
        super(api);
        api.store.uiState.addView('Test', Test(api)); 
        api.menu.insertMenuItem('Help',{label: "&Test", click: () => api.store.uiState.setCurrentView('Test')})
    }
} 