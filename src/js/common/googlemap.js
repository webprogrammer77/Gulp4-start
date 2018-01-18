var map;
function initMap() {
  var styleArray = [{
      featureType: 'water',
      stylers: [{
        color: '#00bfa5'
      }]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [{
        color: '#ffffff'
      }]
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'all',
      stylers: [{
        saturation: '-70'
      }]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'all',
      stylers: [{
        visibility: 'off'
      }]
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{
        visibility: 'off'
      }]
    },
    {
      featureType: 'poi.park',
      elementType: 'all',
      stylers: [{
        visibility: 'off'
      }]
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [{
        lightness: '-15'
      }]
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [{
        visibility: 'off'
      }]
    }
  ];
 map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 55.73,
      lng: 37.69
    },
    scrollwheel: false,
    zoom: 16,
    styles: styleArray,
    disableDefaultUI: true
  });
  var myMarker = new google.maps.Marker({
    position: {
      lat: 55.714688,
      lng: 37.747670
    }
    , map: map, icon: '../img/icons/map_marker.svg'
  });
}
initMap();