/* eslint-disable radix */
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

export const getInitialState = () => {
  const cookieData = Cookie.get('cart')
  if (cookieData) {
    return JSON.parse(cookieData)
  }
  return []
}

/**
 * INITIAL STATE
 */
export const defaultCart = {
  products: getInitialState(),
}

/**
 * ACTION CREATORS
 */
export const setCart = (cart) => {
  return (dispatch) => {
    Cookie.remove('cart')
    Cookie.set('cart', cart)
    dispatch({type: SET_CART, cart})
  }
}

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

export const buy = (id) => {
  return async (dispatch) => {
    try {
      const cartItem = store
        .getState()
        .cart.products.filter((product) => product.id === id)

      let res

      if (cartItem[0]) {
        if (cartItem[0].OrderItem.quantity === 10) {
          alert('Maximum Amount In Cart')
          return
        }
        res = await axios.post(`/api/cart/${id}`, {
          quantity: parseInt(cartItem[0].OrderItem.quantity) + 1,
        })
        alert('Item Already in Cart And Updated')
      } else {
        res = await axios.post(`/api/cart/${id}`, {quantity: 1})
        alert('Item Added To Cart')
      }

      dispatch(setCart(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

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
