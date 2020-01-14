import { observable, computed, action, extendObservable } from 'mobx'

const APP_STATUS = {
    WAITING_FOR_SEARCH: 1,
    SEARCHING: 2,
    DISPLAYING_RESULTS: 3,
  };


class UiState {
    @observable app = {
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

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.setSearchedText("host");
        const ds = rootStore.datasourceManager.getDefaultDatasource();
        console.log("++++++++++++++++++", ds);
        this.setDatasource(ds);
        setTimeout(_=>{
            console.log('STARTSEARCH !!!!!!!!!!!!!');
            this.startSearch()
        },15000);
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

    @action.bound setSearchedText(text){ this.search.text = text; }
    @action.bound setSearchResults(results=[]){ this.search.results = results; }
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
        
        if (text.length >= 3) {
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
                this.setAppStatus(APP_STATUS.DISPLAYING_RESULTS);
              } else {
                  console.error('Error received : ', res.errorMessage);
                  this.setAppStatus(APP_STATUS.WAITING_FOR_SEARCH);

              }
              console.log("res = ", res);
          });

    }

    
    @action.bound selectMenuTab(caption){ this.app.menu.selectedTab = caption; }
    @action.bound selectRunnerConsoleTab(caption){ 
        console.log("Changing selected Tab to", caption);
        this.app.runnerConsole.selectedTab = caption; 
    }
    

}


export default UiState;
