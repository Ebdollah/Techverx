from animal import Animal

class Cat(Animal):
    def speak(self):
        print("Meow")
    pass

class Rabbit(Animal):
    def speak(self):
        print("Squeak")
    pass

class Deer(Animal):
    def speak(self):
        print("Bell")
    pass

cat = Cat("kitty")
print(cat.name)
print(cat.is_alive)