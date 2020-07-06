from sqlalchemy import Column, Integer


class Entity():
    id = Column(Integer, primary_key=True)
