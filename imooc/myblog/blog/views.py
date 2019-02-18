from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.db.transaction import atomic
from .import models
import json
from django.views.decorators.csrf import csrf_exempt
import pymysql


def index(request):#主页
    # res = data.out()
    # usemaseg = models.User.objects.get(pk="zq")
    return render(request,'index.html')

def usezhuce(request):#跳向注册用户页面
    return render(request,'usezhuce.html')

@csrf_exempt
@atomic
#处理用户输入逻辑
def usetijiao(request):#注册用户页面判断用户名是否可用
    if request.method == 'POST':
        usedata = request.POST.get('usename')
        status = 0
        try:
            result = models.User.Object.get(usename=usedata)
            if result:
                res = "1"
                return HttpResponse(json.dumps({"status": status,"result": res}))
        except:
            res = "0"
            return HttpResponse(json.dumps({"status": status, "result": res}))

#注册用户
def success(request):#注册用户
    #usename = request.POST.get('usename')
    #usepassword = request.POST.get('usepassword')
    #models.User.objects.create(usename=usename, password=usepassword)
    return render(request, "createuse.html")

#跳转内容页
def echarts(request):
    return render(request,"content.html")
    pass

#西安学历和工资关系图
def ajax(request):
    if request.method =="GET":
        con = pymysql.connect(host="127.0.0.1", user="root", password="root123", port=3306, database="test")
        curson = con.cursor()
        status = 0
        usedata = request.GET.get("need")
        print(usedata)
        if usedata :
            sql = 'select edu,avg(min_salary) from job51 where provinces="西安" group by edu'
            # 查找西安工资与学历的关系
            curson.execute(sql)
            send = curson.fetchall()
            sql = 'select edu,avg(high_salary) from job51 where provinces="西安" group by edu'
            # 查找西安工资与学历的关系
            curson.execute(sql)
            send_1 = curson.fetchall()
            #return HttpResponse(json.dumps({"status": status, "key": "444"}))
            return HttpResponse(json.dumps({"status": status,"value_2": [float(x[1]) for x in send_1],
                                            "value": [float(x[1]) for x in send] ,"key": [x[0] for x in send]}),content_type="json")
#西安区域工作需求
def ajax_1(request):
    if request.method =="GET":
        con = pymysql.connect(host="127.0.0.1", user="root", password="root123", port=3306, database="test")
        curson = con.cursor()
        status = 0
        usedata = request.GET.get("need_2")
        print(usedata)
        if usedata :
            sql = 'select area,count(*) as f1 from job51 where provinces="西安" and area != " " group by area order by f1 desc limit 6'
            # 查找西安工资与学历的关系
            curson.execute(sql)
            send = curson.fetchall()
            # 查找西安工资与学历的关系
            curson.execute(sql)
            send_1 = curson.fetchall()
            #return HttpResponse(json.dumps({"status": status, "key": "444"}))
            dc = {}
            ls = []
            for keys in send_1:
                dc["name"] = keys[0]
                dc["value"] = keys[1]
                ls.append(dc)
                dc = {}
            return HttpResponse(json.dumps({"status": status,"value": ls}),content_type="json")
#西安line动态图
def ajax_2(request):
    if request.method == "GET":
        con = pymysql.connect(host="127.0.0.1", user="root", password="root123", port=3306, database="test")
        curson = con.cursor()
        status = 0
        usedata = request.GET.get("need_2")
        if usedata:
            sql = 'select datatime,count(*) as f1 from job51 where provinces = "西安" ' \
                  'group by datatime order by datatime '
            # 查找西安工资与学历的关系
            curson.execute(sql)
            send_1 = curson.fetchall()
            ls = []
            dc={}
            ls_date=[]
            ls_f=[]
            dg={}
            for x in send_1:
                df = str(x[0]).replace("-", "/")
                ls_date.append(df)
                ls_date.append(x[1])
                dc['value']=ls_date
                ls_date=[]
                dg['name']=df
                ls.append(dc)
                ls_f.append(dg)
                dg={}
                dc={}

            return HttpResponse(json.dumps({"status": status,"name":ls_f, "value":ls}),content_type="json")


