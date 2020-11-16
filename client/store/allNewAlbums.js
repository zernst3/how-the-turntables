import Axios from 'axios'

const SET_ALBUMS = 'SET_ALBUMS'
const ADD_NEW_ALBUM = 'ADD_NEW_ALBUM'
const DELETE_ALBUM = 'DELETE_ALBUM'
const UPDATE_ALBUM = 'UPDATE_ALBUM'

export const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums,
})

export const addNewAlbum = (album) => ({
  type: ADD_NEW_ALBUM,
  album,
})

export const deleteAlbum = (albumId) => ({
  type: DELETE_ALBUM,
  albumId,
})

export const updateAlbum = (album) => ({
  type: UPDATE_ALBUM,
  album,
})

// return dispatch => {
//   dispatch(setAlbums(dummyData))
// }
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

export const thunkToAddNewAlbum = (newAlbum) => {
  return async (dispatch) => {
    try {
      const {data} = await Axios.post('/api/products', newAlbum)
      dispatch(addNewAlbum(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const thunkToDeleteAlbum = (albumId) => {
  return async (dispatch) => {
    try {
      await Axios.delete(`/api/products/${albumId}`)
      dispatch(deleteAlbum(albumId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const thunkToUpdateAlbum = (album) => {
  return async (dispatch) => {
    try {
      const {data} = await Axios.post(`/api/products`, album)
      console.log(data)
      dispatch(updateAlbum(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const buy = (id) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(`/api/cart/${id}`, {quantity: 1})
      console.log('id', id)
      console.log('!!Response', response)
      // dispatch(updateUser)
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
    case ADD_NEW_ALBUM:
      return [...state, action.album]
    case DELETE_ALBUM:
      return state.filter((album) => album.id !== action.albumId)
    case UPDATE_ALBUM:
      return state.map((album) => {
        if (album.id === action.album.id) return action.album
        else return album
      })

    default:
      return state
  }
}
