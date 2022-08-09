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
    const [invalid, setInvalid] = useState('');
    const [changed, setChanged] = useState(false);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const logging = () => {
        console.log(username, password);
        fetch('https://137.43.49.30:443/auth/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'username':username, 'password': password})
        })
        .then( data => data.json())
        .then(
        data => {
            
            if(data.token){
                console.log(data);
                localStorage.setItem("user_token", data.token);
                console.log(data.token);
                setTokenData(data.token);
                navigate('/home');
            }
            else{
                setChanged(true);
                setInvalid(data['non_field_errors'][0]);
                console.log("ammachipamb");
                // console.log();
            }
        }
        ).catch( 
            
            error => {console.error(error);
            }
            )
    }

    return <div id="leapCardLog">
    <form onSubmit={handleSubmit} action="" className="leapCard-login-form">
        <h3>First, please login to your account</h3>
        <input type="text" name ="username" placeholder="enter your account" className="leapCard-box" 
        value={username} onChange={(e) => setUsername(e.target.value)} required></input>
        <input type="password" placeholder="enter your password" className="leapCard-box"
        value={password} onChange={(e) => setPassword(e.target.value)} required></input>

        {changed && <h4 style={{color:"red", paddingTop:7, paddingBottom:10, paddingLeft:3}}>{invalid}</h4>}

        <input id="leapcardbtn"  type="submit" value="login now" className="sign-up-btn" onClick={logging}></input>
        
        <div style={{paddingTop:5}}>Don't Have An Account? <button className="sign-up-btn" onClick={navigateToContent}> Sign Up</button></div>
    </form>
</div>;
}
export default LogIn;