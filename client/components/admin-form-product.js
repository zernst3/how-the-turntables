import React from 'react'

const AdminFormProduct = (props) => {
  return (
    <div className="form">
      <p>Fill in:</p>
      <form onSubmit={props.handleSubmit}>
        <label>
          Album Title:{' '}
          <input
            type="text"
            name="albumTitle"
            onChange={props.handleChange}
            value={props.albumTitle}
            required
          />
        </label>
        <br />
        <label>
          Artist Name:{' '}
          <input
            type="text"
            name="artistName"
            onChange={props.handleChange}
            value={props.artistName}
            required
          />
        </label>
        <br />
        <label>
          Image:{' '}
          <input
            type="text"
            name="image"
            onChange={props.handleChange}
            value={props.image}
          />
        </label>
        <br />
        <label>
          Price:{' '}
          <input
            type="number"
            name="price"
            onChange={props.handleChange}
            value={props.price}
            required
          />
        </label>
        <br />
        <label>
          Inventory{' '}
          <input
            type="number"
            name="inventory"
            onChange={props.handleChange}
            value={props.inventory}
            required
          />
        </label>
        <br />
        <label>
          Song List:{' '}
          <input
            type="text"
            name="songList"
            onChange={props.handleChange}
            value={props.songList}
          />
        </label>
        <br />
        <label>
          Release Year:{' '}
          <input
            type="text"
            name="releaseYear"
            onChange={props.handleChange}
            value={props.releaseYear}
          />
        </label>
        <br />
        <label>
          Category:{' '}
          <input
            type="text"
            name="category"
            onChange={props.handleChange}
            value={props.category}
          />
        </label>
        <button type="submit" id="submit" value="Submit">
          Submit Album
        </button>
      </form>
    </div>
  )
}

export default AdminFormProduct
