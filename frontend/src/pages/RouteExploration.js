import { Route } from "react-router-dom";
import { useJsApiLoader,GoogleMap,Marker } from '@react-google-maps/api';
import { useRef,useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRoutes } from "../components/routes";
import { getTrips } from "../components/trips";
import { getShape } from "../components/shape";
import * as Icons from "react-icons/hi";
import { Polyline } from '@react-google-maps/api';




const containerStyle = {
    width: '100%',
    height: '100%'
  };
  

const center = {
    lat: 53.3463,
    lng: -6.2631
  };

 

// reference from react autocomplete search from api https://www.youtube.com/watch?v=Q2aky3eeO40
let shapeDdirection0 = []
let shapeDdirection1 = []
let shapeDirection = []
let isDirection0 = true

function RouteExploration() {

    //set sidebar toggle variable
    const [sidebar,setSidebar] = useState(true)
    const notShowSidebar = () => setSidebar(false)
    const showSidebar = () => setSidebar(true)

    const[text,setText] =useState('')

    const[finds,setFinds] = useState([])

    const[suggestions, setSuggestions]= useState([])

    let routeResult = []

    const [routeInfo,setRouteInfo] = useState([]);

    const [pathInfo,setPathInfo] = useState([]);

    const [display,setDisplay] = useState(false)

    const mapRef = useRef(null);

      // Fit bounds function
      function fitBound(map) {
        const bounds = new window.google.maps.LatLngBounds();
        routeInfo.map(marker => {
          bounds.extend({ lat:marker.latitude, lng:marker.longitude });
        });
        mapRef.current.value =  map.fitBounds(bounds)
      };

      

    useEffect(() => {
        const loadUsers =async() => {
            const response = await getRoutes()
            console.log('finds',response)
            setFinds(response)
        }
        loadUsers();
    },[])

    const onChangeHandler =(text) => {
        setDisplay(false)
        let matches =[]
        if(text.length>0) {
             matches = finds.filter(find =>{
                const regex = new RegExp('^'+text,'gi')
                return find.routeshortname.match(regex)
             });
        };
        console.log(matches)
        setSuggestions(matches)
        setText(text)
    }
        const onSuggestHandler = (text)=> {
        setDisplay(false)
        setText(text);
        setSuggestions([])
        //cause there is no break in forEach react js
        for(var i=0;i<finds.length;i++) {
            if(finds[i].routeshortname===text){
                console.log('text',text)
                routeResult = finds[i]
                console.log('routeResult',routeResult)
                break
            }
        }
        let shapeList = routeResult.shapeidlist
        shapeList = shapeList.split(',')
        console.log(shapeList)
        
        shapeDdirection1=[]
        shapeDdirection0=[]
        shapeList.forEach(shape => {
            if(shape.endsWith('O')) {
                shapeDdirection0.push(shape) 
            } else if(shape.endsWith('I')) {
                shapeDdirection1.push(shape)
            }
        });

        console.log('direction1',shapeDdirection1)
        console.log('direction0',shapeDdirection0)
        if(shapeDdirection0.length>0) {
            shapeDirection = shapeDdirection0
        } else {
            shapeDirection = shapeDdirection1
        }
        
        load(shapeDirection)
    }

    async function load(shapeDirection){
        setPathInfo([])
        setRouteInfo([])
        if(shapeDirection.length>0) {
        console.log(shapeDirection[0])
        const para = shapeDirection[0]
        const result = await getTrips(para)
        setRouteInfo(result)
        console.log('trips',result)
        const shape = await getShape(para)
        setPathInfo(shape)
        console.log("path",shape)
        routeInfo.forEach(element => {
            console.log(element.stopname)
        });
        setDisplay(true)
    }
    }

    async function changeRoute(i) {
        setPathInfo([])
        setRouteInfo([])
        const para = shapeDirection[i]
        const result = await getTrips(para)
        setRouteInfo(result)
        console.log('trips',result)
        const shape = await getShape(para)
        setPathInfo(shape)   
        routeInfo.forEach(element => {
            console.log(element.stopname)
        });
        setDisplay(true)
    }

    async function changeDirection() {
        setPathInfo([])
        setRouteInfo([])
        if(isDirection0 && shapeDdirection1.length>0) {
            shapeDirection = shapeDdirection1
            load(shapeDirection)
            isDirection0 = false
        } else if( !isDirection0 && shapeDdirection0.length>0) {
            shapeDirection = shapeDdirection0
            load(shapeDirection)
            isDirection0 = true
        }
        // const para = shapeDirection[0]
        // const result = await getTrips(para)
        // setRouteInfo(result)
    }

    

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCdf-x6SluXsWzP9qpwxVGBY08pm_3TAQU",
    libraries:['places']
  })
      if(!isLoaded) {
        return "map is not loaded";
    }

    // Fit bounds on mount, and when the markers change
  
    

    return  (<>
        <div className={sidebar ? 'box1 active' : 'box1'}>
            <div className="container">
                <div className="link1">
                    <Link to="/" ><h1 style={{color: '#666'}}>Journey Planner</h1></Link>
                </div>
                <div className="link2">
                    <Link to='/routesexploration'><h1 style={{color: '#666'}}>Route Exploration</h1></Link>
                </div>
            </div>
            <div className="journey-form">
                    <input type="search" placeholder="Search for a line" className="box" value={text} onChange= {e => onChangeHandler(e.target.value)}></input>
                    
                    <div className='search-results'>
                    {((!display && suggestions.length===0)) && finds.length>0 && finds.map((suggestion,i) =>
                        <div key={i} className="search-result" onClick={()=>onSuggestHandler(suggestion.routeshortname)}><i class="fas fa-bus"></i>&nbsp;&nbsp;{suggestion.routeshortname} &nbsp;&nbsp; {suggestion.routelongname}</div>
                    )}
                    {(!display && suggestions.length>0) && suggestions.map((suggestion,i) =>
                        <div key={i} className="search-result" onClick={()=>onSuggestHandler(suggestion.routeshortname)}><i class="fas fa-bus"></i>&nbsp;&nbsp;{suggestion.routeshortname} &nbsp;&nbsp; {suggestion.routelongname}</div>
                    )}
                    {((!pathInfo.length>0 || !routeInfo.length>0) || (!display && suggestions.length===0 && !finds.length>0 )) && <Icons.HiSearchCircle style={{fontSize:'100px'}} />}
                    {display && pathInfo.length>0 && routeInfo.length>0 && <h1>{routeInfo[0].tripheadsign}</h1>}
                    {display && pathInfo.length>0 && routeInfo.length>0 && ((shapeDirection===shapeDdirection0&&shapeDdirection1.length>0) || (shapeDirection===shapeDdirection1&&shapeDdirection0.length>0)) && <button onClick={changeDirection}>Change Direction</button>}
                    {display && pathInfo.length>0 && routeInfo.length>0 && <h3>Line option - {routeInfo[routeInfo.length-1].stopsequence} stops</h3>}
                    {display && pathInfo.length>0 && routeInfo.length>0 && shapeDirection.map((element,i)  => {
                        return <div key={i} className="route-option" onClick={()=>changeRoute(i)}><button>option</button></div>
                    })}
                    <div className="stop-names">
                    {display && pathInfo.length>0 && routeInfo.length>0 && routeInfo.map((info,i) =>
                        <div key={i} className="stop-name">{info.stopname}</div>
                    )}
                    </div>
                    
                    </div>
            </div>
            
            <div className={sidebar ? 'sidebar-toggle' : 'sidebar-toggle-off'}>
            {sidebar ? <Icons.HiChevronDoubleLeft style={{fontSize:'22px'}} onClick={notShowSidebar} /> : <Icons.HiChevronDoubleRight style={{fontSize:'22px'}} onClick={showSidebar}/>}
        </div>
        </div>
        
        <div className="box2">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={13}
                    onLoad={map => setMap(map)}
                    >
                    { /* Child components, such as markers, info windows, etc. */ }
                    {pathInfo.length>0 && routeInfo.length>0 && (routeInfo.map((marker, index) => (
                     <Marker
                    key={index}
                    position={{ lat:marker.latitude, lng:marker.longitude  }}
                    icon = {{url: (require('./circle-16.png')),
                    
                    scaledSize:{ width: 10, height: 10}}}
                     />)
                     )) 
                     } 
                     <Polyline path={pathInfo} 
                     options={{strokeWeight:7,strokeColor:"#B22222",strokeOpacity: 0.85}}/>
                     
                </GoogleMap>
        </div>
    </>);}



export default RouteExploration;