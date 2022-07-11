# MongoDB data modelling exercise 

Add to the basic model the following requeriments:

1. Add the following structured hierarchical/classified category data:
   Front End >> React
   Front End >> React >> Testing
   Front End >> Angular
   Devops >> Docker
   Devops >> Serverless
   Backend >> nodejs
   Backend >> nodejs >> Express
   Backend >> mongo

2. There might be public and private lectures, that means:
   A course can be 100% public.
   A course can have an initial part 100% public, and another only for subscriptors. 
   This implies there will be registered users and subscriptions.


## Solution structure 

```
├── 1.basic
│   ├── elearningPortal.dmm
│   ├── README.md
├── 2.advanced
│   ├── elearningPortalAdvanced.dmm (new)
│   ├── README.md (new)
│   README.md
```

MongoDB is a document based database. Each record in a collection is a document, and every document should be self-contained (it should contain all information that you need inside it).

To meet the first requirement we will use the Tree structure using Materialized Path. 

For each node we store (ID, PathToNode).

|Id | Ancestors|
|-- | --------|
|React | Front End|
|Testing | Front End, React|
|Angular | Front End|
|Docker | DevOps|
|Serverless | DevOps|
|nodejs | Back End|
|Express | Back End, nodejs|
|mongo | Back End|


Approach looks similar to storing array of ancestors, but we store a path in form of string instead. Note that I intentionally use comma(,) as a path elements divider in order to keep regular expression simpler.

```
// CategoriesSimplified document
{
  "_id": "30"
  "name": "Express"",
  "pathToNode": "Backend, nodejs"
  ]
}
// CategoriesSubset document
 {
  "_id": "30",
  "name": "Express",
  "pathToNode": "Backend, nodejs",
  "courses": [
     {"_id": 785, "name": "Complete NodeJS Developer in 2022 (GraphQL, MongoDB, + more)", "lastUpdated": ISODate ("2022-04-01")},
    ...       
  ]
}
```

![Elearning Portal Model Advanced](ElearningPortalModelAdvanced.JPG)

To meet the second requirement we will create the Users collections.
