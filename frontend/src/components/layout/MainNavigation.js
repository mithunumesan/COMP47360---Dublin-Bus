import { Link } from 'react-router-dom';

function MainNavigation() {
    return <header className="header">
        <div class="logo"> <i class="fas fa-bus"></i> Dublin Bus </div>

        <nav className="navbar">
            <Link to='/' className="journeyPlanning">Journey Planning</Link>
            <Link to='/leapcardlogin'  className="leapCard">Leap Card</Link>
            <Link to='/weather'  className="weather">Weather</Link>
        </nav>

        <div className="icons">
            <div id="menu-btn" className="fas fa-bars"></div>
            <div id="login-btn" className="fas fa-users" onClick = {() => {
                let navbar = document.querySelector('.navbar');
                let loginForm = document.querySelector('.login-form');
                    loginForm.classList.toggle('active');
                    navbar.classList.remove('active');
                }}>
            
        </div>
        </div>

        <form action="" className="login-form">
            <h3>log In</h3>
            <input type="email" placeholder="enter your email" className="box"></input>
            <input type="password" placeholder="enter your password" className="box"></input>
            <div className="remember">
                <input type="checkbox" name="" id="remember-me"></input>
                <label for="remember-me">remember me</label>
            </div>
            <input type="submit" value="login now" className="btn"></input>
            <p>don't have an account? <button>Sign Up</button></p>
        </form>

    </header>;
}

export default MainNavigation;