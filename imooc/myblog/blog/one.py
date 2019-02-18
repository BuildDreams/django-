import  pymysql
import pandas as pd

from pyecharts import Bar

class OutData:

    def __init__(self, sql):
        self.con = pymysql.connect(host="127.0.0.1",user="root",password="root",port=3306,database="test")
        self.curson = self.con.cursor()
        self.sql = sql


    def data(self):
        self.curson.execute(self.sql)
        data = self.curson.fetchall()
        return dict(data)

    def data_word(self):
        self.curson.execute(self.sql)
        data = self.curson.fetchall()

        return data

class PowPlt(OutData):

    def __init__(self,sql,ct):
        super(PowPlt,self).__init__(sql)
        self.ct = ct
        if self.ct == 1:
            self.data = self.data()

        self.data_word = self.data_word()



    def outBar(self):
        attr = []
        v1 = []
        for key in self.data:
            attr.append(key)
            v1.append(float(self.data[key]))
        return attr,v1

    def outLine(self):
        attr = []
        for key in self.data_word:
            attr.append(key)

        return attr
class Person:
    def speak(self):
        print('说话....')

class America(Person):
    def speak(self):
        print('美国人说：你好')

class Thai(Person):
    def speak(self):
        print('泰国人说，你好')

class Chinese(Person):
    def speak(self):
        print('中国人说，你好')

def say(pers):
    pers.speak()

xiaoMing = Chinese()
jack = America()
tai = Thai()

say(xiaoMing)
say(jack)
say(tai)
