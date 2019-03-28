// JavaScript Document
//西安工资和学历统计Bar+line图
$(document).ready(
	function()
	{
		var need = $("#zq02").val();
		//$.ajaxSetup({data: {csrfmiddlewaretoken:'{{ crsf_token }}'},});
		$.ajax({
				type: 'GET',
				url: '/blog/bar/' ,//获取数据的路由
				async:true,//设置异步
				data: {
						'need': need,
					  },
				dataType: 'JSON',
				success: function(data)
				{
					var x_data = data.key;
					var y_data = data.value;
					var y_data_2 = data.value_2;
					var myChart = echarts.init(document.getElementById('zq01'),"dark");
					//myChart.showLoading()用于数据量太多加载动画过程，要在异步加载之前
					// 指定图表的配置项和数据
					var option = {
						color:["#006699","green"],//颜色
						title: {
							text: '西安学历和工资'
						},
						
						tooltip: {},
						legend: {
							data:['最低工资','最高工资']//柱子表示工资
						},
						toolbox:{show:true,//右边工具显示
							orient:'vertical',
							left:'right',
							top:'center',//位置
							feature:{
								mark:{show:true},
								dataView:{show:true,readOnly:false},
								magicType:{show:true,type:['line','stack']},//图形相互切换
								restore:{show:true},//重置还原
								saveAsImage:{show:true}//保存为图片
								}
						},
						xAxis: {
							data: x_data
						},
						yAxis: {},
						series: [{
							name: '最低工资',
							type: 'bar',
							data: y_data,
						},
						{
							name: '最高工资',
							type: 'bar',
							data: y_data_2,
						},
						{
							name: '最低工资',
							type: 'line',
							data: y_data,
							symbol:'star',//拐点样式
                			symbolSize: 8,//拐点大小
							symbolColor:'red',
							itemStyle : {
								normal : {
									lineStyle:{
										width:2,//折线宽度
										color:"#006699"//折线颜色
									}
                    		}
                },
						},
						{
							name: '最高工资',
							type: 'line',
							data: y_data_2,
							symbol:'circle',//拐点样式
                			symbolSize: 8,//拐点大小
							symbolColor:'red',
							itemStyle : {
								normal : {
									lineStyle:{
										width:2,//折线宽度
										color:"green"//折线颜色
									}
								}
							}
						}]
								
					};
			
					// 使用刚指定的配置项和数据显示图表。
					myChart.setOption(option);
				}
			 })
	})
//西安平均工资和学历图表
$(document).ready(
	function()
	{	
			var need_2 = $("#zq02").val();
			$.ajax({
				type: 'GET',
					url: '/blog/pie/' ,//获取数据的路由
					data: {
							'need_2': need_2,
						  },
					dataType: 'JSON',
					success: function(data)
					{
						var y_data = data.value;
						var myChart = echarts.init(document.getElementById('zq08')).setOption({
						//backgroundColor: '#2c343c',

						label: {show: true, 
								formatter: '{b} : {c} \n ({d}%)' 
						}, 
						legend: {
 						icon: "diamond",   //  字段控制形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
					 	itemWidth: 10,  // 设置宽度
					 	itemHeight: 10, // 设置高度
					 	itemGap: 20 // 设置间距
					},
						toolbox:{
							show:true,
							orient:'vertical',
							left:'right',
							top:'center',//位置
							feature:{
									mark:{show:true},
									dataView:{show:true,readOnly:false},
									restore:{show:true},//重置还原
									saveAsImage:{show:true}//保存为图片
									}
								},
						series: 
						{
							startAngle: 180,
							name:'各区域需求占比',
							type: 'pie',
							radius: [41, 153.75],
							center: ['50%', '50%'],
							data: y_data,
							//roseType: 'area',
							avoidLabelOverlap: false,
							itemStyle: { normal: 
											{label : {
												show: true ,
												position: ''}
											}
										},
						}
        			});
        		}
			})
		
	})
//西安各个区域工作需求占比
$(document).ready(
	function()
	{
		var need_2 = $("#zq02").val();
		$.ajax({
				type: 'GET',
					url: '/blog/line/' ,//获取数据的路由
					data: {
							'need_2': need_2,
						  },
					dataType: 'JSON',
					success: function (data)
					{
						var x_data = data.name;
						var y_data = data.value;
						var myChart = echarts.init(document.getElementById('zq09'))
						function randomData(i) {
								var obj = x_data[i].name
								var obk = y_data[i].value
								lf =new Date(obj)
								return {
								name: ''+new Date(obj)+'',
								value: obk
							}
						}
					var data =[];
					for (var i = 0; i < 6; i++) {
						data.push(randomData(i));
					}
					option = {
						backgroundColor: '#000',
						label: {
								show: true, //开启显示
								position: 'top', //在上方显示
								textStyle: { //数值样式
									color: 'black',
									fontSize: 16,
									fontWeight: 600
									}
								},
						legend: {
							icon: "triangle",   //  字段控制形状  类型包括 	circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
							itemWidth: 10,  // 设置宽度
							itemHeight: 10, // 设置高度
							itemGap: 20 // 设置间距
					 	},
						title: {
							text: '西安三个月内工作需求变化'
						},
						tooltip: {
							trigger: 'axis',
							formatter: '{b}\n{c}'
						},
						xAxis: {
							type: 'time',
							splitLine: {
								show: false
							}
						},
						yAxis: {
							type: 'value',
							boundaryGap: [0, '100%'],
							splitLine: {
								show: false
							}
						},
						series: [{
							name: '需求走势',
							type: 'line',
							showSymbol: false,
							hoverAnimation: false,
							data: data,
							itemStyle:{  
                                normal : {  
                                    color:'red',  
								}}
						}]
					};
					
					myChart.setOption(option)
					var i = 6;
					setInterval(function () {
						if(i>= x_data.length)
						{	i =6;
							data=[];
							for (var k = 0; k < 5; k++) {
									data.push(randomData(k));
								}
						} ;
						
						data.push(randomData(i));
						//data.shift(); //某些情况可以设置只显示5个
						i=i+1;
						myChart.setOption({
							series: [{
								data: data
							}]
						});
					}, 1000);
						
					}
		})
	})
