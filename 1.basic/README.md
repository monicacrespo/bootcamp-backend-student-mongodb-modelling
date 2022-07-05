# MongoDB data modelling exercise 

Generate a model that reflects the following requeriments:

1. Show the latest courses published.
2. Show the courses per category (devops / front End ...).
3. Show a course and its lectures.
4. For a lecture, show its author.

# Solution

## Extended ref pattern

I have applied the extended ref pattern to show the author of a lecture. In this e-portal application, the idea of an author exists, as does a lecture. They are separate logical entities.


Lectures collection
```
{
   _id: 785,  
   name: "Core Fundamentals of MongoDB"
   video: objectId("111f1f17bcf86cf123456789"),
   article: objectId("222f1f17bcf86cf123456789"),  
   publishedDate: ISODate ("2022-02-15")
}
```

Authors collection
```
{
    _id: 1,
   name: "Braulio Díez",
   bio: "Desarrollador, ponente, formador y escritor, más de 15 años de experiencia en proyectos internacionales, apasionado del open source"
}
```

Note that for easier understanding, in the examples I am representing the _id as a number, instead of a GUID.

From a performance standpoint, however, this becomes problematic as we need to put the pieces of information together for a specific lecture. One author can have N lectures, creating a 1-N relationship. From an lecture standpoint, if we flip that around, they have an N-1 relationship with an author. Embedding all of the information about an author for each lecture just to reduce the JOIN operation results in a lot of duplicated information. Additionally, not all of the author information may be needed for a lecture.



The Extended Reference pattern provides a great way to handle these situations. Instead of duplicating all of the information on the author or course, we only copy the fields we access frequently. Instead of embedding all of the information or including a reference to JOIN the information, we only embed those fields of the highest priority and most frequently accessed, such as nameAuthor and nameCourse.

Lectures collection
```
{
    _id: 785,  
    name: "Core Fundamentals of MongoDB"
   video: objectId("111f1f17bcf86cf123456789"),
   article: objectId("222f1f17bcf86cf123456789"),   
   publishedDate: ISODate ("2022-02-15"),   
   nameAuthor: "Braulio Díez"
}
```

In `authors` collection the `name` is an unique constraint to allow only a single document with the same value for the indexed key. 

Similarly, one course can have N lectures, creating a 1-N relationship. From an lecture standpoint, if we flip that around, they have an N-1 relationship with a course. Embedding all of the information about a course for each lecture just to reduce the JOIN operation results in a lot of duplicated information. Additionally, not all of the course information may be needed for a lecture.

Lectures collection
```
{
    _id: 785,  
    name: "Core Fundamentals of MongoDB"
   video: objectId("111f1f17bcf86cf123456789"),
   article: objectId("222f1f17bcf86cf123456789"),   
   publishedDate: ISODate ("2022-02-15"),   
   nameAuthor: "Braulio Díez",
   nameCourse: "The Complete Developers Guide to MongoDB"
}
```
In `courses` collection the `name` is an unique constraint to allow only a single document with the same value for the indexed key. 

## Embedded Document Pattern
Consider the following example that maps category and multiple lectures relationship. In this one-to-many relationship between category and lectures data, the category has multiple lectures entities.

In the normalized data model, the lecture documents contain a reference to the category document.
```
// category document
{
   _id: "1",
   name: "Back End"
}

// lecture documents
{
   category_id: "1", // reference to category document
   _id: 785,  
   name: "Core Fundamentals of MongoDB"
   video: objectId("111f1f17bcf86cf123456789"),
   article: objectId("222f1f17bcf86cf123456789"),
   publishedDate: ISODate ("2022-02-15"),
   nameAuthor: "Braulio Díez",
   nameCourse: "The Complete Developers Guide to MongoDB"     
}
{
   category_id: "1",
   _id: 786,  
   name: "Mongo Operators"
   video: objectId("345f1f17bcf86cf123456789"),
   article: objectId("777f1f17bcf86cf123456789"),
   publishedDate: ISODate ("2022-02-16"),   
   nameAuthor: "Braulio Díez",
   nameCourse: "The Complete Developers Guide to MongoDB"
}
```

