var fs = require('fs');
var mm = require('musicmetadata');
var Sync = require('sync');

var m = fs.readFileSync('all.catalog.json', 'utf-8');
var j = JSON.parse(m);
var n = [];
var bad = [];

function addTags(file, i, callback) {
			var parser = mm(fs.createReadStream(file));
			parser.on('metadata', function (result) {
  				//console.log(result);
  				var ob = {};
  				
  				ob.filename = file;
  				ob.title = result.title;
  				ob.artist = result.artist;
  				ob.album = result.album;
  				ob.year = result.year;
  				ob.genre = result.genre;
  				ob.track = result.track;
  				ob.duration = result.duration;
  				n.push(ob);
  				//fs.writeFileSync('tags.json', JSON.stringify(n), 'utf-8');
			});
			parser.on('done', function (err) {
				//console.log('DESTROY');
  				if (err){ 
            console.log(file); 
            bad.push(file);
            console.log(err);
          } 
  					
  				parser.stream.destroy();
  				callback();
			});
}


Sync( function() {
	for (var i = 0; i < j.length; i++) {
		addTags.sync(null, j[i], i);
		//Sync.sleep(100);
	};

	fs.writeFileSync('all.tags.json', JSON.stringify(n), 'utf-8');
  fs.writeFileSync('nometa.json', JSON.stringify(bad), 'utf-8');
	return 0;
});

