import React from 'react'
import {Link} from 'react-router-dom'
import './Button.css'

const AdminView = () => {
  return (
    <div id="adminview">
      <Link to="/adminproducts">
        <button>Products</button>
      </Link>
      <button>Users</button>
      <button>Sales Reports</button>
      <button>Stock</button>
    </div>
  )
}

export default AdminView
