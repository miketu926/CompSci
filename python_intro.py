arr = ['item1', 'item2', 'item3']
num = [-2,5,2,7]

print(arr[1:])
print(arr[1:2])

# None == null

# to make a copy using slice notation
print(arr[:])

# sort vs sorted. sort is in-place, sorted creates a new list.
# to reverse sort pass in reverse = True

sorted_num = sorted(num)
reverse_num = sorted(num, reverse = True)

print(sorted_num)
print(reverse_num)

for item in arr:
  print(item)

for i in range(len(arr)):
  print(arr[i])

for item in arr[1:]:
  print(item)

# advanced: for loop using and / and not / or
for item in arr:
  if item == 'item1' and item[0] == 'i' or item == 'item2' and not item == 'item3':
    print(item)

[print (item) for item in arr if item == 'item1' or item == 'item2' and not item == 'item3']

arr.append("another item")
print(arr)

# dictionary is a hashmap
dictionary = {'foo': 1, 'bar': 2, 'baz': 3}

for key in dictionary:
  print(key, dictionary[key])

print(dictionary.keys())
print(dictionary.values())

# the bottom produces an array of tuples designiated with ()
dictionary_items = dictionary.items()
print(dictionary_items)
print(type(dictionary_items))

s = set()
s.add(1)
print(s)
s.clear()
print(s)

# casting data structures
simpleList = [1,2,3,4]
print(str(simpleList))
print(dict(**simpleList))
print(list(simpleList))