import React from 'react'
import {fetchAlbum} from '../store/album'
import {connect} from 'react-redux'
import {buy} from '../store/cart'
import './SingleAlbum.css'
import './Button.css'

export class SingleAlbum extends React.Component {
  componentDidMount() {
    this.props.fetchAlbum(this.props.match.params.id)
  }
  render() {
    const {
      id,
      title,
      artistName,
      imageUrl,
      songList,
      releaseYear,
      category,
      price,
      adminView,
    } = this.props.album

    const name = title
    const band = artistName

    if (!this.props.album) {
      return <div>Album loading...</div>
    }
    return (
      <div className="singleAlbum" key={id}>
        <img src={imageUrl} />
        <div>
          <h1>Album: {name}</h1>
          <h3>Artist: {band}</h3>

          <h4>Tracklist: {songList}</h4>
          <h3>Genre: {category}</h3>
          <h3>Released: {releaseYear}</h3>
          <h3>Price: ${(price / 100).toFixed(2)}</h3>
          {!adminView && (
            <button
              type="submit"
              onClick={() => {
                this.props.buy(id)
              }}
            >
              <img src="/buy.jpg" />
            </button>
          )}
          <h2 />
        </div>
      </div>
    ) //return ende
  } //render ende
} //class ende

const mapStateToProps = (state) => {
  return {
    album: state.album,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAlbum: (id) => dispatch(fetchAlbum(id)),
    buy: (id) => dispatch(buy(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbum)
