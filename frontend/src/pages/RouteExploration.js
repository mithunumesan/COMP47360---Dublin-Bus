import { Route } from "react-router-dom";
import { useJsApiLoader,GoogleMap,Marker } from '@react-google-maps/api';
import { useRef,useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRoutes } from "../components/routes";
import * as Icons from "react-icons/hi";


const containerStyle = {
    width: '100%',
    height: '100%'
  };
  

const center = {
    lat: 53.3463,
    lng: -6.2631
  };



function searchLine() {

}

 

// reference from react autocomplete search from api https://www.youtube.com/watch?v=Q2aky3eeO40

function RouteExploration() {

    //set sidebar toggle variable
    const [sidebar,setSidebar] = useState(true)
    const notShowSidebar = () => setSidebar(false)
    const showSidebar = () => setSidebar(true)

    const[text,setText] =useState('')

    const[finds,setFinds] = useState([])

    const[suggestions, setSuggestions]= useState([])

    useEffect(() => {
        const loadUsers =async() => {
            const response = await getRoutes()
            console.log(response)
            setFinds(response)
        }
        loadUsers();
    },[])

    const onChangeHandler =(text) => {
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
        setText(text);
        setSuggestions([])
    }

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCdf-x6SluXsWzP9qpwxVGBY08pm_3TAQU",
    libraries:['places']
  })
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
            <div className="journey-form">
                    <input type="search" placeholder="Search for a line" className="box" value={text} onChange= {e => onChangeHandler(e.target.value)}></input>
                    <div className='search-results'>
                    {suggestions && suggestions.map((suggestion,i) =>
                        <div key={i} className="search-result" onClick={()=>onSuggestHandler(suggestion.routeshortname)}><i class="fas fa-bus"></i>&nbsp;&nbsp;{suggestion.routeshortname} &nbsp;&nbsp; {suggestion.routelongname}</div>
                    )}
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
                </GoogleMap>
        </div>

    </>);}



export default RouteExploration;