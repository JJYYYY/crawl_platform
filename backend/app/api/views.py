from . import api
import json
from flask import request,jsonify
from app.models import TableStruct
from app import db
import datetime
import time
from app.utils import getRequestListUrl,postRequestListUrl

sucessCode={
    "callStatus":'sucess',
    "message":"无异常",
    "rtnTime":datetime.datetime.now(),
    "statusCode":200
}


@api.route("/debug",methods=["GET","POST"])
def debug():
    startTime=time.time()
    if request.method=='GET':
        debugType=request.args.get('type')
        try:
            name = request.cookies.get("name")
            if not name:
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "缺少爬虫名字",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": "200",
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return jsonify(sucessCode)
            else:
               pass
        except:
            sucessCode = {
                "callStatus": 'sucess',
                "message": "缺少爬虫名字",
                "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                "statusCode": "200",
                "cost": str((time.time() - startTime)) + 'ms'
            }
            return jsonify(sucessCode)
        if debugType=='getRequestListUrl':
            getUrl=request.cookies.get("getUrl")
            startNum=request.cookies.get("startNum")
            code=request.cookies.get("crawlFirstRequestEconding")
            data=request.cookies.get("postData")
            url=getUrl.replace("%s",startNum)
            result=postRequestListUrl(name,data,url,code)
            if result:
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "请求成功",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": "200",
                    "data":result,
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return sucessCode
            else:
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "请求失败，请重试",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": "404",
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return sucessCode
        if debugType=='postRequestListUrl':
            postUrl = request.cookies.get("getUrl")
            startNum = request.cookies.get("startNum")
            code = request.cookies.get("crawlFirstRequestEconding")
            data=request.cookies.get("postData")
            url = postUrl.replace("%s", startNum)
            result = postRequestListUrl(name, url,data, code)
            if result:
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "请求成功",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": "200",
                    "data": result,
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return sucessCode
            else:
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "请求失败，请重试",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": "404",
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return sucessCode

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

