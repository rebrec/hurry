import Plugin from '../../src/core/Plugin'
import About from './About.jsx'



export default class Office365Plugin extends Plugin{
    constructor(api){
        super(api);
        // api.menu.insertMenuItem('Help',{label: "&About", click: () => api.store.uiState.setCurrentView('About')})

    }

    
} 