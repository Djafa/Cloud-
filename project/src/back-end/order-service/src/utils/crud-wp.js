
const bcrypt = require('bcryptjs')
const tku = require('./en-de-coders')

var order = require('nano')(process.env.DB_URL)

function createItem (username, orders, totalItems, totalAmount) {
  return new Promise((resolve, reject) => {
    order.insert({'username': username,'totalItems': totalItems,'totalAmount': totalAmount,'orders': orders}, username,
      // callback to execute once the request to the DB is complete
      (error, success) => {
        if (success) {
          resolve(success)
          console.log("succes in creation")
        } else {
          reject(
            new Error(`In the creation of item (${username}). Reason: ${error.reason}.`)
          )
        }
      }
    )
  })
}

function getItem (username) {
  return new Promise((resolve, reject) => {
    order.get(username,
      // callback to execute once the request to the DB is complete
      (error, success) => {
        if (success) {
          resolve(success)
          console.log("succes in fetching")
        } else {
          reject(
            new Error(`In the fetching of item (${username}). Reason: ${error.reason}.`)
          )
        }
      }
    )
  })
}


function deleteItem (username) {
  return new Promise((resolve, reject) => {
    order.get(username, function(err, body, header){
      order.destroy(username, body._rev, (error, success) => {
        if (success) {
          resolve(success)
        } else {
          reject(new Error(`To delete cart information of user (${usrName}). Reason: ${error.reason}.`))
        }
      })
    })
  })
}



module.exports = {
  createItem,
  getItem,
  deleteItem
}