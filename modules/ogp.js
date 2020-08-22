import fs from 'fs'
import sharp from 'sharp'
import TextToSVG from 'text-to-svg'

import { createClient } from '../plugins/contentful.js'
const client = createClient()

const generateOGP = async function () {
  const posts = await client.getEntries({
    content_type: 'post',
  })

  const textToSVG = TextToSVG.loadSync('./static/fonts/NotoSansJP-Bold.otf')

  posts.items.forEach(async (post) => {
    const textSvg = textToSVG.getSVG(post.fields.title, {
      x: 0,
      y: 0,
      fontSize: 72,
      anchor: 'top',
      attributes: { fill: '#fafdfa', stroke: '#0cb9ff' },
    })
    const textP = await sharp(Buffer.from(textSvg))
      .resize(624, 624, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer()

    await sharp('./static/ogimage/default_og_image.png')
      .composite([
        {
          input: textP,
        },
      ])
      .png()
      .toFile(`./dist/ogimage/${post.fields.slug}.png`)
  })
}

module.exports = function () {
  this.nuxt.hook('generate:done', (generator) => {
    generateOGP()
  })
}
