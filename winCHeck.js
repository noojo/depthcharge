var fs = require('fs');

var s = fs.readFileSync('winners.json', 'utf-8');
var j = JSON.parse(s);

for (var i = 0; i < j.length; i++) {
	if ( j[i] ) {
		if ( j[i][0] ) {
			console.log(j[i][0].recordings[0].title);
			console.log(j[i])
		}
		else {
			if ( j[i].length > 0) {
				console.log(j[i]);
				//
			} else {
				//console.log(j[i].filename);
			}
		}
	}
};