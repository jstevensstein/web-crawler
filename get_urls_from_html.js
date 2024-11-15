import { parse } from "node-html-parser";
import { URL } from 'url';
import normalizeUrl from "normalize-url";

function getHrefsInHtml(htmlString) {
  const root = parse(htmlString);
  return root.querySelectorAll('a').map(a => a.getAttribute('href'));
}

/**
 * Maps a list of hrefs to their full normalized (i.e. with extra pathing removed) url, and removes duplicates.
 * @param hrefs
 * @param baseUrl The baseUrl of the page on which these hrefs were found
 * @returns {string[]}
 */
function mapHrefsToUniqueSameDomainUrls(hrefs, baseUrl) {
  const hostname = (new URL(baseUrl)).hostname;
  const urls = hrefs.map(href => new URL(href, baseUrl));
  const filtered = urls.filter(url => url.hostname === hostname);
  const normalized = filtered.map(url => normalizeUrl(url.href));
  return normalized;
}

/**
 * Given an html string, returns a list of the links contained within the same domain as the url provided.
 * @param baseUrl The original url from which to derive the hostname/domain.
 * @param htmlString
 * @returns {string[]}
 */
function getUrlsInSameDomainFromHtml(baseUrl, htmlString) {
  const hrefs = getHrefsInHtml(htmlString);
  return mapHrefsToUniqueSameDomainUrls(hrefs, baseUrl)
}

export { getUrlsInSameDomainFromHtml };