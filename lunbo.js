function Lunbo(mylunbo){
	var count = mylunbo.number;
	var images = mylunbo.imgs;
	var boxs = mylunbo.boxName;
	var times = mylunbo.time;
	var contain = $(boxs);
	var box1 = '<div class="slide"><img src="'+images[count-1]+'" alt=""></div>';
	var box2 = '';
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

	var lunbohtml = ''
	    + '<div class="slider" id="slider">'
			+ box1
		+ '</div>'
		+ '<span id="left"><</span>'
		+ '<span id="right">></span>'
		+ '<ul class="nav" id="navs">'
		    + box2
		+ '</ul>';

	
	this.show = function(){		
		contain.html(lunbohtml);		
		var nav = $('#navs').children('li');
		var slider = $('#slider');		
		var left = $('#left');
		var right = $('#right');
		var index = 1;
		var timer;
		var move = false;

		slider.css('width',(count+2)*1200+'px');
		
		contain.mouseover(function () { 
			lunbo(left,{opacity:50})
			lunbo(right,{opacity:50})
			clearInterval(timer)
		});
		contain.mouseout(function () { 
			lunbo(left,{opacity:0})
			lunbo(right,{opacity:0})
			timer = setInterval(down, times);
		});
		right.click(function () { 
			down();
		});
		left.click(function(){
			up();
		});

		for( var i=0; i<nav.length; i++ ){
			nav[i].index = i;
			$(nav[i]).click(function () { 
				index = this.index+1;
				moved();
				lunbo(slider,{left:-1200*index});
			});
		}
		function down(){
			if(move){
				return;
			}
			move = true;
			index++;
			moved();
			lunbo(slider,{left:-1200*index},function(){
				if(index==count+1){ 			
					slider.css('left','-1200px');
					index = 1;
				}
				move = false;
			});
		}
		function up(){
			if(move){
				return;
			}
			move = true;
			index--;
			moved();
			lunbo(slider,{left:-1200*index},function(){
				if(index==0){
					slider.css('left',-1200*count + 'px'); 
					index = count; 
				}
				move = false;
			});
		}
		function moved(){
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
		timer = setInterval(down, times);
		function getStyle(obj, attr){
			return obj.css(attr);
		}
		function lunbo(obj,json,callback){
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
