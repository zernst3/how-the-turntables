import Axios from 'axios'
import {updateCart} from './index'
import Cookie from 'js-cookie'

const SET_ALBUMS = 'SET_ALBUMS'

export const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums,
})

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
      console.log('STAT FROM THUNK GETSTATE', stat)
      const response = await Axios.post(`/api/cart/${id}`, {quantity: 1})
      const {data} = response

      console.log('DATA PRODUCTS THAT CAME FROM DB', data.products)
      dispatch(updateCart(data.products))

      const stat2 = getState()
      //     console.log('STATE.cart', stat2)

      Cookie.remove('cart')

      Cookie.set('cart', JSON.stringify(data.products))
      //      console.log('JSON BACK', JSON.parse(Cookie.get('cart')))
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