//成都工作需求line图
$(document).ready(
	function()
	{
		var need_2 = $("#zq02").val();
		$.ajax({
				type: 'GET',
					url: '/blog/line_2/' ,//获取数据的路由
					data: {
							'need_2': need_2,
						  },
					dataType: 'JSON',
					success: function (data)
					{
						var x_data = data.name;
						var y_data = data.value;
						var myChart = echarts.init(document.getElementById('zq10'))
						function randomData(i) {
								var obj = x_data[i].name
								var obk = y_data[i].value
								lf =new Date(obj)
								return {
								name: ''+new Date(obj)+'',
								value: obk
							}
						}
					var data =[];
					for (var i = 0; i < 6; i++) {
						data.push(randomData(i));
					}
					option = {
						label: {
								show: false, //开启显示
								position: 'top', //在上方显示
								textStyle: { //数值样式
									color: 'green',
									fontSize: 16,
									fontWeight: 600
									}
								},
						legend: {
 						icon: "circle",   //  字段控制形状  类型包括 triangle	circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
					 	itemWidth: 10,  // 设置宽度
					 	itemHeight: 10, // 设置高度
					 	itemGap: 20 // 设置间距
					 	},
						backgroundColor: '#000',
						title: {
							text: '西安三个月内工作需求变化'
						},
						tooltip: {
							trigger: 'axis',
							formatter: function (params) {
								params = params[0];
								var date = new Date(params.name);
								return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
							},
							axisPointer: {
								animation: true
							}
						},
						xAxis: {
							type: 'time',
							splitLine: {
								show: false
							}
						},
						yAxis: {
							type: 'value',
							boundaryGap: [0, '100%'],
							splitLine: {
								show: false //加上格式线
							}
						},
						series: [{
							name: '需求走势',
							color:'#069',
							type: 'bar',
							showSymbol: false,
							hoverAnimation: true,
							data: data
						}]
					};
					
					myChart.setOption(option)
					var i = 6;
					setInterval(function () {
						if(i>= x_data.length)
						{	i =6;
							data=[];
							for (var k = 0; k < 5; k++) {
									data.push(randomData(k));
								}
						} ;
						
						data.push(randomData(i));
						//data.shift();
						i=i+1;
						myChart.setOption({
							series: [{
								data: data
							}]
						});
					}, 1000);
						
					}
		})
	})
//西安福利待遇词云图
$(document).ready(
	function()
	{
		var need_2 = $("#zq02").val();
		$.ajax({
				type: 'GET',
					url: '/blog/ciyun/' ,//获取数据的路由
					data: {
							'need_2': need_2,
						  },
					dataType: 'JSON',
					success: function (data)
					{
						var datas = data.data
						var myChart = echarts.init(document.getElementById('zq12'))
						option = {
								title: {
									text: '西安福利待遇',
									x: 'center',
									textStyle: {
										fontSize: 23
									}
							
								},
								backgroundColor: '#069',
								tooltip: {
									show: true
								},
								toolbox: {
									feature: {
										saveAsImage: {
											iconStyle: {
												normal: {
													color: '#FFFFFF'
												}
											}
										}
									}
								},
								series: [{
									name: '待遇分析',
									type: 'wordCloud',
									size: ['9%', '99%'],
									sizeRange: [6, 66],
									//textRotation: [0, 45, 90, -45],
									rotationRange: [-45, 90],
									shape: 'circle',
									textPadding: 0,
									autoSize: {
										enable: true,
										minSize: 6
									},
									textStyle: {
										normal: {
											color: function() {
												return 'rgb(' + [
													Math.round(Math.random() * 160),
													Math.round(Math.random() * 160),
													Math.round(Math.random() * 160)
												].join(',') + ')';
											}
										},
										emphasis: {
											shadowBlur: 10,
											shadowColor: '#000'
										}
									},
									data: datas
								}]
							};
							myChart.setOption(option);
					}
			  })
		
	})
//当前页面字体旋转出现
$(document).ready(
	function()
	{	
		$("#zq004").animate({fontSize:'3em'},5000);
		$("#zq004").rotate({animateTo: 360,duration:5000});
		$("#zq005").animate({fontSize:'3em'},5000);
		$("#zq005").rotate({animateTo: 360,duration:5000});
		$("#zq006").animate({fontSize:'3em'},5000);
		$("#zq006").rotate({animateTo: 360,duration:5000});
		$("#zq007").animate({fontSize:'3em'},5000);
		$("#zq007").rotate({animateTo: 360,duration:5000});
	})

