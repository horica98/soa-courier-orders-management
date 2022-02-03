import os

if not os.environ.get('IS_DOCKER'):
    order_host = notification_host = courier_host = assignment_host = '127.0.0.1'
else:
    order_host = 'order-service'
    notification_host = 'notification-service'
    courier_host = 'courier-service'
    assignment_host = 'assignment-service'

ORDERS_SERVICE_URL = f'http://{order_host}:5001/api/orders'
NOTIFICATION_SERVICE_URL = f'http://{notification_host}:5002/api/notify'
COURIER_SERVICE_URL = f'http://{courier_host}:5003/api/couriers'
ASSIGNMENT_SERVICE_URL = f'http://{assignment_host}:5004/api/assignments'
