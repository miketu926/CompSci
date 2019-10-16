def some_problem(arr, string = 'abcd')
  # arr.each { |el| p el } 
  result = arr
  
  hash = Hash.new(0)

  arr.each_with_index do |el, idx|
    p idx.to_s + " " + el.to_s
  end

  string.each_char.with_index do |char, idx|
    p idx.to_s + " " + char
  end

  p string
  p hash
  p string[1..2] #inclusive .., exclusive ...
  p result[1..2]
  return result
end

p some_problem([1,2,3])