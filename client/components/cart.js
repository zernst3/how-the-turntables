import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  render() {
    console.log(props)
    return (
      <div>
        <h1>Your Cart:</h1>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {}

export default connect(mapState)(Cart)
