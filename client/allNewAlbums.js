const SET_ALBUMS = 'SET_ALBUMS'

export const setAlbums = albums => ({
  type: SET_ALBUMS,
  albums
})

const initialState = []

export default function albumsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALBUMS:
      return action.albums

    default:
      return state
  }
}
