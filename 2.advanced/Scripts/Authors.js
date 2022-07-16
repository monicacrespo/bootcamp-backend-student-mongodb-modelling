
db.createCollection( 'Authors', {validator: {$jsonSchema: {bsonType: 'object',title:'Authors',properties: {name: {bsonType: 'string'},bio: {bsonType: 'string'}}         }      }});  