// brew install dynamodb-local , to run: dynamodb-local
// http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.01.html

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
});

const db      = new AWS.DynamoDB.DocumentClient();
const sTable  = 'Incidents';

// just used to represent incident json data
const oIncidentBase = {
  "address" : "780 3rd Ave, New York, NY 10017, USA",
  "cityCode" : "nyc",
  "hasVod" : true,
  "level" : 1,
  "liveStreamers" : {
    "de8bb371f14d4bdc80d5" : {
      "cs" : 1477496059721,
      "hlsDone" : true,
      "ll" : [ 40.75488417878817, -73.9718003757987 ],
      "ts" : 1477496917025,
      "username" : "JR",
      "videoStreamId" : "747392c4-15ae-492b-b732-eca3b4015e8b"
    }
  },
  "location" : "780 3rd Avenue",
  "neighborhood" : "Midtown East",
  "placeName" : "780 3rd Ave",
  "raw" : "Large Group of Protesters at 780 3rd Ave, New York, NY 10017, USA",
  "rawLocation" : "780 3rd Ave, New York, NY 10017, USA",
  "sessionId" : "lucho",
  "status" : "active",
  "title" : "Large Group of Protesters Outside Senator's Office, Arrests Made",
  "transcriber" : "google:104637345869051085501",
  "updates" : {
    "-KV0Op02CRONAiUiE43F" : {
      "text" : "Incident reported at 780 3rd Avenue.",
      "ts" : 1477492297832
    },
    "-KV0OzM4fRVWfRX5WEY0" : {
      "text" : "Police are on scene where approximately 100 protesters are gathered.",
      "ts" : 1477492340089
    },
    "-KV0P-dArBk_ml-WN-L1" : {
      "text" : "The 17th Precinct sergeant has requested a Level-One Mobilization for crowd control.",
      "ts" : 1477492345360
    },
    "-KV0PYmTJzrvpjZgocvr" : {
      "text" : "The NYPD's Strategic Response Group (SRG) is sending officers to the scene.",
      "ts" : 1477492489274
    },
    "-KV0Q31Z-i3GAMqQprOX" : {
      "text" : "The NYPD Legal Bureau has been requested, along with the Technical Assistance Response Unit (TARU).",
      "ts" : 1477492621404
    },
    "-KV0RPOTNcAoJfdAiFqK" : {
      "text" : "The protest may be related to the legality of Airbnb operations in New York City.",
      "ts" : 1477492975121
    },
    "-KV0SfVL_ncfV6FForlA" : {
      "text" : "Police are bringing the Long Range Acoustic Device (LRAD) public address system.",
      "ts" : 1477493307323
    },
    "-KV0UndpIVyL9YZzIaRz" : {
      "hlsReady" : true,
      "text" : "JR is live on the scene.",
      "ts" : 1477493865124,
      "uid" : "de8bb371f14d4bdc80d5",
      "videoStreamId" : "11709af9-acb4-42cd-bddb-735c1e4fe5ca"
    },
    "-KV0VVUiWIDGirlQwG5_" : {
      "text" : "US Senator Charles Schumer has an office in the building.",
      "ts" : 1477494046441
    },
    "-KV0VX_RglFVIYMUYFoP" : {
      "text" : "The protest is over construction of a pipeline.",
      "ts" : 1477494057215
    },
    "-KV0Vz0gSMUsK7fgf7EP" : {
      "text" : "People are drumming and chanting on the sidewalk.",
      "ts" : 1477494173716
    },
    "-KV0YRCCRimB1WLIM27G" : {
      "text" : "Police are bringing wagons to transport people who may be arrested.",
      "ts" : 1477494817503
    },
    "-KV0Y_iJkXVJI1DfTjQX" : {
      "text" : "Some of the protesters are behind a railing; others may be blocking a building's entrance.",
      "ts" : 1477494856471
    },
    "-KV0an6NbOsp4ZC4f5X7" : {
      "text" : "Police have used a loudspeaker to ask those blocking the doorway to stand up and disperse.",
      "ts" : 1477495697799
    },
    "-KV0bXm-ukjkBux0ED7x" : {
      "text" : "People are now being arrested by NYPD officers.",
      "ts" : 1477495892926
    },
    "-KV0bbpyzVp6tgeZ05-j" : {
      "text" : "Police are using plastic zip ties to restrain the hands of some of those who were sitting in front of the building's entrance.",
      "ts" : 1477495913754
    },
    "-KV0byJG0nhwIlIvexOs" : {
      "text" : "Approximately 15 people have been arrested so far, police report.",
      "ts" : 1477496005798
    },
    "-KV0c9hOh0u3LszWgSct" : {
      "hlsDone" : true,
      "hlsVodDone" : true,
      "text" : "JR has stopped broadcasting.",
      "ts" : 1477496056717,
      "uid" : "de8bb371f14d4bdc80d5",
      "videoStreamId" : "11709af9-acb4-42cd-bddb-735c1e4fe5ca"
    },
    "-KV0cAT-HJGVew3Ncfuu" : {
      "hlsReady" : true,
      "text" : "JR is live on the scene.",
      "ts" : 1477496059828,
      "uid" : "de8bb371f14d4bdc80d5",
      "videoStreamId" : "747392c4-15ae-492b-b732-eca3b4015e8b"
    },
    "-KV0eOUFnI3O7H4bqk1R" : {
      "hlsDone" : true,
      "hlsVodDone" : true,
      "text" : "JR has stopped broadcasting.",
      "ts" : 1477496641540,
      "uid" : "de8bb371f14d4bdc80d5",
      "videoStreamId" : "747392c4-15ae-492b-b732-eca3b4015e8b"
    }
  },
  "whoa" : false
}


const NItems = 2;

const center    = [-73.993549, 40.727248];
const lowerLeft = [-74.009180, 40.716425];
const deltaLon  = Math.abs(lowerLeft[0] - (-73.97725));
const deltaLat  = Math.abs(lowerLeft[1] - (40.7518692));


for (let i=0;i < NItems;i++) {
  const id = '-k' + i;
  const ll = [lowerLeft[1] + Math.random() * deltaLat,lowerLeft[0] + Math.random() * deltaLon];
  const tNow = Date.now();
  const oItem = Object.assign(oIncidentBase, { 
    incidentId  : id,
    cs          : tNow - 10 * 60 * 1000,
    ts          : tNow,
    latitude    : ll[0],
    longitude   : ll[1],
    ll          : ll,
    key         : id
  });

  const params = {
    TableName : sTable,
    Item: oItem
  };

  console.log(JSON.stringify(params,null,2));

  db.put(params, function(err, data) {
    if (err) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
    } 
    else {
      console.log('Added item:', JSON.stringify(data, null, 2));
    }
  });
}
