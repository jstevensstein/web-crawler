import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import isUrl from "is-url-superb";
import { startCrawler } from "./src/crawler.js";

const argv = yargs(hideBin(process.argv))
  .option('url', {
    alias: 'u',
    description: 'The base url from which to crawl',
    type: 'string',
  })
  .option('limit', {
    alias: 'l',
    description: 'The maximum number of pages the crawler can hit.',
    type: 'number',
  })
  .help()
  .argv;
const {url, limit} = argv;
if (isUrl(url, {lenient: false})) {
  startCrawler(url, limit);
} else {
  console.log("Invalid url supplied! Be sure to include a protocol (http/https).")
}