function initBanner() {
    skrollr.init();
}

function initMap() {
    var mapCanvas = document.getElementById('homepage-map');
    //https://developers.google.com/maps/documentation/javascript/3.exp/reference
    var mapOptions = {
        center: new google.maps.LatLng(13.082680, 80.270718),
        zoom: 12,
        minZoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        scrollwheel: false
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);

    var input = document.getElementById('homepage-map-input');
    var searchBox = new google.maps.places.Autocomplete(input);
    searchBox.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    searchBox.addListener('place_changed', function() {
        var place = searchBox.getPlace();
        if(place.geometry) {
            map.setCenter(place.geometry.location);
            map.setZoom(14);
        }
    });
}

function initEventTimeline() {
    var sampleData = [
        {name: "Event 1", date: moment("2015-10-5","YYYY-MM-DD").toDate(), description: "Description of the event"},
        {name: "Event 1", date: moment("2015-10-6","YYYY-MM-DD").toDate(), description: "Description of the event"},
        {name: "Event 1", date: moment("2015-10-10","YYYY-MM-DD").toDate(), description: "Description of the event"},
        {name: "Event 2", date: moment("2015-11-5","YYYY-MM-DD").toDate(), description: "Description of the event"},
        {name: "Event 3", date: moment("2015-12-15","YYYY-MM-DD").toDate(), description: "Description of the event"}
    ];
    var timelineWidget = new TimelineWidget(".event-timeline");
    timelineWidget.render(sampleData);
}

function initFeatured() {
    featured = $('.featured').masonry({
        itemSelector: '.tile',
        columnWidth: 290,
        gutter: 15
    });
}

function init() {
    initBanner();
    initMap();
    initEventTimeline();
    initFeatured();
}


google.maps.event.addDomListener(window, 'load', init);



