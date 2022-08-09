export function getmarkers() {
    return fetch('http://137.43.49.30:80/api/Stops/')
      .then(data => data.json())
  }
  export function getMarkerAddress(pos) {
    
    return fetch('http://maps.googleapis.com/maps/api/geocode/json?language=en&sensor=false&latlng=' + pos.lat+ ','+ pos.lng+'&key=AIzaSyCdf-x6SluXsWzP9qpwxVGBY08pm_3TAQU')
      .then(data => data.json())
  }