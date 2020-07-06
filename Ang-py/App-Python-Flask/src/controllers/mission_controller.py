from src.entities.mission import MissionSchema
from src.repositories.mission_repository import fetch_missions


def get_mission_schema(session):
    """
    func to deserialise the object deliveries
    :param session:sqlachemy object
    :return:list of json delivery
    """
    schema = MissionSchema(many=True)
    missions_object = fetch_missions(session)
    missions = schema.dump(missions_object)
    return missions.data