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
      showAddForm: false,
      showEditForm: false,
      currentlyEditingAlbum: undefined,
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchNewAlbums()
  }

  handleClick(form, currentlyEditingAlbum) {
    return this.setState({
      [form]: !this.state[form],
      currentlyEditingAlbum: currentlyEditingAlbum,
    })
  }

  render() {
    return (
      <div className="allAlbums">
        <h1>All Albums</h1>
        <div id="newAlbumButton">
          <button
            type="button"
            id="add-album"
            onClick={() => this.handleClick('showAddForm')}
          >
            Add Album
          </button>
          {this.state.showAddForm ? (
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
                  adminView={true}
                />

                <div id="editAlbumButton">
                  <button
                    type="button"
                    id="edit-album"
                    onClick={() => this.handleClick('showEditForm', album.id)}
                  >
                    Edit Album
                  </button>
                  {this.state.showEditForm &&
                  this.state.currentlyEditingAlbum === album.id ? (
                    <ConnectedAdminUpdateAlbum album={album} />
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
