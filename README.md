FORMAT: 1A
 
# WorldView API
Worldview is a website that allow travellers to choose their desired destination by looking at photos from it taken by other travellers.

# Group Gallery
All filtered photos on a single page.
 
## Photos [/photos/{id}]
Provides access to a single photo.
 
+ Model (application/json)
 
    JSON representation of photos.
 
    + Body
 
            {
            "id": "1",
            "city": "Sofia,Bulgaria",
            "season": "Winter",
            "date": "2012-04-23T18:25:43.511Z",
            "object-name": "Cathedral Saint Alexandar Nevski",
            "img-source": "http://static.panoramio.com/photos/large/8072372.jpg"
            }
 
### Retrieve a Photo [GET]
+ Response 200
    
    [Photos][]
 
### Delete a Photo [DELETE]
+ Response 204
 
## Photos Collection [/photos{?q}]
Provides access to all photos.
 
+ Model (application/json)
 
    JSON representation of photos.
 
    + Body
 
            {
            "id": "1",
            "city": "Sofia,Bulgaria",
            "season": "Winter",
            "date": "2012-04-23T18:25:43.511Z",
            "object-name": "Cathedral Saint Alexandar Nevski",
            "img-source": "http://static.panoramio.com/photos/large/8072372.jpg"
            }
 
### List All Photos [GET]
+ Parameters
    + q (optional, string) ... Keyword query to search for photos.
 
+ Response 200
 
    [Photos Collection][]
 
### Upload a Photo [POST]
Allows the creation of a new photo
 
+ Request (application/json)
 
            {
            "id": "1",
            "city": "Sofia,Bulgaria",
            "season": "Winter",
            "date": "2012-04-23T18:25:43.511Z",
            "object-name": "Cathedral Saint Alexandar Nevski",
            "img-source": "http://static.panoramio.com/photos/large/8072372.jpg"
            }
 
+ Response 201
 
    [Photos][]
