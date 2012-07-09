/*
 *  metro.js - Win8 Metro UI onclick effect [v1.2]
 *  Distributed under the Do-wathever-the-hell-you-want-with-it License
 *
 *  Web site:   http://claudiobonifazi.com
 *  Blog:       http://claudiobonifazi.com?p=4
 *  Email:      claudio.bonifazi@gmail.com
 *  Twitter:    @ClaudioBonifazi
 */

(function($){
	$.fn.metro = function( draggable ){

		var allEl = $(this);
		if( allEl.filter('.sidebar').length > 0 ){
			$('body').append('<div id="metroSidebar"></div>')
			$(window).resize(function(){
				//console.log( $(document).width()/$(window).width() )
				//console.log( $(document).height()/$(window).height() )
				$('#metroSidebar')
					.css({'left':$(document).width()})
					.css({'background':'white'})
					 .width( $(window).width()*0.735-parseInt($('#metroSidebar').css('padding-left'))-parseInt($('#metroSidebar').css('padding-right')) )
					.height( $(document).height()-parseInt($('#metroSidebar').css('padding-top'))-parseInt($('#metroSidebar').css('padding-bottom')) )
			}).resize()
			allEl.filter('.sidebar').click(function(){ return false })
		}

		return allEl.each(function(i,e){
			
			var el = $(this),
				duration = 100;
			/* foundamental animation data */
			el.data('metro',{
						clicking:   false,
						origin:     0,
						ang:        10,
						orizorvert: 0
					})
			el.data('drag',{
						possible: draggable==undefined ? false : draggable,
						left:       0,
						top:        0,
						happening:  false,
						afterWhich: 0
					})

				
			/* for a better antialiasing */
			if(el.css('box-shadow')=='none')
				el.css({'box-shadow':'0 0 1px transparent'})
			el.parent().css({'-webkit-perspective':el.outerWidth()*5})

			el.mousedown(function(e){
				var mouse = {
						x:e.pageX-el.offset().left,
						y:e.pageY-el.offset().top
					},
					metro=$(this).data('metro');
					metro.clicking=true;

				if( mouse.x < el.outerWidth()/3 ){
					metro.orizorvert = 1;
					metro.origin = 100;
					metro.ang = -metro.ang;
					/* left */

				}else if(mouse.x > parseInt(el.outerWidth()*2/3)){
					metro.orizorvert = 1;
					/* right */

				}else{
					if(mouse.y < el.outerHeight()/3){
						metro.orizorvert = 2;
						metro.origin = 100;
						/* top */

					}else if(mouse.y > parseInt(el.outerHeight()*2/3)){
						metro.orizorvert = 2;
						metro.ang = -metro.ang;
						/* bottom */

					}
				}
				el.data('metro',metro)

				if( el.data('drag').possible ){
					e.preventDefault()

					el.data('drag').left = e.pageX;
					el.data('drag').top = e.pageY;
					el.data('drag').afterWhich = allEl.index(el);

					if( el.css('position')=='static')
						el.css({ 'position':'relative' })
				}
				
				if( metro.orizorvert > 0 && $.browser.webkit){
					el
						.css({'-webkit-transform-origin':(metro.orizorvert==1 ? metro.origin+'% 0%' : '0% '+metro.origin+'%')})
						.animate({'text-indent':el.css('text-indent')},{duration:duration, step: function(now,fx){
							/* anim = rotateX(number) or rotateY(number) */
							anim = 'rotate'+ (metro.orizorvert==1 ? 'Y':'X')+ '('+( metro.ang*Math.sin((fx.pos*Math.PI/2)) )+'deg)'
							el.css({'-webkit-transform' : anim })
						},queue:false})
						.delay(duration)
				}else if( metro.orizorvert==0 || !$.browser.webkit ){
					el
						.css({'-webkit-transform-origin':''})
						.animate({'text-indent':el.css('text-indent')},{duration:duration, step: function(now,fx){
							/* anim = scale(number) */
							anim = 'scale('+(1- Math.sin(fx.pos*Math.PI/2)/10)+')'
							el.css({
									'-webkit-transform' : anim,
									'-moz-transform'	: anim,
									'-o-transform'		: anim
								})
						},queue:false})
						.delay(duration)
				}
				if( el.data('drag').possible ){
					el.css({ 'cursor':'move' })
				}

			}).mouseup(function(e){
				var a = el.data('metro');

				if( a.clicking==true ){
					if( a.orizorvert > 0 && $.browser.webkit){
						el
							.css({ '-webkit-transform-origin' : (a.orizorvert==1 ? a.origin+'% 0%' : '0% '+a.origin+'%') })
							.animate({'text-indent':el.css('text-indent')},{duration:duration, step: function(now,fx){
								/* anim = rotateX(number) or rotateY(number) */
								anim = 'rotate'+(a.orizorvert==1 ? 'Y':'X')+'('+a.ang*Math.cos((fx.pos*Math.PI/2))+'deg)';
								el.css({'-webkit-transform' : anim })
							},queue:false})
							.delay(duration)
					}else if( a.orizorvert==0 || !$.browser.webkit){
						el
							.animate({'text-indent': el.css('text-indent')},{duration:duration, step: function(now,fx){
								/* anim = scale(number) */
								anim = 'scale('+(1- Math.cos(fx.pos*Math.PI/2)/10)+')';
								el.css({
										'-webkit-transform' : anim,
										'-moz-transform'	: anim,
										'-o-transform'		: anim
									})
							},queue:false})
							.delay(duration)
					}
					el.data('metro',{
								clicking:   false,
								origin:     0,
								ang:        10,
								orizorvert: 0
							})

					if( el.hasClass('sidebar') && !el.data('drag').happening ){
						if( allEl.index(el) == $('#metroSidebar').data('whoOpenedIt') )
							$('#metroSidebar').animate({'left':$(document).width()},'fast').empty().removeData('whoOpenedIt')
						else{
							//$('#metroSidebar').load('http://localhost:81/streetlight/index.php/auth/login').animate({'left':$(window).width()-$('#metroSidebar').outerWidth()},'fast').data('whoOpenedIt',allEl.index(el)).append('<a>Close</a>');
							$('#metroSidebar').load(el.attr('href')).animate({'left':$(window).width()-$('#metroSidebar').outerWidth()},'fast').data('whoOpenedIt',allEl.index(el))
						}
					}
					
					if( el.data('drag').possible ){
						e.preventDefault();
						el.css({ 'cursor':'auto','z-index':0})
						if( el.data('drag').happening ){
							el
								.css({ 'z-index':0}).fadeTo(duration,1)
								.animate({left:0,top:0},Math.min(2*duration,200))
						}
						el.data( 'drag',{ possible:true, left: e.pageX, top: e.pageY, happening:false } )
					}

				}

			}).mouseout(function(){
				if( el.data('metro').clicking ){
					if( el.data('drag').possible )
						el.parent().mousemove(e)
					else
						el.mouseup()
				}

			})

			$('body>*').not('#metroSidebar').click(function(){
				if( allEl.filter('.sidebar').length>0 ){
					$('#metroSidebar').animate({'left':$(document).width()},'fast').empty().removeData('whoOpenedIt')
				}
			})

			if( el.data('drag').possible ){
				el.parent()
				.mousemove(function(e){
					if( el.data('metro').clicking && el.data('drag').possible ){
						el.data('drag').happening = true;
						if(el.css('opacity')==1)
							el.fadeTo(duration,0.9)
						el.css({ 'z-index':9999,left: e.pageX-el.data('drag').left, top: -el.data('drag').top+e.pageY })

						e.preventDefault()
					}
				})

			}
		})
	}
})(jQuery)