const currentDate = document.getElementById('current-date')

const currentCity = document.getElementById('current-city')
const currentTemp = document.getElementById('current-temp')
const windSpeed = document.getElementById('current-wind')
const humidity = document.getElementById('current-humidity')
const uvIndex = document.getElementById('current-uv')
const pressure = document.getElementById('current-pressure')

const searchBtn = document.getElementById('search-city-btn')
let searchBar = document.getElementById('search-bar')

const currentWeatherBoxes = document.getElementById('current-weather')


const nextFiveDays = document.getElementById('five-day-forecast')
const container = document.querySelector('.container')
const futureWeather = document.querySelector('#future-forecast-container')



let city = 'Seattle'

// humidity, windspeed, temp, air pressure, uv, weather conditions icon,

let currentContainer = document.querySelector('#current-info')


let m = moment();
$("#current-day").text(m.format( "MMM Do, YYYY"));

// function formatAMPM(date) {
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     var ampm = hours >= 12 ? 'pm' : 'am';
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     minutes = minutes < 10 ? '0'+minutes : minutes;
//     var strTime = hours + ':' + minutes + ' ' + ampm;
//     currentTime.innerHTML = strTime;
//     return strTime;
//   }
  
//   console.log(formatAMPM(new Date));


//const ampm = hours >= 12 ? 'PM' : 'AM';

//currentTime.innerHTML = hrs24Format + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`

let dataInfo = '';


API_KEY = '2352a25d575ebbf6899d8d3dacb6b8cf';



function getLatAndLon(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
    .then(res => res.json())

    .then(data => {
        console.log(data)
        let latitude = data.city.coord.lat;
        let longitude = data.city.coord.lon;
        console.log('seattle lat: ' + latitude)
        console.log('seattle lon: ' + longitude)
        generateWeatherData(latitude, longitude)
    }) 
}

//getLatAndLon(city);

function generateWeatherData(latitude, longitude) {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        //let latitude = success.coords.latitude;
        //let longitude = success.coords.longitude;

        //displays Latitude and Longitude in console for debugging
        //console.log('Latitude: ' + latitude);
        //console.log('Longitude: ' + longitude);

        //fetches weather data from api based on current 'lat' and 'lon', requires API_KEY
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_KEY}`)

        //https://api.openweathermap.org/data/2.5/forecast?q=seattle&appid=${API_KEY}
        //https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_KEY}

        //displays weather data in json format
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // console.log(data.current.wind_speed)
            // console.log(data.current.uvi)
            //displayFutureWeatherData(data);
            displayWeatherData(data);
            displayCurrentWeatherData(data)
            console.log('THIS IS THE LOCATION SPECIFIC DATA')
        })
    })
}


function displayCurrentWeatherData(data) {

    currentCity.innerHTML = city;
    currentTemp.innerHTML = Math.floor(((data.current.temp-273.15)*1.8)+32) + '*';
    //currentTemp.innerHTML = data.current.temp;
    

    humidity.innerHTML = data.current.humidity;
    windSpeed.innerHTML = data.current.wind_speed;
    uvIndex.innerHTML = data.current.uvi;
    pressure.innerHTML = data.current.pressure;

    //console.log(humidity, windSpeed, uvi)
    
    


    // console.log(data.current.wind_speed);
     //console.log(uvi)
    // //windSpeed.innerHTML = dataInfo.current.wind_speed;
    // humidity.innerHTML = data.current.humidity;
    // uvi.innerHTML = data.current.uvi;


    //The 'uvi.innerHTML' lines below are for debugging. Uncomment to override the actual value to see the background color of the UV Index element change based on different UV Index values.

    //Will display green background
    //uvIndex.innerHTML = 1; 

    //Will display orange background
    //uvIndex.innerHTML = 3; 

    //Will display red background
    //uvIndex.innerHTML = 6; 

    if ( uvIndex.innerHTML < 2 ) {
        uvIndex.style.backgroundColor = 'green'
    }

    if ( uvIndex.innerHTML >= 2 && uvIndex.innerHTML < 5 ) {
        uvIndex.style.backgroundColor = 'orange'
    }

    if ( uvIndex.innerHTML >= 5 ) {
        uvIndex.style.backgroundColor = 'red'
    }
    //uvi.style.backgroundColor = 'green';
    //windSpeed.innerHTML = wind_speed;
    //windSpeed.innerHTML = data.current.wind_speed;
    
    //uvIndex.innerHTML = uvi;
}

// function displayDate (data) {
//     console.log(time)
//     console.log(date)
//     console.log(hrs24Format)
//     console.log(hour)
//     console.log(minutes)
// }

// displayDate();


//generateWeatherData();


//let winds = data.current.wind_speed;

function displayWeatherData (data) {



    for ( let i = 1; i < 6; i++) {

        let tempMin = Math.floor(((data.daily[i].temp.min-273.15)*1.8)+32);
        let tempMax = Math.floor(((data.daily[i].temp.max-273.15)*1.8)+32);

        //let tempCurrent = Math.floor(((data.daily.temp.max)))

        let date = data.daily[i].dt;
        let a = new Date(date * 1000)
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

        let month = months[a.getMonth()];
        let dates = a.getDate();

        
        //let day = date.toString();


        var subContainerTemplate = `
        <div class="five-day-forecast">
            <div id="5-days-out">
                <div class="current-day"></div>
                <div class="temp"></div>
                <p></p>
                <p>${month}<span> </span>${dates}</p>
                <p><img id='icon' src='http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png'></p>
                <p>Weather: ${data.daily[i].weather[0].main}</p>
                <p>Wind Speed: ${data.daily[i].wind_speed}</p>
                <p>Temp: ${tempMin}*-${tempMax}*</p>
            </div>
        </div>
        ` 

        //console.log(day)


       //futureWeather.innerHTML += subContainerTemplate;
       nextFiveDays.innerHTML += subContainerTemplate;
    }

console.log(subContainerTemplate)

}


//displayCurrentWeatherData(data);
//displayFutureWeatherData(data);


// futureWeather.innerHTML = subContainerTemplate

let searchHistory = [];
let cityHistory = '';


searchBtn.addEventListener('click', () => {
    city = searchBar.value;
    nextFiveDays.innerHTML = '';
    getLatAndLon(city);
    localStorage.setItem(cityHistory, city.innerHTML)
    searchBar.value = '';
})