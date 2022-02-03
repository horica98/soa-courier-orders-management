from flask import Flask

from db import db

app = Flask(__name__)


@app.route('/health')
def health():
    return 'ok'


@app.route('/api/orders')
def orders():
    return {'orders': db.get_orders()}


@app.route('/api/orders/<order_id>')
def orders_by_id(order_id):
    return {'order': db.get_order_by_id(int(order_id))}


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001)
