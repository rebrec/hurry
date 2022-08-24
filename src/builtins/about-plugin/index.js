// import Plugin from 'hurry-plugin-definition'
import {Plugin} from '../../core/Plugin'
import About from './About.jsx'



export default class AboutPlugin extends Plugin{
    static pluginName = "about-plugin"; // cannot use name, as it is reserved
    static maxInstances = 1; // -1 = unlimited / 0 = disabled / > 0 = limited
    
    beginLoad(api){
        api.store.uiState.addView('About', About(api)); 
        api.menu.insertMenuItem('Help',{label: "&About", click: () => api.store.uiState.showModal('About')});
    }
 
    
} 