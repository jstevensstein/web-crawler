import { getLinksInPage } from "./get_links_in_page.js";

const visited = new Set();
let remaining;
let limitRequests = false;

function startCrawler(url, limit) {
  if (limit !== undefined) {
    remaining = limit - 1; // Discount the very first;
    limitRequests = true;
  }
  visitPageAndChildren(url);
}

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
  }
  console.log(`Which contained links to: ${unvisited.join(', ')}`)
  for (const toVisit of unvisited) {
    if (!limitRequests || remaining > 0) {
      console.log(`REMAINING REQUESTS: ${remaining}`)
      remaining--;
      visitPageAndChildren(toVisit); // Deliberately omitting the await call to parallelization.
    }
  }
}

export { startCrawler }
