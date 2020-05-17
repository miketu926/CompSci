# decorators - similar to higher order components/functions
# wraps around another function to provide caching/properties of the main fn
@decorator

# casting data structures
simpleList = [1,2,3,4]
print(str(simpleList))
print(dict(**simpleList))
print(list(simpleList))