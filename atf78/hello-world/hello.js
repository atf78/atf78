module.exports.handler = async (event) => {
  
  var SQS_QUEUE_URL = 'https://sqs.us-east-2.amazonaws.com/928386612721/mySQSQueue';
  
  console.info("EVENT\n" + JSON.stringify(event, null, 2));
  console.info("Q URL\n " + SQS_QUEUE_URL);
 
 // console.info('Event: ', event);
  var params = {
    MessageBody: JSON.stringify(event),  
    QueueUrl : SQS_QUEUE_URL,
  };

  let responseMessage = 'Hello, World!';

  if (event.queryStringParameters && event.queryStringParameters['Name']) {
    responseMessage = 'Hello, ' + event.queryStringParameters['Name'] + '!';
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: responseMessage,
    }),
  }
}
