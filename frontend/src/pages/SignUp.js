import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

function SignUp() {
    const navigate = useNavigate();
    const navigateToContent = () => {
        navigate('/login');
    }
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    
    let changed = false;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const logging = () => {
        console.log(username, password);
        fetch('http://127.0.0.1:8000/loginapi/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'username':username, 'password': password})
        }).then(
            response => response.json()
            ).then( data => {if(data.username[0] === "A user with that username already exists."){
                console.log(data.username[0]);
                changed = true;
            }
            else{
                navigateToContent();
            }
        })
            .catch( error => console.error(error))
    }

    return <div id="leapCardLog">
    <form onSubmit={handleSubmit} action="" className="leapCard-login-form">
        <h3>First, please login to your account</h3>
        <input type="text" name ="username" placeholder="enter your account" className="leapCard-box" 
        value={username} onChange={(e) => setUsername(e.target.value)} required></input>
        <input type="password" placeholder="enter your password" className="leapCard-box"
        value={password} onChange={(e) => setPassword(e.target.value)} required></input>
        <input type="password" placeholder="enter your password again" className="leapCard-box"
        value={password2} onChange={(e) => setPassword2(e.target.value)} required></input>
        <input id="leapcardbtn"  type="submit" value="sign up" className="leapCard-btn" onClick={logging}></input>
        {false || changed } 
    </form>
</div>;
}
export default SignUp;