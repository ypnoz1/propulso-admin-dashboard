import { configureStore,createSlice } from '@reduxjs/toolkit';
//import counterReducer from '../components/counter/CounterSlice';
//import cartReducer from '../components/cart/CartSlice';

let initialState = {
  data: []
};
const csvSlice = createSlice({
  name: "csv data",
  initialState,
  reducers: {
    updateCsvData: (state, param) => {
      state.data = param.payload;
    }
  }
});
export const { updateCsvData } = csvSlice.actions;

initialState = {
  value: false
};
const initialization = createSlice({
  name: "init data",
  initialState,
  reducers: {
    updateStatInit: (state, param) => {
      state.value = param.payload;
    }
  }
});
export const { updateStatInit } = initialization.actions;

initialState = {
  value: 12
};
const maxMonth = createSlice({
  name: "set max math",
  initialState,
  reducers: {
    updateMaxMonth: (state, param) => {
      state.maxMonth = param.payload;
    }
  }
});
export const { updateMaxMonth } = maxMonth.actions;

initialState = {
  value: "Dashboard"
};
const menuTab = createSlice({
  name: "set menu tab",
  initialState,
  reducers: {
    updateMenuTab: (state, param) => {
      state.value = param.payload;
    }
  }
});
export const { updateMenuTab } = menuTab.actions;


export const Store = configureStore({
  reducer: {
    initialized: initialization.reducer,
    csv: csvSlice.reducer,
    maxMonth: maxMonth.reducer,
    menu: menuTab.reducer
  }
});

//Store.subscribe(() => console.log(Store.getState()))