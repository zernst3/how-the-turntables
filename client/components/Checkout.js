import React from 'react'
import {connect} from 'react-redux'
import {getUserCheckout} from '../store'
import {Link} from 'react-router-dom'
import './checkout.css'
import CheckoutForm from './checkout-form'

/**
 * COMPONENT
 */
class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      total: 0,
      email: '',
      creditCards: [],
      selectedCreditCard: {},
      addresses: [],
      selectedBillingAddress: {},
      selectedShippingAddress: {},
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    await this.props.getUserCheckout()

    if (this.props.userCheckout.Addresses) {
      this.setState({
        addresses: this.props.userCheckout.Addresses,
        selectedBillingAddress: this.props.userCheckout.Addresses[0],
        selectedShippingAddress: this.props.userCheckout.Addresses[0],
      })
    }

    if (this.props.userCheckout.email) {
      this.setState({
        email: this.props.userCheckout.email,
      })
    }

    if (this.props.userCheckout.creditCards) {
      this.setState({
        creditCards: this.props.userCheckout.creditCards,
        selectedCreditCard: this.props.userCheckout.creditCards[0],
      })
    }

    const products =
      (this.props.userCheckout.orders &&
        this.props.userCheckout.orders[0].products) ||
      []

    products.map((item) =>
      this.setState({
        total: this.state.total + item.OrderItem.quantity * item.price,
      })
    )
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handleChange(event) {
    let newValue
    if (event.target.value[0] === '{') {
      newValue = JSON.parse(event.target.value)
    } else {
      newValue = event.target.value
    }

    const obj = this.generate(event.target.name.split('.'), newValue, 0)

    const currentStateObj = this.state[event.target.name.split('.')[0]]
    const newObj = {...currentStateObj, ...obj[event.target.name.split('.')[0]]}

    if (event.target.name.split('.').length > 1) {
      this.setState({[event.target.name.split('.')[0]]: newObj})
    } else {
      this.setState({...obj})
    }
  }

  generate(arr, value, index) {
    return {
      [arr[index]]:
        index === arr.length - 1 ? value : this.generate(arr, value, index + 1),
    }
  }

  render() {
    const products =
      (this.props.userCheckout.orders &&
        this.props.userCheckout.orders[0].products) ||
      undefined
    return (
      <div id="checkout">
        <h1>Checkout:</h1>

        {products && products.length > 0 ? (
          <React.Fragment>
            <table>
              <thead>
                <tr>
                  <td>Item</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Item Total</td>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => {
                  return (
                    <React.Fragment key={item.id}>
                      <tr>
                        <td>
                          <Link to={`/album/${item.id}`}>{item.title}</Link>
                        </td>
                        <td>${(item.price / 100).toFixed(2)}</td>
                        <td>{item.OrderItem.quantity}</td>
                        <td>
                          $
                          {(
                            (item.OrderItem.quantity * item.price) /
                            100
                          ).toFixed(2)}
                        </td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
            <div>Total: ${(this.state.total / 100).toFixed(2)}</div>
            <CheckoutForm
              email={this.state.email}
              creditCards={this.state.creditCards}
              selectedCreditCard={this.state.selectedCreditCard}
              addresses={this.state.addresses}
              selectedBillingAddress={this.state.selectedBillingAddress}
              selectedShippingAddress={this.state.selectedShippingAddress}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </React.Fragment>
        ) : products && products.length === 0 ? (
          <h1>
            <Link to="/home">Your cart is empty, continue shopping</Link>
          </h1>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userCheckout: state.checkout,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUserCheckout: () => dispatch(getUserCheckout()),
  }
}

export default connect(mapState, mapDispatch)(Checkout)
