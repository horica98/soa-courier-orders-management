from flask import Flask, request

from db import db

app = Flask(__name__)


@app.route('/health')
def health():
    return 'ok'


@app.route('/api/couriers/<identifier>')
def courier(identifier):
    try:
        return {'courier': db.get_courier_by_id(int(identifier))}
    except ValueError:
        return {'courier': db.get_courier_by_email(identifier)}


@app.route('/api/couriers/', methods=['POST'])
def add_courier():
    request_data = request.get_json()
    added_id = db.add_courier(**request_data)
    return {'id': added_id, **request_data}


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5003)
