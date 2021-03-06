
/* 
 *************************************
 * <!-- Timeline -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.TIMELINE               = APP.TIMELINE || {};
	APP.TIMELINE.version       = '0.1.5';
    APP.TIMELINE.pageLoaded    = function() {

		var $window          = $( window ),
			windowWidth      = $window.width(),
			windowHeight     = $window.height();
				
				

		/*! 
		 ---------------------------
         Horizontal Timeline
		 ---------------------------
		 */
		if ( windowWidth > 768 ) {
			$( '.uix-timeline__container-wrapper.is-horizontal' ).each( function()  {

				var $this          = $( this ),
					$container     = $this.find( '.uix-timeline__container.is-horizontal' ),
					$timeline      = $container.find( '> .uix-timeline' ),
					dateShowEle    = $timeline.data( 'show-ele' );

				if ( typeof dateShowEle === typeof undefined ) {
					dateShowEle = '#timeline-number-show';
				}	
		
			

				$this.find( '.uix-timeline__btn--prev' ).on( 'click', function( e ) {
					e.preventDefault();
					timelineUpdate( $this, false, dateShowEle, true );
					return false;
				});

				$this.find( '.uix-timeline__btn--next' ).on( 'click', function( e ) {
					e.preventDefault();
					timelineUpdate( $this, false, dateShowEle, false );
					return false;
				});

				$this.find( '.uix-timeline__item .uix-timeline__item--img' ).on( 'click', function( e ) {
					e.preventDefault();
					timelineUpdate( $this, $( this ).parent(), dateShowEle, false );
					return false;
				});

				
				//Activate the default selection
				timelineUpdate( $this, $this.find( '.uix-timeline__item.active' ), dateShowEle, false );
				if ( $this.find( '.uix-timeline__item.active' ).index() == 0 ) {
					$this.find( '.uix-timeline__btn--prev' ).addClass( 'disabled' );
				}
				

				
				if ( $this.hasClass( 'is-reversed' ) ) {
					
					// Set equal heights
					var setEqualHeights = function( el ) {
						var counter = 0;

						for ( var i = 0; i < el.length; i++) {

							var singleHeight = $( el[i] )[0].offsetHeight;

							if (counter < singleHeight) {
								counter = singleHeight;
							}
						}

						for ( var k = 0; k < el.length; k++) {
							$( el[k] ).css( 'height', counter + 'px' );
						}

						return counter;

					};
					
					var infoNewHeight = setEqualHeights( $timeline.find( '.uix-timeline__item--info' ) );
					
					
			
					// Reset container height
					$container.css( {
						'padding' : parseFloat( infoNewHeight + 64 ) + 'px 0'
					} );	
				}


				
				
			});	
		}
		
		

		/*
		 * Method that updates items of timeline
		 *
		 * @param  {object} obj                  - Wrapper of timeline.
		 * @param  {object} iscur                - The current item.
		 * @param  {string} showEle              - Element ID or class name that push the current text.
		 * @param  {boolean} prev                - Whether to slide forward.
		 * @return {void}                        - The constructor.
		 */
		function timelineUpdate( obj, iscur, showEle, prev ) {
			var	itemTotal  = obj.find( '.uix-timeline__item' ).length,
				tNav       = obj.find( '.uix-timeline__item' ),
				tLoop      = false;
			
			
			var curIndex = obj.find( '.uix-timeline__item.active' ).index(),
				tarIndex;

			//Check if a value is an object currently
			if ( iscur && typeof iscur === 'object' ) {
				curIndex = iscur.index();
				tarIndex = curIndex;
			} else {
				
				if ( prev ) {
					tarIndex = ( curIndex >= 0  ) ? curIndex-1 : 0;
				} else {
					tarIndex = ( curIndex < itemTotal  ) ? curIndex+1 : itemTotal-1;
				}
				
			}
			
			
		
			
			//loop the items
			obj.find( '.uix-timeline__btn--prev, .uix-timeline__btn--next' ).removeClass( 'disabled' );
			
			if ( prev ) {
				
				//Previous
				if ( tLoop ) {
					if ( tarIndex < 0 ) tarIndex = itemTotal-1;
				} else {
					if ( tarIndex < 0 ) tarIndex = 0;
					if ( tarIndex == 0 ) obj.find( '.uix-timeline__btn--prev' ).addClass( 'disabled' );
					
					 
				}
			} else {
				
				//Next
				if ( tLoop ) {
					if ( tarIndex == itemTotal ) tarIndex = 0;
				} else {
					if ( tarIndex > itemTotal-1 ) tarIndex = itemTotal-1;
					if ( tarIndex > itemTotal-2 ) obj.find( '.uix-timeline__btn--next' ).addClass( 'disabled' );
					if ( tarIndex == 0 ) obj.find( '.uix-timeline__btn--prev' ).addClass( 'disabled' );
				}
			}

			
			
			tNav.removeClass( 'active' );
			obj.find( '.uix-timeline__item:eq('+tarIndex+')' ).addClass( 'active' );

			//scroll left
			var tNavW = 0;
			for ( var i = 0; i < tarIndex; i++ ) {
				tNavW += obj.find( '.uix-timeline__item:eq('+i+')' ).width();
			}
	
			obj.find( '.uix-timeline__container.is-horizontal > .uix-timeline' ).css({
				'margin-left' : -parseFloat( tNavW ) + 'px'
			});
			
			//Push the current text to element 
			$( showEle ).text( obj.find( '.uix-timeline__item:eq('+i+')' ).find( '.uix-timeline__item--date' ).text() );
			
			
		}
    
		
    };

    APP.components.pageLoaded.push( APP.TIMELINE.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );



