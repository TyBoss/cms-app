// Routes
import homeRouteHandler from './home.mjs'

/*module.exports = (app, config, bucket, partials, _) => {
  // require('./home')(app, config, bucket, partials, _)
  /* require('./blog')(app, config, bucket, partials, _)
  require('./contact')(app, config, bucket, partials, _)
  require('./search')(app, config, bucket, partials, _)
  require('./faqs')(app, config, bucket, partials, _)
  require('./page')(app, config, bucket, partials, _)

} */

export default (app, cms) => {
  app.use(homeRouteHandler(cms))
}