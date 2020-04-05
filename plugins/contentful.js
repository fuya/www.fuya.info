const contentful = require('contentful')
const config = {
  space: 'c8ty1si46b2l',
  accessToken: process.env.CONTENTFUL_TOKEN,
  host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com'
}
const createClient = () => contentful.createClient(config)

export { createClient }
