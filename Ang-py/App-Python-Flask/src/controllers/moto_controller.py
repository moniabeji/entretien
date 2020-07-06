from src.entities.moto import MotoSchema
from src.repositories.moto_repository import fetch_motos


def get_motos_schema(session):
    '''
    func to deserialise the object deliveries
    :param session:sqlachemy object
    :return:list of json delivery
    '''
    schema = MotoSchema(many=True)
    motos_object = fetch_motos(session)
    motos = schema.dump(motos_object)
    return motos.data