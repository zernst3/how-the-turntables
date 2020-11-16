import React from 'react'
import {connect} from 'react-redux'
import Album from './Album'
import {
  fetchNewAlbums,
  thunkToAddNewAlbum,
  thunkToUpdateAlbum,
} from '../store/allNewAlbums'
import ConnectedAdminNewAlbum from './admin-new-album'
import ConnectedAdminUpdateAlbum from './admin-update-album'

export class AdminView extends React.Component {
  constructor() {
    super()
    this.state = {
      showForm: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchNewAlbums()
  }

  handleClick() {
    return this.setState({
      showForm: !this.state.showForm,
    })
  }

  render() {
    return (
      <div className="allAlbums">
        <h1>All Albums</h1>
        <div id="newAlbumButton">
          <button type="button" id="add-album" onClick={this.handleClick}>
            Add Album
          </button>
          {this.state.showForm ? (
            <ConnectedAdminNewAlbum albums={this.props.albums} />
          ) : null}
        </div>

        <div className="albumsList">
          {this.props.albums.map((album) => {
            return (
              <div key={album.id}>
                <Album
                  key={album.id}
                  id={album.id}
                  name={album.title}
                  band={album.artistName}
                  imageUrl={album.imageUrl}
                  price={album.price}
                  songList={album.songList}
                  releaseYear={album.releaseYear}
                  category={album.category}
                />

                <div id="editAlbumButton">
                  <button
                    type="button"
                    id="edit-album"
                    onClick={this.handleClick}
                  >
                    Edit Album
                  </button>
                  {this.state.showForm ? (
                    <ConnectedAdminUpdateAlbum album={this.props.album} />
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    ) //return
  } //render
} //class

const mapStateToProps = (state) => {
  return {
    albums: state.albums,
    album: state.album,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNewAlbums: () => dispatch(fetchNewAlbums()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminView)
