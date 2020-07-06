from src.entities.delivery import DeliverySchema
from src.repositories.delivery_repository import fetch_deliveries


def get_deliveries_schema(session):
    '''
    func to deserialise the object deliveries
    :param session:sqlachemy object
    :return:list of json delivery
    '''
    schema = DeliverySchema(many=True)
    deliveries_object = fetch_deliveries(session)
    delveries = schema.dump(deliveries_object)
    return delveries.data