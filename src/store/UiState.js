import { observable, computed, action, extendObservable } from 'mobx'
// import ping from 'ping'
import { pingHost } from '../core/helpers/helpers';

const APP_STATUS = {
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
    @observable app = {
        views: {
            current: null,
            available: null,
        },
        modal: {
            view: null
        },
        datasource: { caption: "N / A" },
        status: APP_STATUS.WAITING_FOR_SEARCH,
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
        this.setSearchedText(config.defaultSearch);
        const ds = rootStore.datasourceManager.getDefaultDatasource();
        this.setDatasource(ds);
        setTimeout(_=>{
            this.startSearch()
        },2000);
    }

    getModalView(){
        const viewName = this.app.modal.view;
        if (viewName) {
            return this.app.views.available.get(viewName);
        } 
        return null;
    }

    @action.bound initViews(){
        this.app.views.available = new Map();
        this.clearSearch();
    }
    @action.bound setDatasource(ds){
        this.app.datasource = ds;
        this.clearSearch();
    }
    @action.bound clearSearch(){
        this.setSearchResults();
        this.setAppStatus(APP_STATUS.SEARCHING);
    }
    @action.bound setAppStatus(status){ this.app.status = status; }
    @action.bound toggleMenu(){ this.app.menu.visible = !this.app.menu.visible; }
    @action.bound showMenu(){ this.app.menu.visible = true; }
    @action.bound hideMenu(){ this.app.menu.visible = false; }
    @action.bound showModal(view){ this.app.modal.view = view; }
    @action.bound hideModal(){ this.app.modal.view = null; }

    @action.bound setSearchedText(text){ this.search.text = text; }
    @action.bound setSearchResults(results=[]){ this.search.results = results; }
    // @action.bound updateSearchResultsRecord(recordIndex, newValue){ this.search.results[recordIndex] = newValue; }
    @action.bound updateSearchResultPingStatus(element){
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

    }
    @action.bound updateSearchResultsPingStatus(){
        for (let i=0;i< this.search.results.length;i++){
            const result = this.search.results[i];
            this.updateSearchResultPingStatus(result);
        }
    }
    
    @action.bound selectHost(hostElement) {
        this.search.selectedResult = hostElement;
        this.showMenu();
    }
    @computed get currentSearch(){
        return this.search.history[this.search.history.length-1] || '';
    }

    @action.bound startSearch() {
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
          });

    }

    
    @action.bound selectMenuTab(caption){ this.app.menu.selectedTab = caption; }
    @action.bound selectRunnerConsoleTab(caption){ 
        this.app.runnerConsole.selectedTab = caption; 
    }
    

}


export default UiState;
