const viewDescriptor = {
  'views': {
    'logs': {
      'map': 'function (doc) { \
          emit(doc.username, doc.logs) \
      }',
      'reduce': 'function(key, values) { \
        return values; \
      }'
    }
  }
}
module.exports = { viewDescriptor }

