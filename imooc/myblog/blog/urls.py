from django.conf.urls import  url,include
from django.urls import path
from  .import views
urlpatterns = [
    path('index/',views.index),
    path('zhuce/', views.usezhuce,name="zhuce"),
    path('tijiao/', views.usetijiao,name="tijiao"),
    path('ok/', views.success,name="createuse"),
    path('content/', views.echarts,name="content"),
    path('bar/', views.ajax, name="bar"),
    path('pie/', views.ajax_1, name="pie"),
    path('line/', views.ajax_2, name="line"),
    path('line_2/', views.ajax_3, name="line_2"),
    path('ciyun/', views.ajax_4, name="ciyun"),
    path('map/', views.ajax_5, name="map"),
]