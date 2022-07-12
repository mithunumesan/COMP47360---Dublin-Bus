import { GoogleMap,Marker} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 53.3463,
  lng: -6.2631
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
        <Marker position={center} />
      </GoogleMap>
  )
}

export default MyMap;
