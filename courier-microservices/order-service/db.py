import json


class Database:
    def __init__(self):
        self.orders = self.read_initial_data()

    @staticmethod
    def read_initial_data():
        with open('data/orders.json') as json_file:
            data = json.load(json_file)
        return data

    def get_orders(self):
        return self.orders

    def get_order_by_id(self, order_id):
        for o in self.orders:
            if order_id == o['id']:
                return o
        return None


db = Database()
