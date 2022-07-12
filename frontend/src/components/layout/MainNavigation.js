import { Link } from 'react-router-dom';
import {useState} from 'react';
import WeatherCard from './WeatherCard';
import LoginForm from './LoginForm';

function MainNavigation() {
    const [loginFromIsOpen, setLoginFormOpen] = useState(false);
    const [weatherCardIsOpen, setWeatherCard] = useState(false);

    function openLoginForm() {
        if(loginFromIsOpen===false || weatherCardIsOpen===true){
            setLoginFormOpen(true);
            setWeatherCard(false);
        } else {
            setLoginFormOpen(false);
        }
    }

    function openWeatherCard() {
        if(weatherCardIsOpen===false || loginFromIsOpen===true){
            setWeatherCard(true);
            setLoginFormOpen(false);
        } else {
            setWeatherCard(false);
        }
    }

    window.onscroll= () => {
        setLoginFormOpen(false);
        setWeatherCard(false);
    }

    return (<header className="header">
        <div class="logo"> <i class="fas fa-bus"></i> Dublin Bus </div>

        <nav className="navbar">
            <Link to='/' className="journeyPlanning">Journey Planner</Link>
            <Link to='/leapcardlogin'  className="leapCard">Leap Card</Link>
            <Link to='/weather'  className="weather">Weather</Link>
        </nav>

        <div className="icons">
            <div id="menu-btn" className="fas fa-cloud-sun" onClick={openWeatherCard}></div>
            <div id="login-btn" className="fas fa-users" onClick = {openLoginForm}>
            <div id="weather-btn" className=""></div>
            
            
        </div>
        </div>
        {loginFromIsOpen ? <LoginForm /> : null}
        {weatherCardIsOpen ? <div className='weather-card'><WeatherCard /></div> : null}
    </header>
    );
}

export default MainNavigation;