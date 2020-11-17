import React from 'react'
import {connect} from 'react-redux'
import {getCart, removeItemFromCart, updateQuantity} from '../store'
import {Link} from 'react-router-dom'
import CartItem from './cart-item'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor() {
    super()
    this.removeItem = this.removeItem.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
  }

  async removeItem(id) {
    await this.props.removeItemFromCart(id)
  }

  async updateQuantity(id, quantity) {
    await this.props.updateQuantity(id, quantity)
  }

  render() {
    let total = 0
    return (
      <div>
        <h1>Your Cart:</h1>
        {this.props.cart.products && this.props.cart.products.length > 0 ? (
          this.props.cart.products.map((item) => {
            total = total + item.OrderItem.quantity * item.price
            return (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                artistName={item.artistName}
                imageUrl={item.imageUrl}
                price={item.price}
                quantity={item.OrderItem.quantity}
                removeItem={this.removeItem}
                updateQuantity={this.updateQuantity}
              />
            )
          })
        ) : this.props.cart.products &&
          this.props.cart.products.length === 0 ? (
          <h1>Your cart is empty</h1>
        ) : (
          <h1>Loading...</h1>
        )}
        <div>Total: ${(total / 100).toFixed(2)}</div>
        <Link to="/checkout">Checkout</Link>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    cart: state.cart,
  }
}

const mapDispatch = (dispatch) => {
  return {
    removeItemFromCart: (id) => dispatch(removeItemFromCart(id)),
    updateQuantity: (id, quantity) => dispatch(updateQuantity(id, quantity)),
  }
}

export default connect(mapState, mapDispatch)(Cart)
