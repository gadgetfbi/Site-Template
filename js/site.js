// remap jQuery to $
(function($){})(window.jQuery);


$(document).ready(function (){
});
//

$(window).load(function() {	
});
//

$(window).resize(function() {	
});
//

/// ------------------------------------------------------------------------
/// Apply css classes to elements
///
function applyDefaultCss() {
    $('#menu ul li:first').addClass('li');
    $('#menu ul li:last').addClass('li');
    $('#menu ul li:odd').addClass('odd');

    $('table tr:odd').addClass('odd');
}

/// ------------------------------------------------------------------------
/// watermark an input field
///
/// options
///     value : default text value
///     class : watermark on css class
(function ($) {
    $.fn.watermark = function (options) {
        return this.each(function () {
            var el = $(this);
            function init() {
                var _val = options.value;
                var _css = options.class;
                el.val(_val);
                el.focus(function () {
                    if (el.val() == _val) {
                        el.val('');
                        el.removeClass(_css);
                    }
                });
                el.blur(function () {
                    if ($.trim(el.val()) == '') {
                        el.val(_val);
                        el.addClass(_css);
                    }
                });
            }
            init();
        });
    };
})(jQuery);
//

/// ------------------------------------------------------------------------
/// Get a query string parameter value
///
/// name : parameter name
///
function getQueryStringParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

/// ------------------------------------------------------------------------
/// Validate an email address
///
/// email : email address
///
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/// ------------------------------------------------------------------------
/// Sort an html list
///
/// el  : the list item container (i.e. ul)
///
function sortList(el) {
    var items = $(el).find('li').get();
    
    items.sort(function(a,b){
        var keyA = $(a).text();
        var keyB = $(b).text();
 
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    
    $.each(items, function(i, li){
        $(el).append(li);
    });
}

/// ------------------------------------------------------------------------
/// Scroll to the top of the page
///
function scrollTop() {
    $('html, body').animate({ scrollTop:0 }, 'fast');
    return false;
}

/// ------------------------------------------------------------------------
/// Scroll to an element
///
/// param : the element to scroll to (note: the element must have an href attribute)
///
function scrollTo(el) {

    var offset = el.offset();
    var offsetTop = offset.top;

    $('html, body').animate({ scrollTop: offsetTop}, 'fast');

    return false;
}

/// ------------------------------------------------------------------------
/// Preload images
///
/// Arguments are image paths relative to the current page:
/// jQuery.preLoadImages("image1.gif", "/path/to/image2.png");
///
(function($) {
  var cache = [];  
  $.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  }
})(jQuery);

/// ------------------------------------------------------------------------
/// Render a google map
/// Note: still requires google map page reference
///
/// param: element ID
///
function renderMap(elID) {
    // MAP
    if ($('#'+elID).length) {

        var geocoder = new google.maps.Geocoder();
        var zoom = 11;
        var address = "LA21 8AB";

        geocoder.geocode({ 'address': address }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {

                var options = {
                    zoom: zoom,
                    center: results[0].geometry.location,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                map = new google.maps.Map(document.getElementById(elID), options);

                map.setCenter(results[0].geometry.location);

                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: "Thurston Outdoor Educaion Centre - LA21 8AB"
                });

                var infowindow = new google.maps.InfoWindow({
                    content: '<div class="mapTip">Thurston Outdoor Educaion Centre <br /><br /> LA21 8AB</div>'
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });
            }
        });
    }
}
//

/// ------------------------------------------------------------------------
/// Get directions
///
///
function getDirections() {
    // Directions
    $('#btnDirections').bind('click', function () {

        if ($('#txtPostcode').val() != '' && $('#txtPostcode').val() != 'Postcode') {

            var directionsDisplay = new google.maps.DirectionsRenderer();
            var directionsService = new google.maps.DirectionsService();

            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById("directionsPanel"));

            var start = $('#txtPostcode').val();
            var end = "LA21 8AB";

            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                } else {
                    // directionsDisplay.setMap(null);
                }
            });

        }
    });
}
//

/// ------------------------------------------------------------------------
/// Slideshow
///
///
function slideShow() {
    var slideDuration = 4000;
    var currentIndex = 1;
    var nextIndex = 1;
    $('ul.slideshow li').css({ opacity: 0.0 });
    $("'ul.slideshow li:nth-child(" + nextIndex + ")'").addClass('show').css({ opacity: 1.0 });
    var timer = setInterval('nextSlide()', slideDuration);
}

/// ------------------------------------------------------------------------
/// Slide-in element - i.e. cookie use warning
///
/// closing area div css class name: close
///
/// text        :       text to display
/// cssClass    :       clider css class name
/// top         :       true to show at the top of the page, false to show at the bottom
///
function drawSlideIn(options) {

    var visible = false;

    var $container = $('<div>');
    var $label = $('<label>');
    var $closer = $('<div>');
    var $clear = $('<div>');

    $clear.addClass('clearBoth');

    $label.text(options.text);

    $closer.addClass('close');

    $container.addClass(options.cssClass);

    $container.append($label);
    $container.append($closer);
    $container.append($clear);

    $('body').append($container);

    // set the default position
    // top...
    var height = 0;

    if (options.top == true) {
        height = '-' + $container.outerHeight() + 'px';
    } else {
        height = $(window).height();
    }
    
    $container.css('top', height);
    // left...
    $container.css("left", Math.max(0, (($(window).width() - $container.outerWidth()) / 2) + $(window).scrollLeft()) + "px");

    $closer.bind('click', function () {
        // close the slider
        $container.animate({
            top: height
        });
        visible = false;
    });

    setTimeout(function () {
        var top = '0px';
        if (options.top != true)
            top = ($(window).height() - $container.outerHeight()) + 'px';
        $container.animate({
            top: top
        }, 500);
    }, 1000);
    visible = true;
}