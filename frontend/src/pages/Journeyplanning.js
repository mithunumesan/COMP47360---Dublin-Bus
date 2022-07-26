import { useJsApiLoader, Autocomplete,DirectionsRenderer,GoogleMap,Marker ,InfoWindow} from '@react-google-maps/api';
import { useState,useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getmarkers} from '../components/markers';
import * as Icons from "react-icons/hi";
import { MarkerClusterer } from '@react-google-maps/api';
// import useSupercluster from "use-supercluster";


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
    
const icon = { url: require('./bus.png') ,scaledSize:{ width: 20, height: 20}};

function JourneyPlanning() {
    
    const [markers,setmarkers]=useState([]);

    const [infowindows,setinfowindows]=useState(null);
  
    useEffect(() => {
        let mounted = true;
        getmarkers()
          .then(markers => {
            if(mounted) {
              setmarkers(markers)
            }
          })
        return () => mounted = false;
      }, [])

    //react google map api using is refereneced from https://www.youtube.com/watch?v=iP3DnhCUIsE&list=RDCMUCr0y1P0-zH2o3cFJyBSfAKg&start_radio=1&rv=iP3DnhCUIsE&t=1614
    const [directionsResponse, setDirectionsResponse] = useState({})
    //save markers
    const [markerSave,setMarkerSave]=useState({})
   
    /**@type React.MutableRefObject<HTMLInputElement> */
    const startRef = useRef()
    /**@type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef();

    //set sidebar toggle variable
    const [sidebar,setSidebar] = useState(true);
   
    const notShowSidebar = () => setSidebar(false);

    const showSidebar = () => setSidebar(true);
    //save select option value
    const [selected, setSelected] = useState();
    //the event for time select 
    const changeSelected = event => {
        setSelected(event.target.value);
        if (selected !== "now") {
            setBooleanValue(true);
        } else {
            setBooleanValue(false);
        }
    }

    const [booleanValue,setBooleanValue] = useState(false);
    
    const [dateTime, setDateTime] = useState(null);

    const handleChange = event => {
        setDateTime(event.target.value);
    }

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
        let departTime;
        let arrivalTime;
        if( selected ==='depart') {
            departTime = new Date(dateTime);
            // eslint-disable-next-line
            const results = await directionsService.route({
                origin: startRef.current.value,
                destination: destinationRef.current.value,
                // eslint-disable-next-line
                travelMode: google.maps.TravelMode.TRANSIT,
                provideRouteAlternatives: true,
                transitOptions: {
                departureTime: departTime,
                },
            })
            setDirectionsResponse(results);
        }else if( selected ==='arrive') {
            arrivalTime = new Date(dateTime);
            // eslint-disable-next-line
            const results = await directionsService.route({
            origin: startRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line
            travelMode: google.maps.TravelMode.TRANSIT,
            provideRouteAlternatives: true,
            transitOptions: {
            arrivalTime: arrivalTime,
            // routingPreference:
            },
        })
            setDirectionsResponse(results);
        } else {
        // eslint-disable-next-line
        const results = await directionsService.route({
            origin: startRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line
            travelMode: google.maps.TravelMode.TRANSIT,
            provideRouteAlternatives: true,
        })
            setDirectionsResponse(results);
        }
    }

    async function clearRoute() {
        // eslint-disable-next-line
        const geocoder = new google.maps.Geocoder();
        if((destinationRef.current.value === '')&&(startRef.current.value === '')){
           markerSave.setMap(null);
           setMarkerSave({});
        }
        else if(startRef.current.value === '') {
            // eslint-disable-next-line
            const marker = new google.maps.Marker({ map: map });
            const placeId = directionsResponse.geocoded_waypoints[1].place_id;
            geocoder
            .geocode({ placeId: placeId})
            .then(({ results }) => {
                // Set the position of the marker using the place ID and location.
                // @ts-ignore TODO This should be in @typings/googlemaps.
                marker.setPlace({
                  placeId: placeId,
                  location: results[0].geometry.location,
                });
                setMarkerSave(marker);
            });
            setDirectionsResponse(null);
        } else if(destinationRef.current.value === '') {
            // eslint-disable-next-line
            const marker = new google.maps.Marker({ map: map });
            const placeId = directionsResponse.geocoded_waypoints[0].place_id;
            geocoder
            .geocode({ placeId: placeId})
            .then(({ results }) => {
                // Set the position of the marker using the place ID and location.
                // @ts-ignore TODO This should be in @typings/googlemaps.
                marker.setPlace({
                  placeId: placeId,
                  location: results[0].geometry.location,
                });
                setMarkerSave(marker);
            });
            setDirectionsResponse(null);
        } 
        document.getElementById('panel').innerHTML="";
    }

    return  (<>
        <div className={sidebar ? 'box1 active' : 'box1'}>
            <div className="container">
                <div className="link3">
                    <Link to="/" ><h1 style={{color: '#666'}}>Journey Planner</h1></Link>
                </div>
                <div className="link4">
                    <Link to='/routesexploration'><h1 style={{color: '#666'}}>Route Exploration</h1></Link>
                </div>
            </div>
            <div className="journey-form">
                <Autocomplete options={{
                    bounds: defaultBounds,
                    componentRestrictions: { country: ["IE"] },
                    fields: ["place_id", "geometry", "name"],
                    strictBounds: true,
                }}>
                    <input type="search" placeholder="Start Point" className="box" ref={startRef} onChange= {clearRoute}></input>
                </Autocomplete>
                <Autocomplete options={{
                    bounds: defaultBounds,
                    componentRestrictions: { country: ["IE"] },
                    fields: ["place_id", "geometry", "name"],
                    strictBounds: true,
                }}>
                    <input type="search" placeholder="Destination" className="box" ref={destinationRef} onChange={clearRoute}></input>
                </Autocomplete>
                <label for="time">Choose a time to start the journey: </label>
                <select id="option" value={selected} onChange={changeSelected}>
                    <option value="now">Leave Now</option>
                    <option value="depart">Depart At</option>
                    <option value="arrive">Arrive By</option>
                    <option value="lastAvaliable">Last Avaliable</option>
                </select>
                {/* add the html input datetime element or not */}
                {booleanValue ? <div id="time"><input type="datetime-local" id="datetime" onChange={handleChange} value={dateTime}></input></div> : null}
                <button type="submit" className="btn" onClick={caculateRoute}>Search</button>
            </div>
            <div id="panel"></div>
        </div>
        <div className={sidebar ? 'sidebar-toggle' : 'sidebar-toggle-off'}>
            {sidebar ? <Icons.HiChevronDoubleLeft style={{fontSize:'22px'}} onClick={notShowSidebar} /> : <Icons.HiChevronDoubleRight style={{fontSize:'22px'}} onClick={showSidebar}/>}
        </div>
        
        <div className="box2">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={13}
                    onLoad={map => setMap(map)}
                    clickableIcons={false}
                    options={{styles:{stylers: [
                      { visibility: "off" }
                ]}}}
                    >
                    
      {infowindows && (
        <InfoWindow
          onCloseClick={() => {
            setinfowindows(null);
          }}
          position={{
            lat: infowindows.latitude,
            lng: infowindows.longitude
          }}
        >
          <div>
            <h2>{infowindows.stopname}</h2>
          </div>
        </InfoWindow>
      )}
      {/* MarkerCluster refernce from https://stackoverflow.com/questions/62242497/react-googlemaps-issue-with-marker-marker-clusterer */}
      <MarkerClusterer
      minimumClusterSize={10}
      gridSize={200}
      >
        { (clusterer) =>
          markers.map((marker, index) => (
          <Marker
          key={index}
          name={marker.name}
          position={{ lat:marker.latitude, lng:marker.longitude  }}
          clusterer={clusterer}
          icon={icon}
          onClick={() => {
          setinfowindows(marker);
      }}
    /> ))
    }</MarkerClusterer>
                    {directionsResponse && (<DirectionsRenderer directions={directionsResponse} panel={ document.getElementById('panel') } routeIndex={0}/>)}
                </GoogleMap>
        </div>
   </>);}
export default JourneyPlanning;