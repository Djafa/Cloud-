const express = require('express')
const log = require('debug')('orders-d')
const axios = require('axios')
const app = express.Router()
const dbOrders = require('./utils/crud-wp')
var logDb = "logging-service:80"

app.post('/history', (req, res) => {
  var username = req.body.username
  var orders = req.body.orders
  var totalItems = req.body.totalItems
  var totalAmount = req.body.totalAmount
  log(`Creating a new history (${username})`)
  return dbOrders.createItem(username,orders, totalItems, totalAmount)
    .then((token) => {
      axios.post(`http://${logDb}/logs`, {"username": username, "logs": orders})
      .then((order) => {
        res.status(200).json({ status: 'success', orders })
      })
      .catch((err) => {
        res.status(500).json({ status: 'error', message: String(err) })
      })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
})

app.get('/history/:username', (req, res) => {
  var username = req.params.username
  log(`Getting history (${username})`)
  return dbOrders.getItem(username)
    .then((token) => {
      console.log(token)
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
})

app.put('/history/:username', (req, res) => {
  var usr = req.params.username
  var orders = req.body.orders
  var totalItems = req.body.totalItems
  var totalAmount = req.body.totalAmount
  log(`Updating user cart of (${usr})`)
  return dbOrders.getItem(usr)
    .then((token) => {
      console.log("gugugu")
      console.log(token.orders)
      var tempo = token.orders+"_"+orders
      return dbOrders.deleteItem(usr)
        .then((cart) => {
          return dbOrders.createItem(usr, tempo, totalItems, totalAmount)
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
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    }) 
})





module.exports = app
