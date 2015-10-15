function initEventMap() {
    var locationMap = new LocationMap('#location-map');
    locationMap.mark(13.000572, 80.204036,'Army Officers Training Centre');
}

function initGallery() {
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true
    });
}


function init() {
    initEventMap();
    //initGallery();
}

google.maps.event.addDomListener(window, 'load', init);