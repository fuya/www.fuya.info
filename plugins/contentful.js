const contentful = require('contentful')
const config = {
  space: 'c8ty1si46b2l',
  accessToken: process.env.CONTENTFUL_TOKEN
}

module.exports = {
  createClient() {
    return contentful.createClient(config)
  }
}
