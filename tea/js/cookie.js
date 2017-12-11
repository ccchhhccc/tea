function setCookie(key,value,day){
	var date = new Date();
	date.setDate(date.getDate()+day);
	document.cookie = key+'='+value+';path=/;expires='+date;
}
function getCookie(key){
	var str = document.cookie;
	var cookies = str.split('; ');
	for(var i in cookies){
		var cookie = cookies[i].split('=');
		if(cookie[0]==key){
			return cookie[1];
		}
	}
	return null;
}
