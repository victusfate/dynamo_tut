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
  TableName : sTable
};

db.scan(params, function(err, data) {
  if (err) {
    console.error('Unable to scan table. Error JSON:', JSON.stringify(err, null, 2));
  } 
  else {
    console.log('Scanned table:', JSON.stringify(data, null, 2));
  }
});
