from . import api
import json
from flask import request,jsonify
from app.models import TableStruct,CrawlParams
from app import db
import datetime
import time
import re
from pyquery import PyQuery as pq
from urllib import parse
from string import Template
from app.utils import getRequestListUrl,postRequestListUrl,parseData,parseDetailPage


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
                    "statusCode": 200,
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
                "statusCode": 200,
                "cost": str((time.time() - startTime)) + 'ms'
            }
            return jsonify(sucessCode)
        if debugType=='getRequestListUrl':
            getUrl=data["getUrl"]
            if ";" in getUrl:
                getUrl=getUrl.split(";")[0]
            startNum=data["getStartNum"]
            code=data["crawlGetFirstRequestEconding"]
            params=json.loads(data['getParams']) if parseData(data['getParams']) else parseData(data['getParams'])
            formula=json.loads(data['getFormula']) if data['getFormula'] else data['getFormula']
            if params and formula:
                for k in params.keys():
                    if k in formula:
                        params[k] = eval(formula[k].replace('%s', startNum))
            url=getUrl.replace("%s",startNum)
            baseUrl = url
            result=getRequestListUrl(name,url,code,params)
            if result:
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "请求成功",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": 200,
                    "data":result,
                    "baseUrl":baseUrl,
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return sucessCode
            else:
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "请求失败，请重试",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": 404,
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
            baseUrl=url
            result = postRequestListUrl(name, url,postData, code,params)
            if result:
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "请求成功",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": 200,
                    "data": result,
                    "baseUrl": baseUrl,
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return sucessCode
            else:
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "请求失败，请重试",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": 404,
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return sucessCode
        if debugType=='dataProcessReplace':#列表页请求数据替换
            dataProcessReplaceData=data["dataProcessReplaceData"]
            requestListUrlResponse=data["requestListUrlResponse"]
            try:
                if dataProcessReplaceData:
                    if ";" in dataProcessReplaceData:
                        dataProcessReplaceData=dataProcessReplaceData.split(";")
                        for value in dataProcessReplaceData:
                            requestListUrlResponse=re.sub(value.split("￥")[0],value.split("￥")[1],requestListUrlResponse)
                    else:
                        requestListUrlResponse = re.sub(dataProcessReplaceData.split("￥")[0], dataProcessReplaceData.split("￥")[1], requestListUrlResponse)
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "请求成功",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": 200,
                    "data": requestListUrlResponse,
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return sucessCode
            except Exception as e:
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "请求成功",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": 404,
                    "data": '规则填写不正确，请按照要求填写',
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return sucessCode
        if debugType=='urlExtraction':
            baseUrl=data["baseUrl"]
            requestListUrlResponse=data["requestListUrlResponse"]
            urlExtractionType=data["urlExtractionType"]
            urlExtractionRule=data["urlExtractionRule"]
            if urlExtractionType.upper()=="CSS":
                doc=pq(requestListUrlResponse)
                try:
                    items=doc(urlExtractionRule.split(";")[0]).items()
                    urls=[]
                    for item in items:
                        url=item.attr(urlExtractionRule.split(";")[1])
                        urls.append(parse.urljoin(baseUrl,url)+'<br/>')
                    sucessCode = {
                        "callStatus": 'sucess',
                        "message": "请求成功",
                        "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        "statusCode": 200,
                        "data": ''.join(urls),
                        "cost": str((time.time() - startTime)) + 'ms'
                    }
                    return sucessCode
                except Exception as e:
                    sucessCode = {
                        "callStatus": 'sucess',
                        "message": "请求成功",
                        "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        "statusCode": 404,
                        "data": '规则填写不正确，请按照要求填写',
                        "cost": str((time.time() - startTime)) + 'ms'
                    }
                    return sucessCode
            if urlExtractionType.upper()=="RE":
                try:
                    urls=re.findall(urlExtractionRule, requestListUrlResponse)
                    urls=[parse.urljoin(baseUrl,url)+'<br/>' for url in urls]
                    sucessCode = {
                        "callStatus": 'sucess',
                        "message": "请求成功",
                        "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        "statusCode": 200,
                        "data": ''.join(urls),
                        "cost": str((time.time() - startTime)) + 'ms'
                    }
                    return sucessCode
                except:
                    sucessCode = {
                        "callStatus": 'sucess',
                        "message": "请求成功",
                        "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        "statusCode": 404,
                        "data": '规则填写不正确，请按照要求填写',
                        "cost": str((time.time() - startTime)) + 'ms'
                    }
                    return sucessCode
            if urlExtractionType.upper()=="JSON":
                try:
                    requestListUrlResponse=json.loads(requestListUrlResponse)
                    # urlExtractionRule=urlExtractionRule.split(";") if ";" in urlExtractionRule else [urlExtractionRule]
                    # urls=[]
                    urlExtractionRule=urlExtractionRule.split(";")
                    key=urlExtractionRule.pop()
                    for v in urlExtractionRule:
                        requestListUrlResponse=requestListUrlResponse[v]
                    urls=[]
                    for v in requestListUrlResponse:
                        urls.append(parse.urljoin(baseUrl,v[key])+"<br/>")
                    sucessCode = {
                        "callStatus": 'sucess',
                        "message": "请求成功",
                        "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        "statusCode": 200,
                        "data": ''.join(urls),
                        "cost": str((time.time() - startTime)) + 'ms'
                    }
                    return sucessCode
                except Exception as e:
                    sucessCode = {
                        "callStatus": 'sucess',
                        "message": "请求成功",
                        "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        "statusCode": 404,
                        "data": repr(e),
                        "cost": str((time.time() - startTime)) + 'ms'
                    }
                    return sucessCode
        if debugType=='dataAfterProcess':
            processType=data["type"]
            urls=data["urls"]
            if processType=='replace':
                dataAfterProcessReplaceData=data["dataAfterProcessReplaceData"]
                if dataAfterProcessReplaceData:
                    try:
                        if ";" in dataAfterProcessReplaceData:
                            dataAfterProcessReplaceData = dataAfterProcessReplaceData.split(";")
                            for value in dataAfterProcessReplaceData:
                                urls = re.sub(value.split("￥")[0], value.split("￥")[1],
                                                                urls)
                        else:
                            urls= re.sub(dataAfterProcessReplaceData.split("￥")[0],
                                                            dataAfterProcessReplaceData.split("￥")[1],
                                                            urls)
                        sucessCode = {
                            "callStatus": 'sucess',
                            "message": "请求成功",
                            "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                            "statusCode": 200,
                            "data": urls,
                            "cost": str((time.time() - startTime)) + 'ms'"200"
                        }
                        return sucessCode
                    except Exception as e:
                        sucessCode = {
                            "callStatus": 'sucess',
                            "message": "请求成功",
                            "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                            "statusCode": 404,
                            "data": '规则填写不正确，请按照要求填写',
                            "cost": str((time.time() - startTime)) + 'ms'
                        }
                        return sucessCode
            if processType=='splicing':
                dataAfterProcessSplicingData=data["dataAfterProcessSplicingData"]
                if dataAfterProcessSplicingData:
                    try:
                        urls=urls.split("<br/>")
                        ret=[]
                        for url in urls:
                            ret.append(dataAfterProcessSplicingData.replace("params",url)+'<br/>')
                        sucessCode = {
                            "callStatus": 'sucess',
                            "message": "请求成功",
                            "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                            "statusCode": 200,
                            "data": ''.join(ret),
                            "cost": str((time.time() - startTime)) + 'ms'"200"
                        }
                        return sucessCode
                    except Exception as e:
                        sucessCode = {
                            "callStatus": 'sucess',
                            "message": "请求成功",
                            "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                            "statusCode": 404,
                            "data": repr(e),
                            "cost": str((time.time() - startTime)) + 'ms'
                        }
                        return sucessCode
        if debugType=='detailParse':
            urls=data["urls"]
            url=urls.split("<br/>")[0]
            code=data["code"]
            result=parseDetailPage(name,url,code)
            if result:
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "请求成功",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": 200,
                    "data":result,
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return sucessCode
            else:
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "请求失败，请重试",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": 404,
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return sucessCode
        if debugType=='detailRequestParse':
            fieldSelectVal=data["fieldSelectVal"]
            detailPageHtml=data["detailPageHtml"]
            if fieldSelectVal.upper()=='CSS':
                try:
                    doc=pq(detailPageHtml)
                    fieldExtractData=data["fieldExtractData"]
                    if ";" in fieldExtractData:
                        for v in fieldExtractData.split(";"):
                            data=doc(v).text()
                            if data:
                                break
                    else:
                        data=doc(fieldExtractData).text()
                    sucessCode = {
                        "callStatus": 'sucess',
                        "message": "请求成功",
                        "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        "statusCode": 200,
                        "data": data,
                        "cost": str((time.time() - startTime)) + 'ms'
                    }
                    return sucessCode
                except Exception as e:
                    sucessCode = {
                        "callStatus": 'sucess',
                        "message": "请求成功",
                        "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        "statusCode": 404,
                        "data": repr(e),
                        "cost": str((time.time() - startTime)) + 'ms'
                    }
                    return sucessCode
            elif fieldSelectVal.upper()=='RE':
                try:
                    fieldExtractData = data["fieldExtractData"]
                    if ";" in fieldExtractData:
                        fieldExtractData=fieldExtractData.split(";")
                        mode=fieldExtractData.pop()
                        for v in fieldExtractData:
                            try:
                                data = re.search(v, detailPageHtml, eval(mode)).group(0)
                                break
                            except Exception as e:
                                if v==fieldExtractData[-1]:
                                    sucessCode = {
                                        "callStatus": 'sucess',
                                        "message": "请求成功",
                                        "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                                        "statusCode": 404,
                                        "data": repr(e),
                                        "cost": str((time.time() - startTime)) + 'ms'
                                    }
                                    return sucessCode
                                else:
                                    pass
                    else:
                        data=re.search(fieldExtractData,detailPageHtml).group(0)
                    sucessCode = {
                        "callStatus": 'sucess',
                        "message": "请求成功",
                        "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        "statusCode": 200,
                        "data": data,
                        "cost": str((time.time() - startTime)) + 'ms'
                    }
                    return sucessCode
                except Exception as e:
                    sucessCode = {
                        "callStatus": 'sucess',
                        "message": "请求成功",
                        "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        "statusCode": 404,
                        "data": repr(e),
                        "cost": str((time.time() - startTime)) + 'ms'
                    }
                    return sucessCode
        if debugType=='save':
            try:
                items=json.dumps(data['items']).replace("\\","")
                print(items)
                print(type(items))
                crawlParams=CrawlParams(name=name,params=items)
                db.session.add(crawlParams)
                db.session.commit()
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "请求成功",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": 200,
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return sucessCode
            except Exception as e:
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "请求成功",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": 404,
                    "data": repr(e),
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return sucessCode



