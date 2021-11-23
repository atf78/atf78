'use strict';
var QUEUE_URL = 'https://sqs.us-east-2.amazonaws.com/928386612721/mySQSQueue';
var AWS = require('aws-sdk');
var sqs = new AWS.SQS({region :'us-east-2'});

exports.handler = function(event,context,callback) {
  //exports.handler = function(event, context) {
    
  var parms = {
    MessageBody: JSON.stringify(event),  
    QueueUrl : QUEUE_URL,
  };
  sqs.sendMessage(parms, function(err,data){
    if(err) {
      console.log('error:',"Fail Send Message" + err);
      context.done('error',"Error Pit SQS"); // Error w/ message
    } else {
      console.log('data:',data.MessageId);
      context.done(null,''); //Success Sent SQS
    }  
  });  
  
  let responseMessage = 'Hello, World!';
  if (event.queryStringParameters && event.queryStringParameters['Name']) {
    console.info("EVENT new\n" + JSON.stringify(event, null, 2));
    console.info(`Q URL new\n ${QUEUE_URL}`);
    console.info("Response\n" + responseMessage);
    responseMessage = 'Hello, ' + event.queryStringParameters['Name'] + '!';
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(responseMessage),
    headers: {'Content-Type': 'application/json'}
  });
}
