# Considerations
* We should create an error middleware for handling errors gracefully.
* Implement request authentications like Oauth2 JWT
* The request payload validation can be improved using helpers or middlewares
* Create migration files to setup the database and collections
* Migration to add indexes to child and parent for faster search
* Currently, the db model has a freeform object called `properties`, which can take any key-value pair that the brand requires,
In real life, these can be defined further to have a list of the allowed values and types to be able to validate the incoming payloads.
* The `parentId` is a filterable key which can be passed in the query of the getlist `http://localhost:3000/product?parentId=61bbad3957f430d7683d4d03`
