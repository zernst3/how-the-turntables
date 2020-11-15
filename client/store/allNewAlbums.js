import Axios from 'axios'
import store from './index'

const SET_ALBUMS = 'SET_ALBUMS'

const UPDATE_CART = 'UPDATE_CART'

export const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums,
})

// return dispatch => {
//   dispatch(setAlbums(dummyData))
// }
export const fetchNewAlbums = () => {
  return async (dispatch) => {
    try {
      const {data} = await Axios.get(`/api/products`)
      dispatch(setAlbums(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateCart = (item) => ({
  type: UPDATE_CART,
  item,
})
export const buy = (id) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(`/api/cart/${id}`, {quantity: 1})
      console.log('id', id)
      const {data} = response
      console.log('data products', data.products)

      //   setState([{products: data.products}])
      dispatch(updateCart(data.products))
      console.log('STATE.cart', store.getState().cart.products)
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

export default function albumsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALBUMS:
      return action.albums

    case UPDATE_CART:
      return [...state, action.item]

    default:
      return state
  }
}
