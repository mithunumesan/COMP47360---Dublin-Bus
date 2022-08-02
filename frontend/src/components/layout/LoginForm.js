import {useNavigate} from 'react-router-dom';
import {useState} from 'react';


function LoginForm() {

    const navigate = useNavigate();
    const navigateToContent = () => {
        navigate('/signup');
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [tokenData, setTokenData] = useState('');

    const logging = () => {
        console.log(username, password);
        fetch('http://127.0.0.1:8000/auth/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'username':username, 'password': password})
        })
        .then( data => data.json())
        .then(
        data => {
            if(data.token){
                console.log(data.user);
                localStorage.setItem("user_token", data.token);
                setTokenData(data.token);
                navigate('/');
            }
        }
        ).catch( error => console.error(error))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return(
    
            <form onSubmit={handleSubmit} action="" className="login-form">
                <h3>log In</h3>
                
                <input type="text" name ="username" placeholder="enter your account" className="box" 
                value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                <input type="password" placeholder="enter your password" className="box"
                value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                        
                <div className="remember">
                    <input type="checkbox" name="" id="remember-me"></input>
                    <label for="remember-me">remember me</label>
                </div>
                <input type="submit" value="login now" className="btn" onClick={logging}></input>
                <p>don't have an account? <button className='sign-up-btn' onClick={navigateToContent}>Sign Up</button></p>
            </form>)
    }

export default LoginForm;