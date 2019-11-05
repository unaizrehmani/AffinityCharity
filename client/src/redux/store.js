import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './reducers'; // the value from combineReducers

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk, logger);

export const store = createStore(pReducer, composeWithDevTools(middleware));
export const persistor = persistStore(store);
