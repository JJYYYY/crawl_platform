import requests
import json


class Juejin():
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3970.5 Safari/537.36",
    }
    update_url = "https://post-storage-api-ms.juejin.im/v1/draftStorage"

    upload_url="https://post-storage-api-ms.juejin.im/v1/postPublish"
    def getPostId(self,title,content):
        data = {
            "uid": "5e85e4456fb9a03c8e5f86ed",
            "device_id": "1585833029955",
            "token": "eyJhY2Nlc3NfdG9rZW4iOiJ4cGxZVjRUQ3lLRVZVbk5yIiwicmVmcmVzaF90b2tlbiI6InlCNWhnUlB4VTV4emtzUGUiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==",
            "src": "web",
            "category": "5562b428e4b00c57d9b94b9d",
            "content": "",
            "html": "<p>" + content + "<p>",
            "markdown": content,
            "screenshot": "",
            "isTitleImageFullscreen": 0,
            "tags": "",
            "title": title,
            "type": "markdown"
        }
        r = requests.post(data=data, headers=self.headers, url=self.update_url)
        postId = json.loads(r.text)["d"][0]
        return postId

    def upload(self, title, content):
        postId=self.getPostId(title,content)
        data={"uid": "5e85e4456fb9a03c8e5f86ed",
            "device_id": "1585833029955",
            "token": "eyJhY2Nlc3NfdG9rZW4iOiJ4cGxZVjRUQ3lLRVZVbk5yIiwicmVmcmVzaF90b2tlbiI6InlCNWhnUlB4VTV4emtzUGUiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==",
            "src": "web",
            "postId":postId}
        requests.post(url=self.upload_url,data=data,headers=self.headers)






if __name__ == '__main__':
    csdn = Juejin()
    csdn.upload("掘金", "我来了")
