import React, { createContext, useContext } from 'react';
import { configure, makeAutoObservable } from 'mobx';

configure({ enforceActions: 'always' });

class MobxStore {
  isAuthorized = false;
  dynamicFormData = '';
  token = '';
  
  constructor() {
    makeAutoObservable(this);
  }
  
  setDynamicFormData(formData: string) {
    this.dynamicFormData = formData;
  }
  
  getDynamicFormData(){
    return this.dynamicFormData;
  }

  updateAuthorizationToken(token: string) {
    this.token = token;
  }

  updateAuthorized(payload: boolean){
    this.isAuthorized = payload
  }
}

const MobxStoreContext = createContext(new MobxStore());

interface Props {
    children?: React.ReactNode;
  }

export const MobxStoreProvider = ({ children }: Props) => {
  const mobxStore = new MobxStore();

  return (
    <MobxStoreContext.Provider value={mobxStore}>
      {children}
    </MobxStoreContext.Provider>
  );
};

export const useMobxStore = () => {
  const mobxStore = useContext(MobxStoreContext);
  if (!mobxStore) {
    throw new Error('Mobx store is not initialized');
  }
  return mobxStore;
};
