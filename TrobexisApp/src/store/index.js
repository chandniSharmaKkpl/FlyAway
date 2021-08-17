// ...
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import sagaRoot from '../api/sagaRoot';
import reducerRoot from '../api/reducerRoot';

const sagaMiddleware = createSagaMiddleware()

const StoreRoot = createStore(
  reducerRoot,
  applyMiddleware(sagaMiddleware),

)
sagaMiddleware.run(sagaRoot);

export default StoreRoot;

//const action = type => store.dispatch({type})

// rest unchanged