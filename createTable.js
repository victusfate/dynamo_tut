// brew install dynamodb-local , to run: dynamodb-local
// http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.01.html

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
});

const db      = new AWS.DynamoDB();
const sTable  = 'Incidents';


const params = {
  TableName : sTable,
  KeySchema: [       
    { AttributeName: 'key',         KeyType: 'HASH'  },  //Partition key
    { AttributeName: 'ts',          KeyType: 'RANGE' }   //Sort key
    // { AttributeName: 'latitude',    AttributeType: 'N' },
    // { AttributeName: 'longitude',   AttributeType: 'N' }
  ],
  AttributeDefinitions: [       
    { AttributeName: 'key',         AttributeType: 'S' },
    { AttributeName: 'ts',          AttributeType: 'N' }
    // { AttributeName: 'latitude',    AttributeType: 'N' },
    // { AttributeName: 'longitude',   AttributeType: 'N' }
  ],
  ProvisionedThroughput: {       
    ReadCapacityUnits:  10, 
    WriteCapacityUnits: 10
  }
};

db.createTable(params, function(err, data) {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } 
  else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
