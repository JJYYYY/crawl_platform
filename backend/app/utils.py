from flask import request
from urllib import parse
import json
from my_fake_useragent import UserAgent

from .crawl.common import get,post
from .hooks import listPageRequestHooks

def getRequestListUrl(name,url,code,params):
    print("code234",code)
    if name in listPageRequestHooks:
        if "headers" in listPageRequestHooks[name]:
            headers = listPageRequestHooks[name]['headers']()
        if "cookies" in listPageRequestHooks[name]:
            cookies = listPageRequestHooks[name]['cookies']()
        if "url" in listPageRequestHooks[name]:
            url = listPageRequestHooks[name]['cookies']()
        if "params" in listPageRequestHooks[name]:
            params=listPageRequestHooks[name]['params']()
        if "timeout" in listPageRequestHooks[name]:
            timeout = listPageRequestHooks[name]['timeout']()
    result=get(url,headers if "headers" in locals()  else {},timeout if "timeout" in locals() else 60,code,params=params if "params" in locals() else None,cookies=cookies if "cookies" in locals() else None)
    return result



def postRequestListUrl(name,url,data,code,params):
    if name in listPageRequestHooks:
        if "headers" in listPageRequestHooks[name]:
            headers = listPageRequestHooks[name]['headers']()
        if "cookies" in listPageRequestHooks[name]:
            cookies = listPageRequestHooks[name]['cookies']()
        if "url" in listPageRequestHooks[name]:
            url = listPageRequestHooks[name]['cookies']()
        if "params" in listPageRequestHooks[name]:
            params = listPageRequestHooks[name]['params']()
        if "timeout" in listPageRequestHooks[name]:
            timeout = listPageRequestHooks[name]['timeout']()
        if "data" in listPageRequestHooks[name]:
            data = listPageRequestHooks[name]['data']()
    result=post(url,headers if "headers" in locals() else {"User-Agent":UserAgent().random()},timeout if "timeout" in locals() else 60,params=params if "params" in locals() else None,data=data,cookies=cookies if "cookies" in locals() else None,code=code)
    return result


def getCookie(name):
    ret=json.loads(request.headers['cookies'])
    ret=json.loads(ret['cookie'])
    print("ret",ret)
    return parse.unquote(ret[name])


def parseData(data):
    if data:
        items = data.split("&")
        form_data = {}
        for item in items:
            key = item.split("=")[0]
            value = item.split("=")[1]
            form_data[key] = value
        return form_data
    else:
        return data