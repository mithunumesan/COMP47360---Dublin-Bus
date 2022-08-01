import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

export function useUserToken() {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');

    const [token, setToken] = useState();
    const [userid, setUserId] = useState('');
    useEffect(() => {
      const token = localStorage.getItem("user_token");
      
      let thooken = "Token " + token;
      
      console.log("thooken: " + thooken);

      fetch('http://127.0.0.1:8000/loginapi/username/', {
            method: 'GET',
            headers: {'Authorization': thooken}
        })
        .then( data => data.json())
        .then(
        data => {
            setUsername(data.username);
            setUserId(data.userid)
            }
        ).catch( error => console.error(error))

      setToken(token);
    }, [navigate, setToken,setUserId]);

    return [token,username,userid];
  }




function Home() {
    const [startPoint,setStartPoint] = useState("")
    const [destination,setDestination] = useState("")
    const [routes,setRoutes] = useState("")


    const [token,username,userid] = useUserToken()
    let url;

    while(userid===null){
    console.log("null");}
    url = 'http://127.0.0.1:8000/loginapi/details/' + userid + '/';
    
    fetch(url)
        .then( data => data.json())
        .then(
        data => {
            // console.log(data);
            setRoutes(data);
            }
        ).catch( error => console.error(error))
    

    const addFavoriteRoute = async() => {
      let formField = new FormData()
      formField.append = ('user',userid)
      formField.append('start_point',startPoint)
      formField.append('destination',destination)
    }


    return (<div >
    <h1> HOME </h1>
    <h2> You have logged in, {username} </h2>
    <h2> Your user id is, {userid} </h2>
    
    <tbody id="start_end">
                <tr>
                    
                    <th>Starting Point</th>
                    <th>Destination</th>
                </tr>
                {Array.isArray(routes)
        ? routes.map((item, i) => (
                    <tr key={i}>
                        <td >{item.start_point}</td>
                        <td>{item.destination}</td>
                    </tr>
                )): null}
    </tbody>
    
    <div className="container">
    
    <input type="text" placeholder="Start Point" className="box" value={startPoint} onChange={(e)=>setStartPoint(e.target.value)} ></input>
    <input type="search" placeholder="Destination" className="box" value={destination} onChange={(e)=>setDestination(e.target.value)} ></input>
    <button type="submit" className="btn" onClick={addFavoriteRoute} >Add Favorite Route</button>
    
    </div>
</div>)
}
export default Home;
