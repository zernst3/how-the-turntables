import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, getCart} from '../store'
import './navbar.css'

export class Navbar extends React.Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    const {handleClick, isLoggedIn, cart} = this.props
    return (
      <div id="navbar-container">
        <Link to="/home">
          <h1>How the Turntables</h1>
        </Link>
        {/* <h1>How the Turntables</h1> */}
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              <Link to="/cart">
                Cart {cart.products && cart.products.length}
              </Link>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/cart">
                Cart {cart.products && cart.products.length}
              </Link>
            </div>
          )}
        </nav>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCart: () => dispatch(getCart()),
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
