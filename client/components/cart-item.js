import React from 'react'
import {Link} from 'react-router-dom'

const CartItem = ({
  id,
  title,
  artistName,
  imageUrl,
  price,
  amount,
  removeItem,
}) => {
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
      <h3>Quantity:</h3>
      <input
        type="number"
        defaultValue={amount}
        onChange={(evt) => {
          console.log('Amount changed: ', evt.target.value)
        }}
      />
      <button
        type="submit"
        onClick={() => {
          console.log('Remove item from cart')
          removeItem(id)
        }}
      >
        Delete
      </button>
    </div>
  )
}

export default CartItem
