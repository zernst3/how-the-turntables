import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Cart, Checkout} from './components'
import {me, getCart} from './store'
import AllNewAlbums from './components/AllNewAlbums'
import SingleAlbum from './components/SingleAlbum'
import AdminViewProducts from './components/AdminViewProducts'
import AdminView from './components/AdminView'
/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    this.props.getCart()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}

        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={AllNewAlbums} />
        <Route path="/album/:id" component={SingleAlbum} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        {isAdmin && (
          <Switch>
            <Route path="/admin" component={AdminView} />
            <Route path="/adminproducts" component={AdminViewProducts} />
          </Switch>
        )}
        <Redirect from="/" to="/home" />
      </Switch>
    )
  }
}
// {isLoggedIn && (
//   <Switch>
//     {/* Routes placed here are only available after logging in */}
//     <Route path="/home" component={UserHome} />
//   </Switch>
// )}
// {/* Displays our Login component as a fallback */}
// <Route component={Login} />

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    // loadInitialData() {
    //   dispatch(me())
    // },
    loadInitialData: () => dispatch(me()),
    getCart: () => dispatch(getCart()),
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
