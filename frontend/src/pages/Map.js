
// import { GoogleMap,withGoogleMap,withScriptjs } from 'react-google-maps';

// function Map()  {
  
//   return (<GoogleMap defaultZoom={13} defaultCenter={{lat: 53.3463,
//     lng: -6.2631}} />
//   );
// }
// const WrappedMap = withScriptjs(withGoogleMap(Map));
// export default function AppMap() {
//   return (<WrappedMap googleMapURL={'AIzaSyCdf-x6SluXsWzP9qpwxVGBY08pm_3TAQU'} />);
// }
import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 53.3463,
  lng: -6.2631
};

function MyMap() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCdf-x6SluXsWzP9qpwxVGBY08pm_3TAQU"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyMap)
