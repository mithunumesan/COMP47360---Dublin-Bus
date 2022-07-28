import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

function useUserToken() {
    const navigate = useNavigate();
  
    const [token, setToken] = useState();
    useEffect(() => {
      const token = localStorage.getItem("user_token");
      if (!token) {
        navigate("/login");
      }
      setToken(token);
    }, [navigate, setToken]);
    return token;
  }
function Home() {

    const token = useUserToken();
    
    return (<div >
    <h1> HOME </h1>
    <h2> this me {token} </h2>
</div>)
}
export default Home;