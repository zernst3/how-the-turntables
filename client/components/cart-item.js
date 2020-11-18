import React from 'react'
import {Link} from 'react-router-dom'
import './Album.css'
import './Button.css'
import './Cart.css'

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
    <div className="cartItem">
      <img src={imageUrl} />
      <div className="info">
        <Link to={`/album/${id}`}>
          <h1>{title}</h1>
          <h2>{artistName}</h2>
        </Link>
        <div className="itemPricing">
          <p>Unit Price: ${(price / 100).toFixed(2)}</p>
          <p>Quantity:</p>

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
          <p>Total: ${((price * quantity) / 100).toFixed(2)}</p>
          <button
            type="submit"
            onClick={() => {
              removeItem(id)
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
