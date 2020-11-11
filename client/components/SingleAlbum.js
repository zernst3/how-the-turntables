import React from 'react'
import {fetchAlbum} from '../singleAlbum'
import {connect} from 'react-redux'

export class SingleAlbum extends React.Component {
  componentDidMount() {
    this.props.fetchAlbum(1)
    //this.props.match.params.id
  }
  render() {
    //  const {id, name, band, imageUrl} = this.props.album
    // <h4>Id: {id}</h4>
    // <h2>{band}</h2>
    // <h2>{name}</h2>
    // <img>{imageUrl}</img>
    // <div className="singleAlbum" key={id}>
    //   </div>
    console.log('SOMETNIHG\n\n')
    return <h1>HELLO</h1> //return ende
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbum)
