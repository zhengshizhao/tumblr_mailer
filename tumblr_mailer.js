//Import modules
var fs = require('fs');
var ejs = require('ejs');
var tumblr = require('tumblr.js');
// var mandrill = require('mandrill-api/mandrill');
// var mandrill_client = new mandrill.Mandrill('NQzD4vSyFFjIUj3REIq83w');

//Read files 
var csvFile = fs.readFileSync("friend_list.csv","utf8");
var mailTemlate = fs.readFileSync("email_template.html", "utf8");

//Convert csv file into JSON style 
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

//csv_data is an array that includes contacts info in its each object element.  
var csv_data = csvParse(csvFile);
//console.log(csv_data);

//Replace fisrtname and NUM_MONTHS_SINCE_CONTACT in emailTemplate with those info of contacts.  
// function mailTemlateReplace(mailTemlateIn, nameFile){
// 	mailTemlateIn = mailTemlateIn.replace(/{{FIRST_NAME}}/g, nameFile['firstName']);
//         mailTemlateIn = mailTemlateIn.replace(/{{NUM_MONTHS_SINCE_CONTACT}}/g, nameFile['numMonthsSinceContact']);
		
//     return mailTemlateIn;
// }
// for (var i =0; i < csv_data.length; i++){
// 	var mailTemlate_data = mailTemlateReplace(mailTemlate, csv_data[i]);
//         console.log(mailTemlate_data);
// }
var client = tumblr.createClient({
  consumer_key: 'hgywT9tKDJMV0gnzazAl2sBr4c5YDuqGO70tz74uLDI7wjZMJe',
  consumer_secret: 'OePz6WKbve3cuqRHcYhUvJZNt8f6QoEuK1O4ikzTmzd6taeGTw',
  token: 'fkTRYp2EkxSXNKCB4fqRcrwusc8CCVETI0tcMMBjsqPZSyG53m',
  token_secret: 'DkQzv0mq4vCto9FkpauiyZaA0BEZP9cmorWwvq8CXcCiCTZh04'
});


// client.userInfo(function (err, data) {
//    console.log(data.user.blogs);
// });

client.posts('zhengshizhao.tumblr.com', function(err, blog){
	    var latestPosts = [];

		for (var j = 0; j <blog.total_posts; j++) {
			var pastDate = Math.ceil((Date.now() - Date.parse(blog.posts[j].date))*1./(1000*3600*24));
        	//if there are blogs posted within 7days, then those posts will be sent.  
        	if (pastDate <= 7) {
        	//console.log("posts within 7days");	
        //	latestPosts.push({href:},{title:});
            latestPosts.push({href:blog.posts[j].short_url, title:blog.posts[j].summary});
         //console.log(pastDate);
            //console.log(latestPosts);
        	}
        }
        //if there are no blogs posted within 7days, then the lastest post will be sent.
        if(latestPosts.length === 0) {

        	//console.log("latest posts");
            latestPosts.push({href:blog.posts[blog.total_posts-1].short_url,title:blog.posts[blog.total_posts-1].summary});
            //console.log(latestPosts);
        }
        
        for (var k =0; k < csv_data.length; k++){
 		var firstName = csv_data[k].firstName;
 		var numMonthsSinceContact = csv_data[k].numMonthsSinceContact; 
 		var toEmail = csv_data[k].emailAddress;
 		var emailTemplate = ejs.render(mailTemlate, {
     		firstName: firstName,
     		numMonthsSinceContact: numMonthsSinceContact,
     		latestPosts:latestPosts
 			});
 		//console.log(latestPosts[0].href,latestPosts[0].title);
 		console.log(emailTemplate);
 		   // sendEmail(firstName, toEmail, 'Zhengshi Zhao', 'zhao.zhengshi@gmail.com', 'Part 4 Project', emailTemplate);
 			}

		
     });

// function sendEmail(to_name, to_email, from_name, from_email, subject, message_html){
//     var message = {
//         "html": message_html,
//         "subject": subject,
//         "from_email": from_email,
//         "from_name": from_name,
//         "to": [{
//                 "email": to_email,
//                 "name": to_name
//             }],
//         "important": false,
//         "track_opens": true,    
//         "auto_html": false,
//         "preserve_recipients": true,
//         "merge": false,
//         "tags": [
//             "GraceHopper_Tumblrmailer_Workshop"
//         ]    
//     };
//     var async = false;
//     var ip_pool = "Main Pool";
//     mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
//         // console.log(message);
//         // console.log(result);   
//     }, function(e) {
//         // Mandrill returns the error as an object with name and message keys
//         console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
//         // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
//     });
//  }


