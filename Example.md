## Scrap then exit

```bash
yarn app url "https://samsun.bel.tr/samsun-haber/genel-haberler" -r ".news-card" -j ' [{\"field\":\"link\",\"selector\":\"a\",\"type\":\"attr\",\"attr_value\":\"href\"},{\"field\":\"imglink\",\"selector\":\"a \u003E div.news-photo \u003E img\",\"type\":\"attr\",\"attr_value\":\"src\"},{\"field\":\"title\",\"selector\":\"a \u003E div.news-footer \u003E h3\",\"type\":\"text\",\"attr_value\":\"\"},{\"field\":\"date\",\"selector\":\"a \u003E div.news-footer \u003E div.date\",\"type\":\"text\",\"attr_value\":\"\"},{\"field\":\"text\",\"selector\":\"a \u003E div.news-footer \u003E div.text\",\"type\":\"text\",\"attr_value\":\"\"}] '
```

## Scrap forever with 10 second interval
```bash
yarn app url "https://samsun.bel.tr/samsun-haber/genel-haberler" -r ".news-card" -j ' [{\"field\":\"link\",\"selector\":\"a\",\"type\":\"attr\",\"attr_value\":\"href\"},{\"field\":\"imglink\",\"selector\":\"a \u003E div.news-photo \u003E img\",\"type\":\"attr\",\"attr_value\":\"src\"},{\"field\":\"title\",\"selector\":\"a \u003E div.news-footer \u003E h3\",\"type\":\"text\",\"attr_value\":\"\"},{\"field\":\"date\",\"selector\":\"a \u003E div.news-footer \u003E div.date\",\"type\":\"text\",\"attr_value\":\"\"},{\"field\":\"text\",\"selector\":\"a \u003E div.news-footer \u003E div.text\",\"type\":\"text\",\"attr_value\":\"\"}] ' -t 10000
```

## Scrap forever with 10 second interval and get first 10 element

```bash
yarn app url "https://samsun.bel.tr/samsun-haber/genel-haberler" -r ".news-card" -j ' [{\"field\":\"link\",\"selector\":\"a\",\"type\":\"attr\",\"attr_value\":\"href\"},{\"field\":\"imglink\",\"selector\":\"a \u003E div.news-photo \u003E img\",\"type\":\"attr\",\"attr_value\":\"src\"},{\"field\":\"title\",\"selector\":\"a \u003E div.news-footer \u003E h3\",\"type\":\"text\",\"attr_value\":\"\"},{\"field\":\"date\",\"selector\":\"a \u003E div.news-footer \u003E div.date\",\"type\":\"text\",\"attr_value\":\"\"},{\"field\":\"text\",\"selector\":\"a \u003E div.news-footer \u003E div.text\",\"type\":\"text\",\"attr_value\":\"\"}] ' -t 10000 -f 10
```