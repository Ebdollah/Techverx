import csv
# import os
# print("Current working directory:", os.getcwd())


class Item:
    gerneral_sale = 0.5
    all_attributes = []
    def __init__(self, name , price , quantity ) -> None:
        
        
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

    @classmethod
    def instantiate_from_csv(cls):
        with open('Back-End/python/OOP/demo.csv' , 'r') as f:
            reader = csv.DictReader(f)
            items = list(reader)
        for item in items:
            Item(
                name = item.get('name'),
                price = float(item.get('price')),
                quantity = int(item.get('quantity'))
            )
        
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

Item.instantiate_from_csv()
print(Item.all_attributes)


# item1.calculate_total_price()

# item1.calculate_total_price(item1.price,item1.quantity)

