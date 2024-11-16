import { strict as assert } from 'assert';
import { getHrefsInHtml, mapHrefsToUniqueSameDomainUrls } from "../src/get_urls_from_html.js";

describe('getHrefsInHtml', () => {
  it('should return all hrefs in the provided HTML string', () => {
    const htmlString = `
      <html>
        <body>
          <a href="https://example.com/page1">Page 1</a>
          <a href="/relative/path">Relative Path</a>
          <a href="https://example.com/page2">Page 2</a>
        </body>
      </html>
    `;
    const result = getHrefsInHtml(htmlString);
    assert.deepEqual(result, [
      'https://example.com/page1',
      '/relative/path',
      'https://example.com/page2',
    ]);
  });

  it('should return an empty array if no anchor tags are present', () => {
    const htmlString = '<html><body><p>No links here!</p></body></html>';
    const result = getHrefsInHtml(htmlString);
    assert.deepEqual(result, []);
  });
});

describe('mapHrefsToUniqueSameDomainUrls', () => {
  it('should filter hrefs to include only same-domain URLs', () => {
    const hrefs = [
      'https://example.com/page1',
      'https://otherdomain.com/page2',
      'https://sub.example.com'
    ];
    const baseUrl = 'https://example.com';
    const result = mapHrefsToUniqueSameDomainUrls(hrefs, baseUrl);
    assert.deepEqual(result, [
      'https://example.com/page1',
    ]);
  });

  it('should normalize URLs', () => {
    const hrefs = [
      'https://example.com/page1',
      '/relative/path/',
    ];
    const baseUrl = 'https://example.com';
    const result = mapHrefsToUniqueSameDomainUrls(hrefs, baseUrl);
    assert.deepEqual(result, [
      'https://example.com/page1',
      'https://example.com/relative/path',
    ]);
  });

  it('should normalize URLs with relative paths', () => {
    const hrefs = [
      './/relative/path/',
    ];
    const baseUrl = 'https://example.com/first';
    const result = mapHrefsToUniqueSameDomainUrls(hrefs, baseUrl);
    assert.deepEqual(result, [
      'https://example.com/relative/path',
    ]);
  });

  it('should remove duplicate URLs post-normalization', () => {
    const hrefs = [
      'https://example.com/page1',
      'https://example.com/page1/',
      '/relative/path',
      '/relative/path/',
    ];
    const baseUrl = 'https://example.com';
    const result = mapHrefsToUniqueSameDomainUrls(hrefs, baseUrl);
    assert.deepEqual(result, [
      ('https://example.com/page1'),
      ('https://example.com/relative/path'),
    ]);
  });

  it('should handle empty hrefs array gracefully', () => {
    const hrefs = [];
    const baseUrl = 'https://example.com';
    const result = mapHrefsToUniqueSameDomainUrls(hrefs, baseUrl);
    assert.deepEqual(result, []);
  });

  it('should handle a base URL with a subdomain', () => {
    const hrefs = [
      'https://sub.example.com/page1',
      '/relative/path',
      'https://example.com/page2',
    ];
    const baseUrl = 'https://sub.example.com';
    const result = mapHrefsToUniqueSameDomainUrls(hrefs, baseUrl);
    assert.deepEqual(result, [
      'https://sub.example.com/page1',
      'https://sub.example.com/relative/path',
    ]);
  });
});