import { Router } from '@layer0/core/router'
import { starterRoutes } from '@layer0/starter'
import { CACHE_ASSETS, CACHE_PAGES } from './cache'
import shoppingFlowRouteHandler from './shoppingFlowRouteHandler'

export default new Router()
  .use(starterRoutes)

  // Home page
  .match('/', shoppingFlowRouteHandler)
  .match('/home', shoppingFlowRouteHandler)

  // PLP pages
  .match('/new/:path*', shoppingFlowRouteHandler)

  // PDP pages
  // example path /holiday-gifts/christmas-gifts/the-snow-fairy-experience/9999902245.html
  .match('/:path/:group/:item/:file',shoppingFlowRouteHandler)



  // example route for cacheable assets:
  .match('/dw/image/v2/:id*', ({ cache, proxy }) => {
    cache(CACHE_ASSETS)
    return proxy('origin')
  })

  .match('/service-worker.js', ({ serviceWorker }) => serviceWorker('dist/service-worker.js'))
  .match('/main.js', ({ serveStatic, cache }) => {
    cache(CACHE_ASSETS)
    return serveStatic('dist/browser.js')
  })

  // fallback route for all other requests:
  .fallback(({ proxy }) => {
    proxy('origin')
  })
