import React from 'react'
import {Link} from 'react-router-dom'
import './Button.css'
import './AdminView.css'

const AdminView = () => {
  return (
    <div id="adminview">
      <Link to="/adminproducts">
        <button type="submit">Products</button>
      </Link>
      <button type="button">Users</button>
      <button type="button">Sales Reports</button>
      <button type="button">Inventory Management</button>
    </div>
  )
}

export default AdminView
