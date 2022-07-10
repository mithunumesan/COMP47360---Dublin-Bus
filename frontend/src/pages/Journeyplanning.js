import WeatherCard from '../components/layout/WeatherCard';
import MyMap from './Map';
function JourneyPlanning() {
    return  (<><div className='weather-card'><WeatherCard /></div><div className="flex-container">
        <div className="box1">
            <h1>Journey Planning</h1>
            <form action="" className="journey-form">
                <input type="search" placeholder="Start Point" className="box"></input>
                <input type="search" placeholder="Destination" className="box"></input>
                <label for="time">Choose a time to start the journey: </label>
                <select id="option" onChange={() => {
                    var option = document.getElementById("option").value;
                    if (option !== "now") {
                        document.getElementById("time").innerHTML = '<input type="date" name="" class="date">' + '<input type="time" name="" class="time">';
                    } else {
                        document.getElementById("time").innerHTML = "";
                    }
                } }>
                    <option value="now">Leave Now</option>
                    <option value="depart">Depart At</option>
                    <option value="arrive">Arrive By</option>
                    <option value="lastAvaliable">Last Avaliable</option>
                </select>

                <div id="time"></div>
                <input type="submit" value="Search" className="btn"></input>
            </form>
            <div id="result"></div>
        </div>
        <div className="box2">
            <div id="map"><MyMap /></div>
        </div>
    </div></>);}
export default JourneyPlanning;