-- testing sql comment

-- basics

SELECT SUM(TB.age), CASE when TB2.name = 'mike' then 1 else 0 END as '1/0 column if mike',
-- if needed to reference another table, 
    (
    SELECT COUNT(TB2.name),
    FROM myTable2 as TB2
    WHERE TB2.name = 'mike'
    GROUP BY TB2.name
    ) as 'num of mikes'
FROM myTable as TB
WHERE TB.name LIKE "%ike"
GROUP BY TB.age, TB2.name
ORDER BY TB.age, TB2.name

-- end testing