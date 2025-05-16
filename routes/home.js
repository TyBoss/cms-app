// home.js
import express from 'express'
import _ from 'lodash'
// import bucket from ''
// import partials from ''

const router = express.Router()
router.get('/home', async (req, res) => {
  const partials = {
    header: 'partials/header',
    footer: 'partials/footer'
  }
  try {
    return res.render('index.html', {
      partials
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ "status": "error", "message": "Yikes, something went wrong!" })
  }
})

export default router

/*

module.exports = (bucket, partials) => {
  router.get('/', async (req, res) => {
    try {
      const response = await bucket.objects.find()
      const { objects } = response
      res.locals.globals = require('../helpers/globals')(objects, _)
      const page = _.find(objects, { 'slug': 'home' })
      res.locals.page = page
      const carousel_items = page.metadata.carousel
      carousel_items.forEach((item, i) => {
        if (i === 0)
          item.is_first = true
        item.index = i
      })
      return res.render('index.html', {
        partials
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ "status": "error", "message": "Yikes, something went wrong!" })
    }
  })
}
*/