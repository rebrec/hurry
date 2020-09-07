import  Path from  'path'
import { getFiles } from './helpers/helpers'
import { observable, computed, action, extendObservable } from 'mobx'
import { basename } from 'path'
import api from '../core/api'

export default new class ViewManager{

    constructor(){
        this.loadViews();    
    }
    loadViews(){
        const { viewsPath } = api.config;
        const viewsPaths = getFiles(viewsPath);
        
        for (const path of viewsPaths){
            console.log('ViewManager : Processing file :', path);
            const filename = basename(path);
            const filenameBase = filename.split('.').slice(0, -1).join('.');
            // const View = __non_webpack_require__(path);
            const View = __non_webpack_require__(path);
            store.uiState.addView(filenameBase, View);
        }
      }
    }

