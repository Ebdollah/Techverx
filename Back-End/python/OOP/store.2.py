class Item:
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
        print(self.price * self.quantity)
        return self.price * self.quantity
        # pass

item1 = Item("phone", 100, 5)
item1.calculate_total_price()

# item1.calculate_total_price(item1.price,item1.quantity)

# item2 = Item("laptop", 1000, 3)


# print(type(Item))
# print(type(item1))
# print(type(item1.name))