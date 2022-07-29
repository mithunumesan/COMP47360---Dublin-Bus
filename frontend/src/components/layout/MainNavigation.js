import { Link, useNavigate } from 'react-router-dom';
import {useState} from 'react';
import WeatherCard from './WeatherCard';
import LoginForm from './LoginForm';
import useUserToken from '../../pages/Home';


function MainNavigation() {

    const navigate = useNavigate();
    
    let logOut = () => {
        
        localStorage.removeItem("user_token");
        navigate('/login');
    }
    


    const token = useUserToken();
    let logintest;
    let logout;


    let userToken = localStorage.getItem("user_token");

    userToken? logout = <button onClick={logOut}>Logout</button> : logout = null

    userToken? logintest = <Link to='/home'  className="leapCard">Home</Link>
    :          logintest = <Link to='/login'  className="leapCard">My Account</Link>


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
            {logintest}
            <Link to='/weather'  className="weather">Weather</Link>
        </nav>

        <div className="icons">
            <div id="menu-btn" className="fas fa-cloud-sun" onClick={openWeatherCard}></div>
            <div id="login-btn" className="fas fa-users" onClick = {openLoginForm}>
            <div id="weather-btn" className=""></div>     
        </div>
        </div>
        {logout}
        {loginFromIsOpen ? <LoginForm /> : null}
        {weatherCardIsOpen ? <div className='weather-card'><WeatherCard boolean={false} /></div> : null}
    </header>
    );
}

export default MainNavigation;