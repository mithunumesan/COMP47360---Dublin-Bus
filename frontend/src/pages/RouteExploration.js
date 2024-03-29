import React from 'react'
import { useJsApiLoader,GoogleMap,Marker } from '@react-google-maps/api';
import { useRef,useState,useEffect,useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getRoutes } from "../components/routes";
import { getTrips } from "../components/trips";
import { getShape } from "../components/shape";
import * as Icons from "react-icons/hi";
import * as Iconsgo from "react-icons/go";
import { RiRadioButtonFill } from "react-icons/ri";
import { Polyline } from '@react-google-maps/api';
import Themesmap from './Themesmap';



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
    const [mapTheme, setThemes] = useState(Themesmap.lightmap);


    const [showbutton, setShowbutton] = useState(true);

    function changeState() {
      setShowbutton(!showbutton);
    }
  
    
    const updateThemes = (style = "") => setThemes(Themesmap[style] || []);

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

    const [searchIcon,setSearchIcon] = useState(false)
      
    useEffect(() => {
        const loadUsers =async() => {
            const response = await getRoutes()
            // console.log('finds',response)
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
        // console.log(matches)
        setSuggestions(matches)
        setText(text)
    }

    const onSuggestHandler = (text)=> {
        setValue(0)
        setSearchIcon(true)
        setDisplay(false)
        setText(text);
        setSuggestions([])
        //cause there is no break in forEach react js
        for(var i=0;i<finds.length;i++) {
            if(finds[i].routeshortname===text){
                // console.log('text',text)
                routeResult = finds[i]
                // console.log('routeResult',routeResult)
                break
            }
        }
        let shapeList = routeResult.shapeidlist
        shapeList = shapeList.split(',')
        // console.log(shapeList)
        
        shapeDdirection1=[]
        shapeDdirection0=[]
        shapeList.forEach(shape => {
            if(shape.endsWith('O')) {
                shapeDdirection0.push(shape) 
            } else if(shape.endsWith('I')) {
                shapeDdirection1.push(shape)
            }
        });

        // console.log('direction1',shapeDdirection1)
        // console.log('direction0',shapeDdirection0)
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
        // console.log(shapeDirection[0])
        const para = shapeDirection[0]
        const result = await getTrips(para)
        result[0].jsoninfo=JSON.parse(result[0].jsoninfo)
        result[0].shapeinfo=JSON.parse(result[0].shapeinfo)
        setRouteInfo(result)
        console.log('trips',result)
        setPathInfo(result[0].shapeinfo)
    
        // console.log("path",shape)
        // routeInfo.forEach(element => {
        //     console.log(element.stopname)
        // });
        setDisplay(true)
        setSearchIcon(false)
    }
    }
    //set css class name line option active or not
    const [value, setValue] = useState(0);
    async function changeRoute(i) {
        // document.getElementById(i).innerHTML = '{<Iconsgo.GoPrimitiveDot style={{color:"#f1c232"}}/>}'; 
        // e.currentTarget.style.backgroundColor="red";
        setValue(i)
        
        setPathInfo([])
        setRouteInfo([])
        const para = shapeDirection[i]
        const result = await getTrips(para)
        result[0].jsoninfo=JSON.parse(result[0].jsoninfo)
        result[0].shapeinfo=JSON.parse(result[0].shapeinfo)
        setRouteInfo(result)
        console.log('trips',result)
        setPathInfo(result[0].shapeinfo)   
        setDisplay(true)
    }

    async function changeDirection() {
        setValue(0)
        console.log("cahnge Direction")
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
    }

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: localStorage.getItem("mapsKey"), 
        // "AIzaSyCdf-x6SluXsWzP9qpwxVGBY08pm_3TAQU",
    libraries:['places']
  })
    
    const onLoad = useCallback((map) => setMap(map), []);
    useEffect(() => {
    
      if(map && routeInfo.length>0) {
        const bounds = new window.google.maps.LatLngBounds();
        routeInfo[0].jsoninfo.map(marker => {
        bounds.extend({
          lat: marker.latitude,
          lng: marker.longitude,
        });
      });
      map.fitBounds(bounds);
    }
    }, [routeInfo,map]);

    useEffect(() =>{
        if(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        map.setZoom(13);
        }
    },[map])

      if(!isLoaded) {
        return "map is not loaded";
    }

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
            <div className="journey-form-route">
            <div className="input-icons">
            <i className="fas fa-bus icon"></i><input type="search" placeholder="Search for a line" class="input-field" value={text} onChange= {e => onChangeHandler(e.target.value)}></input>
            </div>        
                    <div className='search-results'>
                    { !display && suggestions.length===0 && finds.length>0 &&!searchIcon && finds.map((suggestion,i) =>
                        <div key={i} className="search-result" onClick={()=>onSuggestHandler(suggestion.routeshortname)}>
                            <i class="fas fa-bus"></i>&nbsp;&nbsp;{suggestion.routeshortname} &nbsp;&nbsp; {suggestion.routelongname}</div>
                    )}
                    {!display && (suggestions.length>0) &&!searchIcon && suggestions.map((suggestion,i) =>
                        <div key={i} className="search-result" onClick={()=>onSuggestHandler(suggestion.routeshortname)}>
                            <i class="fas fa-bus"></i>&nbsp;&nbsp;{suggestion.routeshortname} &nbsp;&nbsp; {suggestion.routelongname}</div>
                    )}
                    {/* Display Search Icon */}
                    {(((!pathInfo.length>0 || !routeInfo.length>0)&& display) || (!display && suggestions.length===0 && !finds.length>0)|| searchIcon) 
                    && <div className='search-icon'><Icons.HiSearchCircle style={{fontSize:'200px',color:"#c2e7fe"}} /></div>}

                    <div className={display&& pathInfo.length>0 && routeInfo.length>0 ? 'line-header-active' : 'line-header'}>
                    {display && pathInfo.length>0 && routeInfo.length>0 
                    && <h2>{routeInfo[0].tripheadsign}</h2>}
                    {display && pathInfo.length>0 && routeInfo.length>0 && ((shapeDirection===shapeDdirection0&&shapeDdirection1.length>0) || (shapeDirection===shapeDdirection1&&shapeDdirection0.length>0)) &&  <button className='change-direction' type="button" onClick={changeDirection}>Change Direction</button>}
                    </div>
                    {display && pathInfo.length>0 && routeInfo.length>0 && 
                    <div className="line-option"><h3>Line option - {routeInfo[0].jsoninfo[routeInfo[0].jsoninfo.length-1].stopsequence} stops</h3>
                    <div className='container'>{shapeDirection.map((element,i)  => {
                        return <div key={i} id={i} className="route-option" onClick={()=>changeRoute(i)}>{<Iconsgo.GoPrimitiveDot style={{color: value===i ? "#80ceff": '#A9A9A9'}}/>}</div>
                    })}
                    </div>
                    </div>}
                    
                    <div className="stop-names">
                    {display && pathInfo.length>0 && routeInfo.length>0 && routeInfo[0].jsoninfo.map((info,i) =>
                        <div key={i} className="stop-name">{<RiRadioButtonFill />}&nbsp;&nbsp;<p>{info.stopname}</p></div>
                    )}
                    </div>
                    </div>
                  
            </div>
            
            <div className={sidebar ? 'sidebar-toggle' : 'sidebar-toggle-off'}>
            {sidebar ? <Icons.HiChevronDoubleLeft style={{fontSize:'22px'}} onClick={notShowSidebar} /> : <Icons.HiChevronDoubleRight style={{fontSize:'22px'}} onClick={showSidebar}/>}
        </div>
        </div>
        
        <div className="box2">
              
        <div className="btn-group-map"
            role="group"
            aria-label="Basic example"
                    >
                        {showbutton ? (
        <button
        type="button"
        className="btn-darkmode"
        onClick={() => {updateThemes("darkmap");changeState();}}
    >
        ☾
    </button>
      ) : (
        <button
        type="button"
        className="btn-lightmode"
        onClick={() => {updateThemes("lightmap");changeState();}}
    >
       ☼
    </button>
      )}
                       
                    </div>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={10}
                    onLoad={onLoad}
                    options={{ styles: mapTheme,streetViewControl: false}} 
                    >
                    { /* Child components, such as markers, info windows, etc. */ }
                    {pathInfo.length>0 && routeInfo.length>0 && (routeInfo[0].jsoninfo.map((marker, index) => (
                     <Marker
                    key={index}
                    position={{ lat:marker.latitude, lng:marker.longitude  }}
                    icon = {{url: (require('./radio-button-48.png')),
                    scaledSize:{ width: 20, height: 20},
                    anchor:new window.google.maps.Point(10, 10)}
                    }
                     />)
                     )) 
                     } 
                     <Polyline path={pathInfo} 
                     options={{strokeWeight:7,strokeColor:"#B22222",strokeOpacity: 0.85}}/>
                     
                </GoogleMap>
        </div>
    </>);}



export default RouteExploration;