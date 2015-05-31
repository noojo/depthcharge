var fs = require('fs');
var id3 = require('id3js');
var dive = require('dive');
////var id3_reader = require('id3_reader');
//var ffmetadata = require("ffmetadata");


var catalog = [];
var files = [];
var exts = ['.mp3', '.m4a'];

dive( '/mnt/music', { directories: false, files: true }, function(err, filename) {
	if( err !== null) {
		console.log('A');
		console.log(err);
	}
	else {		
			//if ( filename.toLowerCase().indexOf('.mp3') > -1 ) {
			if ( filename.toLowerCase().indexOf('.m4a') > -1  || filename.toLowerCase().indexOf('.mp3') > -1) {
				files.push(filename);
			}	
	}
}, 
function () {
	fs.writeFileSync('./all.catalog.json', JSON.stringify(files), 'utf-8');
	console.log('complete ' + files.length);

});
	





