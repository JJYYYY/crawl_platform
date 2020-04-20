from . import db
from flask_sqlalchemy import SQLAlchemy


class IsSaved(db.Model):
    __tablename__="isSaved"
    id=db.Column(db.INTEGER,primary_key=True)
    category=db.Column(db.String(64),unique=True)
    isSaved=db.Column(db.BOOLEAN)