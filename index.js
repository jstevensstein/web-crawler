import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import isUrl from "is-url-superb";
import { crawlPageForUrls } from "./crawl_page.js";

const argv = yargs(hideBin(process.argv))
  .option('url', {
    alias: 'u',
    description: 'The base url from which to crawl',
    type: 'string',
  })
  .help()
  .argv;
const {url} = argv;
console.log(url);
if (isUrl(url, {lenient: false})) {
  console.log(`Beginning to crawl ${url}!`);
  const urls = await crawlPageForUrls(url);
  console.log(urls);
} else {
  console.log("Invalid url supplied!")
}