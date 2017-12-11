var strcookie = getCookie("init");
console.log(strcookie)
if(strcookie==null||strcookie==''){
	var json = {};
}else {
	var json = JSON.parse(strcookie);
}
var carnum = 0 ;
for(var key in json){
	carnum++;
}
var hcar = document.querySelector('.car>span');
hcar.innerHTML = carnum;
var selectl = document.querySelectorAll('#selectl>ul>li');
var hoverblock = document.getElementById('hoverblock');
for(var i in selectl){
	hoverblock.onmouseover = selectl[i].onmouseover = function(){
		hoverblock.style.display = 'block';
	}
	hoverblock.onmouseout = selectl[i].onmouseout = function(){
		hoverblock.style.display = 'none';
	}
	
}
//轮播
var playimg = document.getElementById("playimg");
var ul =  playimg.querySelectorAll('ul')[0];
var firstLi = ul.firstElementChild.cloneNode(true);
ul.append(firstLi);
var imgs = playimg.querySelectorAll('img');
ul.style.width = imgs[0].offsetWidth*imgs.length+'px';
var curr = 0 ;
var timer = null;
function play(){
	if(curr==imgs.length){
		ul.style.left = 0 +'px';
		curr = 1 ;
	}
	move(ul,{"left":-imgs[0].offsetWidth*curr});
	curr++;
}
function autoPlay(){
	timer = setInterval(function(){
		play();
	},3000)
}
playimg.onmouseover = function(){
	clearInterval(timer);
}
playimg.onmouseout = function(){
	autoPlay();
}
autoPlay();
//商品列表
var tmimg = document.getElementById('tmimg');
var listimg = document.querySelectorAll('.listimg');
ajax("get","json/product.json","",function(data){
	var info ;
	for(var i = 0 ; i<data.length ; i++){
		for(var key in data[i]){
			if(key=='sale'){
				info = data[i].sale;
				break;
			}
		}
	}
	var context = document.createDocumentFragment();
	for(var i = 0 ; i<info.length ; i++){
		var img = document.createElement('img');
		img.src =info[i].listimg;
		img.setAttribute('date-id', info[i].id);
		context.append(img);
	}
	tmimg.append(context);

	//绿茶
	for(var i = 0 ; i<data.length ; i++){
		for(var key in data[i]){
			if(key=='greentea'){
				info = data[i].greentea;
				break;
			}
		}
	}
	var greenlist = listimg[0].querySelector("ul");
	for(var i = 0 ; i<5 ; i++){
		var str = '<li date-id='+info[i].id+'><img src='+info[i].listimg+'><div class="price"><p>'+info[i].title+'</p><span class="currp">'+info[i].activeprice+'</span><span class="prep">'+info[i].hechaprice+'</span></div></li>';
		greenlist.innerHTML += str;
	}

	//红茶
	for(var i = 0 ; i<data.length ; i++){
		for(var key in data[i]){
			if(key=='redtea'){
				info = data[i].redtea;
				break;
			}
		}
	}
	var redtealist = listimg[1].querySelector("ul");
	for(var i = 0 ; i<5 ; i++){
		var str = '<li date-id='+info[i].id+'><img src='+info[i].listimg+'><div class="price"><p>'+info[i].title+'</p><span class="currp">'+info[i].activeprice+'</span><span class="prep">'+info[i].hechaprice+'</span></div></li>';
		redtealist.innerHTML += str;
	}

	tmimg = document.getElementById('tmimg');
	tmimgs = tmimg.querySelectorAll('img');
	for(var i = 0 ; i<tmimgs.length ; i++){
		tmimgs[i].onclick = function(){
			location.href = 'html/detail.html?'+this.getAttribute('date-id');
		}
	}	

	for(var i = 0 ; i<listimg.length ; i++){
		listimg[i].onclick = function(e){
			var e = e||event;
			var target = e.target || e.srcElement;
			if(target.tagName=='IMG'||target.tagName=='DIV'||target.tagName=='P'){
				var id = target.parentNode.getAttribute('date-id');
				location.href = 'html/detail.html?'+id;
			}
		}
	}
	
})