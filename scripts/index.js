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
    var map = new google.maps.Map(mapCanvas, mapOptions)
}

function initEventTimeline() {
    var sampleData = [
        {name: "Event 1", date: moment("2015-10-5").toDate()},
        {name: "Event 1", date: moment("2015-10-6").toDate()},
        {name: "Event 1", date: moment("2015-10-10").toDate()},
        {name: "Event 2", date: moment("2015-11-5").toDate()},
        {name: "Event 3", date: moment("2015-12-15").toDate()}
    ];
    var timelineWidget = new TimelineWidget(".event-timeline");
    timelineWidget.render(sampleData);
}

function initFeatured() {
    featured = $('.featured').masonry({
        itemSelector: '.tile',
        columnWidth: 330,
        gutter: 5
    });
}

function init() {
    initBanner();
    initMap();
    initEventTimeline();
    initFeatured();
}


google.maps.event.addDomListener(window, 'load', init);



