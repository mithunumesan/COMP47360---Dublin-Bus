import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

function useUserToken() {
    const navigate = useNavigate();
  
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();
    useEffect(() => {
      const token = localStorage.getItem("user_token");
      const user_id = localStorage.getItem("user_id");
      console.log(token)
      setToken(token)
      setUserId(user_id)
    }, [navigate, setToken]);
    return token,userId;
  }
function Home() {
    const [startPoint,setStartPoint] = useState("")
    const [destination,setDestination] = useState("")

    let token,userId = useUserToken();

    const addFavoriteRoute = async() => {
      let formField = new FormData()

      formField.append('start_point',startPoint)
      formField.append('destination',destination)
    } 
    
    return (<div >
    {/* <h1> HOME </h1> */}
    <h1>Welcome</h1>
    <h2> this me {token} </h2>
    <h2>This is my Id {userId}</h2>
    <div className="container">
    <input type="text" placeholder="Start Point" className="box" value={startPoint} onChange={(e)=>setStartPoint(e.target.value)} ></input>
    <input type="search" placeholder="Destination" className="box" value={destination} onChange={(e)=>setDestination(e.target.value)} ></input>
    <button type="submit" className="btn" onClick={addFavoriteRoute} >Add Favorite Route</button>
    </div>

</div>)
}
export default Home;