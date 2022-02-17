const axios = require('axios'); 
const cheerio = require('cheerio'); 
const { program } = require('commander');

program
    .name('scrappy')
    .description('CLI tool for web scraping.')
    .version('0.0.1')

program
    .command('json')
    .description('Create selector JSON for `url` command')
    .action(() => {
        var readlineSync = require('readline-sync');
        let json_array = [];
        var run = true;

        console.log('Type `q` to exit at any prompt.')
        while(run) {
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

            json_array.push({
                field: field,
                selector: selector,
                type: type,
                attr_value: attr_value
            });

            console.log();
        }

        var str_json_array = JSON.stringify(json_array);
        str_json_array = str_json_array.replace(/\"/g, "\\\"");
        str_json_array = str_json_array.replace(/\>/g, "\\u003E");
        str_json_array = '\' ' + str_json_array + ' \'';

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
        var url = str;
        var rootElement = null;
        var jsonObject = null;

        if (!options.rootElement || !options.jsonObject) {
            console.error('Arguments are not given.')
            process.exit(1);
        }

        rootElement = options.rootElement;

        try {
            console.log("ARG: " + options.jsonObject);
            jsonObject = JSON.parse(options.jsonObject);
        } catch (e) {
            console.error("Error: " + e.message);
            process.exit(1);
        }


        /// Second part

        console.log(typeof(jsonObject));

        console.log('--------------------------------');
        console.log(jsonObject);
        console.log('--------------------------------');

        console.log(jsonObject[0].field)

        var x = { piss: 12}
        console.log(x)
        console.log(x['piss'])


        /// Scrap part
        const extractNews = $ => 
            $(rootElement)
                .map( (_,product) => {
                    const $product = $(product);
                    let temp_obj = {};
                    jsonObject.forEach(element => {
                        switch (element.type) {
                            case 'text':
                                temp_obj[element.field] = $product.find(element.selector).text()
                                break;
                            case 'attr':
                                temp_obj[element.field] = $product.find(element.selector).attr(element.attr_value)                            
                                break;
                        }
                    });

                    return temp_obj;

                    // return {
                    //     link:    $product.find('a').attr('href'),
                    //     imglink: $product.find('a > div.news-photo > img').attr('src'), 
                    //     title:   $product.find('a > div.news-footer > h3').text(), 
                    //     date:    $product.find('a > div.news-footer > div.date').text(), 
                    //     text:    $product.find('a > div.news-footer > div.text').text(), 
                    // };
                }).toArray();

        axios.get(url).then(({ data }) => {
            const $ = cheerio.load(data);
            // $.html();
            const news = extractNews($);
            console.log(news.slice(0, 14));
        });

      })

program.parse()