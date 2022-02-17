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
    .command('json')
    .description('Create JSON for `url` command')
    .action(() => {
        var readlineSync = require('readline-sync');

        let json_array = [];

        var run = true;
        console.log('Type `q` to exit at any prompt.')
        while(run) {
            let json_obj = {};

            var field = readlineSync.question('Field: ');
            if (field === 'q') break;

            var selector = readlineSync.question('Selector: ');
            if (selector === 'q') break;

            var wrong_type = true;
            var type;
            while (wrong_type) {
                type = readlineSync.question('Type (text or attr): ');
                
                if (type === 'q') {
                    run = false;
                    break;
                } 

                if (['text', 'attr'].indexOf(type) < 0 ) {
                    console.error("Wrong type given.")
                } else {
                    wrong_type = false;
                }
            }

            if (!run) break;
            
            var attr_value = readlineSync.question('Attr Selector (if any): ');
            if (attr_value === 'q') break;

            json_obj = {
                field: field,
                selector: selector,
                type: type,
                attr_value: attr_value
            }

            json_array.push(json_obj);

            // console.log(json_obj);
            

            // json_obj[field] = value;






            // var str_json_obj = JSON.stringify(json_obj);

            // console.log(json_obj);
            // console.log(str_json_obj);

            // str_json_obj = str_json_obj.replace(/\"/g, "\\\"");
            // console.log(str_json_obj);

            // json_array.push(str_json_obj);
        
        
        }

        var str_json_array = JSON.stringify(json_array);
        str_json_array = str_json_array.replace(/\"/g, "\\\"");

        console.log(str_json_array);
        
        


        process.exit(0);
    });

    

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
            console.log("ARG: " + options.jsonObject);
            // var str_json = JSON.stringify(options.jsonObject);
            // console.log("XXX:" + str_json);
            jsonObject = JSON.parse(options.jsonObject);
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

console.log(jsonObject[0].field)

var x = { piss: 12}
console.log(x)
console.log(x['piss'])


process.exit(0)


const extractNews = $ => 
    $('.news-card')
        .map( (_,product) => {
            const $product = $(product);
            return {
                link:    $product.find('a').attr('href'),
                imglink: $product.find('a > div.news-photo > img').attr('src'), 
                title:   $product.find('a > div.news-footer > h3').text(), 
                date:    $product.find('a > div.news-footer > div.date').text(), 
                text:    $product.find('a > div.news-footer > div.text').text(), 
            };
        }).toArray();

axios.get('https://samsun.bel.tr/samsun-haber/genel-haberler').then(({ data }) => {
        const $ = cheerio.load(data);
        // $.html();
        const news = extractNews($);
        console.log(news.slice(0, 14));
     });


    // body > div > div.inner-page__wrapper > div > div > div.col-article.col > div > div.news.style-1.list > ul



// const news = extractNews($);
// console.log(news);