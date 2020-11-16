import React from 'react'
import {connect} from 'react-redux'
import {thunkToAddNewAlbum} from '../store/allNewAlbums'
import AdminFormProduct from './admin-form-product'

class AdminNewAlbum extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  async handleSubmit(event) {
    event.preventDefault()
    this.props.handleClick('showAddForm', undefined)
    const newAlbum = this.state
    await this.props.thunkToAddNewAlbum(newAlbum)
    this.setState({
      albumTitle: '',
      artistName: '',
      image: '',
      price: '',
      songList: '',
      releaseYear: '',
      category: '',
      inventory: 0,
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

const mapDispatch = (dispatch) => {
  return {
    thunkToAddNewAlbum: (newAlbum) => dispatch(thunkToAddNewAlbum(newAlbum)),
  }
}

const ConnectedAdminNewAlbum = connect(null, mapDispatch)(AdminNewAlbum)

export default ConnectedAdminNewAlbum
