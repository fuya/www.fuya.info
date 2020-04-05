const contentful = require('contentful')
const config = {
  space: 'c8ty1si46b2l',
  accessToken:
    '5c21855ee21609b046041129a6eda8d847b2aef3cfae0249dfa258e8d72365d5',
}

module.exports = {
  createClient() {
    return contentful.createClient(config)
  }
}
