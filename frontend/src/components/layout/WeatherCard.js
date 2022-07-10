import ReactWeather, { useOpenWeather } from 'react-open-weather';


const WeatherCard = () => {
  const { data,isLoading, errorMessage } = useOpenWeather({
    key: 'f775d12211646f76b3f266a5076c78a9',
    lat: '53.344',
    lon: '-6.2672',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  })
  
{return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Dublin"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast={false}
    />);
}
}
export default WeatherCard;