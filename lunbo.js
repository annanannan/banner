function Lunbo(mylunbo){
	var count = mylunbo.number;
	var images = mylunbo.imgs;
	var boxs = mylunbo.boxName;
	var times = mylunbo.time;
	var box = $(boxs);
	var box1 = '<div class="slide"><img src="'+images[count-1]+'" alt=""></div>';
	var box2 = '';
	
	var lunbohtml = ''
	    + '<div class="slider" id="slider">'
			+ box1
		+ '</div>'
		+ '<span id="left"><</span>'
		+ '<span id="right">></span>'
		+ '<ul class="nav" id="navs">'
		    + box2
		+ '</ul>';

	for(var i=0;i<count;i++){
		var j=i;
		box1 += '<div class="slide"><img src="'+images[i]+'" alt=""></div>';
		if(i===0){
			j++;
			box2 += '<li class="active">'+j+'</li>'
		}else{
			j++;
			box2 += '<li>'+j+'</li>';
		}
	}
	box1 += '<div class="slide"><img src="'+images[0]+'" alt=""></div>';
	
	this.show = function(){		
		box.html(lunbohtml);
		
		var nav = $('#navs').children('li');
		var slider = $('#slider');		
		var left = $('#left');
		var right = $('#right');
		var index = 1;
		var timer;
		var isMoving = false;

		slider.css('width',(count+2)*1200+'px');
		//鼠标移入移出
		box.mouseover(function () { 
			animate(left,{opacity:50})
			animate(right,{opacity:50})
			clearInterval(timer)
		});
		box.mouseout(function () { 
			animate(left,{opacity:0})
			animate(right,{opacity:0})
			timer = setInterval(next, times);
		});
		right.click(function () { 
			next();
		});
		left.click(function(){
			prev();
		});

		for( var i=0; i<nav.length; i++ ){
			nav[i].index = i;
			$(nav[i]).click(function () { 
				index = this.index+1;
				navmove();
				animate(slider,{left:-1200*index});
			});
		}
		function next(){
			if(isMoving){
				return;
			}
			isMoving = true;
			index++;
			navmove();
			animate(slider,{left:-1200*index},function(){
				if(index==count+1){ 			
					slider.css('left','-1200px');
					index = 1;
				}
				isMoving = false;
			});
		}
		function prev(){
			if(isMoving){
				return;
			}
			isMoving = true;
			index--;
			navmove();
			animate(slider,{left:-1200*index},function(){
				if(index==0){
					slider.css('left',-1200*count + 'px'); 
					index = count; 
				}
				isMoving = false;
			});
		}
		function navmove(){
			for( var i=0; i<nav.length; i++ ){
				$(nav[i]).removeClass("active");
			}
			if(index > count ){ 
				$(nav[0]).addClass("active");
			}else if(index<=0){
				$(nav[count-1]).addClass("active"); 
			}else {
				$(nav[index-1]).addClass("active");
			}
		}
		timer = setInterval(next, times);
		function getStyle(obj, attr){
			return obj.css(attr);
		}
		function animate(obj,json,callback){
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				var isStop = true;
				for(var attr in json){
					var now = 0;
					if(attr == 'opacity'){
						now = parseInt(getStyle(obj,attr)*100);
			        }else{
						now = parseInt(getStyle(obj,attr));
					}
					var speed = (json[attr] - now) / 8;
					speed = speed>0?Math.ceil(speed):Math.floor(speed);
					var cur = now + speed;
					if(attr == 'opacity'){
						obj.css(attr,cur / 100);
			        }else{
						obj.css(attr,cur + 'px');
					}
					if(json[attr] !== cur){
						isStop = false;
					}
				}
				if(isStop){
					clearInterval(obj.timer);
					callback&&callback();
				}
			}, 30)
		}
	}

}
