import { Card, Form, Button } from 'react-bootstrap';
import { FaCloudSun } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureFull } from "react-icons/fa6";
import { useEffect,useState, useRef } from 'react';
import './weatherCard.css'


const WeatherCard = () => {
    const [weatherData, setWeatherData] = useState(false);
    const inputRef= useRef()
    const search = async(city)=>{
        if(city === ""){
            alert("Enter city name");
            return;
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            setWeatherData({
                name:data.name,
                temp:Math.floor(data.main.temp),
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                feelsLike:data.main.feels_like
            })
        }
        catch(error){
           setWeatherData(false)
           console.log("Error in fetching weather data",error)
        }
    }
    useEffect(()=>{
        search("karachi");
    }
    ,[])
    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh"}} >
                <Card style={{ width: "22rem", color: "black" ,background: 'linear-gradient(to right, #67B26F, #4ca2cd)'}}>
                    <Card.Body>
                        <Card.Title className="text-center mb-4">React Weather App <span><FaCloudSun /></span></Card.Title>
                        <div className="d-flex align-items-center" style={{ gap: "5px" }}>
                            <Form.Control ref={inputRef} type="text" placeholder="Enter City" style={{width:"100%"}}/>
                            <Button style={{backgroundColor:"#67B26F", color:"black"}} onClick={()=>search(inputRef.current.value)}>Get</Button>
                        </div>
                        {weatherData?<>
                            <Card.Text className='mt-3'>
                                <p id="temperature"><span><FaTemperatureHigh /></span> Temperature: {weatherData.temp} °C</p>
                                <p id="location"><span><FaLocationPin /></span> Location: {weatherData.name} </p>
                                <p id="humidity"><span><WiHumidity /></span> Humidity: {weatherData.humidity} </p>
                                <p id="feelsLike"><span><FaTemperatureFull /></span> Feels like: {weatherData.feelsLike} °C</p>
                            </Card.Text></>:<></>}
                       
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default WeatherCard
