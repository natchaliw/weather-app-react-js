import './App.css';
import React, { useRef, useState } from 'react'

// ============================= Weather Icon =====================================
import clear_icon from './img/icon/clear.png'
import few_clouds_icon from './img/icon/few_cloud.png'
import clouds_icon from './img/icon/cloud.png'
import broken_clouds_icon from './img/icon/broken_cloud.png'
import rain_icon from './img/icon/rain.png'
import drizzle_icon from './img/icon/drizzle.png'
import thunder_icon from './img/icon/thunder-rain.png'
import snow_icon from './img/icon/snow.png'
import mist_icon from './img/icon/mist.png'
import humidity_icon from './img/icon/humidity.png'
import wind_icon from './img/icon/wind.png'

// ============================= Button Icon =====================================
import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoMdSearch } from "react-icons/io";


function App() {
    //   ======================================== Const ===================================================
    const apiKey ="1bd27195de6813181aabbda2b612098b"
    const [weatherData,setweatherData] = useState(false);
    const inputRef = useRef('');

    //   ======================================== Date ===================================================
    const dataBuild = (d)=> {
        let date = String(new window.Date());
        date = date.slice(3,15);
        return date;
    }
    //   ==================================== Icon weather =================================================
    const allIcons = {
        "01d" : clear_icon,
        "01n" : clear_icon,
        "02d" : few_clouds_icon,
        "02n" : few_clouds_icon,
        "03d" : clouds_icon,
        "03n" : clouds_icon,
        "04d" : broken_clouds_icon,
        "04n" : broken_clouds_icon,
        "09d" : rain_icon,
        "09n" : rain_icon,
        "10d" : drizzle_icon,
        "10n" : drizzle_icon,
        "11d" : thunder_icon,
        "11n" : thunder_icon,
        "13d" : snow_icon,
        "13n" : snow_icon,
        "50d" : mist_icon,
        "50n" : mist_icon
    }

    //   ================================== Background weather =============================================
    const weatherBGs = {
        "01d" : "app clear",
        "01n" : "app clear",
        "02d" : "app few-cloud",
        "02n" : "app few-cloud",
        "03d" : "app cloud",
        "03n" : "app cloud",
        "04d" : "app broken-cloud",
        "04n" : "app broken-cloud",
        "09d" : "app rain",
        "09n" : "app rain",
        "10d" : "app drizzle",
        "10n" : "app drizzle",
        "11d" : "app thunder-storm",
        "11n" : "app thunder-storm",
        "13d" : "app snow",
        "13n" : "app snow",
        "50d" : "app mist",
        "50n" : "app mist",
    }
    const weatherBG = weatherData ? weatherBGs[weatherData.bg] : "app";

    //   ================================== Overlay Day/Night =============================================
    const overlay = {
        "01d" : "overlay day",
        "01n" : "overlay night",
        "02d" : "overlay day",
        "02n" : "overlay night",
        "03d" : "overlay day",
        "03n" : "overlay night",
        "04d" : "overlay day",
        "04n" : "overlay night",
        "09d" : "overlay day",
        "09n" : "overlay night",
        "10d" : "overlay day",
        "10n" : "overlay night",
        "11d" : "overlay day",
        "11n" : "overlay night",
        "13d" : "overlay day",
        "13n" : "overlay night",
        "50d" : "overlay day",
        "50n" : "overlay night",
    }
    const overlaySet = weatherData ? overlay[weatherData.bg] : "overlay";

    // =================================== Fetch API and setweatherData ====================================
    const search = async (city)=>{
        if(city===""){
            alert ("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            const response = await fetch (url);
            const data = await response.json();

            if(!response.ok){
                alert (data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setweatherData ({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                temp_max: Math.floor(data.main.temp_max),
                temp_min: Math.floor(data.main.temp_min),
                location: data.name,
                status : data.weather[0].main,
                icon: icon,
                bg: data.weather[0].icon
            })
        } catch (error) {
            setweatherData(false);
            console.log(error.message)
        }
    }

    // ========================================= search bar ================================================
    const handleClick = ()=> {
        search(inputRef.current.value)
        inputRef.current.value='';
    }

    // ========================================= search by Key 'Enter' ================================================
    const handleKeyDown = (e)=> {
        if (e.key === "Enter") {
            search(inputRef.current.value)
            inputRef.current.value='';
        }
    }

  return (
    <>
    <div className={weatherBG}>
        <div className={overlaySet}></div>
        {/* ============================== Container ================================== */}
        <div className="container">
            <div className="title">
                <h1>Weather App</h1>
                <span><TiWeatherPartlySunny size='2rem' color='#414141'/></span> 
            </div>
            {/* ====================== Search bar ===================== */}
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Enter City" 
                    ref={inputRef}
                    onKeyDown={handleKeyDown}/>
                <button 
                    className="btn-search" 
                    type="submit" 
                    onClick={handleClick}>
                    <IoMdSearch className="search-icon"/>
                </button>
            </div>
            {/* ====================== Weather data ===================== */}
            {weatherData?<>
            <p className="location">{weatherData.location}</p>
            <p className="date">{dataBuild(new Date())}</p>
            <img
                className="weather-icon"
                src={weatherData.icon} 
                alt="" 
            />
            <p className="temp">{weatherData.temp}&deg;c</p>
            <p className="status">{weatherData.status}</p>
            <div className="temp-stat">
                <div className="col">
                    <p>H :</p>
                    <span>{weatherData.temp_max}&deg;c</span>
                </div>
                <div className="col">
                    <p>L :</p>
                    <span>{weatherData.temp_min}&deg;c</span>
                </div>
            </div>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
            </>:<></>}
        </div>
    </div>
    <footer className="footer">
        <p>Copyright &copy; 2024 by Natcha | All Rights Reserved</p>
    </footer>
    </>
  );
}

export default App;