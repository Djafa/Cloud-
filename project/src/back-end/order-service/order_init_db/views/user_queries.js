const viewDescriptor = {
  'views': {
    'order': {
      'map': 'function (doc) { \
        if (doc.username) { \
          emit(doc.username,doc.orders) \
        } \
      }',
      'reduce': 'function(key, values) { \
        return values; \
      }'
    }
  }
}
module.exports = { viewDescriptor }



