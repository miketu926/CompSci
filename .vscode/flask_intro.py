# use Blueprint from flask to build REST routes

# method 1: using mongoengine to connect with flask
# method 2: using pymongo to connect

# method 1
from mongoengine import connect
# takes in mongodb's username, password, host url, etc
# use blueprint connect to connect blueprint models to the app

# method 2
from pymongo import MongoClient


# mongodb basics
# a DB has many Collections
# a Collection has many Documents
# a Document can have EmbeddedDocuments (documents associated with another model)

# Mongoengine - has a class model structure
# There are numerous Fields (StringField, IntField, URLField...etc)