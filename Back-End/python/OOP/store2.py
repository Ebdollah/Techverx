class Item:
    gerneral_sale = 0.5
    def __init__(self, name : str, price : float, quantity : int) -> None:
        
        
        # print(self)
        assert price >= 0
        assert quantity >= 0

        self.name = name
        self.price = price
        self.quantity = quantity
        # print(f"Object name is : {name}")
        # print(f"Object price is : {price}")
        # print(f"Object quatity is : {quantity}")
        pass
    def calculate_total_price(self):
        # print(self)
        # print(self.price * self.quantity)
        return self.price * self.quantity
        # pass
    def apply_discounts(self):
        self.price = self.price * self.gerneral_sale

item1 = Item("phone", 100, 5)
item2 = Item("laptop", 1000, 3)
item1.calculate_total_price()

# item1.calculate_total_price(item1.price,item1.quantity)

#Class attributes
# print("General sale in class attr, is: ", Item.gerneral_sale)
# print("General sale in class attr using instnce, is: ", item1.gerneral_sale)

# print("All attr at class level", Item.__dict__)
# print("All attr at instance level", item1.__dict__)   

item1.apply_discounts()
print(item1.price)

item2.gerneral_sale = 0.8
item2.apply_discounts()
print(item2.price)

# print(type(Item))
# print(type(item1))
# print(type(item1.name))