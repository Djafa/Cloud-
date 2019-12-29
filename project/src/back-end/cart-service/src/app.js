const express = require('express')
const log = require('debug')('cart-d') 
const app = express.Router()
const db = require('./utils/crud-wp') 
//const dbLogs = require('./log-helper')
var logDb = "logging-service:80"
var axios = require('axios')
//quand on fait un post avec axios, on passe den deuxième paramètre le data, qui correspond à la requête, c'est pr ça qu'on peut récup les infos
app.post('/cart', (req, res) => {  
  var usr = req.body.username
  var products = req.body.products
  var totalItems = req.body.totalItems
  var totalAmount = req.body.totalAmount
  var category = req.body.category

  log(`Creating a new user cart for (${usr})`)
  return db.createCart(usr, products, totalItems, totalAmount, category) //SAMIR : createUser retourne une Promise c'est pour ça qu'après on peut faire un .then dessus
    .then((cart) => { //SAMIR  : Les callbacks ajoutés grâce à then seront appelés, y compris après le succès ou l'échec de l'opération asynchrone
        axios.post(`http://${logDb}/logs`, {"logs": products})
        .then((token) => {
          res.status(200).json({ status: 'success', products })
        })
        .catch((err) => {
          res.status(500).json({ status: 'error', message: String(err) })
        })

    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
})

app.get('/cart/:username', (req, res) => {
  var usr = req.params.username
  log(`Getting user cart of (${usr})`)
  return db.getCart(usr)
    .then((cart) => {
      res.status(200).json({ status: 'success', cart })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
})

app.delete('/cart/:username', (req, res) => {
  var usr = req.params.username
  log(`Deletting user cart of (${usr})`)
  return db.deleteCart(usr)
    .then((token) => {
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
})

app.put('/cart/:username', (req, res) => {
  var usr = req.params.username
  var products = req.body.products
  var totalItems = req.body.totalItems
  var totalAmount = req.body.totalAmount
  var category = req.body.category
  log(`Updating user cart of (${usr})`)
  return db.deleteCart(usr)
    .then((token) => {
      return db.createCart(usr, products, totalItems, totalAmount, category)
        .then((cart) => {
          res.status(200).json({ status: 'success', cart })
        })
        .catch((err) => {
          res.status(500).json({ status: 'error', message: String(err) })
        })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    }) 
})

module.exports = app
