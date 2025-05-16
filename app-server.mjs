// app-server.js
import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url'
import hogan from 'hogan-express'
import http_module from 'http'
import bodyParser from 'body-parser'
import compression from 'compression'
import _ from 'lodash'
import configs from './config/index.mjs'
import routeHandler from './routes/index.mjs'
import { getContentManager } from './modules/content-manager.mjs'
import CMS_TYPES from './modules/content-manager-types.mjs'

let config = process.env.NODE_ENV === 'development' 
  ? configs.development 
  : configs.production

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cms = getContentManager()
cms.init(CMS_TYPES.COSMIC, config.COSMIC_CMS)

const app = express()

app.use(bodyParser.json())
app.use(compression())
app.engine('html', hogan)
app.set('views', __dirname + '/views')
app.set('port', process.env.PORT || 3000)
app.use(express.static(__dirname + '/public'))
// logger middleware
app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, req.time, req.query);
  next()
});
app.use((req, res, next) => {
  if (req.url === '/favicon.ico')
    return res.end()
  // Set global variables
  res.locals.year = new Date().getFullYear()
  // Set dev
  if (process.env.NODE_ENV === 'development')
    res.locals.is_dev = true
  next()
})

const partials = {
  header: 'partials/header',
  footer: 'partials/footer'
}

routeHandler(app, cms)

// routeHandler(app, config, bucket, partials, _)
const http = http_module.Server(app)
http.listen(app.get('port'), () => {
  console.info('==> 🌎  Go to http://localhost:%s', app.get('port'));
})