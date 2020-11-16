import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import cart from './cart'
import checkout from './checkout'
import albumsReducer from './allNewAlbums'
import albumReducer from './album'

const reducer = combineReducers({
  user,
  cart,
  checkout,
  albums: albumsReducer,
  album: albumReducer,
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './cart'
export * from './checkout'