#成都line动态图
def ajax_3(request):
    if request.method == "GET":
        con = pymysql.connect(host="127.0.0.1", user="root", password="root123", port=3306, database="test")
        curson = con.cursor()
        status = 0
        usedata = request.GET.get("need_2")
        if usedata:
            sql_1 = 'select datatime,count(*) as f1 from job51 where provinces = "成都" group by datatime order by datatime '
            # 查找西安工资与学历的关系
            curson.execute(sql_1)
            send_2 = curson.fetchall()
            ls = []
            dc = {}
            ls_date = []
            ls_f = []
            dg = {}
            for x in send_2:
                df = str(x[0]).replace("-", "/")
                ls_date.append(df)
                ls_date.append(x[1])
                dc['value'] = ls_date
                ls_date = []
                dg['name'] = df
                ls.append(dc)
                ls_f.append(dg)
                dg = {}
                dc = {}

            return HttpResponse(json.dumps({"status": status, "name": ls_f, "value": ls}), content_type="json")
#词云图
def ajax_4(request):
    if request.method == "GET":
        con = pymysql.connect(host="127.0.0.1", user="root", password="root123", port=3306, database="test")
        curson = con.cursor()
        status = 0
        usedata = request.GET.get("need_2")
        if usedata:
            sql = 'select welfare as f1 from job51 where provinces = "西安" '
            curson.execute(sql)
            count = curson.fetchall()
            curson.close()
            count_list = []
            for key in count:
                res = ",".join(list(key))
                count_list.append(res)
            result = ",".join(count_list)
            result_1 = result.split(",")
            newdict = {}
            for i in result_1:
                j = result_1.count(i)
                newdict[i] = j
            ls = []
            lf = {}
            for x in newdict:
                lf["name"] = x
                lf["value"] = newdict[x]
                ls.append(lf)
                lf = {}
            return HttpResponse(json.dumps({"status": status, "data":ls}), content_type="json")


#全国分布map
def ajax_5(request):
    if request.method == "GET":
        con = pymysql.connect(host="127.0.0.1", user="root", password="root123", port=3306, database="test")
        curson = con.cursor()
        status = 0
        usedata = request.GET.get("need_2")
        if usedata:
            sql = 'select count(provinces),month(datatime),count(provinces)/(select count(provinces) from job51) f1,provinces from job51 where month(datatime)=12 group by provinces,month(datatime) order by f1 desc limit 10 '
            curson.execute(sql)
            send=curson.fetchall()
            ls = []
            dc = {}
            lf = []
            df = {}
            for i in send:
                dc['name'] = i[3]
                dc["value"] = [i[0], float(i[2]), i[3]]
                lf.append(dc)
                df['data'] = lf
                ls.append(df)
                df = {}
                dc = {}
            sql_1 = 'select count(provinces),month(datatime),count(provinces)/(select count(provinces) from job51) f1,provinces from job51 where month(datatime)=1 group by provinces,month(datatime) order by f1 desc limit 10 '
            curson.execute(sql_1)
            send = curson.fetchall()
            ls_1 = []
            dc = {}
            lf = []
            df = {}
            for i in send:
                dc['name'] = i[3]
                dc["value"] = [i[0], float(i[2]), i[3]]
                lf.append(dc)
                df['data'] = lf
                ls_1.append(df)
                df = {}
                dc = {}
            sql_1 = 'select count(provinces),month(datatime),count(provinces)/(select count(provinces) from job51) f1,provinces from job51 where month(datatime)=2 group by provinces,month(datatime)  limit 8 '
            ls_2 = []
            dc = {}
            lf = []
            df = {}
            for i in send:
                dc['name'] = i[3]
                dc["value"] = [i[0], float(i[2]), i[3]]
                lf.append(dc)
                df['data'] = lf
                ls_2.append(df)
                df = {}
                dc = {}
            curson.close()
            return HttpResponse(json.dumps({"status": status, "data9":ls,"data10":ls_1,"data11":ls_2}), content_type="json")
