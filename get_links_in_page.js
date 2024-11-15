import { getUrlsInDomainFromPage } from "./get_urls_from_html.js";

async function getLinksInPage(url) {
  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      const htmlString = await response.text();
      return getUrlsInDomainFromPage(url, htmlString);
    } else {
      console.error('Response is not HTML');
    }
  } catch (error) {
    console.error('Error fetching: ', error);
  }
}

export { getLinksInPage }