import { observable, computed, action, extendObservable } from 'mobx'
// import ping from 'ping'
import { pingHost } from '../core/helpers/helpers';
import Logger from '../core/helpers/logging';
const logger = Logger('UiState');


export const APP_STATUS = {
    INITIALIZING: 0,
    WAITING_FOR_SEARCH: 1,
    SEARCHING: 2,
    DISPLAYING_RESULTS: 3,
  };


class UiState {
    @observable currentView = null;

    @action.bound setCurrentView(view) { this.app.views.current = view; };
    
    @action.bound addView(name, View) {
        this.app.views.available.set(name, View);
    };

    @action.bound setAppStatus(status) {
        if (typeof status === 'string') {
            status = status.toUpperCase();
            if (!Object.keys(APP_STATUS).includes(status)) {
                throw new Error("Invalid status " + status + ". Valid values are " + Object.keys(APP_STATUS))
            }
            this.app.status = APP_STATUS[status];
        } else {
            this.app.status = status;
        }
        
    };

    @observable app = {
        views: {
            current: null,
            available: null,
        },
        modal: {
            view: null
        },
        datasource: { caption: "N / A" },
        status: APP_STATUS.INITIALIZING,
        menu: {
            visible: false,
            selectedTab: "Action"
        },
        runnerConsole: {
            selectedTab: "no process",
            settings: {
                height: "100px",
                resizeSensibility: "10"
            }
        }
    };
    @observable search = {
        history: [],
        text: '',
        results: [],
        selectedResult: null
    };
    @action.bound setDebuggerConsoleHeight(height){ this.app.runnerConsole.settings.height = height; }

    constructor(rootStore, config) {
        this.rootStore = rootStore;
        this.initViews();
        // this.setSearchedText(config.defaultSearch);
        
    }
    async init(){

    }

    displayToast(toastType="Error", toastTitle, toastMessage){
        const l = logger.child('displayToast');
        l.info({
            toastType: toastType,
            toastTitle: toastType,
            toastMessage: toastMessage
        });
    }

    async start(){
        const ds = this.rootStore.datasourceManager.getDefaultDatasource();
        if (!ds) {
            this.displayToast('Error', 'UI Initialisation', 'There seems to be no Datasources available. Hurry need at least 1 datasource to work properly');
            return
        }
        this.setDatasource(ds);
        this.uiState.setAppStatus(APP_STATUS.SEARCHING);
        
    }

    getModalView(){
        const viewName = this.app.modal.view;
        if (viewName) {
            return this.app.views.available.get(viewName);
        } 
        return null;
    }

    @action.bound initViews(){
        logger.silly('initView start');
        this.app.views.available = new Map();
        // this.clearSearch();
    }
    @action.bound setDatasource(ds){
        logger.silly('setDatasource start', ds);
        this.app.datasource = ds;
        this.clearSearch();
    }
    @action.bound clearSearch(){
        logger.silly('clearSearch start');
        this.setSearchResults();
        this.setAppStatus(APP_STATUS.SEARCHING);
    }
    // @action.bound setAppStatus(status){ this.app.status = status; }
    @action.bound toggleMenu(){ 
        this.app.menu.visible = !this.app.menu.visible; 
    }
    @action.bound showMenu(){ 
        this.app.menu.visible = true;
    }
    @action.bound hideMenu(){ 
        this.app.menu.visible = false; 
    }
    @action.bound showModal(view){ 
        this.app.modal.view = view; 
    }
    @action.bound hideModal(){ 
        this.app.modal.view = null; 
    }

    @action.bound setSearchedText(text){ 
        this.search.text = text; 
    }
    @action.bound setSearchResults(results=[]){ 
        this.search.results = results; 
    }
    // @action.bound updateSearchResultsRecord(recordIndex, newValue){ this.search.results[recordIndex] = newValue; }
    @action.bound updateSearchResultPingStatus(element){
        logger.silly('updateSearchResultPingStatus start');
        if (element._pingableProperty) {
            const pingValue = element[element._pingableProperty];
            pingHost(pingValue)
            .then(action("onPingResult", res => {
                if (res.success) {
                    element._online = res.online;
                    element._pingError = element.error;
                }
            }))
            .catch(err=>{
                console.error(err);
            });
        }
        logger.silly('updateSearchResultPingStatus start');
    }
    @action.bound updateSearchResultsPingStatus(){
        logger.silly('updateSearchResultsPingStatus start');
        for (let i=0;i< this.search.results.length;i++){
            const result = this.search.results[i];
            this.updateSearchResultPingStatus(result);
        }
        logger.silly('updateSearchResultsPingStatus start');
    }
    
    @action.bound selectHost(hostElement) {
        this.search.selectedResult = hostElement;
        this.showMenu();
    }
    @computed get currentSearch(){
        return this.search.history[this.search.history.length-1] || '';
    }

    @action.bound startSearch() {
        logger.silly('startSearch start');
        const { datasource } = this.app;
        const { text } = this.search;
        
        this.setAppStatus(APP_STATUS.SEARCHING);
        
        if (text.length >= 0) {
            this.search.history.push(text);
        } else {
            return console.log("Not enough chars");
        }

        return datasource.search(this.currentSearch)
        // return runner.run(`$dummy.search('${this.currentSearch}')`, {}, 'json')
          .then((res) => {
              if (res.success) {
                const r = res.data.length ? res.data : [res.data];
                this.setSearchResults(r);
                this.updateSearchResultsPingStatus();
                this.setAppStatus(APP_STATUS.DISPLAYING_RESULTS);
              } else {
                  console.error('Error received : ', res.errorMessage);
                  this.setAppStatus(APP_STATUS.WAITING_FOR_SEARCH);

              }
              logger.silly('startSearch start');
          });
    }

    
    @action.bound selectMenuTab(caption){ 
        logger.silly('selectMenuTab start');
        this.app.menu.selectedTab = caption; 
        logger.silly('selectMenuTab start');
    }
    @action.bound selectRunnerConsoleTab(caption){ 
        logger.silly('selectRunnerConsoleTab start');
        this.app.runnerConsole.selectedTab = caption; 
        logger.silly('selectRunnerConsoleTab start');
    }
    

}


export default UiState;
