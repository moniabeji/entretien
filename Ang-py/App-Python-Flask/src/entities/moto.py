from ..repositories.connexion import Base
from .entity import Entity

from sqlalchemy.orm import relationship
from marshmallow import Schema, fields
from sqlalchemy import String, Column


class Moto(Entity, Base):
    """
    A class to represent a Moto entity.

    ...

    Attributes
    ----------
    id : int
        primary key
    name : str
        moto name

    Methods
    -------

    """
    __tablename__ = 'moto'
    name = Column(String, nullable=False, unique=True)
    missions = relationship("Mission", back_populates="moto")

    def __init__(self, id, name):
        self.id = id
        self.name = name


class MotoSchema(Schema):
    '''

    '''
    id = fields.Number()
    name = fields.Str()
