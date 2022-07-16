
db.createCollection( 'Users', {validator: {$jsonSchema: {bsonType: 'object',title:'Users',properties: {name: {bsonType: 'string'},userName: {bsonType: 'string'},passwordHash: {bsonType: 'string'},plan: {bsonType: 'string'},courses: {bsonType: 'array',items: {
title:'CoursesSimplified',properties: {name: {bsonType: 'string'},lastUpdated: {bsonType: 'date'}}}}}         }      }});  