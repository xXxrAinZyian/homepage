###### * Demo
```
# mysql -uroot -padmin -e "create database demo charset=utf8;"
import flask
import sqlalchemy
import flask_sqlalchemy

app = flask.Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:admin@127.0.0.1:3306/demo"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True

db = flask_sqlalchemy.SQLAlchemy(app)


class Role(db.Model):
    __tablename__ = "tb_roles"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    users = db.relationship("User", backref="backrefRole")

    # 自定义显示格式
    def __repr__(self):
        return 'Role:id=%d,name=%s' % (self.id, self.name)


class User(db.Model):
    __tablename__ = "tb_users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    email = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(64))
    role_id = db.Column(db.Integer, db.ForeignKey(Role.id))

    def __repr__(self):
        return 'User:id=%d,name=%s' % (self.id, self.name)


db.drop_all()
db.create_all()

# 增加记录
# SQL:insert into roles (name) values ("NameA")
roleA = Role(name="RoleA")
db.session.add(roleA)
db.session.commit()

# 增加多个记录
roleB = Role(name="RoleB")
roleC = Role(name="RoleC")
roleD = Role(name="RoleD")
roleE = Role(name="RoleE")
db.session.add_all([roleB, roleC, roleD, roleE])
db.session.commit()

# 更新记录
# 获取 ID = 3 的数据进行修改
Role.query.get(3).name = "id=3"
# 查询并更新
Role.query.filter_by(name="RoleD").update({"name": "name=RoleD"})
db.session.commit()

# 删除记录
# 获取 ID = 5 的数据进行删除
# SQL：delete from roles where id = info.id
db.session.delete(Role.query.get(5))
db.session.commit()

userA = User(name='wang', email='wang@163.com', password='123456', role_id=roleA.id)
userB = User(name='zhang', email='zhang@189.com', password='201512', role_id=roleB.id)
userC = User(name='chen', email='chen@126.com', password='987654', role_id=roleB.id)
userD = User(name='zhou', email='zhou@163.com', password='456789', role_id=roleA.id)
userE = User(name='tang', email='tang@admin.com', password='158104', role_id=roleB.id)
userF = User(name='wu', email='wu@gmail.com', password='5623514', role_id=roleB.id)
userG = User(name='qian', email='qian@gmail.com', password='1543567', role_id=roleA.id)
userH = User(name='liu', email='liu@admin.com', password='867322', role_id=roleA.id)
userI = User(name='li', email='li@163.com', password='4526342', role_id=roleB.id)
userJ = User(name='sun', email='sun@163.com', password='235523', role_id=roleB.id)
db.session.add_all([userA, userB, userC, userD, userE, userF, userG, userH, userI, userJ])
db.session.commit()

# 查询记录
# select * from Users
print("查询所有用户数据:", User.query.all())
print("查询所有用户数据:", db.session.query(User).all())

# select count(*) from Users
print("查询有多少用户:", User.query.count())
print("查询有多少用户:", db.session.query(User).count())

# select * from Users where id = 1
print("查询第一个用户:", User.query.first())
print("查询第一个用户:", db.session.query(User).first())

print("查询 ID 为 4 的用户:", User.query.get(4))
print("查询 ID 为 4 的用户:", db.session.query(User).first())

# 分页
# paginate(查询第几页,每页显示多少条数据)
print("当前页数据:", User.query.paginate(2, 3).items)
print("总页数：", User.query.paginate(2, 3).pages)
print("当前页：", User.query.paginate(2, 3).page)

# filter_by() 等值查询
print("查询 ID 为 4 的用户:", User.query.filter_by(id=4).first())

# select * from Users where id = 2
print("查询 ID 为 2 的用户:", User.query.filter(User.id == 2).first())
print("查询 ID 小于 4 的用户:", User.query.filter(User.id < 4).all())
print("查询 name 为 liu 的角色数据:", User.query.filter(User.name == "liu").first())


# select * from users where name like "w%"
print("查询名字以 w 开头的所有数据:", User.query.filter(User.name.startswith("w")).all())
# select * from users where name like "%g"
print("查询名字以 g 结尾的所有数据:", User.query.filter(User.name.endswith("g")).all())
# select * from users where name like "%a%"
print("查询名字包含 a 的所有数据:", User.query.filter(User.name.contains("a")).all())

# select * from users where name!="wang"
print("查询名字不等于 wang 的数据:", User.query.filter(User.name != "wang").all())
print("查询名字不等于 wang 的数据:", User.query.filter(sqlalchemy.not_(User.name == "wang")).all())
# select * from users where name like "li%" and email like "li%"
print("查询名字和邮箱都以 li 开头的所有数据:", User.query.filter(User.name.startswith("li"), User.email.startswith("li")).all())
print("查询名字和邮箱都以 li 开头的所有数据:", User.query.filter(sqlalchemy.and_(User.name.startswith("li"), User.email.startswith("li"))).all())
# select * from users where password="123456"  or email like "%admin.com"
print("查询password是 123456 或者 email 以 admin.com 结尾的所有数据:", User.query.filter(sqlalchemy.or_(User.password == "123456", User.email.endswith("admin.com"))).all())

# select * from where id in ("1, 3, 5, 7, 9")
print("查询id为 [1, 3, 5, 7, 9] 的用户列表:", User.query.filter(User.id.in_([1, 3, 5, 7, 9])).all())

# 偏移
print("查询从第 2 条开始的所有数据: ", User.query.offset(2).all())
print("查询从第 2 条开始的 2 条数据: ", User.query.offset(2).limit(2).all())

# select * from tb_users order by id desc
print("查询所有用户数据，并以 id 降序排序: ", User.query.order_by(sqlalchemy.text('id')).all())
print("查询所有用户数据，并以 id 升序排序: ", User.query.order_by(User.id.asc()).all())
print("查询所有用户数据，并以 id 降序排序: ", User.query.order_by(sqlalchemy.text('-id')).all())
print("查询所有用户数据，并以 id 降序排序: ", User.query.order_by(User.id.desc()).all())

# select role_id,count(role_id) from tb_users group by role_id;
print(db.session.query(User.role_id, sqlalchemy.func.count(User.role_id)).group_by(User.role_id))
print(db.session.query(User.role_id, sqlalchemy.func.count(User.role_id)).group_by(User.role_id).all())


# SQL:select * from tb_users left join Roles on Users.role_id = Roles.id where Roles.id = 1
print("查询角色 id 为 1 关联的所有用户: ",Role.query.get(1).users)
# SQL:select * from tb_roles left join users on roles.id = users.role_id where users.id = 1
print("查询用户 id 为 1 关联的角色: ", User.query.get(1).backrefRole)
print("查询用户 id 为 1 关联的角色: ", User.query.get(1).backrefRole.name)
print("查询用户 id 为 1 关联的角色: ", Role.query.get(User.query.get(1).role_id))
```





