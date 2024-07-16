import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // Ignore write errors
  }
};


const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
