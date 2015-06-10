(function($){
  $(function(){

    //$('.button-collapse').sideNav();
	//$('.scrollspy').scrollSpy();


	//$('.button-collapse').sideNav({menuWidth: 240, activationWidth: 70});
	//$('.parallax').parallax();

	var card  = document.querySelectorAll('.card-work');
  	var transEndEventNames = {
	      'WebkitTransition' : 'webkitTransitionEnd',
	      'MozTransition'    : 'transitionend',
	      'transition'       : 'transitionend'
	},
	transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

	function addDashes(name) {
		return name.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); });
	}

	function getPopup(id) {
		return document.querySelector('.popup[data-popup="' + id + '"]');
	}

	function getDimensions(el) {
	   return el.getBoundingClientRect();
	}

	function getDifference(card, popup) {
		var cardDimensions = getDimensions(card),
	    	popupDimensions = getDimensions(popup);

		return {
		  	height: popupDimensions.height / cardDimensions.height,
		  	width: popupDimensions.width / cardDimensions.width,
		  	left: popupDimensions.left - cardDimensions.left,
		  	top: popupDimensions.top - cardDimensions.top
		}
	}

	function transformCard(card, size) {
		return card.style[Modernizr.prefixed('transform')] = 'translate(' + size.left + 'px,' + size.top + 'px)' + ' scale(' + size.width + ',' + size.height + ')';
	}

	function hasClass(elem, cls) {
	    var str = " " + elem.className + " ";
	    var testCls = " " + cls + " ";
	    return(str.indexOf(testCls) != -1) ;
	}

	function closest(e) {
	   var el = e.target || e.srcElement;
	    if (el = el.parentNode) do { //its an inverse loop
	        var cls = el.className;
	        if (cls) {
	            cls = cls.split(" ");
	            if (-1 !== cls.indexOf("card-work")) {
	                return el;
	                break;
	            }
	        }
	    } while (el = el.parentNode);
	}

	
	function scaleCard(e) {
		var el = closest(e);
		var target = el,
		    id     = target.getAttribute('data-popup-id'),
		    popup  = getPopup(id);

		var size = getDifference(target, popup);

	   	target.style[Modernizr.prefixed('transitionDuration')] = '0.5s';
	   	target.style[Modernizr.prefixed('transitionTimingFunction')] = 'cubic-bezier(0.4, 0, 0.2, 1)';
	   	target.style[Modernizr.prefixed('transitionProperty')] = addDashes(Modernizr.prefixed('transform'));
	   	target.style['borderRadius'] = 0;
	   
	  	transformCard(target, size);
	  	onAnimated(target, popup);
	  	onPopupClick(target, popup);
	}

	function onAnimated(card, popup) {
	 	card.addEventListener(transEndEventName, function transitionEnded() {
	   		card.style['opacity'] = 0;
	   		popup.style['visibility'] = 'visible';
	   		popup.style['zIndex'] = 9999;
	   		card.removeEventListener(transEndEventName, transitionEnded);
	 	});
	}

	/*
	function onPopupClick(card, popup) {
		popup.addEventListener('click', function toggleVisibility(e) {
		  	var size = getDifference(popup, card);
		  
		  	card.style['opacity'] = 1;
		  	card.style['borderRadius'] = '6px';
		  	hidePopup(e);       
		  	transformCard(card, size);
		}, false);
	}


	function hidePopup(e) {
		e.target.style['visibility'] = 'hidden';
		e.target.style['zIndex'] = 2;
	}
	*/

	// [].forEach.call(card, function(card) {
	// 	card.addEventListener('click', scaleCard, false);
	// });

	}); // end of document ready
})(jQuery); // end of jQuery name space