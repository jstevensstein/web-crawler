import { parse } from "node-html-parser";
import { URL } from 'url';
import normalizeUrl from "normalize-url";

function getUrlsFromPage(htmlString) {
  const root = parse(htmlString);
  return root.querySelectorAll('a').map(a => a.getAttribute('href'));
}

function getUrlsInDomainFromPage(base, htmlString) {
  const hostname = (new URL(base)).hostname;
  const rawHrefs = getUrlsFromPage(htmlString);
  const urls = rawHrefs.map(href => new URL(href, base));
  const filtered = urls.filter(url => url.hostname === hostname);
  const normalized = filtered.map(url => normalizeUrl(url.href));
  return normalized;
}

export { getUrlsInDomainFromPage };