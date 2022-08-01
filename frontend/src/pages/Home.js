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
    // const [startPoint,setStartPoint] = useState("")
    // const [destination,setDestination] = useState("")
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

    return (<div >
    <h1> HOME </h1>
    <h2> You have logged in, {username} </h2>
    <h2> Your user id is, {userid} </h2>
    

    <div className="container">
    <button onClick={deleteRoute} >Delete Selected</button>

    <tbody id="start_end">
                <tr>
                    
                    <th>Starting Point</th>
                    <th>Destination</th>
                    <th> Select </th>
                </tr>
                {Array.isArray(routes)
        ? routes.map((item, i) => (
                    <tr key={i}>
                        <td >{item.start_point}</td>
                        <td>{item.destination}</td>
                        <td><input type="radio" name="myTextEditBox" value="checked" onChange={handleChange} /></td>
                    </tr>
                )): null}
    </tbody>
    
    <div className="container">

    </div>

    <tbody id="start_end">
                <tr>
                    
                    <th>Starting Point</th>
                    <th>Destination</th>
                    <th> Select </th>
                </tr>
                {Array.isArray(routes)
        ? routes.map((item, i) => (
                    <tr key={i}>
                        <td >{item.start_point}</td>
                        <td>{item.destination}</td>
                        <td><input type="radio" name="myTextEditBox" value={item.id} onChange={handleChange} /></td>
                    </tr>
                )): null}
    </tbody>
    
  
</div>)
}
export default Home;
