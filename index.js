import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
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
try {
  const url = new URL(argv.url);
  startCrawler(url.toString(), argv.limit)
}
catch (e) {
  console.log("Invalid url supplied! Be sure to include a protocol (http/https).")
}