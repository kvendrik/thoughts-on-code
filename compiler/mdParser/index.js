var marked = require('marked'),
	fs = require('fs'),
	utils = require('./utils');

var mdParser = function(options){
	this._options = options;

	this._currParsingChapterName = '';
	this._chapters = {};

	var renderer = this._getRenderer();
	this._chaptersHTML = this._parseMarkdown(renderer);
};

mdParser.prototype._getRenderer = function(){
	var mdRenderer = new marked.Renderer(),
		self = this;

	mdRenderer.heading = function(text, level){
		var escapedParentChapterName = utils.escapeStr(self._currParsingChapterName),
			escapedText = utils.escapeStr(text);

		//push sub chapter into sidebar content
		self._chapters[escapedParentChapterName].subChapters[escapedText] = text;

		//return heading html
		return utils.getHeadingHtml(text, level, escapedParentChapterName+'/'+escapedText);
	};

	return mdRenderer;
};

mdParser.prototype._parseMarkdown = function(renderer){
	var ignoreFiles = this._options.ignoreFiles,
		docsPath = this._options.docsPath,
		files = fs.readdirSync(docsPath),
		self = this;

	var chaptersHTML = [];

	//loop docs files
	files.forEach(function(fileName){
		if(ignoreFiles.indexOf(fileName) === -1){
			//file should be parsed

			//get chapter name
			var chapterName = fileName.replace('.md', '').replace(/^\d+\_/, ''),
				escapedChapterName = chapterName.toLowerCase().replace(/\s/g, '-'),
				markdown,
				chapterHTML = '';

			//set as curr parsing chapter name
			//and create a array to store
			//sub chapters in
			self._currParsingChapterName = chapterName;
			self._chapters[escapedChapterName] = {
				prettyName: chapterName,
				subChapters: {}
			};

			//parse markdown
			markdown = fs.readFileSync(docsPath+'/'+fileName, { encoding: 'utf-8' });

			//add title based on filename
			chapterHTML += utils.getHeadingHtml(chapterName, 1);

			//add parsed content to output
			chapterHTML += marked(markdown, { renderer: renderer });

			//chapters
			chaptersHTML.push(chapterHTML);
		}
	});

	return chaptersHTML;
};

mdParser.prototype.getDetails = function(){
	var self = this;
	return {
		chapters: self._chapters,
		chaptersHTML: self._chaptersHTML
	};
};

module.exports = mdParser;