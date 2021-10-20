import { createStore, combineReducers } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist'
import { authReducer } from '../reducers/authReducer'

const reducers = combineReducers({
  auth: authReducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store)

  return { store, persistor}

}