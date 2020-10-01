import Plugin from '../../src/core/Plugin'
import contextMenu from './menu'

export default class TestPlugin extends Plugin{
    constructor(api, context ){
        super(api); 
        api.store.registerContextMenu(contextMenu);
    }
} 