[toc]
###### * Example：图书管理
```
import flask
import flask_sqlalchemy
import flask_wtf
import wtforms
import wtforms.validators


app = flask.Flask(__name__)
app.secret_key = "abcdefg"

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:mysql@127.0.0.1:3306/booksheet"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = flask_sqlalchemy.SQLAlchemy(app)


class Author(db.Model):
    """作者模型"""
    __tablename__ = "authors"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)

    books = db.relationship("Book", backref="Author")


class Book(db.Model):
    """书籍模型"""
    __tablename__ = "books"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)

    authorID = db.Column(db.Integer, db.ForeignKey(Author.id))


class AddBookForm(flask_wtf.FlaskForm):
    """添加书籍到表单"""
    author = wtforms.StringField("作者：",validators=[wtforms.validators.InputRequired("请输入作者")])
    book = wtforms.StringField("书名：", validators=[wtforms.validators.InputRequired("请输入书名")])
    submit = wtforms.SubmitField("添加")


@app.route("/",methods=["GET","POST"])
def index():
    bookForm = AddBookForm()

    if bookForm.validate_on_submit():
        # 取出表单中输入的作者数据
        authorName = bookForm.author.data
        # 取出表单中输入的书名数据
        bookName = bookForm.book.data
        print(authorName)
        print(bookName)

        # 查询指定名字的作者
        author = Author.query.filter(Author.name == authorName).first()

        # 作者不存在
        if not author:
            # 添加作者
            try:
                author = Author(name=authorName)
                db.session.add(author)
                db.session.commit()
                # 添加书籍
                book = Book(name=bookName,authorID=author.id)
                db.session.add(book)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                print(e)
                flask.flash("添加失败")

        # 作者存在
        else:
            # 查询书籍
            book = Book.query.filter(Book.name == bookName).first()
            # 书籍不存在
            if not book:
                # 添加书籍
                try:
                    book = Book(name=bookName, authorID=author.id)
                    db.session.add(book)
                    db.session.commit()
                except Exception as e:
                    print(e)
                    flask.flash("添加失败")
            else:
                flask.flash("书籍存在")


    else:
        if flask.request.method == "POST":
            flask.flash("参数错误")


    # 查询数据
    authorData = Author.query.all()

    return flask.render_template("index.html",authors=authorData,form=bookForm)


@app.route("/deleteAuthor/<authorIDForm>")
def deleteAuthor(authorIDForm):
    """删除作者"""
    try:
        author = Author.query.get(authorIDForm)
    except Exception as e:
        print(e)
        return "查询错误"

    if not author:
        return "作者不存在"

    try:
        Book.query.filter(Book.authorID == authorIDForm).delete()
        db.session.delete(author)
        db.session.commit()
    except Exception as e:
        print(e)
        db.session.rollback()
        return "删除失败"

    return flask.redirect(flask.url_for("index"))

@app.route("/deleteBook/<bookIDForm>")
def deleteBook(bookIDForm):
    """删除书籍"""
    try:
        book = Book.query.get(bookIDForm)
    except Exception as e:
        print(e)
        return "查询错误"

    if not book:
        return "书籍不存在"
    try:
        db.session.delete(book)
        db.session.commit()
    except Exception as e:
        print(e)
        db.session.rollback()
        return "删除失败"
    return flask.redirect(flask.url_for("index"))


db.drop_all()
db.create_all()

# 添加数据
authorA = Author(name="AuthorNameA")
authorB = Author(name="AuthorNameB")
authorC = Author(name="AuthorNameC")

db.session.add_all([authorA, authorB, authorC])
db.session.commit()

bookA = Book(name="BookNameA", authorID=authorA.id)
bookB = Book(name="BookNameB", authorID=authorA.id)
bookC = Book(name="BookNameC", authorID=authorB.id)
bookD = Book(name="BookNameD", authorID=authorC.id)
db.session.add_all([bookA, bookB, bookC, bookD])
db.session.commit()

app.run(debug=True)
```

```
# index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<h1>Book Manage</h1>

<form method="post">
    {{ form.csrf_token() }}<br/>
    {{ form.author.label }}{{ form.author }}<br/>
    {{ form.book.label }}{{ form.book }}<br/>
    {{ form.submit }}<br/>

    {% for message in get_flashed_messages() %}
        {{ message }}
    {% endfor %}

</form>

<hr>

<ul>
   {% for author in authors %}
        <li>{{ author.name }}<a href="/deleteAuthor/{{ author.id }}">删除</a></li>
        <ul>

        {% for book in author.books %}
            <li>{{ book.name }}<a href="/deleteBook/{{ book.id }}">删除</a></li>
        {% endfor %}
        </ul>
   {% endfor %}
</ul>

</body>
</html>
```
