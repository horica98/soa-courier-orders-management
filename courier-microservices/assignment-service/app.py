from flask import Flask, request

from db import db

app = Flask(__name__)


@app.route('/health')
def health():
    return 'ok'


@app.route('/api/assignments/order/<order_id>')
def assignments_by_order(order_id):
    return {'assignments': db.get_assignments_for_order(int(order_id))}


@app.route('/api/assignments/customer/<customer_id>')
def assignments_by_customer(customer_id):
    return {'assignments': db.get_assignments_for_user_id(int(customer_id))}


@app.route('/api/assignments', methods=['POST'])
def add_assignment():
    request_data = request.get_json()
    added_id = db.add_assignment(**request_data)
    return {'id': added_id, **request_data}


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5004)
