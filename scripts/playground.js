function initEventMap() {
    var locationMap = new LocationMap('#location-map');
    locationMap.mark(13.000572, 80.204036,'Army Officers Training Centre');
}

function initTimings() {
  var data = [
      {type: "Junior training session - First batch", from: 7, to: 9, day: "sunday"},
      {type: "Junior training session - First batch", from: 21, to: 22, day: "sunday"},
      {type: "Junior training session - First batch", from: 7, to: 9, day: "tuesday"},
      {type: "Junior training session - First batch", from: 21, to: 22, day: "tuesday"},
      {type: "Junior training session - Second batch", from: 7, to: 9, day: "thursday"},
      {type: "Junior training session - Second batch", from: 7, to: 9, day: "monday"},
      {type: "Special classes - batch 1", from: 10, to: 12, day: "saturday"},
      {type: "Special classes - batch 2", from: 14, to: 16, day: "saturday"}
    ];
  var timingsWidget = new TimingsWidget("#timingsWidget");
  timingsWidget.render(data);
}

function initGallery() {
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true
    });
}


function init() {
    initEventMap();
    initTimings();
    initGallery();
}

google.maps.event.addDomListener(window, 'load', init);
