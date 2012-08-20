// remap jQuery to $
(function ($) { })(window.jQuery);


$(document).ready(function () {
    // alert('loaded');

    applyDefaultCss();

    // watermark textbox #watermark
    $('#watermark').watermark({
        value: 'hello'
    });

    // validate email address
    $('#validateEmail').click(function () {
        var email = $('#email').val();
        if (validateEmail(email)) {
            alert('valid');
        } else {
            alert('invalid');
        }
    });

    // sort list
    $('#sort').click(function () {
        var $ul = $('#unorderedList');
        sortList($ul);
    });

    // scroll top
    $('#scrollTop').click(function () {
        scrollTop();
    });

    // scroll bottom
    $('#scrollBottom').click(function () {
        scrollTo($('#bottom'));
    });


    // Draw Slide In
    var string = 'Fusce metus arcu, eleifend eu vehicula a, malesuada quis nisl. Donec egestas risus vitae metus lobortis cursus. Nullam justo enim, tempus in placerat sit amet, aliquam non arcu. Nulla scelerisque ornare commodo. Vestibulum pellentesque ipsum vitae turpis porta sodales imperdiet metus lobortis.';
    drawSlideIn({ text: string, cssClass: 'slide', top: false });


});
//