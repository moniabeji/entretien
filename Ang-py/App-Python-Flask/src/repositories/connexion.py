from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String


db_url = 'postgres_db:5432'
db_name = 'db-session'
db_user = 'postgres'
db_password = 'root'
engine = create_engine(f'postgresql://{db_user}:{db_password}@{db_url}/{db_name}')

Session = sessionmaker(bind=engine)
Base = declarative_base()



def init_db():
    print(engine)
    Base.metadata.create_all(engine)
