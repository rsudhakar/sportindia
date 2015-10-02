function initEventMap() {
    var mapCanvas = document.getElementById('event-location-map');
    //https://developers.google.com/maps/documentation/javascript/3.exp/reference
    var mapOptions = {
        center: new google.maps.LatLng(13.082680, 80.270718),
        zoom: 12,
        minZoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        scrollwheel: false
    };
    var map = new google.maps.Map(mapCanvas, mapOptions)
}

function categoryToggler() {
    $(".category-label").on("click", function(e) {
        $(e.target).closest(".type").toggleClass("expanded");
        $(e.target).closest(".type").toggleClass("collapsed");
    });
}

function init() {
    initEventMap();
    categoryToggler();
}

google.maps.event.addDomListener(window, 'load', init);
categoryToggler();