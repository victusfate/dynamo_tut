// brew install dynamodb-local , to run: dynamodb-local
// http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.01.html

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
});

const db      = new AWS.DynamoDB.DocumentClient();
const sTable  = 'Incidents';


const id = '-k0';

const params = {
  TableName : sTable,
  IndexName : 'tsIndex',
  KeyConditionExpression: 'sessionId = :lucho and ts > :startTime',
  ExpressionAttributeValues: {
    ':lucho'      : 'lucho',
    ':startTime'  : 1477496917025
  },
  ScanIndexForward: false
};

db.query(params, function(err, data) {
  if (err) {
    console.error('Unable to query table. Error JSON:', JSON.stringify(err, null, 2));
  } 
  else {
    console.log('Queried table:', JSON.stringify(data, null, 2));
  }
});
