def checker(num, memo):
   counter = 0
   curr = num
   while curr != 1:
       if curr in memo:
           return memo[curr] + counter
       counter += 1
       if curr % 2 == 0:
           curr = curr // 2
       else:
           curr = (curr * 3) + 1
   memo[num] = counter
   return memo[num]

def most_steps(n, memo=None):
   if memo is None:
       memo = {}
   max_steps = -float('inf')
   max_num = -float('inf')
   for i in range(1, n + 1):
       memo[i] = checker(i, memo)
       if memo[i] > max_steps:
           max_steps = memo[i]
           max_num = i
   print(max_steps, max_num)
   
most_steps(1000000)