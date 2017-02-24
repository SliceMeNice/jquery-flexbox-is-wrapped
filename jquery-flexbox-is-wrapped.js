/*!
 * jquery-flexbox-is-wrapped
 * Author: office@slicemenice.de
 * Licensed under the MIT license
 *
 */
( function ( $, window ) {

	$( document ).ready( function() {

		initialize();

		// initialize components when new content has been added to the DOM (e.g. via AJAX)
		$( document ).on( 'contentChanged', function( event, $element ) {
			initialize( $element );
		} );

	} );

	$( window ).on( 'resize orientationchange', $.debounce( 50, onResizeOrOrientationChange ) );

	function initialize( $root ) {
		if ( !$root ) {
			$root = $( document );
		}

		initFlexboxWrapped( $root );
	}

	function initFlexboxWrapped( $root ) {
		$root.find( '.js-flexbox' ).each( checkFlexWrapped );
	}

	function onResizeOrOrientationChange( event, $root ) {
		$( '.js-flexbox' ).each( checkFlexWrapped );
	}

	function checkFlexWrapped() {
		var $parent = $( this );

		var previous_top = undefined;
		var isAnyItemWrapped = false;

		$parent.children().each( function() {

			if ( !previous_top ) {
				previous_top = $( this ).offset().top;
			}

			var top = $( this ).offset().top;
			var isWrapped = top !== previous_top;
			$( this ).toggleClass( 'js-flexboxItem-isWrapped', isWrapped );

			if ( isWrapped ) {
				isAnyItemWrapped = true;
			}

			previous_top = top;

		} );

		$parent.toggleClass( 'js-flexbox-isWrapped', isAnyItemWrapped );
	}

} )( jQuery, window );
