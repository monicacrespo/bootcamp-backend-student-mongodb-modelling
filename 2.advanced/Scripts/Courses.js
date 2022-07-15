
db.createCollection( 'Courses', {validator: {$jsonSchema: {bsonType: 'object',title:'Courses',properties: {description: {bsonType: 'string'},lecture: {bsonType: 'array',items: {
title:'LecturesSimplified',properties: {name: {bsonType: 'string'},publishedDate: {bsonType: 'date'},isPrivate: {bsonType: 'bool'}}}},author: {bsonType: 'array',items: {
title:'AuthorsSimplified',properties: {name: {bsonType: 'string'}}}},name: {bsonType: 'string'},lastUpdated: {bsonType: 'date'},category: {bsonType: 'object',
title:'CategoriesSimplified',properties: {name: {bsonType: 'string'},pathToNode: {bsonType: 'string'}}}}         }      },
max:1000
});  