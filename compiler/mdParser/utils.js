var utils = {
	
	getHeadingHtml: function(text, level, path){
		var escapedText = text.toLowerCase().replace(/\s/g, '-'),
			path = path || escapedText;

	  	return '<a href="#/'+path+'" class="a--h-anchor"><h'+level+' id="/'+path+'">'+text+'</h'+level+'></a>';
	},

	escapeStr: function(text){
		return text.toLowerCase().replace(/\s/g, '-');
	}

};

module.exports = utils;