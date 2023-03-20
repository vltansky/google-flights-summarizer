import { BookingPage } from './booking'

// console.info('chrome-ext template-vanilla-ts content script')

function pageLoad() {
  const path = location.href
    .replace('https://www.google.com/travel/flights', '')
    .replace('https://google.com/travel/flights', '')

  if (path.includes('booking')) {
    BookingPage()
  }
}

let previousUrl = ''
const observer = new MutationObserver(function (mutations) {
  if (location.href !== previousUrl) {
    previousUrl = location.href
    setTimeout(() => {
      pageLoad()
    }, 200)
  }
})

const config = { subtree: true, childList: true }
observer.observe(document, config)

window.addEventListener('beforeunload', function (event) {
  observer.disconnect()
})

export {}
