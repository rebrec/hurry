import React from 'react';
import RootStore from './store/RootStore';

const storeContext = React.createContext({
    rootStore: new RootStore()
});

export const useStores = () => React.useContext(storeContext);