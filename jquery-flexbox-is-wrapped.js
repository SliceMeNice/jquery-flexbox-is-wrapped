/*!
 * jquery-flexbox-is-wrapped
 * Author: office@slicemenice.de
 * Licensed under the MIT license
 *
 */
( function ( $, window ) {

	var flexboxIsWrappedClass = 'js-flexbox-isWrapped';
	var flexboxItemIsWrappedClass = 'js-flexboxItem-isWrapped';

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

		$parent.removeClass( flexboxIsWrappedClass );

		var previous_top = undefined;
		var previous_height = undefined;
		var isAnyItemWrapped = false;

		$parent.children().removeClass( flexboxItemIsWrappedClass ).each( function() {

			if ( !previous_top ) {
				previous_top = parseInt( $( this ).offset().top, 10 );
				previous_height = parseInt( $( this ).outerHeight( true ), 10 );
			}

			var top = parseInt( $( this ).offset().top, 10 );
			var marginTop = parseInt( $( this ).css( 'margin-top' ), 10 );
			var height = parseInt( $( this ).outerHeight( true ), 10 );
			var epsilon = Math.min( previous_height, 2 );
			var isWrapped = top - marginTop >= previous_top + previous_height - epsilon;
			$( this ).toggleClass( flexboxItemIsWrappedClass, isWrapped );

			if ( isWrapped ) {
				isAnyItemWrapped = true;
			}

			previous_top = top;
			previous_height = height;

		} );

		$parent.toggleClass( flexboxIsWrappedClass, isAnyItemWrapped );
	}

} )( jQuery, window );
