class Item:
    gerneral_sale = 0.5
    all_attributes = []
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

        #Storing Attributes
        Item.all_attributes.append(self)
        pass
    def calculate_total_price(self):
        # print(self)
        # print(self.price * self.quantity)
        return self.price * self.quantity
        # pass
    def apply_discounts(self):
        self.price = self.price * self.gerneral_sale

    def __repr__(self):
        return f"Item('{self.name}', '{self.price}', '{self.quantity}')"
        # pass

item1 = Item("Phone", 100, 1)
item2 = Item("Laptop", 1000, 3)
item3 = Item("Cable", 10, 5)
item4 = Item("Mouse", 50, 5)
item5 = Item("Keyboard", 75, 5)

#we should store this in csv file

print(Item.all_attributes)
for item in Item.all_attributes:
    print(item)


# item1.calculate_total_price()

# item1.calculate_total_price(item1.price,item1.quantity)

