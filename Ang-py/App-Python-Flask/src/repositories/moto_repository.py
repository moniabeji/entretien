
from src.entities.moto import Moto

def fetch_motos(session):
    '''
    fetch motos from table moto
    :param session: object sqlachemy
    :return: object non serialiseable
    '''
    return session.query(Moto).all()