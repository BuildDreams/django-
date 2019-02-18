// JavaScript Document

//"D:/imooc/myblog/blog/static/img/01-1.jpg",
//"D:/imooc/myblog/blog/static/img/01-2.jpg"
//"D:/imooc/myblog/blog/static/img/01-3.jpg"
//"D:/imooc/myblog/blog/static/img/01-4.jpg"
window.test
function Change(url)
	{
		var img = document.getElementById("zqimg02");
		img.src=url
		img.style = "width:100%;height:100%"
		
	}

var img_url =new Array("/static/img/01-1.jpg",
					"/static/img/01-2.jpg",
					"/static/img/01-3.jpg",
					"/static/img/01-4.jpg")//图片路径的存放位置
					
	Change(img_url[0])//初始图片	
	
	var time = {
				i:0,
				}//封装一个全局对象
				
				
				
	//定时实现轮播图效果			
	setInterval(function()
	{
			
		Change(img_url[time.i]);
		time.i++;
		if(time.i == 4)
			{
				time.i=0
			}
		
	},1800)			
//判断用户输入的用户名是否符合规则
$(document).ready(function()
	{
		$("#zqi01").blur(function()
				{
					var usename = $("#zqi01").val();
					var reg =  /^[a-zA-Z]+[a-zA-Z0-9]+\w+/;//判断输入的用户名是否合理
					if(reg.test(usename))
					{ 
						 $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}' },});
						 $.ajax({
									type: 'POST',
									url: '/blog/tijiao/', //路由加'/'否则会报ssh错误
									data: {
											'usename': usename,
										  },    
									dataType: 'JSON',
									success: function(data)
									{
										//$('#isok').text(data.result);
										res = data.result;
										tellname(res);
										//console.log("------")
										//isokpassword(res);
										window.test = res;
										isorok()
									},
					           })
					}
					else
					{
						$("#isok").css("color","green");
						$("#isok").text("请输入以字母开头的用户名");
					}
			});
	}
)
//告诉用户用户名是否可用
function tellname(resu)
			{
				if (resu == 1)
				{
					$("#isok").css("color","green");
					$("#isok").text("×该用户已存在");
				}
				else
				{
					$("#isok").css("color","green");
					$("#isok").text("√");
				}
			}





	
//判断用户输入的两次密码是否一致
function isorok()
{ 	console.log(window.test)
	if (window.test == 0)
	{
		$("#zqi03").mouseenter(function()
			{	
			
				var j = $("#zqi02").val();
				var k = $("#zqi04").val();
				if(j == k && j != "" )
				{
					$("#formurl").attr("action","/blog/ok/");
					
				}
				else
				{
					
					$("#formurl").attr("action","");
					alert("密码不一致，请重新输入");
				}
			})
	}
}
//ajax判断用户名是否存在



