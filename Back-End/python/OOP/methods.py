# class Cat:
#     def __init__(self, name, age):
#         self.name = name
#         self.age = age

#     def eat(self):  # Instance method
#         return f"{self.name} is eating!"

# # Usage
# my_cat = Cat("Buddy", 3)
# print(my_cat.eat())  # Output: Buddy is barking!

# class Dog:
#     species = "Canis lupus familiaris"  # Class attribute

#     def __init__(self, name, age):
#         self.name = name
#         self.age = age

#     @classmethod
#     def change_species(cls, new_species):
#         cls.species = new_species  # Modifying class attribute

# # Usage
# Dog.change_species("Canis lupus")
# print(Dog.species)  # Output: Canis lupus


class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @staticmethod
    def is_puppy(age):
        return age < 2

# Usage
print(Dog.is_puppy(1.5))  # Output: True
