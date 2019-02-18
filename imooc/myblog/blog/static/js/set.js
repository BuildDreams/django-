// JavaScript Document

var str = '种</br>一</br>棵</br>树</br>最</br>好</br>的</br>时</br>间</br>是</br>十</br>年</br>前</br>，</br>其</br>次</br>就</br>是</br>现</br>在</br>。'
var str1 = '冰</br>冻</br>三</br>尺</br>绝</br>非</br>一</br>日</br>之</br>寒</br>.</br>.</br>.</br>.</br>.'
var str2 = '每</br>天</br>进</br>步</br>一</br>点</br>点</br>，</br>十</br>年</br>就</br>是</br>不</br>一</br>样</br>的</br>自</br>己</br>。</br>'
var i = 0;
var k = 0;
var j = 0;
   function typing(){
    var div1 = document.getElementById('set0');
	var div2 = document.getElementById('set1');
	var div3 = document.getElementById('set2');
    if (i <= str.length) {
		
     div1.innerHTML = str.slice(0,i++)+"_";
     
    }
    else{
		 div1.innerHTML = str;
		 
		 if (k <= str1.length)
			 {
				 div2.innerHTML = str1.slice(0,k++)+"_";
				 
			 }
		 else
			 {
				 div2.innerHTML = str1;
				 if (j <= str2.length)
				 	{
						div3.innerHTML = str2.slice(0,j++)+"_";
					}
				 else
					 {
						 div3.innerHTML= str2
					 }
			 }
	   }
	time = setTimeout('typing()',18)
	
   }
   typing();
   document.getElementById("zq9").onblur= function()
   {
	   document.getElementById("usename").innerHTML = "√";

	}