const axios = require('axios'); 
const cheerio = require('cheerio'); 
const { program } = require('commander');
const readlineSync = require('readline-sync');


program
    .name('scrappy')
    .description('CLI tool for web scraping.')
    .version('0.2.0')

program
    .command('json')
    .description('Create selector JSON for `url` command')
    .action(() => {
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
        str_json_array = str_json_array.replace(/\#/g, "\\u0023");
        str_json_array = '\' ' + str_json_array + ' \'';

        console.log(str_json_array);        
        process.exit(0);
    });

    

program
    .command('url')
    .description('URL for scraping')
    .argument('<url>', 'url to scrap')
    .requiredOption('-r, --root-element <string>', 'display just the first substring')
    .requiredOption('-j, --json-object <string>', 'what to parse')
    .option('-t, --time-interval <number>', 'time interval to run application')
    .option('-f, --first <number>', 'first n elements will be returned.')
    .action(async (str, options) => {
        
        var url = str;
        var rootElement = null;
        var jsonObject = null;
        var timeInterval = options.timeInterval ?? 0;
        var first = null;

        if (!options.rootElement || !options.jsonObject) {
            console.error('Arguments are not given.')
            process.exit(1);
        }

        if (isNaN(options.first)) {
            console.error("--first is not number.")
            process.exit(2);
        } else if (options.first < 0) {
            console.error("--first cannot be negative")
            process.exit(3);
        } else {
            first = options.first;
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
        while(true) {
            console.log('Starting to scrap.');
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
                    }).toArray();

            await axios.get(url).then(({ data }) => {
                const $ = cheerio.load(data);
                const news = extractNews($);
                
                if (first) {
                    console.log(news.slice(0, first));
                } else {
                    console.log(news);
                }
            });

            if (timeInterval > 0) {
                console.log("Waiting.")
                const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
                await delay(timeInterval)
                console.log("Waiting...")
            } else {
                break;
            }
        } // while        
      })

program.parse()