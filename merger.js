var fs = require('fs');


var m = fs.readFileSync('m4a.catalog.json', 'utf-8');
var j = JSON.parse(m);

var m2 = fs.readFileSync('mp3.catalog.json', 'utf-8');
var j2 = JSON.parse(m2);



for ( var x in j2) {
	console.log(j2[x]);
	if (x !== undefined) {
		try {
			j.append(j2[x]);

		}
		catch(e) {
			//console.log(e.message);
			return;
		}
		
	}
}


fs.writeFileSync('full.catalog.json', JSON.stringify(j), 'utf-8');