import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_USER_CHECKOUT = 'SET_USER_CHECKOUT'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const setUser = (userCheckout) => ({type: SET_USER_CHECKOUT, userCheckout})

/**
 * THUNK CREATORS
 */
export const getUserCheckout = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/checkout/`)
    dispatch(setUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case SET_USER_CHECKOUT:
      return action.userCheckout
    default:
      return state
  }
}
