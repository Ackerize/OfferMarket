import { createStore, combineReducers, applyMiddleware} from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist'
import { authReducer } from '../reducers/authReducer'
import thunk from 'redux-thunk';

const reducers = combineReducers({
  auth: authReducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware( thunk ));
  let persistor = persistStore(store)

  return { store, persistor}

}