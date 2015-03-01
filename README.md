FORMAT: 1A

# worldview
Worldview is the best choice for the people looking for a cool place to travel. It helps you choose a destination by reviewing other people's photos from all over the world.

Source : https://github.com/mbogdanoff/worldview

# Group Categories
Notes related resources of the **Notes API**

## Search for images [/notes]
### List all Images [GET]
+ Response 200 (application/json)

        [{
          "id": 1, "title": "Sofia"
        }, {
          "id": 2, "title": "Madrid"
        }]

## Upload an image [POST]
+ Request (application/json)

        { "title": "Buy cheese and bread for breakfast." }

+ Response 201 (application/json)

        { "id": 3, "title": "Sofia" }

## Image [/notes/{id}]
A single Note object with all its details

+ Parameters
    + id (required, number, `1`) ... Numeric `id` of the Note to perform action with. Has example value.

### Retrieve an Image [GET]
+ Response 200 (application/json)

    + Header

            X-My-Header: The Value

    + Body

            { "id": 2, "title": "Pick-up posters from post-office" }

### Remove an Image [DELETE]
+ Response 204
