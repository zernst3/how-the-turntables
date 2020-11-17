import React from 'react'
import {fetchAlbum} from '../store/album'
import {connect} from 'react-redux'
import {buy} from '../store/cart'
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
        <h1>SINGLE PAGE VIEW</h1>
        <h4>Id: {id}</h4>
        <h3>Artist: {band}</h3>
        <h2>Album: {name}</h2>
        <img src={imageUrl} />
        <h4>Tracklist: {songList}</h4>
        <h2>Genre: {category}</h2>
        <h3>Released: {releaseYear}</h3>
        <h1>Price: ${price}</h1>
        {!adminView && (
          <button
            type="submit"
            onClick={() => {
              this.props.buy(id)
            }}
          >
            Buy
          </button>
        )}
        <h2 />
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
