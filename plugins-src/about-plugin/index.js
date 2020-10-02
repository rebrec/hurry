import Plugin from '../../src/core/Plugin'
import About from './About.jsx'



export default class PluginBoilerplate extends Plugin{
    constructor(api){
        super(api);
        api.store.uiState.addView('About', About(api)); 
        api.menu.insertMenuItem('Help',{label: "&About", click: () => api.store.uiState.showModal('About')});
    }

    
} 