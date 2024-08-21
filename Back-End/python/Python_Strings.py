# # Strings Basics
# single_quote_string = 'Hello'
# double_quote_string = "World"
# single_inside_double = "I'm a dog"
# double_inside_single = 'He said "Hello"'

# print("String Basics:")
# print(single_quote_string)  # Output: Hello
# print(double_quote_string)  # Output: World
# print(single_inside_double) # Output: I'm a dog
# print(double_inside_single) # Output: He said "Hello"
# print("\n")

# # String Indexing
# my_string = "ABCDEFG"
# first_char = my_string[0]  # 'A'
# last_char = my_string[-1]  # 'G'
# middle_char = my_string[3] # 'D'

# print("String Indexing:")
# print(first_char)  # Output: A
# print(last_char)   # Output: G
# print(middle_char) # Output: D
# print("\n")

# # String Slicing
# slice_from_2 = my_string[2:]     # 'CDEFG'
# slice_to_3 = my_string[:3]       # 'ABC'
# slice_mid = my_string[2:5]       # 'CDE'
# slice_with_step = my_string[::2] # 'ACEG'

# print("String Slicing:")
# print(slice_from_2)    # Output: CDEFG
# print(slice_to_3)      # Output: ABC
# print(slice_mid)       # Output: CDE
# print(slice_with_step) # Output: ACEG
# print("\n")

# # String Immutability
# # Attempting to change a string (this will cause an error if uncommented)
# # my_string[0] = 'X'

# # String Methods
# upper_string = my_string.upper()      # 'ABCDEFG'
# lower_string = my_string.lower()      # 'abcdefg'
# capitalized_string = my_string.capitalize() # 'Abcdefg'
# split_string = "Hello World".split()  # ['Hello', 'World']
# split_on_char = "Hello World".split('o')  # ['Hell', ' W', 'rld']

# print("String Methods:")
# print(upper_string)        # Output: ABCDEFG
# print(lower_string)        # Output: abcdefg
# print(capitalized_string)  # Output: Abcdefg
# print(split_string)        # Output: ['Hello', 'World']
# print(split_on_char)       # Output: ['Hell', ' W', 'rld']
# print("\n")

# # String Interpolation (Formatting)
# x = "dog"
# y = "cat"
# formatted_string = "I have a {} and a {}".format(x, y)  # 'I have a dog and a cat'
# reverse_string = "I have a {1} and a {0}".format(x, y)  # 'I have a cat and a dog'
# repeat_string = "I have a {0} and another {0}".format(x)  # 'I have a dog and another dog'

# print("String Interpolation (Formatting):")
# print(formatted_string)   # Output: I have a dog and a cat
# print(reverse_string)     # Output: I have a cat and a dog
# print(repeat_string)      # Output: I have a dog and another dog
