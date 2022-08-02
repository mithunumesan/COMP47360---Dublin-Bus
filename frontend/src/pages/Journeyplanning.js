import { useJsApiLoader, Autocomplete,DirectionsRenderer,GoogleMap,Marker,InfoWindow} from '@react-google-maps/api';
import { useState,useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getmarkers,getMarkerAddress} from '../components/markers';
//import { getTripSchedule} from '../components/tripfind';
import * as Icons from "react-icons/hi";
import { MarkerClusterer} from '@react-google-maps/api';
import { render} from 'react-dom'
import useUserToken from './Home';
// import useSupercluster from "use-supercluster";


var routNum=0;
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



let goAheadList = []
let dublinBusList = []


function JourneyPlanning() {

    const [startPoint, setStartPoint] = useState('');

    const [destination, setDestination] = useState('');

    
    const token = useUserToken();
    console.log(token);
    
    let userid = localStorage.getItem("user_id");
    // let userid = token['props']['children'][2]['props']['children'][1];

    const [routeNum, setRouteNum] = useState(0)
    const [pos, setPos] = useState({lat: 53.3463, lng: -6.2631})
    const [color,setColor]=useState('white')
    
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
      useEffect(() => {
        console.log("Loading completed")
        initGeo();
    },[])

    const [goAhead,setGoAhead] = useState([])

    const [dublinBus,setDublinBus] = useState([])

    useEffect(() => {
      if(infowindows !== null) {
      let lineAgencyList = infowindows.agencyLineNum
      console.log(lineAgencyList)
      lineAgencyList = lineAgencyList.split(';')
      goAheadList=[]
      dublinBusList=[]
      lineAgencyList.forEach(line => {
        if(line.startsWith('03')) {
          goAheadList.push(line.split(',').pop())
        } else {
          dublinBusList.push(line.split(',').pop())
        }
      })
      setDublinBus(dublinBusList)
      console.log(dublinBusList)
      console.log(dublinBus)
    }
    }, [infowindows])
    const [minTime,setMinTime]=useState(null)
    useEffect(() => {
      console.log("time value")
        let date = new Date().toDateString();
        let time = new Date().toTimeString();

        let current = new Date()
        // let min = current.getFullYear().toString()+'-'+(current.getMonth()+1).toString()+'-'+current.getDate().toString()+'T'+current.getHours().toString()+':'+current.getMinutes().toString();
        let min=new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"));
        console.log(min)
        setMinTime(min)
        // console.log(time)
      
    },[])

  

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
        let results;
        let preTime;
        let selectValue;
        if( selected ==='depart') {
            departTime = new Date(dateTime);
            preTime=dateTime;
            selectValue='depart'
            // eslint-disable-next-line
            results = await directionsService.route({
                origin: startRef.current.value,
                destination: destinationRef.current.value,
                // eslint-disable-next-line
                travelMode: google.maps.TravelMode.TRANSIT,
                provideRouteAlternatives: true,
                transitOptions: {
                departureTime: departTime,
                },
            })
            console.log(results)
            setDirectionsResponse(results);
        }else if( selected ==='arrive') {
            arrivalTime = new Date(dateTime);
            preTime=dateTime;
            selectValue='arrive'
            // eslint-disable-next-line
            results = await directionsService.route({
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
        console.log(results)
            setDirectionsResponse(results);
        } else {
          selectValue='now'
        // eslint-disable-next-line
            results = await directionsService.route({
            origin: startRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line
            travelMode: google.maps.TravelMode.TRANSIT,
            provideRouteAlternatives: true,
        })
        console.log(results)
            setDirectionsResponse(results);
        }
        console.log(results)
        const routesValue=results.routes
            //routesSteps.map()
            render(
                <div style={{border: "1px solid #cccccc",padding:"5px" }}> <span>   Suggested route:</span>{routesValue.map((routesSteps,indexNum) => {

                    let length = routesSteps.legs[0].steps.length;
                    let stepInfo = routesSteps.legs[0].steps.map((value,index) => {
                        return value.travel_mode == 'WALKING' ?  index == length-1?<div ><span style={{margin:"0px"}}><i className='fas fa-walking'></i></span></div>:<div><span style={{margin:"0px"}}><i className='fas fa-walking'></i></span><span
                                style={{margin:"5px"}}><i className='fas fa-angle-double-right'></i></span></div>:
                                    value.transit.line.agencies[0].name == 'Dublin Bus' ? index == length-1 ?<div><i className='fas fa-bus'><span style={{background: "#f1c232",margin:"3px"}}>{value.transit.line.short_name}</span></i><span style={{margin:"5px"}}></span></div>
                                    :<div><i className='fas fa-bus'><span style={{background: "#f1c232",margin:"3px"}}>{value.transit.line.short_name}</span></i><span
                                    style={{margin:"5px"}}><i className='fas fa-angle-double-right'></i></span></div> :
                                        value.transit.line.agencies[0].name == 'Go-Ahead' ? index == length-1 ?<div><i className='fas fa-bus'><span style={{background: "#3c78d8",color:"#ffffff",margin:"3px"}}>{value.transit.line.short_name}</span></i><span style={{margin:"5px"}}></span></div>
                                        :<div><i className='fas fa-bus'><span style={{background: "#3c78d8",color:"#ffffff",margin:"3px"}}>{value.transit.line.short_name}</span></i><span
                                        style={{margin:"5px"}}><i className='fas fa-angle-double-right'></i></span></div>:
                                            value.transit.line.agencies[0].name == 'Green Line' ? index == length-1 ?<div><i className='fas fa-train'><span style={{background: "#93c47d",margin:"3px"}}>Green Line</span></i><span style={{margin:"5px"}}></span></div>
                                            :<div><i className='fas fa-train'><span style={{background: "#93c47d",margin:"3px"}}>Green Line</span></i><span
                                            style={{margin:"5px"}}><i className='fas fa-angle-double-right'></i></span></div>:
                                                value.transit.line.short_name == 'Green Line' ? index == length-1 ?<div><i className='fas fa-train'><span style={{background: "#93c47d",margin:"3px"}}>Green Line</span></i><span style={{margin:"5px"}}></span></div>
                                                :<div><i className='fas fa-train'><span style={{background: "#93c47d",margin:"3px"}}>Green Line</span></i><span
                                                style={{margin:"5px"}}><i className='fas fa-angle-double-right'></i></span></div>:
                                                    value.transit.line.agencies[0].name == 'Dublin Express' ? index == length-1 ?<div><span style={{background: "#073763",color:"#ffffff",margin:"3px"}}>{value.transit.line.short_name}</span><span style={{margin:"5px"}}></span></div>
                                                    :<div><span style={{background: "#073763",color:"#ffffff",margin:"3px"}}>{value.transit.line.short_name}</span><span
                                                    style={{margin:"5px"}}><i className='fas fa-angle-double-right'></i></span></div>:
                                                        value.transit.line.agencies[0].name == 'Aircoach' ? index == length-1 ? <div><i className='fas fa-bus'></i><span style={{margin:"5px"}}></span></div>
                                                        :<div><i className='fas fa-bus'></i><span
                                                        style={{margin:"5px"}}><i className='fas fa-angle-double-right'></i></span></div>:<div></div>;
                        })
                    return <div id="routeInfo" style={{display:"flex",margin:"10px",backgroundColor:color,position: "relative"}} onClick={(e)=>getInfo(routesSteps,indexNum,e)}>{stepInfo}<div style={{position:"absolute",right:"0px"}}><span >about   {routesSteps.legs[0].duration.text}</span></div></div>
                })}</div>,
                document.getElementById('panel')
            );
            render(
                <div style={{border: "1px solid #cccccc",padding:"5px"}}><span>   Details of the route:</span><div style={{background:"#d9d9d9",border: "1px solid #cccccc",padding:"5px"}}>{routesValue[0].legs[0].start_address}</div>{routesValue[0].legs[0].steps.map((value,index) =>{
                    return <div style={{margin:"5px",border: "1px solid #cccccc",padding:"5px"}}><span style={{margin:"5px"}}>{value.instructions}</span><span>{value.duration.text}</span>
                           {value.travel_mode == 'TRANSIT'  ?
                                value.transit.line.agencies[0].name == 'Dublin Bus' ?<div style={{margin:"5px",padding:"10px"}}><i className='fas fa-bus'></i><span  style={{background: "#f1c232",margin:"3px"}}>{value.transit.line.short_name}</span><span>{value.transit.line.agencies[0].name}</span><br/><span>departure_stop:{value.transit.departure_stop.name}</span><br/><span>stops number:{value.transit.num_stops}</span><br/><span>arrival_stop:{value.transit.arrival_stop.name}</span></div>:
                                value.transit.line.agencies[0].name == 'Go-Ahead' ?<div style={{margin:"5px",padding:"10px"}}><i className='fas fa-bus'></i><span  style={{background: "#3c78d8",margin:"3px"}}>{value.transit.line.short_name}</span><span>{value.transit.line.agencies[0].name}</span><br/><span>departure_stop:{value.transit.departure_stop.name}</span><br/><span>stops number:{value.transit.num_stops}</span><br/><span>arrival_stop:{value.transit.arrival_stop.name}</span></div>:
                                value.transit.line.agencies[0].name == 'Green Line' ?<div style={{margin:"5px",padding:"10px"}}><i className='fas fa-train'></i><span  style={{background: "#93c47d",margin:"3px"}}>{value.transit.line.short_name}</span><br/><span>departure_stop:{value.transit.departure_stop.name}</span><br/><span>stops number:{value.transit.num_stops}</span><br/><span>arrival_stop:{value.transit.arrival_stop.name}</span></div>:
                                value.transit.line.short_name  == 'Green Line' ?<div style={{margin:"5px",padding:"10px"}}><i className='fas fa-train'></i><span  style={{background: "#93c47d",margin:"3px"}}>{value.transit.line.short_name}</span><br/><span>departure_stop:{value.transit.departure_stop.name}</span><br/><span>stops number:{value.transit.num_stops}</span><br/><span>arrival_stop:{value.transit.arrival_stop.name}</span></div>:
                                value.transit.line.agencies[0].name  == 'Dublin Express' ?<div style={{margin:"5px",padding:"10px"}}><span  style={{background: "#073763",color:"#ffffff",margin:"3px"}}>{value.transit.line.short_name}</span><br/><span>departure_stop:{value.transit.departure_stop.name}</span><br/><span>stops number:{value.transit.num_stops}</span><br/><span>arrival_stop:{value.transit.arrival_stop.name}</span><br/></div>:
                                value.transit.line.agencies[0].name  == 'Aircoach' ?<div style={{margin:"5px",padding:"10px"}}><span  style={{margin:"3px"}}><i className='fas fa-bus'></i></span><span>{value.transit.line.agencies[0].name}</span><br/><span>departure_stop:{value.transit.departure_stop.name}</span><br/><span>stops number:{value.transit.num_stops}</span><br/><span>arrival_stop:{value.transit.arrival_stop.name}</span></div>:
                                <div></div>
                           :<div></div>}

                            </div>


                })}<div style={{background:"#d9d9d9",border: "1px solid #cccccc",padding:"5px"}}>{routesValue[0].legs[0].end_address}</div></div>,

                document.getElementById('stepInfo')
            );

            const getInfo=async (routesSteps,indexNum,e)=>{
                // var routeInfo=document.getElementById("routeInfo")
                // for(var i=0;i<routeInfo.children.length;i++){
                //     alert(i)
                //     alert(routeInfo.children[i])
                //     routeInfo.children[i].style.background="green"
                // }

                //setColor('red')
                
                console.log(e.currentTarget.parentElement.children.length)
                let children = e.currentTarget.parentElement.children;
                for(let i=0;i<children.length;i++){
                    children[i].style.backgroundColor='White'
                }
                //e.currentTarget.parentElement.children[2].style.backgroundColor='red'
                e.currentTarget.style.backgroundColor='#CAC9CF'
                console.log(routesSteps)
                setRouteNum(indexNum)
                async function getTripInfo(a,b,c,d,e,duText,ggdeTime,ggArTime,selectedDate) {
                  console.log(selectedDate)
                  console.log('*********************')
                  const res = await fetch(`http://localhost:8000/api/tripschedule/?routeshortname=`+a+`&stopname=`+b+`&arrivaltime=`+ggdeTime+`&stopNum=`+d+`&selectedValue=`+e+`&selectedDate=`+selectedDate)
                  const tripInfo = await res.json();
                  let gtfsState = tripInfo.gtfsState;
                  let durTime = tripInfo.durTime;
                  let startTime=tripInfo.startTime;
                  let endTime=tripInfo.endTime;
                  
                  return <div style={{margin: "5px", padding: "5px"}}>{gtfsState=='0' ? <span>about {durTime} Minutes<br/>{startTime}-{endTime}</span>:<span>about {duText}<br/>{ggdeTime}-{ggArTime}</span>}</div>;
              }
              async function GetTripSchedule(routesSteps) {
                let r = []
                for (let i = 0; i < routesSteps.legs[0].steps.length; i++) {
                    let value = routesSteps.legs[0].steps[i]
                    let div = <div style={{margin: "5px", border: "1px solid #cccccc", padding: "10px"}}><span
                        style={{margin: "5px"}}>{value.instructions}</span>
                        {value.travel_mode == 'TRANSIT' ?
                            await getTripInfo(value.transit.line.short_name,
                              value.transit.departure_stop.name,
                              preTime,
                              value.transit.num_stops,
                              selectValue,
                              value.duration.text,
                              value.transit.departure_time.text,
                              value.transit.arrival_time.text,
                              preTime

                            )
                            : <span>{value.duration.text}</span>
                        }
                        {value.travel_mode == 'TRANSIT' ?
                            value.transit.line.agencies[0].name == 'Dublin Bus' ?
                                <div style={{margin: "5px", padding: "10px"}}><i className='fas fa-bus'></i><span
                                    style={{
                                        background: "#f1c232",
                                        margin: "3px"
                                    }}>{value.transit.line.short_name}</span><span>{value.transit.line.agencies[0].name}</span><br/><span>departure_stop:{value.transit.departure_stop.name}</span><br/><span>stops number:{value.transit.num_stops}</span><br/><span>arrival_stop:{value.transit.arrival_stop.name}</span>
                                </div> :
                                value.transit.line.agencies[0].name == 'Go-Ahead' ?
                                    <div style={{margin: "5px", padding: "10px"}}><i className='fas fa-bus'></i><span
                                        style={{
                                            background: "#3c78d8",
                                            margin: "3px"
                                        }}>{value.transit.line.short_name}</span><span>{value.transit.line.agencies[0].name}</span><br/><span>departure_stop:{value.transit.departure_stop.name}</span><br/><span>stops number:{value.transit.num_stops}</span><br/><span>arrival_stop:{value.transit.arrival_stop.name}</span><br/>
                                    </div> :
                                    value.transit.line.agencies[0].name == 'Green Line' ?
                                        <div style={{margin: "5px", padding: "10px"}}><i
                                            className='fas fa-train'></i><span style={{
                                            background: "#93c47d",
                                            margin: "3px"
                                        }}>{value.transit.line.short_name}</span><br/><span>departure_stop:{value.transit.departure_stop.name}</span><br/><span>stops number:{value.transit.num_stops}</span><br/><span>arrival_stop:{value.transit.arrival_stop.name}</span>
                                        </div> :
                                        value.transit.line.short_name == 'Green Line' ?
                                            <div style={{margin: "5px", padding: "10px"}}><i
                                                className='fas fa-train'></i><span style={{
                                                background: "#93c47d",
                                                margin: "3px"
                                            }}>{value.transit.line.short_name}</span><br/><span>departure_stop:{value.transit.departure_stop.name}</span><br/><span>stops number:{value.transit.num_stops}</span><br/><span>arrival_stop:{value.transit.arrival_stop.name}</span>
                                            </div> :
                                            value.transit.line.agencies[0].name == 'Dublin Express' ?
                                                <div style={{margin: "5px", padding: "10px"}}><span style={{
                                                    background: "#073763",
                                                    color: "#ffffff",
                                                    margin: "3px"
                                                }}>{value.transit.line.short_name}</span><br/><span>departure_stop:{value.transit.departure_stop.name}</span><br/><span>stops number:{value.transit.num_stops}</span><br/><span>arrival_stop:{value.transit.arrival_stop.name}</span>
                                                </div> :
                                                value.transit.line.agencies[0].name == 'Aircoach' ?
                                                    <div style={{margin: "5px", padding: "10px"}}><span
                                                        style={{margin: "3px"}}><i
                                                        className='fas fa-bus'></i></span><span>{value.transit.line.agencies[0].name}</span><br/><span>departure_stop:{value.transit.departure_stop.name}</span><br/><span>stops number:{value.transit.num_stops}</span><br/><span>arrival_stop:{value.transit.arrival_stop.name}</span>
                                                    </div> :
                                                    <div></div>
                            : <div></div>}

                    </div>
                    r.push(div)
                }
                return r;
            }


                render(

                    <div style={{border: "1px solid #cccccc",padding:"10px"}}><span>   Details of the route:</span>
                    <div style={{
                      background:"#d9d9d9",
                      border: "1px solid #cccccc",
                      padding:"10px"}}>{routesSteps.legs[0].start_address}</div>
                    {await GetTripSchedule(routesSteps)}
                    <div style={{background:"#d9d9d9",border: "1px solid #cccccc",padding:"10px"}}>{routesSteps.legs[0].end_address}</div></div>,
                    document.getElementById('stepInfo')

                );

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

    async function changePos() {
      var exchage=startRef.current.value
      startRef.current.value=destinationRef.current.value
      destinationRef.current.value=exchage

  }
  async function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                  };
                  setPos(pos)
                  console.log(pos)
                  getMarkerAddress(pos).then(markers => {
                      console.log(markers)
                      //setLocalPosition(markers.results[0].formatted_address)
                      startRef.current.value = markers.results[0].formatted_address
                  });
              },
              () => {
                  console.log("Positioning not supported")
              }
          );
      }

  }

  function initGeo() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                  };
                  setPos(pos)
                  console.log(pos)
                  getMarkerAddress(pos).then(markers => {
                      console.log(markers)
                      //setLocalPosition(markers.results[0].formatted_address)
                      startRef.current.value = markers.results[0].formatted_address
                  });
              },
              () => {
                  console.log("Positioning not supported")
              }
          );
      }
  }    
    
    let isSaveAsMyFavRoute

    localStorage.getItem("user_token") ? isSaveAsMyFavRoute = true : isSaveAsMyFavRoute = false

    function addFavoriteRoute() {
        let starting = document.getElementById("start_point").value;
        console.log("start is: " + starting);
        let ending = document.getElementById("end_point").value;
        console.log("end is: " + ending);
        console.log("userid: " + userid);

        fetch('http://127.0.0.1:8000/loginapi/addfavorites/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'user':userid, 'start_point': starting, 'destination': ending})
        }).then(
            response => response.json()
            )
            .catch( error => console.error(error))



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
            {isSaveAsMyFavRoute ? <button type="submit" className="btn-save" onClick={addFavoriteRoute}>Save as My Favorite Route</button> : null}
            <div className="container1">
                <Autocomplete onChange={e => {setStartPoint(e.target.value)}} options={{
                    bounds: defaultBounds,
                    componentRestrictions: { country: ["IE"] },
                    fields: ["place_id", "geometry", "name"],
                    strictBounds: true,
                }}>
                    <input type="search" placeholder="Start Point" className="box" ref={startRef} onChange = { e => {clearRoute(); } } id="start_point"></input>
                    
                </Autocomplete>
                <div className="iconGeoL" onClick={getLocation}><i style={{fontSize:'18px'}} class="fas fa-map-marker-alt"></i>
                </div>
                </div>
        
                <div className="container1">
                <Autocomplete options={{
                    bounds: defaultBounds,
                    componentRestrictions: { country: ["IE"] },
                    fields: ["place_id", "geometry", "name"],
                    strictBounds: true,
                }}>
                    <input type="search" placeholder="Destination" className="box" ref={destinationRef} onChange={clearRoute} id="end_point"></input>
                </Autocomplete>  
                <div className="iconSwitch" onClick={changePos}><i style={{fontSize:'20px'}} class="fas fa-sort"></i>
                </div>
                </div>
                <label for="time">Choose a time to start the journey: </label>
                <select id="option" value={selected} onChange={changeSelected}>
                    <option value="now">Leave Now</option>
                    <option value="depart">Depart At</option>
                    <option value="arrive">Arrive By</option>
                    
                </select>
                {/* add the html input datetime element or not */}
                {booleanValue ? <div id="time"><input type="datetime-local" id="datetime" min={minTime} onChange={handleChange} value={dateTime}></input></div> : null}
                <button type="submit" className="btn" onClick={caculateRoute}>Search</button>
            </div>
            <div id='panels'>
                <div id="panel" style={{height:'auto'}}></div>
                <div id="stepInfo" style={{height:'auto'}}></div>
            </div>

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
                    options={{ styles: [
                      {  
                      featureType: "transit", 
                      stylers: [{ visibility: "off", }], 
                    },
                  
                    {
                      featureType: "poi",
                      stylers: [{ visibility: "off" }],
                    },
                  
                  ], }}
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
          <div className="container">
          <i class="fas fa-bus"></i> <h3>&nbsp;&nbsp;{infowindows.stopname}</h3>
          </div>
            <div className="container">
            {goAheadList.length>0 && goAheadList.map((line,i) => {
               return <div className="stop-line-goahead"><p>{line}</p></div>
            })}
            </div>
            <div className="container">
            {dublinBusList.length>0 && dublinBusList.map((line,i) => {
               return <div className="stop-line-dublinbus"><p>{line}</p></div>
            })}
            </div>
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
                    {directionsResponse && (<DirectionsRenderer directions={directionsResponse}  routeIndex={routeNum}/>)}
                </GoogleMap>
        </div>
   </>);}
export default JourneyPlanning;