import React from 'react'
import {Link} from 'react-router-dom'
import './Album.css'
import './Button.css'

const Album = ({
  id,
  name,
  band,
  imageUrl,
  songList,
  releaseYear,
  category,
  price,
  buy,
  adminView,
  color,
}) => {
  return (
    <div style={{backgroundColor: `#${color}`}} className="Album" key={id}>
      <Link to={`/album/${id}`}>
        <h2>{band}</h2>
        <h3>Album: {name}</h3>
        <img src={imageUrl} />
        <h1>Category: {category}</h1>
        <h3>Price: ${(price / 100).toFixed(2)}</h3>
      </Link>
      {!adminView && (
        <button
          type="submit"
          onClick={() => {
            buy(id)
          }}
        >
          <img src="/buy.jpg" />
        </button>
      )}
    </div>
  )
}

export default Album
