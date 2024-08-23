from item import Item

class Phone(Item):
    def __init__(self, name: str, price: float, quantity=0, broken_phones = 0):

        #call super function
        super().__init__(
            name, price, quantity
        )
        # Run validations to the received arguments
        assert broken_phones >=0

        # Assign to self object

        self.broken_phones = broken_phones