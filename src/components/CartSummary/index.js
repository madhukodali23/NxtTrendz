import './index.css'

const CartSummary = props => {
  const {cartList} = props
  let totalPrice = 0
  cartList.forEach(eachItem => {
    const {quantity, price} = eachItem
    totalPrice += quantity * price
  })
  return (
    <div className="cart-summary-container">
      <h1 className="order-total-heading">
        Order Total:{' '}
        <span className="order-total-price">Rs {totalPrice}/-</span>
      </h1>
      <p className="order-list-items">{cartList.length} Items in cart</p>
      <button type="button" className="checkout-button">
        Checkout
      </button>
    </div>
  )
}

export default CartSummary
