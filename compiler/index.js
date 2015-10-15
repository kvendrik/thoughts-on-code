process.chdir(__dirname);

var	fs = require('fs'),
	ejs = require('ejs'),
	mdParser = require('./mdParser');

var docsPath = '../docs',
	files = fs.readdirSync(docsPath);

var templateContents = fs.readFileSync('../assets_dev/template.ejs', { encoding: 'utf-8' }),
	ejsParser = ejs.compile(templateContents, {}),
	mdParser = new mdParser({
		docsPath: docsPath,
		ignoreFiles: ['.DS_Store']
	});

var details = mdParser.getDetails(),
	parsedHTML = ejsParser(details);

fs.writeFileSync('../index.html', parsedHTML);
