from . import api
import json
from flask import request,jsonify
from app.models import TableStruct
from app import db
import datetime
import time

sucessCode={
    "callStatus":'sucess',
    "message":"无异常",
    "rtnTime":datetime.datetime.now(),
    "statusCode":200
}

# @api.route("/issaved",methods=["POST"])
# def isSaved():
#     data=json.loads(request.get_data(as_text=True))
#     saved=IsSaved.query.filter_by(category=data.get("type")).first()
#     if saved:
#         return jsonify({"data":saved})
#     else:
#         return jsonify({"data":0})

@api.route("/table", methods=["GET",'POST'])
def table():
    startTime=time.time()
    if request.method=='GET':
        name = request.args.get("name")
        if not name:
            result=TableStruct.query.with_entities(TableStruct.tableName).all()
            result=[{"value":i[0],"text":i[0]} for i in result]
            sucessCode = {
                "callStatus": 'sucess',
                "message": "无异常",
                "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                "data":result,
                "statusCode": "200",
                "cost": str((time.time() - startTime)) + 'ms'
            }
            return jsonify(sucessCode)
        else:
            result = TableStruct.query.filter(TableStruct.tableName==name).first()
            print("result.dataSource",result.dataSource)
            sucessCode = {
                "callStatus": 'sucess',
                "message": "无异常",
                "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                "data":result.dataSource,
                "statusCode": "200",
                "cost": str((time.time() - startTime)) + 'ms'
            }
            return jsonify(sucessCode)
    if request.method=='POST':
        data=json.loads(request.get_data(as_text=True,parse_form_data=True))
        dataSource=json.dumps(data["dataSource"],ensure_ascii=False)
        table_name= data["name"] if "name" in data.keys() else ""
        if table_name and dataSource:
            temp = TableStruct.query.filter(TableStruct.tableName == table_name).first()
            if not temp:
                table_struct=TableStruct(tableName=table_name,dataSource=dataSource)
                db.session.add(table_struct)
                db.session.commit()
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "无异常",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": "200",
                    "cost":str((time.time()-startTime)) +'ms'
                }
                return jsonify(sucessCode)
            else:
                db.session.delete(temp)
                db.session.commit()
                table_struct = TableStruct(tableName=table_name, dataSource=dataSource)
                db.session.add(table_struct)
                db.session.commit()
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "已存在",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": "400",
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return jsonify(sucessCode)

