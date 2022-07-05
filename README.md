# MongoDB data modelling Exercise

A technology startup is going to develop an ELearning portal and they asked us to model it.

To take into consideration:
* It will be a portal within the software development field.
* The portal does have courses, each course does have a number of lectures. Each Lecture does have an article.
* The course's webpage should display the list of authors per course.
* The lecture's webpage should display the author of the lecture.
* The lectures and the content of each article are stored in a storage S3 and a headless CMS, in the database only stored the Id's to those resources.
* The lectures can be classified by category (Devops / Front End / Back End / ...)
* A lecture has an author, a course can have more than one authors.
* You could display the author's biography web page, but it is not frequently visited.


## Application Sitemap 
![SiteMap](bootcamp-backend-student-mongodb-modelling/blob/main/sitemap.JPG)

## Workload
* There is main page that shows the last five lectures published from each category (Front End, Backend, Devops), where we could delegate to cache the page into the web server.
* The web page that shows the course details will be displayed a lot.
* The lecture's webpage will be displayed a lot.
* The author's webpage it is not frequently visited.

Volume (size) data:

* Categories: Initially 4, Front End, Devops, Backend, Others (it might be extended: Movile Development, IA, Blockchain...).
* Courses: Initially 10, it is estimated to be 100 in one year and maximum 1000 in five years.
* Lectures per course: A course will have between 1 and 20 lectures maximum.
* File for a specific course:
  * The text that describes the file of the course will be stored as a external resource to the Database, Mongo only will store a GUID that identifies that content.
  * The lectures will be stored in a CDN, the database only needs to know the GUID of the lecture or URL.


* Write:
  * It is expected to no upload more than one or two courses / lectures per day.
  * It is expected that one author is created as maximum, once a day.
* Read:
  * It is expected an extensive read load in main page and lectures.
  * A similar webpage would be https://www.lemoncode.tv/

## What to deliver
The mandatory exercise consists on modelling the database for a portal that exposes technical lectures, categorised by theme, author,...

You need to deliver the following files:
1. Data model diagram
2. Markdown explaining your data model, patterns applied and reasoning.
3. [Optional] Backup de una base de datos con datos de ejemplo.
Create a folder for the basic exercise and another for the optional part.
