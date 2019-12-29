const bcrypt = require('bcryptjs')
const tku = require('./en-de-coders')

var cartDB = require('nano')(process.env.DB_URL) 


function createCart (usrName, products, totalItems, totalAmount, category) {
    
    return new Promise((resolve, reject) => {
      cartDB.insert(
        // 1st argument of nano.insert()
        {'usrName': usrName, 'products': products, 'totalItems': totalItems, 'totalAmount': totalAmount, 'category': category}, 
        usrName, // 2nd argument of nano.insert() 
        // callback to execute once the request to the DB is complete
        (error, success) => {
          if (success) {
            resolve(success) 
          } else {
            reject(
              new Error(`In the creation of cart of user (${usrName}). Reason: ${error.reason}.`)
            )
          }
        }
      )
    })
  }

function getCart (usrName) {
  return new Promise((resolve, reject) => {
    cartDB.get(usrName, (error, success) => {
      if (success) {
        resolve(success) 
        console.log(success)
      } else {
        reject(new Error(`To fetch cart information of user (${usrName}). Reason: ${error.reason}.`))
      }
    })
  })
}

function deleteCart (usrName) {
  return new Promise((resolve, reject) => {
    cartDB.get(usrName, function(err, body, header){
      cartDB.destroy(usrName, body._rev, (error, success) => {
        if (success) {
          resolve(tku.encodeToken(usrName)) 
          console.log(success)
        } else {
          reject(new Error(`To delete cart information of user (${usrName}). Reason: ${error.reason}.`))
        }
      })
    })
  })
}


module.exports = {
  getCart,
  createCart,
  deleteCart
}
