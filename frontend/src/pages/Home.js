import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

function useUserToken() {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');

    const [token, setToken] = useState();
    useEffect(() => {
      const token = localStorage.getItem("user_token");
      
      let thooken = "Token " + token;
      
      console.log(thooken);

      fetch('http://127.0.0.1:8000/loginapi/username/', {
            method: 'GET',
            headers: {'Authorization': thooken}
        })
        .then( data => data.json())
        .then(
        data => {
            console.log(data.username);
            setUsername(data.username);
            }
        ).catch( error => console.error(error))

      setToken(token);
    }, [navigate, setToken]);
    console.log("losername: " +  username);
    return [token,username];
  }
function Home() {

    const [token,username] = useUserToken();
    
    return (<div >
    <h1> HOME </h1>
    <h2> this me {username} </h2>
</div>)
}
export default Home;