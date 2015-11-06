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
    var aPin = new google.maps.Marker({
        map: map,
        draggable:true
    });

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

    var centerToCurrentLocation = function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            setCenter(position.coords.latitude, position.coords.longitude);            
        });
    };

    var showSearchBox = function(inputElement) {        
        var searchBox = new google.maps.places.Autocomplete(inputElement);
        searchBox.bindTo('bounds', map);

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputElement);

        searchBox.addListener('place_changed', function() {
            var place = searchBox.getPlace();
            if(place.geometry) {
                map.setCenter(place.geometry.location);
            }
        });
    }

    var addMarkerOnClick = function() {
        google.maps.event.addListener(map, 'click', function(event){
            aPin.setPosition(event.latLng);
        });            
    }

    var getPinPosition = function() {
        return aPin.getPosition();
    }

    return {
        mark: mark,
        setCenter: setCenter,
        centerToCurrentLocation: centerToCurrentLocation,
        showSearchBox: showSearchBox,
        addMarkerOnClick: addMarkerOnClick
    }
}