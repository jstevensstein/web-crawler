import { getLinksInPage } from "./get_links_in_page.js";

const visited = new Set();
let remaining;
let limitRequests = false;

/**
 * Initializes global variables for crawling and begins crawler.
 * @param url The page from which to begin crawling
 * @param limit Maximum number of pages to crawl
 */
function startCrawler(url, limit) {
  if (limit !== undefined) {
    remaining = limit - 1; // Discount the very first.
    limitRequests = true;
  }
  visitPageAndChildren(url);
}

/**
 * Visits a page and finds the unique same-domain links within that page, then recursively crawls those children which
 * have not yet been crawled
 * @param url
 * @returns {Promise<void>}
 */
async function visitPageAndChildren(url) {
  visited.add(url);
  const childUrls = await getLinksInPage(url);
  console.log(`Visited ${url}`);
  if (!childUrls) {
    return;
  }
  const unvisited = childUrls.filter(childUrl => !visited.has(childUrl));
  if (!unvisited.length) {
    console.log('Which contained no unvisited links.')
    return;
  }
  console.log(`Which contained links to: ${unvisited.join(', ')}`)
  for (const toVisit of unvisited) {
    if (!limitRequests || remaining > 0) {
      remaining--;
      visitPageAndChildren(toVisit); // Deliberately omitting the await call to parallelization.
    }
  }
}

export { startCrawler }
