var fs = require('fs');

var object = 
{
	"first_name": "Vardan",
	"last_name": "Hovsepyan",
	"age": 13,
	"isTumoStudent": true
}

var jsonApp = JSON.stringify(object);

fs.writeFileSync("obj.json", jsonApp);
