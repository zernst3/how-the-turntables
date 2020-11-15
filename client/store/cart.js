import axios from 'axios'
import history from '../history'
import store from './index'
import Cookie from 'js-cookie'

// cookie v2.0

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART'

const UPDATE_CART = 'UPDATE_CART'

const getInitialState = () => {
  const cookieData = Cookie.get('cart')
  if (cookieData) {
    return JSON.parse(cookieData)
  }
  return []
}
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
    console.error(err)
  }
}

export const removeItemFromCart = (itemId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/cart/${itemId}`)
      const cart = {
        ...store.getState().cart,
        products: store
          .getState()
          .cart.products.filter((product) => product.id !== itemId),
      }
      dispatch(setCart(cart))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateQuantity = (itemId, quantity) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/cart/${itemId}`, {quantity: quantity})
      const cart = {
        ...store.getState().cart,
        products: store.getState().cart.products.map((product) => {
          if (product.id === itemId) {
            product.OrderItem.quantity = quantity
            return product
          } else {
            return product
          }
        }),
      }
      dispatch(setCart(cart))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateCart = (items) => ({
  type: UPDATE_CART,
  items,
})

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart

    case UPDATE_CART:
      return action.items

    default:
      return state
  }
}
