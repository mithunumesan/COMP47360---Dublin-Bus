const lightmap = [
    {  
    featureType: "transit", 
    stylers: [{ visibility: "off", }], 
  
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },

  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      { "visibility": "off" }
    ]
  },]
  
  const darkmap=[
    {  
    featureType: "transit", 
    stylers: [{ visibility: "off", }], 
  },
  { elementType: "geometry", stylers: [{ color: '#363537' }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      { "visibility": "off" }
    ]
  },

  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  
  ]
  export default{lightmap,darkmap}