import { observable, computed, action } from 'mobx'

const APP_STATUS = {
    WAITING_FOR_SEARCH: 1,
    SEARCHING: 2,
    DISPLAYING_RESULTS: 3,
  };
  
  
class UiState {
    @observable searchedText = '';
    @observable currentText = '';
    @observable searchHistory = [];
    @observable searchedResults = [];
    @observable appStatus = APP_STATUS.WAITING_FOR_SEARCH;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.setSearchedText("salut");
        
    }

    @action.bound setSearchedText(text){ this.searchedText = text; }
    @action.bound startSearch(text){ 
        if (this.searchedText.length >3) {
            this.searchHistory.push(this.currentSearch); 
        } else {
            console.log('Not enough chars');
        }
        
    }
    @computed get currentSearch(){
        return this.searchHistory[this.searchHistory.length-1] || null;
    }
}


export default UiState;