from . import db
from flask_sqlalchemy import SQLAlchemy
import datetime

class IsSaved(db.Model):
    __tablename__="isSaved"
    id=db.Column(db.INTEGER,primary_key=True)
    category=db.Column(db.String(64),unique=True)
    isSaved=db.Column(db.BOOLEAN)



class TableStruct(db.Model):
    __tablename__='tableStructor'
    id=db.Column(db.INTEGER,primary_key=True)
    tableName=db.Column(db.String(64),unique=True)
    dataSource=db.Column(db.Text())
    updateTime=db.Column(db.DateTime(),default=datetime.datetime.utcnow())