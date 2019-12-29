const express = require('express')
const log = require('debug')('product-d')

const app = express.Router()
const catalog = require('./utils/crud-wp')

const azure = require('azure-storage')
const stream = require('stream');
const jimp = require('jimp');


var blobService = azure.createBlobService();
blobService.createContainerIfNotExists('scappimages', {
  publicAccessLevel: 'blob'
}, function(error, result, response) {
  if (!error) {
  }
  else
  {
    console.log("Il y a un problème avec le compte azure")
  }
});


app.post('/catalog/:username', (req, res) => {
  var username = req.params.username
  var name = req.body.name
  var price = req.body.price
  var category = req.body.category
  var image = req.body.image
  
  if (username != "admin"){
    console.log("You are not admin, you can't do this")
    return dbCat.fantomas()
    .then((token) => {
      console.log(token)
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
  }

  var azureimage //cette variable contient le lien de l'image sur azure
  jimp.read(image).then((thumbnail) => {

    thumbnail.resize(500, 500);

    thumbnail.getBuffer(jimp.MIME_PNG, (err, buffer) => {
      const readStream = stream.PassThrough();
            readStream.end(buffer);

            blobService.createBlockBlobFromStream('scappimages', name, readStream, buffer.length, (err) => {
                context.done();
            });
        });
        /*blobService.startCopyBlob(thumbnail, 'scappimages', name,  function(error, result, response) {
          if (!error) {
            // file uploaded
            console.log(result)
          }
          else
          {
            console.log(error)
          }
        });*/
      

    })


    /**/
  azureimage = blobService.getUrl('scappimages',name)
  log(`Creating a new item image`)
  return catalog.createItem(azureimage, name, price, category)
    .then((token) => {
      console.log(token)
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
})

app.get('/catalog/:name/:username', (req, res) => {
  if (req.params.username != "admin"){
    console.log("You are not admin, you can't do this")
    return dbCat.fantomas()
    .then((token) => {
      console.log(token)
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
  }
  var name = req.params.name
  log(`Getting name (${name})`)
  return catalog.getItem(name)
    .then((token) => {
      console.log(token)
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
})


app.delete('/catalog/:name/:username', (req, res) => {
  if (req.params.username != "admin"){
    console.log("You are not admin, you can't do this")
    return dbCat.fantomas()
    .then((token) => {
      console.log(token)
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
  }
  var name = req.params.name
  log(`Deleting an item (${name})`)
  return catalog.deleteItem(name)
    .then((token) => {
      console.log(token)
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
})

app.put('/catalog/:name/:username', (req, res) => {
  if (req.params.username != "admin"){
    console.log("You are not admin, you can't do this")
    return dbCat.fantomas()
    .then((token) => {
      console.log(token)
      res.status(200).json({ status: 'success', token })
    })
    .catch((err) => {
      res.status(500).json({ status: 'error', message: String(err) })
    })
  }
  var name = req.params.name
  var price = req.body.price
  var image = req.body.image
  var category = req.body.category
  log(`Updating user cart of (${name})`)
  return catalog.deleteItem(name)
    .then((token) => {
      return catalog.createItem(name, price, image, category)
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
})





module.exports = app