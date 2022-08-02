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



function App() {
    //localhost:3000/

    return (<><MainNavigation />
    <section>
        <switch>
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
            </Routes>
        </switch>
    </section></>);

}

export default App;