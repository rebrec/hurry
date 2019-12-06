import { observable, computed, action } from 'mobx'

const APP_STATUS = {
    WAITING_FOR_SEARCH: 1,
    SEARCHING: 2,
    DISPLAYING_RESULTS: 3,
  };


class UiState {
    @observable app = {
        status: APP_STATUS.WAITING_FOR_SEARCH,
        menu: {
            visible: false,
            selectedTab: "Action"
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
        setTimeout(_=>this.startSearch(),2000);
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
        this.setAppStatus(APP_STATUS.SEARCHING);
        const text = this.search.text;
        if (text.length >= 3) {
            this.search.history.push(text);
        } else {
            return console.log("Not enough chars");
        }

        const runner = this.rootStore.runners.powershell;
        return runner.run(`$dummy.search('${this.currentSearch}')`, {}, 'json')
          .then((res) => {
              if (res.success) {
                this.setSearchResults(res.data);
                this.setAppStatus(APP_STATUS.DISPLAYING_RESULTS);
              } else {
                  console.error('Error received : ', res.errorMessage);
                  this.setAppStatus(APP_STATUS.WAITING_FOR_SEARCH);

              }
              console.log("res = ", res);
          });

    }


    @action.bound selectMenuTab(caption){ this.app.menu.selectedTab = caption; }


}


export default UiState;
