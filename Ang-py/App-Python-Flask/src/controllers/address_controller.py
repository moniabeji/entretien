from src.entities.address import AddressSchema
from src.repositories.address_repository import fetch_address


def get_addresses_schema(session):
    '''
    func to deserialise the object addresses
    :param session:sqlachemy object
    :return:list of json addresses
    '''
    schema = AddressSchema(many=True)
    address_object = fetch_address(session)
    addresses = schema.dump(address_object)
    return addresses.data
