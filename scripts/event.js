function initEventMap() {
    var locationMap = new LocationMap('#location-map');
    locationMap.mark(13.082370, 80.258861, 'Event name');
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