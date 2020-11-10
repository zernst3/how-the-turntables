import React from 'react'
import {Link} from 'react-router-dom'

const Album = ({id, name, band, imageUrl}) => {
  return (
    <div className="singleAlbum">
      <Link to={`album/${id}`}>
        <h2>{band}</h2>
        <h3>Album: {name}</h3>
        <img src={imageUrl} />
      </Link>
    </div>
  )
}

export default Album