@api.route("/table", methods=["GET",'POST','DELETE'])
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
                "statusCode": 200,
                "cost": str((time.time() - startTime)) + 'ms'
            }
            return jsonify(sucessCode)
        else:
            result = TableStruct.query.filter(TableStruct.tableName==name).first()
            sucessCode = {
                "callStatus": 'sucess',
                "message": "无异常",
                "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                "data":result.dataSource,
                "statusCode": 200,
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
                field = ','.join([v['name'] + ' ' + v["type"] for v in eval(dataSource)])
                template = Template(
                    "create table if NOT EXISTS ${table_name} (id INT primary key AUTO_INCREMENT,${field},updatetime TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP)")
                template = template.substitute(table_name=table_name, field=field)
                db.session.execute(template)
                db.session.commit()
                table_struct=TableStruct(tableName=table_name,dataSource=dataSource)
                db.session.add(table_struct)
                db.session.commit()
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "无异常",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": 200,
                    "cost":str((time.time()-startTime)) +'ms'
                }
                return jsonify(sucessCode)
            else:
                sucessCode = {
                    "callStatus": 'sucess',
                    "message": "已存在",
                    "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    "statusCode": "400",
                    "cost": str((time.time() - startTime)) + 'ms'
                }
                return jsonify(sucessCode)
    if request.method.upper()=='DELETE':
        name=request.args.get("name")
        table_struct = TableStruct.query.filter(TableStruct.tableName == name).first()
        db.session.delete(table_struct)
        db.session.commit()
        template=Template("DROP TABLE IF EXISTS ${name}")
        template=template.substitute(name=name)
        db.session.execute(template)
        db.session.commit()
        sucessCode = {
            "callStatus": 'sucess',
            "message": "删除成功",
            "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            "statusCode": 200,
            "cost": str((time.time() - startTime)) + 'ms'
        }
        return jsonify(sucessCode)



@api.route("/data", methods=["GET",'POST','DELETE'])
def data():
    startTime=time.time()
    if request.method=='POST':
        data = json.loads(request.get_data(as_text=True, parse_form_data=True))
        name=data["name"]
        try:
            template=Template('select * from ${name}')
        except Exception as e:
            sucessCode = {
                "callStatus": 'sucess',
                "message": "请求成功",
                "rtnTime": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                "statusCode": 404,
                "data": repr(e),
                "cost": str((time.time() - startTime)) + 'ms'
            }
            return sucessCode
