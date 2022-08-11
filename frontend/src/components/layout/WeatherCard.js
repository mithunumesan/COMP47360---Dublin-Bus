import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { useState, useEffect } from 'react';



const customStyles = {
	fontFamily:  'Helvetica, sans-serif',
	gradientStart:  '#0181C2',
	gradientMid:  '#04A7F9',
	gradientEnd:  '#4BC4F7',
	locationFontColor:  '#FFF',
	todayTempFontColor:  '#FFF',
	todayDateFontColor:  '#B5DEF4',
	todayRangeFontColor:  '#B5DEF4',
	todayDescFontColor:  '#B5DEF4',
	todayInfoFontColor:  '#B5DEF4',
	todayIconColor:  '#FFF',

};






function WeatherCard(props) {


  useEffect(()=>{

    fetch('http://137.43.49.30:80/loginapi/weatherkey')
        .then( data => data.json())
        .then(
        data => {
   
            console.log(data);
            localStorage.setItem("weatherKey",data[0])

            }
        ).catch( error => console.error(error))
  
  },[])

 //console.log("weather key is2" + weatherKey);

  const { data,isLoading, errorMessage } = useOpenWeather({
    key: localStorage.getItem("weatherKey"),
    lat: '53.344',
    lon: '-6.2672',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });
 




  
  // 'f775d12211646f76b3f266a5076c78a9'

{return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Dublin"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast={props.boolean}
      theme = {customStyles}
    />);
}
}
export default WeatherCard;