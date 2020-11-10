import React from 'react'
import {fetchAlbum} from '../singleAlbum'

export class SingleAlbum extends React.Component {
  componentDidMount() {
    this.props.fetchAlbum(1)
  }
  render() {
    const {id, name, band, imageUrl} = this.props.album

    return (
      <div className="singleAlbum" key={id}>
        <h4>Id: {id}</h4>
        <h2>{band}</h2>
        <h2>{name}</h2>
        <img>{imageUrl}</img>
      </div>
    ) //return ende
  } //render ende
} //class ende

const mapStateToProps = state => {
  return {
    album: state.album
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbum: id => dispatch(fetchAlbum(id))
  }
}

export default SingleAlbum
