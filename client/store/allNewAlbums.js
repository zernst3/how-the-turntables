import Axios from 'axios'
import {updateCart} from './index'
import Cookie from 'js-cookie'

const SET_ALBUMS = 'SET_ALBUMS'

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

export const buy = (id) => {
  return async (dispatch, getState) => {
    try {
      const stat = getState()
      const cart = stat.cart

      const response = await Axios.post(`/api/cart/${id}`, {quantity: 1})
      const {data} = response
      console.log('DATA PRODUCTS', data.products)
      dispatch(updateCart(data.products))
      console.log('STATE.cart', stat)
      Cookie.remove('cart')
      Cookie.set('cart', JSON.stringify(data.products))
      console.log('JSON BACK', JSON.parse(Cookie.get('cart')))
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

    default:
      return state
  }
}
