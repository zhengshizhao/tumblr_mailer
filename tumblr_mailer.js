var fs = require('fs');

var csvFile = fs.readFileSync("friend_list.csv","utf8");
var mailTemlate = fs.readFileSync("email_template.html", "utf8");


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

function mailTemlateReplace(mailTemlateIn, nameFile){
	for (var i =0; i < nameFile.length; i++){
		mailTemlateIn = mailTemlateIn.replace(/{{FIRST_NAME}}/g, nameFile[i]['firstName']);
        mailTemlateIn = mailTemlateIn.replace(/{{NUM_MONTHS_SINCE_CONTACT}}/g, nameFile[i]['numMonthsSinceContact']);
		}
    return mailTemlateIn;
}

var mailTemlate_data = mailTemlateReplace(mailTemlate, csv_data);


//console.log(csv_data);
console.log(mailTemlate_data);