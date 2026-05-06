const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');

// We need to parse the second services__grid (the first one is id="services", wait, let's check).
// The first section is id="services" with 17 cards.
// The second section is id="self-check" with 4 cards.
// Let's only extract from id="services".
const sectionStr = html.split('<section class="services" id="services"')[1].split('<section class="services self-check" id="self-check"')[0];
const articles = sectionStr.split('<article class="prof-card">');
articles.shift(); // remove the part before the first article

const result = articles.map(article => {
  const lucideIcon = article.match(/data-lucide="([^"]+)"/)[1];
  const scenarioText = article.match(/<span>(.*?)<\/span>/)[1];
  const imgSrcMatch = article.match(/<img src="([^"]+)"/);
  const imgSrc = imgSrcMatch ? imgSrcMatch[1] : '';
  const imgAltMatch = article.match(/alt="([^"]+)"/);
  const imgAlt = imgAltMatch ? imgAltMatch[1] : '';
  const title = article.match(/<h3 class="prof-card__title">(.*?)<\/h3>/)[1];
  const subtitle = article.match(/<p class="prof-card__subtitle">(.*?)<\/p>/)[1];
  const link = article.match(/href="([^"]+)"/)[1];
  const ariaLabelMatch = article.match(/aria-label="([^"]+)"/);
  const ariaLabel = ariaLabelMatch ? ariaLabelMatch[1] : '';

  return {
    imgSrc,
    imgAlt,
    title,
    subtitle,
    link,
    ariaLabel
  };
});

fs.writeFileSync('config.json', JSON.stringify(result, null, 2));
console.log('Extracted ' + result.length + ' cards to config.json');
