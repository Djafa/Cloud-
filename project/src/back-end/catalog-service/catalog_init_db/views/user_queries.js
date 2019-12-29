const viewDescriptor = {
  'views': {
    'catalog': {
      'map': 'function (doc) { \
        if (doc.name && doc.category) { \
          emit(doc.name, doc.category) \
        } \
      }',
      'reduce': 'function(key, values) { \
        return values; \
      }'
    }
  }
}
module.exports = { viewDescriptor }

