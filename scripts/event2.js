function initSponsorSection() {
  var show = false;
  $(".sponsor").mouseenter(function() {
      show = true;
      _.throttle(function() {
        if(show) {
          $(".sponsor").animate({height: "150px"}, 100);  
        }
      }, 100, {'leading': false})();
  });

  $(".sponsor").mouseleave(function() { 
    show = false;   
    $(this).animate({height: "60px"}, 100); 
  })
}

function initEventMap() {
    var locationMap = new LocationMap('#location-map');
    locationMap.mark(13.000572, 80.204036,'Army Officers Training Centre');
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
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true
    });
}


function init() {
    initSponsorSection();
    initEventMap();
    initTimings();
    initGallery();
    skrollr.init();
}

google.maps.event.addDomListener(window, 'load', init);
