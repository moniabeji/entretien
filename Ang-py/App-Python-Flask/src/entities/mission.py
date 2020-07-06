from sqlalchemy.orm import relationship
from src.entities.moto import MotoSchema
from src.entities.delivery import DeliverySchema
from src.entities.address import AddressSchema

from ..repositories.connexion import Base
from .entity import Entity

from sqlalchemy import Column, DateTime, Integer, ForeignKey, DateTime
from marshmallow import Schema, fields


class Mission(Entity, Base):
    __tablename__ = 'missions'
    creationDate = Column('creation_date', DateTime(timezone=True), nullable=False)
    address_id = Column(Integer, ForeignKey('address.id'), nullable=False)
    delivery_id = Column(Integer, ForeignKey('delivery.id'), nullable=False)
    moto_id = Column(Integer, ForeignKey('moto.id'), nullable=False)
    address = relationship("Address", back_populates="missions")
    delivery = relationship("Delivery", back_populates="missions")
    moto = relationship("Moto", back_populates="missions")

    def __init__(self, creationDate, delivery_id, moto_id, address_id):
        self.creationDate = creationDate
        self.delivery_id = delivery_id
        self.moto_id = moto_id
        self.address_id = address_id


class MissionSchema(Schema):
    id = fields.Number()
    creationDate = fields.DateTime('%Y-%m-%d')
    address = fields.Nested(AddressSchema)
    delivery = fields.Nested(DeliverySchema)
    moto = fields.Nested(MotoSchema)
