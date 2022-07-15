
db.createCollection( 'UsersRegistered', {validator: {$jsonSchema: {bsonType: 'object',title:'UsersRegistered',properties: {name: {bsonType: 'string'},userName: {bsonType: 'string'},passwordHash: {bsonType: 'string'},courses: {bsonType: 'array',items: {
title:'CoursesSimplified',properties: {name: {bsonType: 'string'},lastUpdated: {bsonType: 'date'}}}}}         }      }});  