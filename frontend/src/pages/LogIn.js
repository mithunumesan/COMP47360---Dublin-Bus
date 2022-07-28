import {useNavigate, Link} from 'react-router-dom';
import { useState } from 'react';

function LogIn() {

    const navigate = useNavigate();
    const navigateToContent = () => {
        navigate('/signup');
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [tokenData, setTokenData] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    }

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
                localStorage.setItem("user_token", data.token);
                console.log(data.token);
                setTokenData(data.token);
                navigate('/home');
            }
        }
        ).catch( error => console.error(error))
    }

    return <div id="leapCardLog">
    <form onSubmit={handleSubmit} action="" className="leapCard-login-form">
        <h3>First, please login to your account</h3>
        <input type="text" name ="username" placeholder="enter your account" className="leapCard-box" 
        value={username} onChange={(e) => setUsername(e.target.value)} required></input>
        <input type="password" placeholder="enter your password" className="leapCard-box"
        value={password} onChange={(e) => setPassword(e.target.value)} required></input>
        <input id="leapcardbtn"  type="submit" value="login now" className="leapCard-btn" onClick={logging}></input>
        
        <button onClick={navigateToContent}> Sign Up</button>
    </form>
</div>;
}
export default LogIn;