Because the application frequently retrieves the lectures data with the name (category) information, then it needs to issue multiple queries to resolve the references. A more optimal schema would be to embed the `lectures` data entities in the `category` data, as in the following document:
```
{
   "_id": "1",
   "name": "Back End",
   "lectures": [
                {
                    "_id": 786,  
                    "name": "Mongo Operators"
                    "video": objectId("345f1f17bcf86cf123456789"),
                    "article": objectId("777f1f17bcf86cf123456789"),
                    "nameCourse": "The Complete Developers Guide to MongoDB",
                    "nameAuthor": "Braulio Díez",
                    "publishedDate": ISODate ("2022-02-16")
                },
                {
                    "_id": 785,  
                    "name": "Core Fundamentals of MongoDB"
                    "video": objectId("111f1f17bcf86cf123456789"),
                    "article": objectId("222f1f17bcf86cf123456789"),
                    "nameCourse": "The Complete Developers Guide to MongoDB",
                    "nameAuthor": "Braulio Díez",
                    "publishedDate": ISODate ("2022-02-15")
                },
                ...
                {
                    "_id": 1,  
                    "categoryId": 1, 
                    "name": "Let's Start"
                    "video": objectId("187f1f17bcf86cf123456789"),
                    "article": objectId("210f1f17bcf86cf123456789"),
                    "nameCourse": "The Complete Developers Guide to MongoDB",
                    "nameAuthor": "Braulio Díez",
                    "publishedDate": ISODate ("2022-01-01")
                }
              ]
 }
```

With the embedded data model, your application can retrieve the complete category information with one query.

## Subset pattern
A potential problem with the embedded document pattern is that it can lead to large documents, especially if the embedded field is unbounded. In this case, you can use the subset pattern to only access data which is required by the application, instead of the entire set of embedded data.

The lectures are sorted in reverse chronological order. When an user visits a category page, the application loads the five most recent lectures.

Instead of storing all of the lectures, up to 20, with the category, you can split the collection into two collections:

The `categories` collection stores information on each category, including the category's five most recent lectures, as per requirement.
```
{
   "_id": "1",
   "name": "Back End",
   "lectures": [
                {
                    "_id": 786,  
                    "name": "Mongo Operators"
                    "video": objectId("345f1f17bcf86cf123456789"),
                    "article": objectId("777f1f17bcf86cf123456789"),
                    "nameCourse": "The Complete Developers Guide to MongoDB",
                    "nameAuthor": "Braulio Díez",
                    "publishedDate": ISODate ("2022-02-16")
                },              
                ...
                {
                    "_id": 776,  
                    "categoryId": 1, 
                    "name": "Understanding Databases, Collections & Documents",
                    "video": objectId("121f1f17bcf86cf123456789"),
                    "article": objectId("118f1f17bcf86cf123456789"),
                    "nameCourse": "The Complete Developers Guide to MongoDB",
                    "nameAuthor": "Daniel Olmo",
                    "publishedDate": ISODate ("2022-01-15")
                }
              ]
 }
```

The `lectures` collection stores all lectures. Each lecture contains a reference to the category for which it was written.
```
{
    "_id": 786,
    "categoryId": 1, 
    "name": "Mongo Operators"
    "video": objectId("345f1f17bcf86cf123456789"),
    "article": objectId("777f1f17bcf86cf123456789"),
    "nameCourse": "The Complete Developers Guide to MongoDB",
    "nameAuthor": "Braulio Díez",
    "publishedDate": ISODate ("2022-02-16")
}
{
    "_id": 785,
    "categoryId": 1, 
    "name": "Core Fundamentals of MongoDB"
    "video": objectId("111f1f17bcf86cf123456789"),
    "article": objectId("222f1f17bcf86cf123456789"),
    "nameCourse": "The Complete Developers Guide to MongoDB",
    "nameAuthor": "Braulio Díez",
    "publishedDate": ISODate ("2022-02-15")
}
...
{
    "_id": 1,  
    "categoryId": 1, 
    "name": "Let's Start"
    "video": objectId("187f1f17bcf86cf123456789"),
    "article": objectId("210f1f17bcf86cf123456789"),
    "nameCourse": "The Complete Developers Guide to MongoDB",
    "nameAuthor": "Braulio Díez",
    "publishedDate": ISODate ("2022-01-01")
}
```

## Elearning Portal Model
![Elearning Portal Model](bootcamp-backend-student-mongodb-modelling/blob/main/1.basic/ELearningPortalModel.JPG)