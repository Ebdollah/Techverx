class Item:
    def __init__(self) -> None:
        # print(self)
        print("Object created")
        pass
    def calculate_total_price(self,x,y):
        # print(self)
        print(x*y)
        return x*y
        # pass

item1 = Item()
item1.name = "phone"
item1.price = 100 
item1.quantity = 5
# item1.calculate_total_price(item1.price,item1.quantity)

item2 = Item()
item2.name = "laptop"
item2.price = 1000
item2.quantity = 3

# print(type(Item))
# print(type(item1))
# print(type(item1.name))