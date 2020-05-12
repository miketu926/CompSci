# use Blueprint from flask to build REST routes

# using mongoengine to connect with flask

import connect from mongoengine
# takes in mongodb's username, password, host url, etc
# use blueprint connect to connect blueprint models to the app

# method 2 of connecting to mongodb
# or use mongoclient() from pymongo to connect


# mongodb basics
# a DB has many Collections
# a Collection has many Documents
# a Document can have EmbeddedDocuments (documents associated with another collection)
# There are numerous Fields (StringField, IntField, URLField...etc)
