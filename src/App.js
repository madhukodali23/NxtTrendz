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
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const isProductExists = cartList.find(
      eachProduct => eachProduct.id === product.id,
    )
    if (isProductExists === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updatedCartList = cartList.map(item =>
        item.id === product.id
          ? {...item, quantity: item.quantity + product.quantity}
          : item,
      )
      this.setState({cartList: updatedCartList})
    }
  }

  removeCartItem = productId => {
    const {cartList} = this.state
    const filteredProductList = cartList.filter(
      eachProduct => eachProduct.id !== productId,
    )
    this.setState({cartList: filteredProductList})
  }

  incrementCartItemQuantity = productDetails => {
    const {cartList} = this.state
    const updatedList = cartList.map(eachProduct => {
      if (eachProduct.id === productDetails.id) {
        return {...eachProduct, quantity: eachProduct.quantity + 1}
      }
      return eachProduct
    })
    this.setState({cartList: updatedList})
  }

  decrementCartItemQuantity = productDetails => {
    const {cartList} = this.state
    const updatedList = cartList
      .map(eachProduct => {
        if (eachProduct.id === productDetails.id) {
          return {...eachProduct, quantity: eachProduct.quantity - 1}
        }
        return eachProduct
      })
      .filter(product => product.quantity > 0)
    this.setState({cartList: updatedList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
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
