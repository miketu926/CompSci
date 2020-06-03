# use Blueprint from flask to build REST routes

# method 1: using mongoengine to connect with flask
# method 2: using pymongo to connect

# method 1
from mongoengine import connect
# takes in mongodb's username, password, host url, etc
# use blueprint connect to connect blueprint models to the app

# using mongoengine, can connect to multiple databases and alias them
# to be used within models through meta

# method 2
from pymongo import MongoClient


# mongodb basics
# a DB has many Collections
# a Collection has many Documents
# a Document can have EmbeddedDocuments (documents associated with another model)

# Mongoengine - has a class model structure
# There are numerous Fields (StringField, IntField, URLField...etc)

# Querying:
# Queries return a mongoengine.QuerySet - can chain queries as well like:
# Users.objects(gender='female').only('name').exclude('id').values_list('name')