import React from 'react'
import {Link} from 'react-router-dom'

const CartItem = ({
  id,
  title,
  artistName,
  imageUrl,
  price,
  quantity,
  removeItem,
  updateQuantity,
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
        {((price * quantity) / 100).toFixed(2)}
      </h3>
      <h3>Quantity:</h3>

      <select
        onChange={(evt) => {
          updateQuantity(id, evt.target.value)
        }}
      >
        <option value={quantity}>Current Quantity: {quantity}</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <button
        type="submit"
        onClick={() => {
          removeItem(id)
        }}
      >
        Delete
      </button>
    </div>
  )
}

export default CartItem
