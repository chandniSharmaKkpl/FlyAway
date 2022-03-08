// ...
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagaRoot from '../api/sagaRoot';
import reducerRoot from '../api/reducerRoot';

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();
// Redux: Store
const StoreRoot = createStore(reducerRoot, applyMiddleware(sagaMiddleware));
// Middleware: Redux Saga
sagaMiddleware.run(sagaRoot);

export {StoreRoot};

//const action = type => store.dispatch({type})

// rest unchanged
