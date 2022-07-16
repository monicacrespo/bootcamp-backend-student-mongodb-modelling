
db.createCollection( 'Categories', {validator: {$jsonSchema: {bsonType: 'object',title:'Categories',properties: {name: {bsonType: 'string'}}         }      }});  