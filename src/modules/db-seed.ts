const { Client } = require('pg')

const config = {
  database: 'mock_interview',
}

module.exports = new Client(config)
