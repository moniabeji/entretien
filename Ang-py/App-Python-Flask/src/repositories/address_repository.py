
from src.entities.address import Address

def fetch_address(session):
    '''
    fetch address from table address
    :param session: object sqlachemy
    :return: object non serialiseable
    '''
    return session.query(Address).all()
