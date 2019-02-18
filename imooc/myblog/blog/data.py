import  pymysql
class DB:
    def __init__(self):
        self.con = pymysql.connect(
            host="127.0.0.1",
            user="root",
            password="root",
            port=3306,
            database="fangtianxia"
            )
        self.cursor = self.con.cursor()

    def select(self):
        sql = "select chaoxiang,avg(danjia) as fd from fangtianxia group by chaoxiang "
        res = self.cursor.execute(sql)
        result = self.cursor.fetchall()
        return result

    def createDict(self):
        list_1 = []
        result = self.select()
        # print(result)
        for i in result:
            dict_1 = {}
            dict_1[i[0]] = int(i[1])
            list_1.append(dict_1)
        return  list_1

    def write(self):
        res = self.createDict()
        return res

with open (r"C:\Users\zq\Desktop\eacharts\20.v-if和v-show的使用和特点.itheima","rb") as fd :
    tf = fd.read()

with open(r"C:\Users\zq\Desktop\eacharts\222.mp4", "ab") as fr:
    fr.write(tf)