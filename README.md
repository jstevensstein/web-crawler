# Web Crawler

A **very simple** web crawler that, given a URL, will check that web page for links in the same subdomain and recursively request and check those as well.

## Pre-requisites
You must have yarn as your package manager and node installed.

## Usage
You can run the web crawler with the command `yarn run crawler --url <url>`. There is a second optional option `--limit` which you can use to limit the number of individual pages which you will request; this is in order to avoid sending a large volume of traffic to a website (and avoid being rate-limited or blacklisted).

An example command: `yarn run crawler --url http://overstory.com`.

# Design Choices
To a certain degree, a minimal version of a crawler writes itself. This crawler is extremely simple, and as such does not have any capabality to re-try a page for which the request failed (or even determine if this was an intermittent failure). The project is asynchronous to the degree that javascript can be, as we [deliberately omit `await`ing on our recursive calls](https://github.com/jstevensstein/web-crawler/blob/main/src/crawler.js#L42), simply dispatching them. Additionally, we do not have any back-off or rate limiting built in, we simply immediately make recursive calls on all of the in-domain links we've parsed from a web page, and requests are dispatched as fast as javascript and the event loop allows. This pretty clearly shows, as we do not detect when requests are being rate-limited: for instance, issuing multiple successive crawls to overstory.com will result in being rate-limited with a `429.`

I chose to handle making successive requests with [recursive calls](https://github.com/jstevensstein/web-crawler/blob/main/src/crawler.js#L42) rather than with a queue as it was a more straightforward solution without any rate-limiting/back-off built in.
