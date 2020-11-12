import React from 'react'
import {Link} from 'react-router-dom'

const Album = ({
  id,
  name,
  band,
  imageUrl,
  songList,
  releaseYear,
  category,
  price
}) => {
  return (
    <div className="singleAlbum" key={id}>
      <Link to={`/album/${id}`}>
        <h2>{band}</h2>
        <h3>Album: {name}</h3>
        <img src={imageUrl} />
        <h4>Songs: {songList}</h4>
        <h4>Year: {releaseYear}</h4>
        <h1>Category: {category}</h1>
        <h3>Price: ${price}</h3>
      </Link>
    </div>
  )
}

export default Album
