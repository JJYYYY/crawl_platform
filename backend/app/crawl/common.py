import requests


def get(url,headers,timeout,params=None,code="utf-8",verify=False,**kwargs):
    try:
        res=requests.get(url,params=params,headers=headers,timeout=timeout,**kwargs)
        print(headers)
        try:
            return res.content.decode(code)
        except:
            try:
                return res.text
            except Exception as e:
                return repr(e)
    except Exception as e:
        return repr(e)


def post(url,headers,timeout,data=None,code="utf-8",verify=False,**kwargs):
    try:
        res=requests.post(url,data=data,headers=headers,timeout=timeout,**kwargs)
        try:
            return res.content.decode(code)
        except:
            try:
                return res.text
            except Exception as e:
                return repr(e)
    except Exception as e:
        return repr(e)
