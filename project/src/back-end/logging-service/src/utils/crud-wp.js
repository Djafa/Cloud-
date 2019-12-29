const bcrypt = require('bcryptjs')
const tku = require('./en-de-coders')

var dbLog = require('nano')('http://admin:admin@logs-db:5984/logs')
//var dbLog = require('nano')(process.env.DB_URL)  //temporaire, remettre la ligne en haut //SAMIR

function createLog(logs, username) {
  return new Promise((resolve, reject) => {
    dbLog.insert({'username': username, 'logs':logs},username,
      // callback to execute once the request to the DB is complete
      (error, success) => {
        if (success) {
          resolve(success)
          console.log("succes in creation")
        } else {
          reject(
            new Error(`In the creation of item logs. Reason: ${error.reason}.`)
          )
        }
      }
    )
  })
}

function getItem (username) {
  return new Promise((resolve, reject) => {
    dbLog.get(username,
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
    dbLog.get(username, function(err, body, header){
      dbLog.destroy(username, body._rev, (error, success) => {
        if (success) {
          resolve(success)
        } else {
          reject(new Error(`To delete logs information of user (${usrName}). Reason: ${error.reason}.`))
        }
      })
    })
  })
}



module.exports = {
  createLog,
  getItem,
  deleteItem
}
