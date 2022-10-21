
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./swap-token-list.cjs.production.min.js')
} else {
  module.exports = require('./swap-token-list.cjs.development.js')
}
