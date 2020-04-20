import requests
import json


class Csdn():
    headers = {
        "cookie": "uuid_tt_dd=10_35506072970-1580725419649-733666; dc_session_id=10_1580725419649.770996; __gads=ID=5b6f4ecf0389c47d:T=1580725421:S=ALNI_MY9sA9nyjdiMIORW6rLnYL1Y9IB-g; UserName=weixin_42316448; UserInfo=a0b90bf4ecba4bc3bcc86f2fec2fbfb0; UserToken=a0b90bf4ecba4bc3bcc86f2fec2fbfb0; UserNick=weixin_42316448; AU=83A; UN=weixin_42316448; BT=1581749176376; p_uid=U000000; Hm_ct_6bcd52f51e9b3dce32bec4a3997715ac=6525*1*10_35506072970-1580725419649-733666!5744*1*weixin_42316448; dc_sid=462c0d80ee5eeddbe42ef94bd8387464; c_ref=http%3A//www.baidu.com/link%3Furl%3DaTkb_LPOu2cFu_K5W14cW93I0oq4zWi5z46IdpsWCGC%26wd%3D%26eqid%3De42ec8340000197e000000035e85de94; Hm_lvt_6bcd52f51e9b3dce32bec4a3997715ac=1585743926,1585743935,1585831175,1585831548; announcement=%257B%2522isLogin%2522%253Atrue%252C%2522announcementUrl%2522%253A%2522https%253A%252F%252Fblog.csdn.net%252Fblogdevteam%252Farticle%252Fdetails%252F105203745%2522%252C%2522announcementCount%2522%253A0%252C%2522announcementExpire%2522%253A3600000%257D; Hm_lpvt_6bcd52f51e9b3dce32bec4a3997715ac=1585831600; dc_tos=q85vl4",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36",
        "content-type": "application/json",
        "accept": "application/json, text/javascript, */*; q=0.01"}

    update_url = "https://blog-console-api.csdn.net/v1/mdeditor/saveArticle"

    def upload(self, title, content):
        # data={"title":title,"markdowncontent":content,"content":content,"readType":"public","status":2,"not_auto_saved":"1","source":"pc_mdeditor"}
        data = {"title": title, "markdowncontent": content, "content": content, "readType": "public", "tags": "python",
                "status": 0, "categories": "", "type": "original", "original_link": "", "authorized_status": False,
                "not_auto_saved": "1", "source": "pc_mdeditor"}
        requests.post(data=json.dumps(data), headers=self.headers, url=self.update_url)


if __name__ == '__main__':
    csdn = Csdn()
    csdn.upload("csnd", "我来了")
