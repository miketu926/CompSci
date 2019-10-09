def some_problem(arr, string = "a")
  # arr.each { |el| p el } 
  result = arr
  string = 'abcd'
  
  hash = Hash.new(0)

  arr.each_with_index do |el, idx|
    p el
    p idx
  end

  p string
  p hash
  p string[1..2]
  p result[1..2]
  return result
end



p some_problem([1,2,3])