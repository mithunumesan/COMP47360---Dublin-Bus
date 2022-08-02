import { Link, useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react';
import WeatherCard from './WeatherCard';
import LoginForm from './LoginForm';
import useUserToken from '../../pages/Home';
import { RiLogoutCircleRFill } from "react-icons/ri";
import UserProfile  from './UserProfile';


function MainNavigation() {

    const navigate = useNavigate();
    
    let logOut = () => {
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_id");

        navigate('/login');
    }
    
    const token = useUserToken();
    
    let logintest;
    let userToken = localStorage.getItem("user_token");
    let booleanValue
    

    userToken ? logintest = <Link to='/home'  className="leapCard">Home</Link>
    :          logintest = <Link to='/login'  className="leapCard">My Account</Link>

    const [loginFromIsOpen, setLoginFormOpen] = useState(false);
    const [weatherCardIsOpen, setWeatherCard] = useState(false);
    const [myProfile, setMyProfile] = useState(false);
    
    userToken ? booleanValue = false : booleanValue = true

    function openLoginForm() {
        if(booleanValue) {
            if(loginFromIsOpen===false || weatherCardIsOpen===true){
                setLoginFormOpen(true);
                setWeatherCard(false);
            } else {
                setLoginFormOpen(false);
            }
        } else if(!myProfile){
            setMyProfile(true)
            setWeatherCard(false)
        }else if(myProfile) {
            setMyProfile(false)
        }
    }

    function openWeatherCard() {
        if(weatherCardIsOpen===false || loginFromIsOpen===true || myProfile===true){
            setWeatherCard(true);
            setLoginFormOpen(false);
            setMyProfile(false);
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
            <div id="menu-btn"><div className="fas fa-cloud-sun" onClick={openWeatherCard}></div></div>
            <div id="login-btn"><div className="fas fa-users" onClick = {openLoginForm}></div></div>
            {userToken ? <div id="logout-btn"><RiLogoutCircleRFill style={{fontSize:'20px'}} onClick={logOut} /></div>:  null}
        </div>
        
        {(loginFromIsOpen&&booleanValue) ? <LoginForm /> : null}
        {myProfile ? <UserProfile /> : null}
        {weatherCardIsOpen ? <div className='weather-card'><WeatherCard boolean={false} /></div> : null}
    </header>
    );
}
export default MainNavigation;