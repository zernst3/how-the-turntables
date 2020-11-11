import React from 'react'
import {Link} from 'react-router-dom'

const CartItem = ({title, artistName, imageUrl, price, amount}) => {
  return (
    <div>
      <h3>
        <Link to="album/1">
          {title} - {artistName}
        </Link>
      </h3>
      <img src={imageUrl} />
      <h3>
        Price: ${(price / 100).toFixed(2)} - Total: $
        {((price * amount) / 100).toFixed(2)}
      </h3>
      <input type="number" value={amount} />
    </div>
  )
}

export default CartItem
