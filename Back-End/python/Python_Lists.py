# 1. Creating a List
my_list = [1, 2, 3]
print("Original list:", my_list)

# 2. Mixed Data Types in a List
my_mixed_list = ["apple", 42, 3.14]
print("Mixed data type list:", my_mixed_list)

# 3. Nested Lists
nested_list = [1, 2, [3, 4]]
print("Nested list:", nested_list)

# 4. Printing a List
print("Printing my_list:", my_list)

# 5. Getting the Length of a List
length = len(my_list)
print("Length of my_list:", length)

# 6. Indexing
first_item = my_list[0]
print("First item in my_list:", first_item)

# 7. Negative Indexing
last_item = my_list[-1]
print("Last item in my_list:", last_item)

# 8. Slicing
sub_list = my_list[1:3]
print("Sliced list (from index 1 to 2):", sub_list)

# 9. Mutability
my_list[0] = "new value"
print("After mutability (changed first item):", my_list)

# 10. Appending
my_list.append(4)
print("After appending 4:", my_list)

# 11. Extending
my_list.extend([5, 6])
print("After extending with [5, 6]:", my_list)

# 12. Popping
removed_item = my_list.pop()
print("After popping last item:", my_list)
print("Removed item:", removed_item)

# 13. Reverse
my_list.reverse()
print("After reversing:", my_list)

# 14. Sort
num_list = [3, 1, 2]
num_list.sort()
print("Sorted num_list:", num_list)

# 15. Nested List Indexing
nested_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
item = nested_list[1][2]
print("Item at nested_list[1][2]:", item)

# 16. List Comprehension
squares = [x**2 for x in range(5)]
print("List comprehension (squares):", squares)

# Combining the Nested List Indexing with List Comprehension
first_column = [row[0] for row in nested_list]
print("First column of nested_list using list comprehension:", first_column)
