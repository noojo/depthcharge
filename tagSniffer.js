var fs = require('fs');
var acoustid = require("acoustid");
var Sync = require('sync');

var s = fs.readFileSync('tags.json', 'utf-8');
var j = JSON.parse(s);
var g = {};
var losers = [];

var winners = [];
var nogood = [];

// for ( key in g ) {
// 	if ( key.length < 3) {
// 		console.log('-->'+key+'<--');
// 		losers.push(key);
// 	}
// 	if ( key.indexOf("Un") > -1) {
// 		console.log('-->'+key+'<--');
// 		losers.push(key);
// 	}

// }


function addTags(file, i, callback) {
	console.log(file);
	acoustid(file, { key: "kE8FSUia" }, acallback);
	function acallback(err, results) {
	    if (err) { nogood.push(file); return; }
	    //var artist = results[0].recordings[0].artists[0].name;
	    console.log(JSON.stringify(results));
	    if ( results[0]) {

	    	var w = {};
	    	w['filename'] = file;
	    	w['details'] = results;
	    	//results[0].recordings[0].filename = file;
	    	winners.push(w);
	    	//console.log(results[0].recordings[0].filename);
		} else {
			console.log('LOSER: ' + file);
			losers.push(file);
		}

	    callback();
	}
}


Sync( function() {
	try {
	for (var i = 0; i < j.length; i++) {
		//console.log(j[i].genre);
		var ge = j[i].genre;
		for (var k = 0; k < ge.length; k++) {
			g[ge[k]] = 1;

			if ( ge[k].length < 3 ) {
				losers.push(j[i]);
			}
			if ( ge[k].indexOf("Un") > -1) {
				losers.push(j[i]);
			}
		};
	
	};
	console.log(losers.length +  ' losers.')
	for (var k = 0; k < losers.length; k++) {
		//console.log(losers[i].filename);
		addTags.sync(null, losers[k].filename, k );
	};

	fs.writeFileSync('winners.json', JSON.stringify(winners), 'utf-8');
	fs.writeFileSync('nogood.json', JSON.stringify(nogood), 'utf-8');
	}
	catch (e) {
		console.log(e);
	}

	return 0;
});