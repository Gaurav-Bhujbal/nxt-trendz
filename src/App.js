import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const productItem = cartList.find(each => each.id === product.id)

    if (productItem === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updatedQuantityList = cartList.map(each => {
        if (each.id === productItem.id) {
          return {...each, quantity: each.quantity + product.quantity}
        }
        return each
      })
      this.setState({cartList: updatedQuantityList})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(each => each.id !== id)
    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    this.setState({cartList: updatedList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    let removeItem = false
    const updatedList = cartList.map(each => {
      if (each.id === id) {
        if (each.quantity === 1) {
          removeItem = true
          return each
        }
        return {...each, quantity: each.quantity - 1}
      }
      return each
    })
    if (removeItem) {
      const newList = updatedList.filter(each => each.id !== id)
      this.setState({cartList: newList})
    } else {
      this.setState({cartList: updatedList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
