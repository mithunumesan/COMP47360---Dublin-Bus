import { Route, Routes }  from 'react-router-dom';
import JourneyPlanning from './pages/Journeyplanning';
import LeapCard from './pages/Leapcard';
import LeapCardLogIn from './pages/Leapcardlogin';
import Weather from './pages/Weather';
import MainNavigation from './components/layout/MainNavigation';



function App() {
    //localhost:3000/
    return (<><MainNavigation />
    <section>
        <switch>
            <Routes>
                <Route path='/' element={<JourneyPlanning />}>
                </Route>
                <Route path = '/leapcardlogin' element={<LeapCardLogIn />}>
                </Route>
                <Route path='/leapcard' element={<LeapCard />}>
                </Route>
                <Route path='/weather' element={<Weather />}>
                </Route>
            </Routes>
        </switch>
    </section></>);

}

export default App;