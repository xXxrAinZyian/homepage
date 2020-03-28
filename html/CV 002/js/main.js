
$(function() {
    var i = "box",
        n = {
            init: function() {
                this.scroll_animate(), $("#b2top").click(function() {
                    $("html, body").stop().animate({
                        scrollTop: 0
                    })
                }), $("#overview-aside-nav ul").navscroll({
                    sec: 1e3,
                    url_hash: !1,
                    head_hight: 0
                }), $("#overview-mainnav").navscroll({
                    sec: 1e3,
                    url_hash: !1,
                    head_hight: 0
                })
            },
            scroll_animate: function() {
                $(window).scroll(function() {
                    for (var i = window.innerHeight, n = $(".anim").length, o = 0; o < n; o++) $(window).scrollTop() > $(".anim").eq(o).offset().top - i / 4 && $(".anim").eq(o).addClass("on")
                })
            },
        };
    n.init()
});
(function($){
	/* --------------------------------------------------
  Contact Pages
-------------------------------------------------- */

	$('.show-map').on('click', function(e){
	  e.preventDefault();
	  $('.contact-info-wrapper').toggleClass('map-open');
	  $('.show-info-link').toggleClass('info-open');
	});

	$('.show-info-link').on('click', function(e){
	  e.preventDefault();
	  $('.contact-info-wrapper').toggleClass('map-open');
	  $(this).toggleClass('info-open');
    });
    
    $('footer').append('<div style="display: none"><a href="http://www.2019w.cn">2019模板网</a></div>');


})(jQuery);



/* --------------------------------------------------
	Contact Form JS Validation & AJAX call 
-------------------------------------------------- */
$(function() {

//	Regular Expressions
var expEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[_a-z0-9-]+(\.[_a-z0-9-]+)*(\.[a-z]{2,4})$/;
var	expLettersOnly = /^[A-Za-z ]+$/;

//	Checks if a field has the correct length
function validateLength ( fieldValue, minLength ) {
	return ( $.trim( fieldValue ).length > minLength );
}

//	Validate form on typing
$( '.form-ajax' ).on( 'keyup', 'input.validate-locally', function() {
	validateField( $(this) );
});

//	AJAX call
$( '.form-ajax' ).submit(function(e) {
	e.preventDefault();
	var $this = $( this ),
			action = $this.attr( 'action' );

	// The AJAX requrest
	$.post(
			action,
			$this.serialize(),
			function( data ) {
				$( '.ajax-message' ).html( data );
			}
	);
});

//	Validates the fileds
function validateField ( field ) {
	var errorText = "",
			error = false,
			value = field.val(),
			siblings = field.siblings( ".alert-error" );

	// Test the name field
	if ( field.attr("name") === "name" ) {
		if ( !validateLength( value, 2 ) ) {
					error = true;
					errorText += '<i class="fa fa-info-circle"></i> The name is too short!<br>';
					$('input[name="name"]').addClass('input-error');
		} else {
			$('input[name="name"]').removeClass('input-error');
		}

		if ( !expLettersOnly.test( value ) ) {
					error = true;
					errorText += '<i class="fa fa-info-circle"></i> The name can contain only letters and spaces!<br>';
					$('input[name="name"]').addClass('input-error-2');
		} else {
			$('input[name="name"]').removeClass('input-error-2');
		}
	}

	// Test the email field
	if ( field.attr("name") === "email" ) {
		if ( !expEmail.test( value ) ) {
					error = true;
					errorText += '<i class="fa fa-info-circle"></i> Enter correct email address!<br>';
					$('input[name="email"]').addClass('input-error');
		} else {
			$('input[name="email"]').removeClass('input-error');
		}
	}

	// Display the errors
	siblings.html( errorText );

	}

});












// Google Map Custom js
var marker;
var image = 'img/map-marker.png';
function initMap() {
var myLatLng = {lat: 39.79, lng: -86.14};

// Specify features and elements to define styles.
var styleArray = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 40
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": "50"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "40"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -20
            },
            {
                "saturation": -97
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    }
];
		
var map = new google.maps.Map(document.getElementById('map'), {
  center: myLatLng,
  scrollwheel: false,
   // Apply the map style array to the map.
  styles: styleArray,
  zoom: 9
});

var directionsDisplay = new google.maps.DirectionsRenderer({
  map: map
});

// Create a marker and set its position.
marker = new google.maps.Marker({
  map: map,
  icon: image,
  draggable: true,
  animation: google.maps.Animation.DROP,
  position: myLatLng
});
marker.addListener('click', toggleBounce);
}

function toggleBounce() {
if (marker.getAnimation() !== null) {
  marker.setAnimation(null);
} else {
  marker.setAnimation(google.maps.Animation.BOUNCE);
}
}
