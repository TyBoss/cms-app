// search.js
module.exports = (app, config, bucket, partials, _) => {
  const TRIM_HTML_REGEX = /(<([^>]+)>)/ig
  app.get('/search', async (req, res) => {
    try {
      res.locals.globals = require('../helpers/globals')(objects, _)

      const response = await bucket.objects.find()
      const { objects } = response

      const searchable_objects = [
        ..._.filter(objects, { type: 'pages' }),
        ..._.filter(objects, { type: 'blogs' })
      ]

      const page = _.find(objects, { slug: 'search' })
      res.locals.page = page

      /* if no pages or blogs are found???? */

      if (req.query.q) {
        res.locals.q = req.query.q
        const q = req.query.q.toLowerCase()
        let search_results = []
        searchable_objects.forEach(object => {
          if(object.title.toLowerCase().indexOf(q) !== -1 || object.content.toLowerCase().indexOf(q) !== -1) {
            object.teaser = object.content.replace(TRIM_HTML_REGEX, '').substring(0, 300)
            if (object.type === 'blogs')
              object.permalink = '/blog/' + object.slug
            else
              object.permalink = '/' + object.slug
            search_results.push(object)
          }

          if (!_.find(search_results, { id: object.id })) {
            for (let key in object.metadata) {
              if (key.toLowerCase().indexOf(q) !== -1) {
                object.teaser = object.content.replace(TRIM_HTML_REGEX, '').substring(0, 300)
                if (object.slug === 'blogs')
                  object.permalink = '/blog/' + object.slug
                else
                  object.permalink = '/' + object.slug
                search_results.push(object)
              }
            }
          }
        })
        res.locals.search_results = search_results
      }
      return res.render('search.html', {
        partials
      })
    } catch(error) {
      console.log('Search page', error)
      return res.status(500).send({ "status": "error", "message": "Yikes, something went wrong!" })
    }
  })
}
