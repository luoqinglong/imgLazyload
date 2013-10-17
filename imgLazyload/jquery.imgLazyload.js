/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://github.com/luoqinglong/imgLazyload
 *
 * Version:  1.2.2
 * author : luoqinglong@gmail.com
 */

(function($,window, document){
	var $window = $(window);
	$.fn.lazyload = function(options){
		//default options 
		var settings = {
				load            : null,			//fire after img has loaded
				data_attribute  : "original",	// img url
				scrollBottom	: 0				//loading img  with url in view container 
				
		};
		
		function update(){
			var viewHeight = $window.height();
			var winScrTop = $window.scrollTop();
			var imgObjs = $("img["+settings.data_attribute+"]");
			
			$("img["+settings.data_attribute+"]").each(function(){
				var currentImg = this;
		        var $currentImg = $(currentImg);
		        var _top = $currentImg.offset().top;
				var pageY = _top - winScrTop;
				if(parseInt(pageY) <= (parseInt(viewHeight) + settings.scrollBottom)){
					$currentImg.attr("src",'');//fix img load
					if (settings.load) {
						$currentImg.bind("load", function() {
                            settings.load.call(currentImg);
	                	});
					}
					$currentImg.attr("src",$currentImg.attr(settings.data_attribute));
					$currentImg.removeAttr(settings.data_attribute)
				}
				
			});
		}
		
		
		if(options) {
			$.extend(settings, options);
		}
		//bind event
		window.onscroll = update;
		window.onresize = update;
 
		//fire lazyload
		$(window).load(function() {
	            update();
	    });
	    return this;
	}
	
})(jQuery, window, document);