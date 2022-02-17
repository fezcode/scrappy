const axios = require('axios'); 
const cheerio = require('cheerio'); 
const { program } = require('commander');

var url = null;
var rootElement = null;
var jsonObject = null;

program
    .name('scrappy')
    .description('CLI tool for web scraping.')
    .version('0.0.1')
    
program
    .command('url')
    .description('URL for scraping')
    .argument('<string>', 'url to scrap')
    .option('-r, --root-element <string>', 'display just the first substring')
    .option('-j, --json-object <string>', 'what to parse')
    .action((str, options) => {
        url = str;

        if (!options.rootElement || !options.jsonObject) {
            console.error('Arguments are not given.')
            process.exit(1);
        }

        rootElement = options.rootElement;
        try {
            var str_json = JSON.stringify(options.jsonObject);
            console.log("XXX:" + str_json);
            jsonObject = JSON.parse(str_json);
        } catch (e) {
            console.error("Error: " + e.message);
            process.exit(1);
        }
      })

program.parse()

// jsonObject = JSON.parse(jsonObject);

console.log(typeof(jsonObject));

console.log('--------------------------------');
console.log(jsonObject);
console.log('--------------------------------');

console.log(jsonObject['link'])

var x = { piss: 12}
console.log(x)
console.log(x['piss'])


process.exit(0)


const extractNews = $ => 
    $('.news-card')
        .map( (_,product) => {
            const $product = $(product);
            return {
                link: $product.find('a').attr('href'),
                imglink: $product.find('a > div.news-photo > img').attr('src'), 
                title: $product.find('a > div.news-footer > h3').text(), 
                date: $product.find('a > div.news-footer > div.date').text(), 
                text: $product.find('a > div.news-footer > div.text').text(), 
            };
        }).toArray();

axios.get('https://samsun.bel.tr/samsun-haber/genel-haberler').then(({ data }) => {
        const $ = cheerio.load(data);
        $.html();
        const news = extractNews($);
        console.log(news.slice());
     });


    // body > div > div.inner-page__wrapper > div > div > div.col-article.col > div > div.news.style-1.list > ul



// const news = extractNews($);
// console.log(news);