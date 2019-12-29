const viewDescriptor = {
  'views': {
    'cart': {
      'map': 'function (doc) { \
        if (doc.usrName && doc.products && doc.totalItems && doc.totalAmount && doc.category) { \
          var key = "{" + "username:" + doc.usrName + " " + "products:" + doc.products + " " + "totalItems:" + doc.totalItems + " " + "totalAmount:" + doc.totalAmount + " " + "category:" + doc.category + "}"; \
          emit(key) \
        } \
      }',
      'reduce': 'function(key, values) { \
        return sum(values); \
      }'
    }
  }
}
module.exports = { viewDescriptor }

