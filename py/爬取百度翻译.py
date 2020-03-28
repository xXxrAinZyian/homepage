# 使用 POST 请求爬取百度翻译
import requests
import json
import sys

class Fanyi:
    def __init__(self, query_string):
        self.url = "http://fanyi.baidu.com/basetrans"
        self.quety_string = query_string
        self.headers = {"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"}

    # 获取 POST 数据
    def get_post_data(self):
        post_data = {
            "query":self.quety_string,
            "from":"zh",
            "to":"en"
        }
        return post_data

    # 发送 POST 请求，获取响应
    def parse_url(self, url, data):
        res = requests.post(url, data=data, headers=self.headers)
        return res.content.decode()

    # 提取数据
    def get_ret(self, json_str):
        temp_dict = json.loads(json_str)
        ret = temp_dict["trans"][0]["dst"]
        print("{}:{}".format(self.quety_string,ret))

    # 主函数
    def main(self):
        # 1.准备数据
        post_data = self.get_post_data()
        # 2.发送 POST 请求
        json_str = self.parse_url(self.url,post_data)
        # 3.提取数据
        self.get_ret(json_str)

if __name__ == "__main__":
    query_string = sys.argv[1]
    fanyi = Fanyi(query_string)
    fanyi.main()
