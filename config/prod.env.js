'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  API_URL: '"http://localhost:8002"',
  API_LOCAL: '"http://localhost:8080"'
})
