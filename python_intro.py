arr = ['item1', 'item2', 'item3']
print(arr[1:])
print(arr[1:2))

for item in arr:
  print(item)

for i in range(len(arr)):
  print(arr[i])

for item in arr:
  print(item)

arr.append("another item")
print(arr)

dictionary = {'foo': 1, 'bar': 2, 'baz': 3}

for key in dictionary:
  print(key, dictionary[key])

print(dictionary.keys())
print(dictionary.values())

# the bottom produces an array of tuples within ()
dictionary_items = dictionary.items()
print(type(dictionary_items[0]))

s = set()
s.add(1)
print(s)
s.clear()
print(s)