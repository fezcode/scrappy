# Scrappy.js

A simple web scraper.

## Commands

Format: `node scrappy.js <command>`

There are 3 commands:
- `url`
- `json`
- `help`
----------------------------------------------------------------

### `url`

This command is the main command for scraping. You'll need to use JSON created from 
`json` command.

#### Parameters
First argument is the `url` to be scraped.
- `--root-element` : this is the selector of parent element of the fellow scrapees.
- `--json-object` : this is the json object of soon to be scraped elements. You should create it by `json` command.
- `--time-interval` : Allows you scrap with same configuration in loop with given time interval. If not given then it scraps only for once.
- `--first` : Returns first `n` number of elements given with this command.
- `--help`: Prints help text of the `url` command.


----------------------------------------------------------------
### `json`

This command helps you to create json object interactively.
Prompts following:

```js
{
    field: 'string',
    selector: 'string',
    type: 'string',
    attr_selector: 'string' 
}
```

- `field` is the name of the scraped tag.
- `selector` is the JQuery selector of scraped tag.
- `type` is about getting either `text` value or `attr` value of selected tag. Can only be `text` or `attr`.
- `attr_selector`: if `type` is `attr`, this value must be given to scrap selected attribute.

You can create as many as you want.
If `q` is given at any time during prompt, it will quit and print created json object. Use json output in `url` command.

----------------------------------------------------------------

### `help`

Prints help text.