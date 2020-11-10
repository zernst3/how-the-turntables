import Axios from 'axios'
import albumsReducer from './allNewAlbums'

const SET_ALBUM = 'SET_ALBUM'

export const setAlbum = album => ({
  type: SET_ALBUM,
  album
})

export const fetchAlbum = id => ({
  id: 1,
  band: 'U2',
  name: 'Joshua Three',
  imageUrl:
    'https://en.wikipedia.org/wiki/The_Joshua_Tree#/media/File:The_Joshua_Tree.png'
})

// return async (dispatch) => {
//   try {
//     const { data } = await Axios.get(`/api/album/${id}`)
//     dispatch(setAlbum(data))
//   } catch (error) {
//     console.log(error)
//   }
// }

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
