import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import * as Icons from "react-icons/hi";

export function useUserToken() {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');

    const [token, setToken] = useState();
    const [userid, setUserId] = useState('');
    useEffect(() => {
      const token = localStorage.getItem("user_token");
      let thooken = "Token " + token;


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
    }, [setToken,setUserId]);
    return [token,username,userid];
  }


function Home() {
    // const [startPoint,setStartPoint] = useState("")
    // const [destination,setDestination] = useState("")
    const [routes,setRoutes] = useState("")
    const [display,setDisplay] = useState(false)


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
            setDisplay(true)
            }
        ).catch( error => console.error(error))
    


    // const addFavoriteRoute = async() => {
    //   let formField = new FormData()
    //   formField.append = ('user',userid)
    //   formField.append('start_point',startPoint)
    //   formField.append('destination',destination)
    // }

    const [userinfo, setUserInfo] = useState("");
    var value;
    var checked;

    var handleChange = (e) => {
        value  = e.target.value;
        checked = e.target.checked;
        console.log(e.target);
        console.log(value + " is " + checked);

        if(checked){
            setUserInfo(value);
        }
        
    }

    var deleteRoute = () => {
        console.log("delete route"+ userinfo);
        let url = 'http://127.0.0.1:8000/loginapi/details/' + userinfo + '/';
        console.log(url);
        fetch(url, {
            method: 'DELETE',
            })
    }

    return (
    <div style={{paddingTop:'1rem'}}>
    
   
    <h2> Welcome, {username} </h2>
    <h2> Your user id is, {userid} </h2>
    <div className="container" style={{marginTop:'2rem'}}>
    <h2> Manage Your Favorite Routes </h2>
    
    <button className="delete-button" onClick={deleteRoute} >Delete Selected</button>
    {/* <input type="text" placeholder="Start Point" className="box" value={startPoint} onChange={(e)=>setStartPoint(e.target.value)} ></input>
    <input type="search" placeholder="Destination" className="box" value={destination} onChange={(e)=>setDestination(e.target.value)} ></input>
    <button type="submit" className="btn" onClick={addFavoriteRoute} >Add Favorite Route</button>
     */}
    </div>
    {Array.isArray(routes) ? 
    <tbody id="start_end">
                <tr>
                    <th style={{width:'45%'}}>Starting Point</th>
                    <th style={{width:'45%'}}>Destination</th>
                    <th style={{width:'10%'}}> Select </th>
                </tr>
                {
         routes.map((item, i) => (
                    <tr key={i}>
                        <td >{item.start_point}</td>
                        <td>{item.destination}</td>
                        <td><input type="radio" name="myTextEditBox" value={item.id} onChange={handleChange} /></td>
                    </tr>
                ))}
    </tbody>
: <div className='search-icon'><Icons.HiSearchCircle style={{fontSize:'200px',color:"#c2e7fe"}} /></div>} 

</div>)
}
export default Home;