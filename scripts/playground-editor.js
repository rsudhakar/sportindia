function initMapEditor() {
    var locationMap = new LocationMap('#location-map');
    locationMap.setCenter(13.000572, 80.204036);
    locationMap.centerToCurrentLocation();
    var searchBox = $("#location-map-input")[0];
    locationMap.showSearchBox(searchBox);
    locationMap.addMarkerOnClick();
}

function initImageEditors() {
    initImagePicker(".banner-image", {
      width: $(window).width(),
      height: 400,
      label: ""
    });

    initImagePicker(".icon img", {
      width: 50,
      height: 50,
      label: "",
      zoom: 20
    });
}

function initTimings() {
  var data = [
      {type: "Junior training session - First batch", from: 7, to: 9, day: "sunday", category: "Below 15 years"},
      {type: "Junior training session - First batch", from: 7, to: 9, day: "monday", category: "Below 15 years"},
      {type: "Junior training session - First batch", from: 21, to: 22, day: "tuesday", category: "Below 15 years"},
      {type: "Junior training session - Second batch", from: 7, to: 9, day: "thursday", category: "Below 10 years"},
      {type: "Junior training session - Second batch", from: 7, to: 9, day: "monday", category: "Below 10 years"},
      {type: "Special classes - batch 1", from: 10, to: 12, day: "saturday", category: "Below 15 years"},
      {type: "Special classes - batch 2", from: 14, to: 16, day: "saturday", category: "Above 15 years"}
    ];
  var timingsWidget = new TimingsWidget("#timingsWidget");
  timingsWidget.render(data);
  timingsWidget.show("Special classes - batch 1");
}

function initGallery() {
  initGalleryPreview();
}


function init() {
    initMapEditor();
    initImageEditors();
    initTimings();
    initGallery();
    skrollr.init();
}

google.maps.event.addDomListener(window, 'load', init);
