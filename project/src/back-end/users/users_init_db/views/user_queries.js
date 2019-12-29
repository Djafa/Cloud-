const viewDescriptor = {
  'views': {
    'users': {
      'map': 'function (doc) { \
          emit(doc._id, doc._id) \
      }',
      'reduce': 'function(key, values) { \
        return values; \
      }'
    }
  }
}
module.exports = { viewDescriptor }

