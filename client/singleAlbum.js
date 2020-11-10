import Axios from 'axios'

const SET_ALBUM = 'SET_ALBUM'

export const setAlbum = album => ({
  type: SET_ALBUM,
  album
})

export const fetchAlbum = id => {
  return {
    id: 1,
    band: 'U2',
    name: 'Joshua Three',
    imageUrl:
      'https://en.wikipedia.org/wiki/The_Joshua_Tree#/media/File:The_Joshua_Tree.png'
  }

  // make it async and
  // return async (dispatch) => {}
  // try {
  //   const { data } = await Axios.get(`/api/album/${id}`)
  //   dispatch(setAlbum(data))
  // }catch (error){
  //   console.log(error)
  // }
  // } //return ende
} //function ende

//reducer
const initialState = {}

export default function singleAlbumReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALBUM:
      return action.album

    default:
      return state
  }
}
