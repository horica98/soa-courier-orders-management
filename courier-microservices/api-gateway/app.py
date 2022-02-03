import requests
from flask import Flask, request
from flask_cors import CORS

from apis import ORDERS_SERVICE_URL, NOTIFICATION_SERVICE_URL, COURIER_SERVICE_URL, ASSIGNMENT_SERVICE_URL

app = Flask(__name__)
CORS(app)


@app.route('/api/orders')
def orders():
    orders_resp = requests.get(ORDERS_SERVICE_URL)
    return orders_resp.json()


@app.route('/api/orders/<order_id>')
def order_by_id(order_id):
    order_resp = requests.get(f'{ORDERS_SERVICE_URL}/{order_id}')
    return order_resp.json()


@app.route('/api/couriers/<email>')
def courier(email):
    courier_resp = requests.get(f'{COURIER_SERVICE_URL}/{email}')
    return courier_resp.json()


@app.route('/api/couriers/', methods=['POST'])
def add_courier():
    add_courier_resp = requests.post(COURIER_SERVICE_URL, json=request.get_json())
    return add_courier_resp.json()


@app.route('/api/assignments', methods=['POST'])
def add_assignment():
    data = request.get_json()
    add_assignment_resp = requests.post(ASSIGNMENT_SERVICE_URL, json=data)
    if add_assignment_resp.status_code == 200:
        get_courier_email = requests.get(f'{COURIER_SERVICE_URL}/{int(data["courier_id"])}')
        if get_courier_email.status_code == 200:
            requests.post(NOTIFICATION_SERVICE_URL, json={'email': get_courier_email.json()['courier']['email'],
                                                          'order_id': data['order_id']})
    return add_assignment_resp.json()


@app.route('/api/assignments/order/<order_id>')
def assignments_by_order(order_id):
    assignments_by_order_resp = requests.get(f'{ASSIGNMENT_SERVICE_URL}/order/{order_id}')
    return assignments_by_order_resp.json()


@app.route('/api/assignments/courier/<courier_id>')
def assignments_by_courier(courier_id):
    assignments_by_courier_resp = requests.get(f'{ASSIGNMENT_SERVICE_URL}/courier/{courier_id}')
    return assignments_by_courier_resp.json()


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
