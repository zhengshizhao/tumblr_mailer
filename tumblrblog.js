var tumblr = require('tumblr.js');

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
  console.log(blog);
})
