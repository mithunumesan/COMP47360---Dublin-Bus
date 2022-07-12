// import { React } from 'react'
import { GoogleMap,Marker} from '@react-google-maps/api';
import { useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// import { Icon } from '@iconify/react'
// import locationIcon from '@iconify/icons-mdi/map-marker'

// const location = {
//   address: '1600 Amphitheatre Parkway, Mountain View, california.',
//   lat: 53.3463,
//   lng: -6.2631,
// }

// const LocationPin = ({ text }) => (
//   <div className="pin">
//     <Icon icon={locationIcon} className="pin-icon" />
//     <p className="pin-text">{text}</p>
//   </div>
// )

const center = {
  lat: 53.3463,
  lng: -16.2631
};
function MyMap() {
// const { isLoaded } = useJsApiLoader({
//   googleMapsApiKey: "AIzaSyCdf-x6SluXsWzP9qpwxVGBY08pm_3TAQU",
//   libraries:['places'],
// })

// const [map, setMap] = useState(null);

return (

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        
        {/* <Marker position={{ lat:location.lat, lng: location.lng }} */}
        
          
        {/* /> */}
      <Marker key="marker_1"

position={{

    lat: 53.3,

    lng: -6.3

}}

/>

      </GoogleMap>
  )
}


export default MyMap;
