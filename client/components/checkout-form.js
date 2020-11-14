import React from 'react'

// Source: Convert credit card number with only last four digits:
// https://www.codeproject.com/questions/481820/creditpluscardplusnumberplusenteredplusshouldplusb

const CheckoutForm = (props) => {
  const {
    email,
    creditCards,
    selectedCreditCard,
    billingAddresses,
    shippingAddresses,
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
        <select name="selectedCreditCard" onChange={(evt) => handleChange(evt)}>
          <option value={JSON.stringify(selectedCreditCard)}>
            Current Credit Card:{' '}
            {selectedCreditCard.creditCardNumber &&
            selectedCreditCard.creditCardNumber.length > 4
              ? new Array(selectedCreditCard.creditCardNumber.length - 3).join(
                  '*'
                ) +
                selectedCreditCard.creditCardNumber.substr(
                  selectedCreditCard.creditCardNumber.length - 4,
                  4
                )
              : selectedCreditCard.creditCardNumber}
          </option>
          {creditCards[0] &&
            creditCards.map((creditCard) => (
              <option value={JSON.stringify(creditCard)}>
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
          value={selectedCreditCard.creditCardNumber}
          onChange={(evt) => handleChange(evt)}
        />
        <label htmlFor="selectedCreditCard.cvv">CVV Number:</label>
        <input
          type="text"
          name="selectedCreditCard.cvv"
          value={selectedCreditCard.cvv}
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
          value={selectedCreditCard.expirationMonth}
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
          value={selectedCreditCard.expirationYear}
          onChange={(evt) => handleChange(evt)}
        />

        {/*
        ============== Billing Address ==================
        */}

        {/*
        ============== Shipping Address ==================
        */}

        {/*
        ============== Email ==================
        */}
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(evt) => handleChange(evt)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CheckoutForm
