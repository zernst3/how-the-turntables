import React from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store'
import CartItem from './cart-item'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    return (
      <div>
        <h1>Your Cart:</h1>
        {this.props.cart.map((item, idx) => {
          return (
            <CartItem
              key={idx}
              title={item.title}
              artistName={item.artistName}
              imageUrl={item.imageUrl}
              price={item.price}
              amount={item.amount}
            />
          )
        })}
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
  }
}

export default connect(mapState, mapDispatch)(Cart)
