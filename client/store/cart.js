import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const setCart = (cart) => ({type: SET_CART, cart})

/**
 * THUNK CREATORS
 */
export const getCart = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/cart')
    dispatch(setCart(res.data))
  } catch (err) {
    coinsole.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
