from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import pymysql
from config import config

#
pymysql.install_as_MySQLdb()

db = SQLAlchemy()



def create_app(config_name):
    app = Flask(__name__)
    CORS(app)
    app.secret_key =os.urandom(26)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    db.init_app(app)
    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')
    return app
