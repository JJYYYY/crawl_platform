import requests
import re

def get(url,headers,timeout,code,params=None,verify=False,**kwargs):
    try:
        res=requests.get(url,params=params,headers=headers,timeout=timeout,**kwargs)
        print("res123",res.content.decode(code))
        try:
            return res.content.decode(code)
        except Exception as e:
            return repr(e)
    except Exception as e:
        return repr(e)


def post(url,headers,timeout,params=None,data=None,code="utf-8",verify=False,**kwargs):
    try:
        res=requests.post(url,params=params,data=data,headers=headers,timeout=timeout,**kwargs)
        try:
            return res.content.decode(code)
        except Exception as e:
            return repr(e)
    except Exception as e:
        return repr(e)
