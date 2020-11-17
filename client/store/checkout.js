import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_USER_CHECKOUT = 'SET_USER_CHECKOUT'

/**
 * INITIAL STATE
 */
const defaultUserCheckout = {}

/**
 * ACTION CREATORS
 */
const setUserCheckout = (userCheckout) => ({
  type: SET_USER_CHECKOUT,
  userCheckout,
})

/**
 * THUNK CREATORS
 */
export const getUserCheckout = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/checkout/`)
    dispatch(setUserCheckout(res.data || defaultUserCheckout))
  } catch (err) {
    console.error(err)
  }
}

export const checkout = (checkoutData) => async (dispatch) => {
  try {
    await axios.post(`/api/checkout/`, {checkoutData})
  } catch (err) {
    console.log(err)
  }
  dispatch(setUserCheckout(defaultUserCheckout))
}

/**
 * REDUCER
 */
export default function (state = defaultUserCheckout, action) {
  switch (action.type) {
    case SET_USER_CHECKOUT:
      return action.userCheckout
    default:
      return state
  }
}
