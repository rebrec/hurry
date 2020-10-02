import Plugin from '../../src/core/Plugin'
import Test from './Test.jsx'


export default class TestPlugin extends Plugin{
    constructor(api, context ){
        super(api); 
        api.store.uiState.addView('Test', Test(api)); 
    }
} 