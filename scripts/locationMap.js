function LocationMap(selector) {
    var mapCanvas = $(selector)[0];
    var mapOptions = {
        zoom: 14,
        minZoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        scrollwheel: false
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);

    var setCenter = function(lat, long) {
        var latlong = new google.maps.LatLng(lat, long);
        map.setCenter(latlong);
    };

    var addMarker = function(lat, long, label, hyperlink) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            map: map,
            title: label
        });
    };

    var mark = function(lat, long, label) {
        setCenter(lat, long);
        addMarker(lat, long, label);
    };

    return {
        mark: mark
    }
}