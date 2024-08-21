# Creating a dictionary
my_stuff = {
    'key1': 'value1',
    'key2': 'value2',
    'key3': {
        '123': [1, 2, 'GrabMe']
    }
}

# Accessing values using keys
print(my_stuff['key1'])  # Outputs: value1
print(my_stuff['key2'])  # Outputs: value2

# Accessing a nested dictionary value
grab_me = my_stuff['key3']['123'][2]
print(grab_me)  # Outputs: GrabMe

# Using string method on the accessed value
print(grab_me.upper())  # Outputs: GRABME

# Reassigning dictionary items
my_stuff = {
    'lunch': 'pizza',
    'breakfast': 'eggs'
}

print(my_stuff['lunch'])  # Outputs: pizza

# Changing the value associated with a key
my_stuff['lunch'] = 'burger'
print(my_stuff['lunch'])  # Outputs: burger

# Adding a new key-value pair to the dictionary
my_stuff['dinner'] = 'pasta'
print(my_stuff)

# Outputs the entire dictionary:
# {'lunch': 'burger', 'breakfast': 'eggs', 'dinner': 'pasta'}
