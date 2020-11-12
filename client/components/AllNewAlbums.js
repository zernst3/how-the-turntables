import React from 'react'
import {connect} from 'react-redux'
import Album from './Album'
import {fetchNewAlbums} from '../store/allNewAlbums'

export class AllNewAlbums extends React.Component {
  componentDidMount() {
    this.props.fetchNewAlbums()
  }

  render() {
    if (!this.props.albums) {
      return <div className="waiting">Loading New Albums...</div>
    }

    return (
      <div className="allNewAlbums">
        {this.props.albums.map(album => {
          return (
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
          )
        })}
      </div>
    ) //return
  } //render
} //class

const mapStateToProps = state => {
  return {
    albums: state.albums
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNewAlbums: () => dispatch(fetchNewAlbums())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllNewAlbums)
