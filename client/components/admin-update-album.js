import React from 'react'
import {connect} from 'react-redux'
import {thunkToUpdateAlbum} from '../store/allNewAlbums'
import AdminFormProduct from './admin-form-product'

class AdminUpdateAlbum extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      albumTitle: '',
      artistName: '',
      image: '',
      price: '',
      songList: '',
      releaseYear: '',
      category: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.setState({
      id: this.props.album.id,
      albumTitle: this.props.album.title,
      artistName: this.props.album.artistName,
      image: this.props.album.imageUrl,
      price: this.props.album.price,
      songList: this.props.album.songList,
      releaseYear: this.props.album.releaseYear,
      category: this.props.album.category,
      inventory: this.props.album.inventory,
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  async handleSubmit(event) {
    event.preventDefault()
    const updatedAlbum = {
      id: this.state.id,
      albumTitle: this.state.albumTitle,
      artistName: this.state.artistName,
      image: this.state.image,
      price: this.state.price,
      songList: this.state.songList,
      releaseYear: this.state.releaseYear,
      category: this.state.category,
    }
    await this.props.thunkToUpdateAlbum(updatedAlbum)
    this.setState({
      id: '',
      albumTitle: '',
      artistName: '',
      image: '',
      price: '',
      songList: '',
      releaseYear: '',
      category: '',
    })
  }
  render() {
    return (
      <AdminFormProduct
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

const mapState = (state) => {
  return {
    albums: state.albums,
  }
}

const mapDispatch = (dispatch) => {
  return {
    thunkToUpdateAlbum: (updatedAlbum) =>
      dispatch(thunkToUpdateAlbum(updatedAlbum)),
  }
}

const ConnectedAdminUpdateAlbum = connect(
  mapState,
  mapDispatch
)(AdminUpdateAlbum)
export default ConnectedAdminUpdateAlbum
