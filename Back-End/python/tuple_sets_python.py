# Booleans in Python
a = True
b = False

# Control flow using Booleans
if a:
    print("a is True")  # Outputs: a is True

if not b:
    print("b is False")  # Outputs: b is False

# Tuples - Immutable sequences
my_tuple = (1, 2, 3)
print(my_tuple[0])  # Outputs: 1

# Tuples can hold mixed data types
mixed_tuple = ("a", True, 123)
print(mixed_tuple)  # Outputs: ('a', True, 123)

# Tuples are immutable; this will raise an error
# mixed_tuple[0] = "new_value"  # Uncommenting this line will raise a TypeError

# Lists are mutable
my_list = ["a", True, 123]
my_list[0] = "new_value"
print(my_list)  # Outputs: ['new_value', True, 123]

# Sets - Unordered collections of unique elements
my_set = set()
my_set.add(1)
my_set.add(2)
my_set.add(2)  # Adding 2 again does not change the set
print(my_set)  # Outputs: {1, 2}

# Sets ignore duplicate elements
my_list_with_duplicates = [1, 1, 2, 3, 3, 3]
unique_elements = set(my_list_with_duplicates)
print(unique_elements)  # Outputs: {1, 2, 3}

# Converting back to a list if needed
unique_list = list(unique_elements)
print(unique_list)  # Outputs: [1, 2, 3]
