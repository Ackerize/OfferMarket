import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk';
import { profileReducer } from '../reducers/profileReducer';
import { uiReducer } from '../reducers/uiReducer';

const reducers = combineReducers({
	auth: authReducer,
	profile: profileReducer,
	ui: uiReducer,
});

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};

const composeEnhancers =
	(typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
	let store = createStore(
		persistedReducer,
		composeEnhancers(applyMiddleware(thunk)),
	);
	let persistor = persistStore(store);

	return { store, persistor };
};
