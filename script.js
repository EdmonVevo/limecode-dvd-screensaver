
$(document).ready(function(){ 

	var square = $('.square');
	var element = $('.square').position();
	var documentWidth = $(document).width();
	var documentHeight = $(document).height();

	var squareWidth = square.width();
	var squareHeight = square.height();

	var squareInBottom = documentHeight- squareHeight;
	var squareInRight = documentWidth- squareWidth;
	var corner_hits = 0;
	var wall_hits = 0;
	var top_wall_hits = 0;
	var bottom_wall_hits = 0;
	var left_wall_hits = 0;
	var right_wall_hits = 0;
	var isCornerHit = false;
	var cornerRadius = 10;
	var speed = 2;

	function showFireWork() {
		$('.pyro').css({
			display:'block'
		})
		setTimeout(function(){
			$('.pyro').css({
				display:'none'
			})
		},2000);
	}

	function playHitSound(){
		var audio = new Audio('./wall_hit.mp3');
		audio.play();
	};

	function playCornerHitSound(){
		var audio = new Audio('./tada.mp3');
		audio.play();
	};

	function changeColor(){
		var r = Math.round(Math.random()*255);
		var g = Math.round(Math.random()*255);
		var b = Math.round(Math.random()*255);

		square.css({
			background:"rgb(" + r + "," + g + ","+ b + ")"
		})
	}

	function bottomLeft(){
		playHitSound()
		changeColor();
		console.log('bottomLeft');
		$('.wall_hits').text(++wall_hits);
		var topRightInterval = setInterval(function(){
			const top = parseInt($('.square').css('top'));
			const left = parseInt($('.square').css('left'));
	      	
	      	if(top >= (squareInBottom-cornerRadius) && left <= cornerRadius) {      
	      		console.log(isCornerHit,'bottomLeft corner_hits');
	      		if(!isCornerHit) { 
	      			$('.corner_hits').text(++corner_hits);
	      			showFireWork();
		      		playCornerHitSound();
		      		isCornerHit = true; 
	      		}		
	      	}
	        if(top === squareInBottom) {
	        	topRight();
	        	$('.bottom_wall_hits').text(++bottom_wall_hits);
				clearInterval(topRightInterval);
				return;
			} else if(left === 0) {		
	        	rightBottom();
	        	$('.left_wall_hits').text(++left_wall_hits);
				clearInterval(topRightInterval);
				return;
			} else {
				$('.square').css({
					top:top+1+'px',
					left:left-1+'px'
				});
			}
		},speed);
	}

	function topRight(){
		playHitSound()
		changeColor();
		$('.wall_hits').text(++wall_hits);
		console.log('topRight');
		var topRightInterval = setInterval(function(){
			const top = parseInt($('.square').css('top'));
			const left = parseInt($('.square').css('left'));
	      	
	      	if(top <=cornerRadius && left <=cornerRadius) {    
	      		console.log(isCornerHit,'topRight corner_hits');
	      		if(!isCornerHit) {
	  				$('.corner_hits').text(++corner_hits);
	  				showFireWork();
		      		playCornerHitSound();
		      		isCornerHit = true;       		
	      		}
	      	}

	        if(top === 0) {
	        	bottomLeft();
        		$('.top_wall_hits').text(++top_wall_hits);
				clearInterval(topRightInterval);
				return;
			} else if(left === 0 ) {
				topLeft();
				$('.left_wall_hits').text(++left_wall_hits);
				clearInterval(topRightInterval);
				return;
			} else {
				$('.square').css({
					top:top-1+'px',
					left:left-1+'px'
				});
			}

			
			
		},speed);
	}

	function rightBottom(){
		playHitSound()
		changeColor();
		$('.wall_hits').text(++wall_hits);
		console.log('rightBottom');
		var rightBottomInterval = setInterval(function(){
			const top = parseInt($('.square').css('top'));
			const left = parseInt($('.square').css('left'));


			if(top >= squareInBottom-cornerRadius && left >= squareInRight-cornerRadius) {	
				console.log(isCornerHit,'rightBottom corner_hits');
      			if(!isCornerHit) {
		      		$('.corner_hits').text(++corner_hits);
		      		showFireWork();
		      		playCornerHitSound();
		      		isCornerHit = true; 
		      		
	   		   	}
	      	}

			if(top === squareInBottom ) {
				topLeft();
				$('.bottom_wall_hits').text(++bottom_wall_hits);
				clearInterval(rightBottomInterval);
				return;
			} else if(left === squareInRight ) {
				bottomLeft();
				$('.right_wall_hits').text(++right_wall_hits);
				clearInterval(rightBottomInterval);
				return;
			} else {
				$('.square').css({
					top:top+1+'px',
					left:left+1+'px'
				});				
			}
		},speed);	
	}


	function topLeft(){

		playHitSound()
		changeColor();
		$('.wall_hits').text(++wall_hits);
		console.log('topLeft');
		var topLeftInterval = setInterval(function(){
			const top = parseInt($('.square').css('top'));
			const left = parseInt($('.square').css('left'));

			if(top > cornerRadius && left < squareInRight-cornerRadius ) { 
				isCornerHit = false;
			}
			if(top <= cornerRadius && left >= squareInRight-cornerRadius ) {
				if(!isCornerHit) {
					$('.corner_hits').text(++corner_hits);
					showFireWork();
	      			playCornerHitSound();
	      			isCornerHit = true; 
				}					
	      	}
	        if(left === squareInRight) {	
	        	$('.right_wall_hits').text(++right_wall_hits);
	        	topRight();
				clearInterval(topLeftInterval);
				return;
			}
			else if(top === 0) {
				rightBottom();
				$('.top_wall_hits').text(++top_wall_hits);
				clearInterval(topLeftInterval);
				return;
			} else {
				$('.square').css({
					top:top-1+'px',
					left:left+1+'px'
				});
		
			}			
		},speed);
		
	}

	var startLoop = setInterval(function(){

		const top = parseInt($('.square').css('top'));
		const left = parseInt($('.square').css('left'));
		if(top === squareInBottom){
			topLeft();
			clearInterval(startLoop);
		}	
		else {
			$('.left_wall_hits').text(++left_wall_hits);
			rightBottom();	
			clearInterval(startLoop);
		}
	},speed);
});





