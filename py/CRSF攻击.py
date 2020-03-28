
import flask

app = flask.Flask(__name__)

@app.route("/", methods=["GET","POST"])
def index():
    if flask.request.method == "POST":
        username = flask.request.form.get("username")
        password = flask.request.form.get("password")

        if not all([username, password]):
            print("参数错误")
        else:
            if username == "test" and password == "test":
                response = flask.redirect(flask.url_for("transfer"))
                response.set_cookie("username", username)
                return response
            else:
                print("密码错误")

    return flask.render_template("WebALogin.html")


@app.route("/transfer", methods=["GET","POST"])
def transfer():
    username = flask.request.cookies.get("username", None)
    if not username:
        return flask.redirect(flask.url_for("index"))

    if flask.request.method == "POST":
        account = flask.request.form.get("account")
        money = flask.request.form.get("money")
        print("执行转账操作")
        return "转账 %s 元到 %s 成功" %(money,account)

    response = flask.make_response(flask.render_template("WebATransfer.html"))
    return response


app.run(debug=True, port=7000)
```
- WebALogin.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
</head>
<body>

<h1>WebA 登录页面</h1>

<form method="post">
    <label>用户名：</label>
        <input type="text" name="username" placeholder="请输入用户名"><br/>
    <label>密码：</label>
        <input type="password" name="password" placeholder="请输入密码"><br/>
    <input type="submit" value="登录">
</form>

</body>
</html>
```
- WebATransfer.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>转账</title>
</head>
<body>
<h1>WebA 转账页面</h1>

<form method="post">
    <label>账户：</label>
        <input type="text" name="account" placeholder="请输入对方账户"><br/>
    <label>金额：</label>
        <input type="number" name="money" placeholder="请输入转账金额"><br/>
    <input type="submit" value="转账">
</form>

</body>
</html>
```
- WebB
- demoWeB.py
```
import flask

app = flask.Flask(__name__)

@app.route("/")
def index():
    return flask.render_template("WebBIndex.html")

app.run(debug=True, port=8000)
```
- WebBIndex.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>攻击</title>
</head>
<body>

<h1>WebB 攻击页面</h1>

{# 该模板向网站A的transfer方法(转账操作)发起请求 #}
<form method="post" action="http://127.0.0.1:7000/transfer">

    <input type="hidden" name="account" value="Web账户">
    <input type="hidden" name="money" value="1000000000">
    <input type="submit" value="点击领取优惠券">
</form>

</body>
</html>
```








###### * Demo：CRSF 防止
#### WebA
- demoWebA.py
```
import flask
import base64
import os

app = flask.Flask(__name__)

@app.route("/", methods=["GET","POST"])
def index():
    if flask.request.method == "POST":
        username = flask.request.form.get("username")
        password = flask.request.form.get("password")

        if not all([username, password]):
            print("参数错误")
        else:
            if username == "test" and password == "test":
                response = flask.redirect(flask.url_for("transfer"))
                response.set_cookie("username", username)
                return response
            else:
                print("密码错误")

    return flask.render_template("WebALogin.html")


def generateCRSF():
    return bytes.decode(base64.b64encode(os.urandom(48)))

@app.route("/transfer", methods=["GET","POST"])
def transfer():
    username = flask.request.cookies.get("username", None)
    if not username:
        return flask.redirect(flask.url_for("index"))

    if flask.request.method == "POST":
        account = flask.request.form.get("account")
        money = flask.request.form.get("money")

        fromCSRFToken = flask.request.form.get("crsf_token")
        cookieCRSFToken = flask.request.cookies.get("crsf_token", "")

        if fromCSRFToken != cookieCRSFToken:
            return "非法请求"

        print("执行转账操作")
        return "转账 %s 元到 %s 成功" %(money,account)


    CRSFToken = generateCRSF()
    response = flask.make_response(flask.render_template("WebATransfer.html", crsf_token=csrf_token))
    response.set_cookie("csrf_token", CRSFToken)
    return response


app.run(debug=True, port=7000)
```
- WebATransfer.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>转账</title>
</head>
<body>
<h1>WebA 转账页面</h1>

<form method="post">
    <input type="hidden" name="csrf_token" value="{{ csrf_token }}">
    <label>账户：</label>
        <input type="text" name="account" placeholder="请输入对方账户"><br/>
    <label>金额：</label>
        <input type="number" name="money" placeholder="请输入转账金额"><br/>
    <input type="submit" value="转账">
</form>

</body>
</html>
```









