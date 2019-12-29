const express = require('express')
const log = require('debug')('log-d')

const app = express.Router()
const dbLog = require('./utils/crud-wp')

app.post('/logs', (req, res) => {
  var logs = req.body.logs
  var username = req.body.username
  //log(`Creating a new item (${name})`)
  return dbLog.createLog(logs, username)
    .then((token) => {
      console.log(token)
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
})

app.get('/logs/:username', (req, res) => {
  var username = req.params.username
  log(`Getting name (${username})`)
  return dbLog.getItem(username)
    .then((token) => {
      console.log(token)
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
})


app.delete('/logs/:username', (req, res) => {
  var username = req.params.username
  log(`Deleting logs of user (${username})`)
  return dbLog.deleteItem(username)
    .then((token) => {
      console.log(token)
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
})
/*
app.put('/catalog/:name', (req, res) => {
  var name = req.params.name
  var price = req.body.price
  var image = req.body.image
  var category = req.body.category
  log(`Updating user cart of (${name})`)
  return dbCat.deleteItem(name)
    .then((token) => {
      return dbCat.createItem(name, price, image, category)
        .then((token) => {
          res.status(200).json({ status: 'success', token })
        })
        .catch((err) => {
          res.status(500).json({ status: 'error', message: String(err) })
        })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    }) 
})*/





module.exports = app
