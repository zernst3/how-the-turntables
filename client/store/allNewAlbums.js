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

const initialState = []

export default function albumsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALBUMS:
      return action.albums

    default:
      return state
  }
}
