from ..repositories.connexion import Base
from .entity import Entity

from sqlalchemy.orm import relationship
from marshmallow import Schema, fields
from sqlalchemy import Column, String


class Address(Entity, Base):
    '''

    '''
    __tablename__ = 'address'
    name = Column(String, nullable=False, unique=True)
    missions = relationship("Mission", back_populates="address")

    def __init__(self, id, name):
        self.id = id
        self.name = name


class AddressSchema(Schema):
    '''

    '''
    id = fields.Number()
    name = fields.Str()
