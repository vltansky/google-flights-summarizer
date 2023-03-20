function copySummary() {
  const shareButton = document.querySelector(
    'button[aria-label="Share this flight"]',
  ) as HTMLButtonElement
  console.log('New button clicked!')
  // get meta property="og:title" content
  const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content')

  const [from, to] = document.querySelectorAll('[role="listitem"]')

  const fromDateDay = from.querySelector('[data-id] [aria-label]')?.firstChild?.textContent
  const toDateDay = to.querySelector('[data-id] [aria-label]')?.firstChild?.textContent
  const [fromDateHourFrom, fromDateHourTo] = [...from.querySelectorAll('[data-position]')].map(
    (el) => el?.firstChild?.textContent,
  )
  const [toDateHourFrom, toDateHourTo] = [...to.querySelectorAll('[data-position]')].map(
    (el) => el?.firstChild?.textContent,
  )

  // find element with text "Total price from"
  const totalPrice = document
    .evaluate(
      "//*[text()='Total price from']",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    )
    .singleNodeValue?.parentNode?.querySelector('[aria-label]')?.firstChild?.textContent

  // click on shareButton
  shareButton?.click()
  // wait untill copyLinkInput is visible and has value
  const copyLinkInputInterval = setInterval(() => {
    const input = document.querySelector('input[aria-label="Copy link"]')
    const link = (input as HTMLInputElement)?.value
    if (link) {
      const modal = input?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement
      if (modal) {
        const successMessage = document.createElement('div')
        successMessage.textContent = 'Link copied to clipboard'
        successMessage.style.color = 'green'
        successMessage.style.margin = '15px'
        successMessage.style.textAlign = 'center'
        modal.innerHTML = successMessage.outerHTML
      }

      // input.parentElement.parentElement.parentElement.parentElement.parentElement = successMessage
      clearInterval(copyLinkInputInterval)
      const finalText = `
      ${title}
      ${totalPrice}

      ${fromDateDay} ${fromDateHourFrom} - ${fromDateHourTo}
      ${toDateDay} ${toDateHourFrom} - ${toDateHourTo}

      ${link}
      `

      // copy finalText to clipBoard
      console.log(finalText)
      navigator.clipboard.writeText(finalText)
    }
  }, 100)
}

export function BookingPage() {
  console.log('BookingPage')

  const shareButton = document.querySelector('button[aria-label="Share this flight"]')

  // Create a new button element
  const newButton = document.createElement('button')
  newButton.textContent = 'Copy summary'

  newButton.onclick = copySummary
  newButton.className = shareButton?.className ?? ''
  newButton.style.marginRight = '10px'
  // Insert the new button after the "Share this flight" button
  shareButton?.parentNode?.insertBefore(newButton, shareButton)
}
