$('document').ready(function(){
	var container = $( "body" )
	var lastHex = "#FFFFFF"

	container.click(function(){
		$('.hex-code:first').before($('<div class="hex-code">' + lastHex + '</div>').addClass('hex-code'));
	});
	
	container.mousemove(function( event ) {
		var x = event.pageX - container.offset().left
		var y = event.pageY - container.offset().top

		var containerWidth = $(container).width();
		var containerHeight = $(container).height();

		var relX = x/containerWidth;
		var relY = y/containerHeight;

		h = Math.floor(relX * 359); // 0 <= h < 360
		s = $('#saturation').val()/100; // 0 <= s <= 1
		l = relY; // 0 <= l <= 1

		rgb = hslToRGB(h,s,l);

		r = rgb[0];
		g = rgb[1];
		b = rgb[2];

		$('body, .hex-code:first').css('background-color', 'rgb(' + r + ',' + g + ',' + b + ')');

		lastFontColor = 'white';
		fontColor = relY >= 0.5 ? 'black' : 'white';
		$('.hex-code:first').css('color', fontColor);

		lastHex = rgbToHex(r,g,b).toUpperCase();

		$('.hex-code:first').html(lastHex);

	});
});

function hslToRGB(h,s,l){
	c = (1 - Math.abs(2*l - 1)) * s;
	x = c * (1 - Math.abs(h / 60 % 2 - 1));
	m = l - c/2;

	var rgb;

	if(h < 60 && h >= 0){
		//cx0
		rgb = [c,x,0];
	} else if (h < 120 && h >= 60){
		//xc0
		rgb = [x,c,0];
	} else if (h < 180 && h >= 120){
		//0cx
		rgb = [0,c,x];
	} else if (h < 240 && h >= 180){
		//0xc
		rgb = [0,x,c];
	} else if (h < 300 && h >= 240){
		//x0c
		rgb = [x,0,c];
	} else {
		//c0x
		rgb = [c,0,x];
	}

	rgb[0] = Math.ceil((rgb[0] + m) * 255); 
	rgb[1] = Math.ceil((rgb[1] + m) * 255);
	rgb[2] = Math.ceil((rgb[2] + m) * 255);

	return rgb;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}