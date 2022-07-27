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
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const logging = () => {
        console.log(username, password);
        fetch('http://127.0.0.1:9224/loginapi/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'username':username, 'password': password})
        }).then(
            response => console.log(response.json())
            )
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
        
    </form>
</div>;
}
export default SignUp;