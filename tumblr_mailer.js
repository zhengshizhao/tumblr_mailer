var fs = require('fs');

var csvFile = fs.readFileSync("friend_list.csv","utf8");

function csvParse(csvFileIn){
        var arrayFileOut = [];
	var objFileOut={};
	var lines = csvFileIn.split("\n").map(function(x){
		return x.split(",");
		});
	var keyNumbers = lines[0].length;
	
	for (var i = 1; i < lines.length; i++) {
	    if (lines[i].length === keyNumbers) {
		    for (var j = 0; j < keyNumbers; j++)  {
			 objFileOut[lines[0][j]] =""+lines[i][j];
		}  
	     arrayFileOut.push(objFileOut);
	     objFileOut = {};
	    }
	}
	return arrayFileOut;
}
var csv_data = csvParse(csvFile);
console.log(csv_data);
