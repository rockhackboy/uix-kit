

/* 
 *************************************
 * <!-- Text effect -->
 *************************************
 */
/*
Usage:

<h3 data-text-eff="letters-eff-flyInOut1" data-text-eff-speed="800">Text Text</h3>
<h3 data-text-eff="letters-eff-flyInOut2" data-text-eff-speed="800">Text Text</h3>
<h3 data-text-eff="letters-eff-flyInOut3" data-text-eff-speed="800">Text Text</h3>

*/

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.TEXT_EFFECT               = APP.TEXT_EFFECT || {};
	APP.TEXT_EFFECT.version       = '0.0.3';
    APP.TEXT_EFFECT.pageLoaded    = function() {

		//Default Effect
		//-------------------------------------	
		$( '[data-text-eff]' ).each( function( index )  {
			$( document ).customTextEffInit( { selectors: '[data-text-eff="'+$( this ).data( 'text-eff' )+'"]' } );
		});   
		
    };

    APP.components.pageLoaded.push( APP.TEXT_EFFECT.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );




/*
 * Text Effect
 *
 * @param  {string} selectors                - Text wrapper ID or class name.
 * @return {void}                            - The constructor.
 */
( function ( $ ) {
    $.fn.customTextEffInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			selectors    : '.letters-eff-fadeInRight'
        }, options );
 
        this.each( function() {
			
			var $this                = $( this ),
				customControls       = settings.selectors,
				speed                = $( customControls ).data( 'text-eff-speed' ),
				txtEff;

			
				if( typeof speed === typeof undefined ) {
					speed = 1200;
				}	
			
		
				$( customControls ).html( $( customControls ).text().replace(/([^\x00-\x80]|\w)/g, "<span class='uix-letter'>$&</span>") );
			
			
			    //--------------
				if( customControls.indexOf( 'fadeInRight' ) >= 0 ) {
					txtEff = anime.timeline({loop: false})
						  .add({
							targets: customControls + ' .uix-letter',
							translateX: [40,0],
							translateZ: 0,
							opacity: [0,1],
							easing: "easeOutExpo",
							duration: speed,
							delay: function(el, i) {
							  return 500 + 30 * i;
							}
						  });

				}
			
			    //--------------
				if( customControls.indexOf( 'zoomInDown' ) >= 0 ) {
					txtEff = anime.timeline({loop: false})
						  .add({
						    targets: customControls + ' .uix-letter',
							scale: [0, 1],
							duration: speed,
							elasticity: 600,
							delay: function(el, i) {
							  return 45 * (i+1);
							}
						  });

				}	
			
			    //--------------
				if( customControls.indexOf( 'flyInOut' ) >= 0 ) {
					txtEff = anime.timeline({loop: false})
					        .add({
							targets: customControls + ' .uix-letter',
							translateX: [40,0],
							translateZ: 0,
							opacity: [0,1],
							easing: "easeOutExpo",
							duration: speed,
							delay: function(el, i) {
							  return 500 + 30 * i;
							}
						  });
					
				}	
					
			



			
		});
 
    };
 
}( jQuery ));
