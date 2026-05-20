const https = require('https');
const fs = require('fs');

const urls = {
  'openai': 'https://openai.com/favicon.svg',
  'groq': 'https://groq.com/favicon.svg',
  'cohere': 'https://cohere.com/favicon.svg',
  'fireworks': 'https://fireworks.ai/favicon.svg',
  'togetherai': 'https://together.ai/favicon.svg',
  'xai': 'https://x.ai/favicon.svg',
  'azure': 'https://azure.microsoft.com/favicon.svg',
  'aws': 'https://aws.amazon.com/favicon.svg',
};

let done = 0;
const total = Object.keys(urls).length;

for (const [name, url] of Object.entries(urls)) {
  const follow = (u, redirects) => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if ((res.statusCode === 301 || res.statusCode === 302) && redirects < 5) {
        console.log(name + ': redirect -> ' + res.headers.location);
        follow(res.headers.location, redirects + 1);
        return;
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        console.log(name + ': HTTP ' + res.statusCode + ' (' + data.length + ' bytes) svg=' + data.includes('<svg'));
        if (data.includes('<svg')) {
          fs.writeFileSync('d:/github/TinadecCode/tmp/' + name + '-favicon.svg', data);
        }
        done++;
        if (done === total) console.log('All done');
      });
    }).on('error', e => { console.log(name + ': ERROR ' + e.message); done++; });
  };
  follow(url, 0);
}
