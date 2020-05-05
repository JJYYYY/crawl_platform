from . import api
import json
from flask import request,jsonify
from app.models import TableStruct
from app import db
import datetime
import time
from app.utils import getRequestListUrl,postRequestListUrl,parseData

sucessCode={
    "callStatus":'sucess',
    "message":"无异常",
    "rtnTime":datetime.datetime.now(),
    "statusCode":200
}
@api.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin']="http://localhost:3000"
    response.headers["Access-Control-Allow-Credentials"] = True
    response.headers['Access-Control-Allow-Headers']='X-Requested-with,Content-Type'
    response.headers['Access-Control-Allow-Method']='GET,POST'
    return response

@api.route("/debug",methods=["GET","POST"])
def debug():
    startTime=time.time()
    if request.method=='POST':
        data = json.loads(request.get_data(as_text=True, parse_form_data=True))
        debugType=data['type']
        data=data["data"]
        try:
            name =data['name']
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
        except Exception as e:
            sucessCode = {
                "callStatus": 'sucess',
                "message": repr(e),
                "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                "statusCode": "200",
                "cost": str((time.time() - startTime)) + 'ms'
            }
            return jsonify(sucessCode)
        if debugType=='getRequestListUrl':
            getUrl=data["getUrl"]
            if ";" in getUrl:
                getUrl=getUrl.split("$")[0]
            startNum=data["startNum"]
            code=data["crawlGetFirstRequestEconding"]
            params=json.loads(data['params']) if parseData(data['params']) else parseData(data['params'])
            formula=json.loads(data['formula']) if data['formula'] else data['formula']
            if params and formula:
                for k in params.keys():
                    if k in formula:
                        params[k] = eval(formula[k].replace('%s', startNum))
            url=getUrl.replace("%s",startNum)
            result=getRequestListUrl(name,url,code,params)
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
            postUrl = data["postUrl"]
            if '$' in postUrl:
                postUrl=postUrl.split('$')[0]
            startNum = data["startNum"]
            code = data["crawlFirstRequestEconding"]
            postData=parseData(data["postData"])
            params=parseData(data['params'])
            formula=data['formula']
            if '$' in formula:
                params_formula=json.loads(formula.split('$')[0]) if formula.split('$')[0] else formula.split('$')[0]
                data_formula=json.loads(formula.split('$')[1]) if formula.split('$')[1] else formula.split('$')[1]
            else:
                params_formula=json.loads(formula)
            if params and params_formula:
                for k in params.keys():
                    if k in params_formula:
                        params[k]=eval(params_formula[k].replace('%s',startNum))
            if postData and "data_formula" in locals() and data_formula:
                for k in postData.keys():
                    if k in data_formula:
                        postData[k] = eval(data_formula[k].replace('%s', startNum))
            url = postUrl.replace("%s", startNum)
            result = postRequestListUrl(name, url,postData, code,params)
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

