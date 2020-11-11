import React from 'react'
import {fetchAlbum} from '../store/album'
import {connect} from 'react-redux'

export class SingleAlbum extends React.Component {
  componentDidMount() {
    this.props.fetchAlbum(1)
    //this.props.match.params.id
  }
  render() {
    const {id, name, band, imageUrl} = this.props.album

    return (
      <div className="singleAlbum" key={id}>
        <h1>SINGLE PAGE VIEW</h1>
        <h4>Id: {id}</h4>
        <h2>BAND: {band}</h2>
        <h2>ALBUM {name}</h2>
        <div>
          <img src={imageUrl} />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbum)
