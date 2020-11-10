import React from 'react'
import Album from './Album'

export class AllNewAlbums extends React.Component {
  render() {
    if (!this.props.allAlbums[10]) {
      return <div className="waiting">Loading New Albums...</div>
    }

    return (
      <div className="allNewAlbums">
        {this.props.albums.map(album => {
          return (
            <Album
              key={album.id}
              id={album.id}
              name={album.name}
              band={album.band}
              imageUrl={album.imageUrl}
            />
          )
        })}//map ende
      </div>
    ) //return
  } //render
} //class

const mapStateToPros = state => {
  return {
    albums: state.albums
  }
}

export default AllNewAlbums
