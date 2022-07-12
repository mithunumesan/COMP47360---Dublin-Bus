import WeatherCard from '../components/layout/WeatherCard';

import { useJsApiLoader, Autocomplete,DirectionsRenderer,GoogleMap,Marker } from '@react-google-maps/api';
import { useState,useRef } from 'react';



const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const center = {
    lat: 53.3463,
    lng: -6.2631
  };

  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };

  
    
function JourneyPlanning() {

    //react google map api using is refereneced from https://www.youtube.com/watch?v=iP3DnhCUIsE&list=RDCMUCr0y1P0-zH2o3cFJyBSfAKg&start_radio=1&rv=iP3DnhCUIsE&t=1614
    const [directionsResponse, setDirectionsResponse] = useState(null)
   
    /**@type React.MutableRefObject<HTMLInputElement> */
    const startRef = useRef()
    /**@type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef()
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCdf-x6SluXsWzP9qpwxVGBY08pm_3TAQU",
    libraries:['places']
  })
      if(!isLoaded) {
        return "map is not loaded";
    }

    async function caculateRoute(){
        if(startRef.current.value === '' || destinationRef.current.value === '') {
            return;
        }
        // eslint-disable-next-line
        const directionsService = new google.maps.DirectionsService()
        // eslint-disable-next-line
        const results = await directionsService.route({
            origin: startRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line
            travelMode: google.maps.TravelMode.TRANSIT
        })
        setDirectionsResponse(results)
        console.log(results)
    }

   function clearRoute() {
    if(startRef.current.value === '' || destinationRef.current.value === '') {
        setDirectionsResponse(null);
    }
   }

    return  (<><div className="flex-container">
        <div className="box1">
            <h1>Journey Planner</h1>
            <div className="journey-form">
                <Autocomplete options={{
                    bounds: defaultBounds,
                    componentRestrictions: { country: ["IE"] },
                    fields: ["place_id", "geometry", "name"],
                    strictBounds: true,
                }}>
                    <input type="search" placeholder="Start Point" className="box" ref={startRef}></input>
                </Autocomplete>
                <Autocomplete options={{
                    bounds: defaultBounds,
                    componentRestrictions: { country: ["IE"] },
                    fields: ["place_id", "geometry", "name"],
                    strictBounds: true,
                }}>
                    <input type="search" placeholder="Destination" className="box" ref={destinationRef}></input>
                </Autocomplete>
                <label for="time">Choose a time to start the journey: </label>
                <select id="option" onChange={() => {
                    var option = document.getElementById("option").value;
                    if (option !== "now") {
                        document.getElementById("time").innerHTML = '<input type="date" name="" class="date">' + '<input type="time" name="" class="time">';
                    } else {
                        document.getElementById("time").innerHTML = "";
                    }
                } }>
                    <option value="now">Leave Now</option>
                    <option value="depart">Depart At</option>
                    <option value="arrive">Arrive By</option>
                    <option value="lastAvaliable">Last Avaliable</option>
                </select>

                <div id="time"></div>
                <button type="submit" className="btn" onClick={caculateRoute}>Search</button>
            </div>
            <div id="result"></div>
        </div>
        <div className="box2">
            <div id="map">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={13}
                    onLoad={map => setMap(map)}
                    options={{
                        bounds: defaultBounds,
                        componentRestrictions: { country: ["IE"] },
                        fields: ["place_id", "geometry", "name"],
                        strictBounds: true,
                    }}
                >
                    {/* Child components, such as markers, info windows, etc. */}
                    {/* <Marker position={center} /> */}
                    {directionsResponse && (<DirectionsRenderer directions={directionsResponse} />)}
                </GoogleMap>
            </div>
        </div>

    </div></>);}
export default JourneyPlanning;