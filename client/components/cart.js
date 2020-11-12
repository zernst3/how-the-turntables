import React from 'react'
import {connect} from 'react-redux'
import {getCart, removeItemFromCart} from '../store'
import CartItem from './cart-item'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor() {
    super()
    this.removeItem = this.removeItem.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  async removeItem(id) {
    await this.props.removeItemFromCart(id)
  }

  render() {
    console.log(this.props.cart)
    return (
      <div>
        <h1>Your Cart:</h1>
        {this.props.cart.products && this.props.cart.products.length > 0 ? (
          this.props.cart.products.map((item, idx) => {
            return (
              <CartItem
                key={idx}
                id={item.id}
                title={item.title}
                artistName={item.artistName}
                imageUrl={item.imageUrl}
                price={item.price}
                amount={item.amount}
                removeItem={this.removeItem}
              />
            )
          })
        ) : this.props.cart.products &&
          this.props.cart.products.length === 0 ? (
          <h1>Your cart is empty</h1>
        ) : (
          <h1>Loading...</h1>
        )}
        <button type="submit" onClick={() => console.log('Buy Now')}>
          Buy Now
        </button>
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
    getCart: () => dispatch(getCart()),
    removeItemFromCart: (id) => dispatch(removeItemFromCart(id)),
  }
}

export default connect(mapState, mapDispatch)(Cart)
