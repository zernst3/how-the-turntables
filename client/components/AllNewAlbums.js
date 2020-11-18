import React from 'react'
import {connect} from 'react-redux'
import Album from './Album'
import {fetchNewAlbums} from '../store/allNewAlbums'
import {buy} from '../store'
import {Link} from 'react-router-dom'
import './AllNewAlbums.css'

export class AllNewAlbums extends React.Component {
  componentDidMount() {
    this.props.fetchNewAlbums()
    //  const initState =this.props.getInitialState()
    //  console.log(initState, 'INITSTATE')
    //  this.props.setCart()
  }

  render() {
    if (!this.props.albums) {
      return <div className="waiting">Loading New Albums...</div>
    }

    const colors = [
      'd14345',
      'e8df65',
      '178190',
      'dd9b54',
      '437b6d',
      'e97685',
      '555650',
      'dacbb0',
      '905a80',
    ]

    return (
      <div className="allNewAlbums">
        {this.props.albums.map((album) => {
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
              buy={this.props.buy}
              color={colors[Math.floor(Math.random() * colors.length)]}
            />
          )
        })}
      </div>
    ) //return
  } //render
} //class

const mapStateToProps = (state) => {
  return {
    albums: state.albums,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNewAlbums: () => dispatch(fetchNewAlbums()),
    buy: (id) => {
      dispatch(buy(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllNewAlbums)
