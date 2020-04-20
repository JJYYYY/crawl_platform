from . import api
import json
from flask import request,jsonify
from app.models import IsSaved

@api.route("/issaved",methods=["POST"])
def isSaved():
    data=json.loads(request.get_data(as_text=True))
    saved=IsSaved.query.filter_by(category=data.get("type")).first()
    if saved:
        return jsonify({"data":saved})
    else:
        return jsonify({"data":0})
