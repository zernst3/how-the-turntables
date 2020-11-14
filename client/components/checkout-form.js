import React from 'react'
import './checkout-form.css'

// Source: Convert credit card number with only last four digits:
// https://www.codeproject.com/questions/481820/creditpluscardplusnumberplusenteredplusshouldplusb

// eslint-disable-next-line complexity
const CheckoutForm = (props) => {
  const {
    email,
    creditCards,
    selectedCreditCard,
    addresses,
    selectedBillingAddress,
    selectedShippingAddress,
    handleChange,
    handleSubmit,
  } = props
  return (
    <div id="checkout-form">
      <form onSubmit={(event) => handleSubmit(event)}>
        {/*
        ============== Credit Card ==================
        */}

        <div className="form-block">
          <h3>Credit Card:</h3>
          <label htmlFor="selectedCreditCard.fullName">
            Name on Credit Card:
          </label>
          <input
            type="text"
            name="selectedCreditCard.fullName"
            value={selectedCreditCard.fullName || ''}
            onChange={(evt) => handleChange(evt)}
          />
          <label htmlFor="selectedCreditCard">Choose a credit card:</label>
          <select
            name="selectedCreditCard"
            onChange={(evt) => handleChange(evt)}
          >
            <option
              value={JSON.stringify(selectedCreditCard) || JSON.stringify({})}
            >
              Current Credit Card:{' '}
              {selectedCreditCard.creditCardNumber &&
              selectedCreditCard.creditCardNumber.length > 4
                ? new Array(
                    selectedCreditCard.creditCardNumber.length - 3
                  ).join('*') +
                  selectedCreditCard.creditCardNumber.substr(
                    selectedCreditCard.creditCardNumber.length - 4,
                    4
                  )
                : selectedCreditCard.creditCardNumber}
            </option>
            {creditCards[0] &&
              creditCards.map((creditCard) => (
                <option
                  key={creditCard.id}
                  value={JSON.stringify(creditCard) || ''}
                >
                  {new Array(creditCard.creditCardNumber.length - 3).join('*') +
                    creditCard.creditCardNumber.substr(
                      creditCard.creditCardNumber.length - 4,
                      4
                    )}
                </option>
              ))}
          </select>
          <label htmlFor="selectedCreditCard.creditCardNumber">
            Credit Card Number:
          </label>
          <input
            type="text"
            name="selectedCreditCard.creditCardNumber"
            value={selectedCreditCard.creditCardNumber || ''}
            onChange={(evt) => handleChange(evt)}
          />
          <label htmlFor="selectedCreditCard.cvv">CVV Number:</label>
          <input
            type="text"
            name="selectedCreditCard.cvv"
            value={selectedCreditCard.cvv || ''}
            onChange={(evt) => handleChange(evt)}
          />
          <label htmlFor="selectedCreditCard.expirationMonth">
            Expiration Month:
          </label>
          <input
            type="number"
            min="1"
            max="12"
            name="selectedCreditCard.expirationMonth"
            value={selectedCreditCard.expirationMonth || ''}
            onChange={(evt) => handleChange(evt)}
          />
          <label htmlFor="selectedCreditCard.expirationYear">
            Expiration Year:
          </label>
          <input
            type="number"
            min={new Date().getFullYear() - 10}
            max={new Date().getFullYear() + 10}
            name="selectedCreditCard.expirationYear"
            value={selectedCreditCard.expirationYear || ''}
            onChange={(evt) => handleChange(evt)}
          />
        </div>

        {/*
        ============== Billing Address ==================
        */}

        <div className="form-block">
          <h3>Billing Address:</h3>
          <label htmlFor="selectedBillingAddress">Choose an address:</label>
          <select
            name="selectedBillingAddress"
            onChange={(evt) => handleChange(evt)}
          >
            <option
              value={
                JSON.stringify(selectedBillingAddress) || JSON.stringify({})
              }
            >
              Selected Billing Address:{' '}
              {selectedBillingAddress.fullName &&
                `${selectedBillingAddress.fullName}; ${selectedBillingAddress.street}; ${selectedBillingAddress.city}, ${selectedBillingAddress.state} ${selectedBillingAddress.zipCode}`}
            </option>
            {addresses[0] &&
              addresses.map((address) => (
                <option key={address.id} value={JSON.stringify(address) || ''}>
                  {address.fullName &&
                    `${address.fullName}; ${address.street}; ${address.city}, ${address.state} ${address.zipCode}`}
                </option>
              ))}
          </select>
          <label htmlFor="selectedBillingAddress.fullName">Address Name:</label>
          <input
            type="text"
            name="selectedBillingAddress.fullName"
            value={selectedBillingAddress.fullName || ''}
            onChange={(evt) => handleChange(evt)}
          />
          <label htmlFor="selectedBillingAddress.street">Address Street:</label>
          <input
            type="text"
            name="selectedBillingAddress.street"
            value={selectedBillingAddress.street || ''}
            onChange={(evt) => handleChange(evt)}
          />
          <label htmlFor="selectedBillingAddress.city">Address City:</label>
          <input
            type="text"
            name="selectedBillingAddress.city"
            value={selectedBillingAddress.city || ''}
            onChange={(evt) => handleChange(evt)}
          />
          <label htmlFor="selectedBillingAddress.state">Address State:</label>
          <input
            type="text"
            name="selectedBillingAddress.state"
            value={selectedBillingAddress.state || ''}
            onChange={(evt) => handleChange(evt)}
          />
          <label htmlFor="selectedBillingAddress.zipCode">
            Address Zip Code:
          </label>
          <input
            type="text"
            name="selectedBillingAddress.zipCode"
            value={selectedBillingAddress.zipCode || ''}
            onChange={(evt) => handleChange(evt)}
          />
        </div>

        {/*
        ============== Shipping Address ==================
        */}

        <div className="form-block">
          <h3>Shipping Address:</h3>
          <label htmlFor="selectedShippingAddress">Choose an address:</label>
          <select
            name="selectedShippingAddress"
            onChange={(evt) => handleChange(evt)}
          >
            <option
              value={
                JSON.stringify(selectedShippingAddress) || JSON.stringify({})
              }
            >
              Selected Shipping Address:{' '}
              {selectedShippingAddress.fullName &&
                `${selectedShippingAddress.fullName}; ${selectedShippingAddress.street}; ${selectedShippingAddress.city}, ${selectedShippingAddress.state} ${selectedShippingAddress.zipCode}`}
            </option>
            {addresses[0] &&
              addresses.map((address) => (
                <option key={address.id} value={JSON.stringify(address) || ''}>
                  {address.fullName &&
                    `${address.fullName}; ${address.street}; ${address.city}, ${address.state} ${address.zipCode}`}
                </option>
              ))}
          </select>
          <label htmlFor="selectedShippingAddress.fullName">
            Address Name:
          </label>
          <input
            type="text"
            name="selectedShippingAddress.fullName"
            value={selectedShippingAddress.fullName || ''}
            onChange={(evt) => handleChange(evt)}
          />
          <label htmlFor="selectedShippingAddress.street">
            Address Street:
          </label>
          <input
            type="text"
            name="selectedShippingAddress.street"
            value={selectedShippingAddress.street || ''}
            onChange={(evt) => handleChange(evt)}
          />
          <label htmlFor="selectedShippingAddress.city">Address City:</label>
          <input
            type="text"
            name="selectedShippingAddress.city"
            value={selectedShippingAddress.city || ''}
            onChange={(evt) => handleChange(evt)}
          />
          <label htmlFor="selectedShippingAddress.state">Address State:</label>
          <input
            type="text"
            name="selectedShippingAddress.state"
            value={selectedShippingAddress.state || ''}
            onChange={(evt) => handleChange(evt)}
          />
          <label htmlFor="selectedShippingAddress.zipCode">
            Address Zip Code:
          </label>
          <input
            type="text"
            name="selectedShippingAddress.zipCode"
            value={selectedShippingAddress.zipCode || ''}
            onChange={(evt) => handleChange(evt)}
          />
        </div>

        {/*
        ============== Email ==================
        */}

        <div className="form-block">
          <h3>Email:</h3>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(evt) => handleChange(evt)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CheckoutForm
