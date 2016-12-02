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
  AttributeDefinitions: [
    { AttributeName: 'sessionId', AttributeType: 'S'     },  //Partition key
    { AttributeName: 'ts',        AttributeType: 'N'     }   //Sort key  
  ],
  GlobalSecondaryIndexUpdates: [
    {
      Create: {
        IndexName: 'tsIndex', 
        KeySchema: [
          { AttributeName: 'sessionId', KeyType: 'HASH'  },      
          { AttributeName: 'ts',        KeyType: 'RANGE' }
        ],
        Projection: {
          ProjectionType  : 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits   : 5,
          WriteCapacityUnits  : 5
        }        
      }
    }
  ]
};

db.updateTable(params, function(err, data) {
  if (err) {
    console.error('Unable to update table. Error JSON:', JSON.stringify(err, null, 2));
  } 
  else {
    console.log('Updated table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
