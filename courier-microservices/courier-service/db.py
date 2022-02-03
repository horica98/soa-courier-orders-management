import json


class Database:
    def __init__(self):
        self.couriers = self.read_initial_data()
        self.next_id = 3

    @staticmethod
    def read_initial_data():
        with open('data/couriers.json') as json_file:
            data = json.load(json_file)
        return data

    def get_courier_by_email(self, email):
        courier = None
        for c in self.couriers:
            if c['email'] == email:
                courier = c
        return courier

    def get_courier_by_id(self, id):
        courier = None
        for c in self.couriers:
            if c['id'] == id:
                courier = c
        return courier

    def add_courier(self, email, name):
        self.couriers.append({'id': self.next_id, 'email': email, 'name': name})
        self.next_id = self.next_id + 1
        return self.next_id - 1


db = Database()
