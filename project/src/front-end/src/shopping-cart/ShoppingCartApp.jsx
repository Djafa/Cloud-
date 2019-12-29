import React, { Component } from 'react'
import Header from './components/Header'
import Products from './components/Products'
import QuickView from './components/QuickView'
import Checkout from './components/Checkout'
import LocalPurchases from '../interfaces/LocalPurchases'
import axios from 'axios'
import {usr} from '../interfaces/AuthenticationService.jsx'

const PurchasesService = LocalPurchases
//const logDb = "(order-service:shopapp):80"

class ShoppingCartApp extends Component {
  componentWillMount () {
    this.initialiseState(true)
  }
  constructor (props) {
    super(props)
    this.handleCategory = this.handleCategory.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.sumTotalItems = this.sumTotalItems.bind(this)
    this.sumTotalAmount = this.sumTotalAmount.bind(this)
    this.checkProduct = this.checkProduct.bind(this)
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.endCheckout = this.endCheckout.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  initialiseState (firstCall) {
    if (firstCall) {
      this.state = {
        products: [],
        cart: [],
        totalItems: 0,
        totalAmount: 0,
        term: '',
        category: '',
        cartBounce: false,
        quickViewProduct: {},
        modalActive: false,
        doCheckout: false,
        purchaseId: null,
        oldPurchases: [],
        purService: new PurchasesService()
      }
      this.state.purService.setHandlers(
        (list) => { this.setState({ products: list }) },
        (hist) => { this.setState({ oldPurchases: hist }) }
      )
    } else {
      this.setState({
        products: [],
        cart: [],
        totalItems: 0,
        totalAmount: 0,
        term: '',
        category: '',
        cartBounce: false,
        quickViewProduct: {},
        modalActive: false,
        doCheckout: false,
        purchaseId: null,
        oldPurchases: []
      })
    }
    this.state.purService.fetchProducts()
    this.state.purService.fetchHistory()
  }

  handleCategory (event) { // Filter by Category
    this.setState({ category: event.target.value })

  }

  handleAddToCart (chosenProduct) { // Add to Cart
    let myCart = this.state.cart
    let productID = chosenProduct.id
    let productQty = chosenProduct.quantity
    if (this.checkProduct(productID)) {
      let index = myCart.findIndex(x => x.id === productID)
      myCart[index].quantity = Number(myCart[index].quantity) + Number(productQty)
      this.setState({
        cart: myCart
      })
    } else {
      myCart.push(chosenProduct)
    }
    this.setState({
      cart: myCart,
      cartBounce: true
    })

    setTimeout(function () {
      this.setState({ cartBounce: false })
    }.bind(this), 1000)
    this.sumTotalItems(this.state.cart)
    this.sumTotalAmount(this.state.cart)
  }

  handleRemoveProduct (id, e) {
    let cart = this.state.cart
    let index = cart.findIndex(x => x.id === id)
    cart.splice(index, 1)
    this.setState({
      cart: cart
    })
    this.sumTotalItems(this.state.cart)
    this.sumTotalAmount(this.state.cart)
    e.preventDefault()
  }

  checkProduct (productID) {
    let cart = this.state.cart
    return cart.some(function (item) {
      return item.id === productID
    })
  }

  sumTotalItems () {
    let total = 0
    let cart = this.state.cart
    total = cart.length
    this.setState({
      totalItems: total
    })
  }

  sumTotalAmount () {
    let total = 0
    let cart = this.state.cart
    for (var i = 0; i < cart.length; i++) {
      // eslint-disable-next-line
      total += cart[i].price * parseInt(cart[i].quantity)
    }
    this.setState({
      totalAmount: Number((total).toFixed(2))
    })
  }

  openModal (product) { // Open Modal
    this.setState({
      quickViewProduct: product,
      modalActive: true
    })
  }

  closeModal () { // Close Modal
    this.setState({
      modalActive: false
    })
  }
  //axios.post(`http://${logDb}/logs`, {"logs": products})
  handleCheckout (e) {
    e.preventDefault()
    this.setState({ doCheckout: true })

  }

  endCheckout () {
    console.log('END of CHECKOUT')
    this.initialiseState(false)
    // TODO
    // this.getPurHistory()

    var data = {}
    data.username = usr
    data.totalItems = this.state.totalItems
    data.totalAmount = this.state.totalAmount
    data.orders = this.state.cart[0].name
    if(data.totalItems>1)
    {
      for(var i = 1 ; i<data.totalItems ; i += 1)
      {
          data.orders = data.orders +"_" + this.state.cart[i].name
      }
      
    }


   axios.put('http://192.168.56.102:9000/history/'+usr, data)
          .then((res) => {
            console.log("get: ok")
          })
          .catch((error) => {
            console.log("get : ko")
              axios.post('http://192.168.56.102:9000/history', data)
              .then((res) => {
                console.log("post: ok")
              })
              .catch((error) => {
                console.log("post : ko")
              })
         })


    this.setState({ doCheckout: false })
  }

  /* eslint-disable */
  render () {
    const {doCheckout} = this.state
    return (
      <div>
        { doCheckout ?
          <Checkout
            id={this.state.purchaseId}
            purchase={this.state.cart}
            oldPurchases={this.state.oldPurchases}
            endCheckout={this.endCheckout}
						postPurchase={
              (purs, items)=>{this.state.purService.postPurchase(purs, items)}
            }
					/>
				: <div>
					<Header
						cartBounce={this.state.cartBounce}
						total={this.state.totalAmount}
						totalItems={this.state.totalItems}
						cartItems={this.state.cart}
						removeProduct={this.handleRemoveProduct}
						handleCategory={this.handleCategory}
						categoryTerm={this.state.category}
						handleCheckout={this.handleCheckout}
						setAuthStatus={this.props.setAuthStatus}
						authenticated={this.props.authenticated}
            logoutUser={this.props.logoutUser} />
					<Products
						productsList={this.state.products}
						searchTerm={this.state.term}
						addToCart={this.handleAddToCart}
						openModal={this.openModal}
						authenticated={this.props.authenticated} />
					<QuickView
						product={this.state.quickViewProduct}
            openModal={this.state.modalActive}
            closeModal={this.closeModal} />
				</div>
				}
      </div>
    )
  }
}

export default ShoppingCartApp
