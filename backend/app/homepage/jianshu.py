import requests
import json


class JianShu():
    headers = {
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36",
        "Cookie": '__yadk_uid=SXhiMSEoqpQ7jQccI3uiZoIfEI3ISzr9; __gads=ID=dcaa4de6a81d7868:T=1580517016:S=ALNI_MZHUJOLP1K1ACJMcryXS88NfLDkSg; _ga=GA1.2.1601341833.1581830449; read_mode=day; default_font=font2; locale=zh-CN; Hm_lvt_0c0e9d9b1e7d617b3e6842e85b9fb068=1585968810,1585968887,1585971687,1586490933; remember_user_token=W1sxNDUxNjA4MV0sIiQyYSQxMSRDUDN6bmF1RHMuYU92R0ZxYWIydDR1IiwiMTU4NjQ5MDk2Ny45MTYxNTA2Il0%3D--7b8da2f6be547364bf44893ec63288fee184999a; web_login_version=MTU4NjQ5MDk2Nw%3D%3D--f95dd6c76e6ff0890e0044dd89a6db690011f3a4; _m7e_session_core=138c9b28ca77865c936b6b37300cc518; Hm_lpvt_0c0e9d9b1e7d617b3e6842e85b9fb068=1586490974; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2216d4d330e37402-01cf4250b28191-7373e61-1327104-16d4d330e389e3%22%2C%22%24device_id%22%3A%2216d4d330e37402-01cf4250b28191-7373e61-1327104-16d4d330e389e3%22%2C%22props%22%3A%7B%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.baidu.com%2Flink%22%2C%22%24latest_traffic_source_type%22%3A%22%E8%87%AA%E7%84%B6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_utm_source%22%3A%22toutiao.io%22%2C%22%24latest_utm_medium%22%3A%22toutiao.io%22%2C%22%24latest_utm_campaign%22%3A%22maleskine%22%2C%22%24latest_utm_content%22%3A%22note%22%2C%22%24latest_referrer_host%22%3A%22www.baidu.com%22%7D%2C%22first_id%22%3A%22%22%7D'
    }

    new_article_url= "https://www.jianshu.com/author/notes"
    new_article_data={"notebook_id":"30444514","at_bottom":False}


    def __init__(self):
        pass



    def create_new_article(self,title):
        self.new_article_data.update({"title":title})
        print(self.new_article_url)
        res=requests.post(self.new_article_url,data=json.dumps(self.new_article_data),headers=self.headers).text
        id=json.loads(res)["id"]
        return id




    def upload(self,title,content):
        id=self.create_new_article(title)
        data = {"id": id, "autosave_control": 1, "title": title,
                "content": content }
        update_url = "https://www.jianshu.com/author/notes/" + str(id)
        requests.put(update_url,data=json.dumps(data),headers=self.headers)
        publish_url="https://www.jianshu.com/author/notes/"+ str(id) +"/publicize"
        requests.post(publish_url,headers=self.headers)



if __name__ == '__main__':
    jiangsu=JianShu()
    # jiangsu.create_new_article("122121")

    jiangsu.upload("简书",'<h2>前端:echarts 总结(三)</h2><p><span style="font-size:24px">C.Axis</span></p><p><span style="font-size:24px">坐标轴</span></p><ul><li><span style="font-size:24px">接收一个数组，可以设置多个轴</span></li><li><span style="font-size:24px">name</span></li><ul><li><span style="font-size:24px">坐标轴名字</span></li><li><span style="font-size:24px">nameTextStyle设置样式</span></li></ul><li><span style="font-size:24px">min max</span></li><ul><li><span style="font-size:24px">设置坐标轴，最大最小值</span></li></ul><li><span style="font-size:24px">splItNumber</span></li><ul><li><span style="font-size:24px">设置坐标轴分段数</span></li></ul><li><span style="font-size:24px">triggerEvent</span></li><ul><li><span style="font-size:24px">坐标轴触发事件，暂未用过</span></li></ul><li><span style="font-size:24px">axisLine</span></li><ul><li><span style="font-size:24px">坐标轴线相关设置</span></li><li><span style="font-size:24px">symbol</span></li><ul><li><span style="font-size:24px">字符串或者数组，配置两端的样式</span></li></ul></ul><li><span style="font-size:24px">axisTick</span></li><ul><li><span style="font-size:24px">坐标轴刻度样式,凸出的那根线</span></li></ul><li><span style="font-size:24px">axisLabel</span></li><ul><li><span style="font-size:24px">坐标轴刻度标签 ，显示在轴上的数值</span></li></ul><li><span style="font-size:24px">splitLine</span></li><ul><li><span style="font-size:24px">设置grid中分隔线的样式</span></li></ul><li><span style="font-size:24px">data</span></li><ul><li><span style="font-size:24px">类目轴(type=&quot;category&quot;)的样式</span></li></ul></ul><p></p><p></p>')
