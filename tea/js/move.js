function move(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;
		for(var attr in json){
			if(attr=='opacity'){
				var value = parseInt(parseFloat(getStyle(obj,attr)*100));
			}else{
				var value = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr]-value)/10;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			if(attr=='opacity'){
				obj.style.opacity = (speed+value)/100;
				obj.style.filter = 'alpha(opacity='+(speed+value)+')';
			}
			else{
				obj.style[attr] = speed+value+'px';
			}
			if(value!=json[attr]){
				flag = false;
			}
		}
		if(flag){
			clearInterval(obj.timer);
		}

	},30);
}
function getStyle(obj,attr){
	if(obj.currentStyle)
		return obj.currentStyle[attr];
	else
		return getComputedStyle(obj,false)[attr];
}