import json


class Database:
    def __init__(self):
        self.assignments = self.read_initial_data()
        self.next_id = 2

    @staticmethod
    def read_initial_data():
        with open('data/assignments.json') as json_file:
            data = json.load(json_file)
        return data

    def get_assignments_for_order(self, order_id):
        assignments = []
        for a in self.assignments:
            if a['order_id'] == order_id:
                assignments.append(a)
        return assignments

    def get_assignments_for_user_id(self, user_id):
        assignments = []
        for a in self.assignments:
            if a['customer_id'] == user_id:
                assignments.append(a)
        return assignments

    def add_assignment(self, courier_id, order_id):
        self.assignments.append({'id': self.next_id,
                                 'courier_id': int(courier_id),
                                 'order_id': int(order_id),
                                 })
        self.next_id = self.next_id + 1
        return self.next_id - 1


db = Database()
