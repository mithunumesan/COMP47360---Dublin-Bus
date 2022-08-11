import { Route, Routes }  from 'react-router-dom';
import JourneyPlanning from './pages/Journeyplanning';
import LeapCard from './pages/Leapcard';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import WeatherCard from './components/layout/WeatherCard';
import MainNavigation from './components/layout/MainNavigation';
import RouteExploration from './pages/RouteExploration';
import LoginForm from './components/layout/LoginForm';
import { useEffect,useState } from 'react';


function App() {
    //localhost:3000/
    const [dataMap,setDataMap]=useState('');

    useEffect(()=>{

        fetch('http://127.0.0.1:8000/loginapi/mapskey')
            .then( data => data.json())
            .then(
            data => {
       
                console.log(data);
                localStorage.setItem("mapsKey",data[0])
                setDataMap(localStorage.getItem("mapsKey")
                )
                }
            ).catch( error => console.error(error))
      
    },[])

    useEffect(()=>{

        fetch('http://127.0.0.1:8000/loginapi/weatherkey')
            .then( data => data.json())
            .then(
            data => {
       
                console.log(data);
                localStorage.setItem("weatherKey",data[0])
    
                }
            ).catch( error => console.error(error))
      
      },[])


    return (<><MainNavigation />
    <section>
        <switch>
            {dataMap?
            <Routes>
                <Route path='/' element={<JourneyPlanning />}>
                </Route>
                <Route path = '/login' element={<LogIn />}>
                </Route>
                <Route path = '/home' element={<Home />}>
                </Route>
                <Route path='/signup' element={<SignUp />}>
                </Route>
                <Route path='/leapcard' element={<LeapCard />}>
                </Route>
                <Route path='/weather' element={<WeatherCard props={true} />}>
                </Route>
                <Route path='/routesexploration' element={<RouteExploration />}>
                </Route>
            </Routes>:null}
        </switch>
    </section></>);

}

export default App;