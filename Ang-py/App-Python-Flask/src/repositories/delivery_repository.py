
from src.entities.delivery import Delivery

def fetch_deliveries(session):
    '''
    fetch deliveries from table delivery
    :param session: object sqlachemy
    :return: object non serialiseable
    '''
    return session.query(Delivery).all()