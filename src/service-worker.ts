import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher, prefetch } from '@layer0/prefetch/sw'
import DeepFetchPlugin, { DeepFetchCallbackParam } from '@layer0/prefetch/sw/DeepFetchPlugin'

skipWaiting()
clientsClaim()

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      {
        selector: '.component-image.position-absolute.promotion-impression-img',
        maxMatches: 1,
        attribute: 'src',
        as: 'image',
        callback: deepFetchPLPImages,
      },
      {
        selector: '.plp-banner-top-inner img.plp-banner-top-image',
        maxMatches: 1,
        attribute: 'src',
        as: 'image',
        callback: deepFetchPLPImagesHero,
      },
      {
        selector: 'img.product-tile-image.position-relative',
        maxMatches: 2,
        attribute: 'src',
        as: 'image',
        callback: deepFetchPLPImagesTwo,
      },
      {
        //                        <img itemprop="image" loading="lazy" class="pdp-carousel-image d-block img-fluid blur-up mx-auto ls-is-cached lazyloaded" src="https://www.lushusa.com/dw/image/v2/BDMQ_PRD/on/demandware.static/-/Sites-lushcosmetics-export/default/dwd0cd70a3/images/product/60818_5.jpg?sw=450&amp;sh=450" data-src="https://www.lushusa.com/dw/image/v2/BDMQ_PRD/on/demandware.static/-/Sites-lushcosmetics-export/default/dwd0cd70a3/images/product/60818_5.jpg?sw=450&amp;sh=450" alt="Lime Bounty">
        // entire example element <img itemprop="image" loading="lazy" class="pdp-carousel-image d-block img-fluid blur-up mx-auto ls-is-cached lazyloaded" src="https://www.lushusa.com/dw/image/v2/BDMQ_PRD/on/demandware.static/-/Sites-lushcosmetics-export/default/dwdcce3195/images/product/60953_1.jpg?sw=450&amp;sh=450" data-src="https://www.lushusa.com/dw/image/v2/BDMQ_PRD/on/demandware.static/-/Sites-lushcosmetics-export/default/dwdcce3195/images/product/60953_1.jpg?sw=450&amp;sh=450" alt="Snow Fairy">
        selector: 'img.pdp-carousel-image',
        maxMatches: 1,
        attribute: 'data-src',
        as: 'image',
        callback: deepFetchPDPAboveFold,
      }
    ]),
  ],
})
  .route()
  // .cache(/^https:\/\/assets-global\.website-files\.com\/.*/)
  // ENTER REGULAR EXPRESSION SELECTOR FOR IMAGES YOU WANT TO PREFETCH //
  // (usualy as CDN base domain name followed by ".*" as general selecor) //

///////////////////////////////////////////////
// Callback function for PLP image selector //
function deepFetchPLPImages({ $el, el, $ }: DeepFetchCallbackParam) {
  const url = $el.attr('src')
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching PLP Hero 1: "+url+"\n")
  prefetch(url, 'image')
}

function deepFetchPLPImagesHero({ $el, el, $ }: DeepFetchCallbackParam) {
  const url = $el.attr('src')
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching PLP Hero 2: "+url+"\n")
  prefetch(url, 'image')
}

function deepFetchPLPImagesTwo({ $el, el, $ }: DeepFetchCallbackParam) {
  const url = $el.attr('src')
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching PLP: "+url+"\n")
  prefetch(url, 'image')
}

function deepFetchPDPAboveFold({ $el, el, $ }: DeepFetchCallbackParam) {

  const url = ' '+$el.attr('data-src').split('https://www.lushusa.com/')[1]
  console.log("[][]][][[][]][][][][][[]][[][][]\nPrefetching PDP: "+url+"\n")
  prefetch(url, 'image')
}

function logPrefetchedContent({$el}) { // for testing
  console.log("[][]][][[][]][][][][][[]][[][][]")
  console.log("content '" + '/'+$el.attr('data-src').split('https://www.lushusa.com/')[1]+"' has been prefetched...")
}
