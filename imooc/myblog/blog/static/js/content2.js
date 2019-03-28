// JavaScript Document
$(document).ready(
	function()
	{
		var need_2 = $("#zq02").val();
		$.ajax({
				type: 'GET',
					url: '/blog/map/' ,//获取数据的路由
					data: {
							'need_2': need_2,
						  },
					dataType: 'JSON',
					success: function (datas)
					{
						var res9=datas.data9;
						//console.log(res9[0].data)
						var myChart = echarts.init(document.getElementById('zq13'));
						 var data = [{
									 "time": "2018/9",
									 "data": datas.data9[0].data},
									 {"time": "2018/10",
									 "data": datas.data10[0].data},
									 {"time": "2018/11",
									 "data": datas.data11[0].data,
						 			}]
							
								 var option = {
									 backgroundColor: '#000',
									 baseOption: {
										 animationDurationUpdate: 1000,
										 animationEasingUpdate: 'quinticInOut',
										 timeline: {
											 axisType: 'category',
											 orient: 'vertical',
											 autoPlay: true,
											 inverse: true,
											 playInterval: 5000,
											 left: null,
											 right: 5,
											 top: 20,
											 bottom: 20,
											 width: 46,
											 height: null,
											 label: {
												 normal: {
													 textStyle: {
														 color: '#ddd'
													 }
												 },
												 emphasis: {
													 textStyle: {
														 color: '#fff'
													 }
												 }
											 },
											 symbol: 'none',
											 lineStyle: {
												 color: '#000'
											 },
											 checkpointStyle: {
												 color: '#bbb',
												 borderColor: '#777',
												 borderWidth: 1
											 },
											 controlStyle: {
												 showNextBtn: false,
												 showPrevBtn: false,
												 normal: {
													 color: '#666',
													 borderColor: '#666'
												 },
												 emphasis: {
													 color: '#aaa',
													 borderColor: '#aaa'
												 }
											 },
											 data: data.map(function(ele) {
												 return ele.time
											 })
										 },
										 backgroundColor: '#25499F',
										 title: {
											 text: '9-11月份中国发布工作岗位前10省份情况',
											 subtext: '工作岗位数量:个',
											 left: 'center',
											 top: 'top',
											 textStyle: {
												 fontSize: 25,
												 color: 'rgba(255,255,255, 0.9)'
											 }
										 },
										 tooltip: {
											 formatter: function(params) {
												 if ('value' in params.data) {
													 console.log(params.data)
													 return params.data.value[2] + ': ' + params.data.value[0];
												 }
											 }
										 },
										 grid: {
											 left: 10,
											 right: '45%',
											 top: '70%',
											 bottom: 5
										 },
										 xAxis: {},
										 yAxis: {},
										 series: [{
											 id: 'map',
											 type: 'map',
											 mapType: 'china',
											 top: '10%',
											 //bottom: '25%',
											 //left: '5%',
											 //right: '10%',
											 itemStyle: {
												 normal: {
													 areaColor: '#323c48',
													 borderColor: '#404a59'
												 },
												 emphasis: {
													 label: {
														 show: true
													 },
													 areaColor: 'rgba(255,255,255, 0.5)'
												 }
											 },
											 data: []
										 }, {
											 id: 'bar',
											 type: 'bar',
											 tooltip: {
												 show: false
											 },
											 label: {
												 normal: {
													 show: true,
													 position: 'right',
													 textStyle: {
														 color: '#ddd'
													 }
												 }
											 },
											 data: []
										 }, {
											 id: 'pie',
											 type: 'pie',
											 radius: ['12%', '20%'],
											 center: ['75%', '85%'],
											 //roseType: 'area',
											 tooltip: {
												 formatter: '{b} {d}%'
											 },
											 data: [],
											 label: {
												 normal: {
													 textStyle: {
														 color: '#ddd'
													 }
												 }
											 },
											 labelLine: {
												 normal: {
													 lineStyle: {
														 color: '#ddd'
													 }
												 }
											 },
											 itemStyle: {
												 normal: {
													 borderColor: 'rgba(0,0,0,0.3)',
								
													 borderSize: 1
												 }
											 }
										 }]
									 },
									 options: []
								 }
									//console.log(data[i].data[9].value[0])
								 for (var i = 0; i < data.length; i++) {
									 
									 var restPercent = 100;
									 var restValue = 0;
									 data[i].data.forEach(function(ele) {
										restPercent = restPercent - ele.value[1];
									 });
									 restValue = data[i].data[0].value[0] * (restPercent / data[i].data[0].value[1]);
									 console.log(data[i].data[9])
									 //console.log(restPercent);
									 //console.log(restValue);
									 option.options.push({
										 visualMap: [{
											 calculable: true,
											 dimension: 0,
											 left: 10,
											 top: 'center',
											 itemWidth: 12,
											 min: data[i].data[9].value[0],
											 max: data[i].data[0].value[0],
											 text: ['High', 'Low'],
											 textStyle: {
												 color: '#ddd'
											 },
											 inRange: {
											 color: ['lightskyblue', 'yellow', 'orangered']
											 }
										 }],
										 xAxis: {
											 type: 'value',
											 boundaryGap: [0, 0.1],
											 axisLabel: {
												 show: false,
											 },
											 splitLine: {
												 show: false
											 }
										 },
										 yAxis: {
											 type: 'category',
											 axisLabel: {
												 show: false,
												 textStyle: {
													 color: '#ddd'
												 }
											 },
								
											 data: data[i].data.map(function(ele) {
												 return ele.value[2]
											 }).reverse()
										 },
										 series: [{
											 id: 'map',
											 data: data[i].data
										 }, {
											 id: 'bar',
											 label: {
												 normal: {
													 position: 'right',
													 formatter: '{b} : {c}'
												 }
											 },
											 data: data[i].data.map(function(ele) {
												 return ele.value[0]
											 }).sort(function(a, b) {
												 return a > b
											 })
										 }, {
											 id: 'pie',
											 data: data[i].data.map(function(ele) {
												 return {
													 name: ele.value[2],
													 value: ele.value
												 }
											 }).concat({
												 name: '其他省份',
												 value: restValue
											 }),
										 }]
										 
									 })
									 myChart.setOption(option)
								 }
						
					}
			  })
	})
