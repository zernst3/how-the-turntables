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
    'https://cdn.shopify.com/s/files/1/0020/7595/1149/products/U2T71591_655b63c3-67fd-454e-9862-dd8fe97c1f1d_2000x.jpg?v=1561047650'
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
