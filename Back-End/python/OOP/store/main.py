from item import Item
from phone import Phone

# Item.instantiate_from_csv()

# print(Item.all)

item1 = Item("MyOldItem", 5000)
print(item1)

print(item1.name)
item1.name = "New Item"
print(item1)
# print(item1.get_name) this will not work
# phone1 = Phone("Redmi", 5000, 3, 2)
# print(Phone.all)
# Phone.instantiate_from_csv()
# print(Phone.all)