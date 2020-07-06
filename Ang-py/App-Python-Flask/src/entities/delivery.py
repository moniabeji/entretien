from ..repositories.connexion import Base
from .entity import Entity

from sqlalchemy.orm import relationship
from marshmallow import Schema, fields
from sqlalchemy import Column, String


class Delivery(Entity, Base):
    '''

    '''
    __tablename__ = 'delivery'
    name = Column(String, nullable=False, unique=True)
    missions = relationship("Mission", back_populates="delivery")

    def __init__(self, id, name):
        self.id = id
        self.name = name


class DeliverySchema(Schema):
    '''

    '''
    id = fields.Number()
    name = fields.Str()
