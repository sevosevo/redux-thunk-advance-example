import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './state/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
	rootReducer,
	{},
	composeWithDevTools(applyMiddleware(reduxThunk))
);

export default store;