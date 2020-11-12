import Axios from 'axios'

const SET_ALBUM = 'SET_ALBUM'

export const setAlbum = album => ({
  type: SET_ALBUM,
  album
})

export const fetchAlbum = id => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/products/${id}`)
      dispatch(setAlbum(data))
    } catch (error) {
      console.log(error)
    }
  }
} //end so called thunk

const initialState = {}
//reducer
export default function albumReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALBUM:
      return action.album

    default:
      return state
  }
}
