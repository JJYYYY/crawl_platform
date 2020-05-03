from my_fake_useragent import UserAgent
from .crawl.common import get,post
from .hooks import listPageRequestHooks

def getRequestListUrl(name,url,code):
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
    result=get(url,headers if headers else {},timeout if timeout else 60,params=params if params else None,cookies=cookies if cookies else None,code=code)
    return result



def postRequestListUrl(name,url,data,code):
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
    result=post(url,headers if headers else {"User-Agent":UserAgent().random()},timeout if timeout else 60,params=params if params else None,data=data,cookies=cookies if cookies else None,code=code)
    return result