// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalAmount = 0
      cartList.forEach(each => {
        totalAmount += each.quantity * each.price
      })
      return (
        <div className="CartSummary-container">
          <h1 className="order-total-text">
            Order Total:{' '}
            <span className="total-amount">Rs {totalAmount}/-</span>
          </h1>
          <p className="Items-in-cart">{cartList.length} Items in cart</p>
          <button className="Checkout-btn">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
