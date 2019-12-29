const bcrypt = require('bcryptjs')
const tku = require('./en-de-coders')

var catalog = require('nano')(process.env.DB_URL)

function createItem (azureimage, name, price, category) {
  return new Promise((resolve, reject) => {
    catalog.insert({'name': name, 'azureimage': azureimage, 'price':price, 'category':category},name,
      // callback to execute once the request to the DB is complete
      (error, success) => {
        if (success) {
          resolve(success)
          console.log("succes in creation of product")
        } else {
          reject(
            new Error(`In the creation of item (${name}). Reason: ${error.reason}.`)
          )
        }
      }
    )
  })
}

function getItem (name) {
  return new Promise((resolve, reject) => {
    catalog.get(name,
      // callback to execute once the request to the DB is complete
      (error, success) => {
        if (success) {
          resolve(success)
          console.log("succes in fetching")
        } else {
          reject(
            new Error(`In the fetching of item (${name}). Reason: ${error.reason}.`)
          )
        }
      }
    )
  })
}


function deleteItem (name) {
  return new Promise((resolve, reject) => {
    catalog.get(name, function(err, body, header){
      catalog.destroy(name, body._rev, (error, success) => {
        if (success) {
          resolve(success)
        } else {
          reject(new Error(`To delete cart information of user (${usrName}). Reason: ${error.reason}.`))
        }
      })
    })
  })
}

function fantomas () {
  return new Promise((resolve, reject) => {
    resolve('accès non autorisé')
  })
}

module.exports = {
  createItem,
  getItem,
  deleteItem,
  fantomas
}