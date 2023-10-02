let day =  document.getElementById('day');
let todayDate =  document.getElementById('date');
let city =  document.getElementById('city');
let todayDegree =  document.getElementById('today-degree');
let todayIcon =  document.getElementById('today-icon');
let todayDesc =  document.getElementById('today-desc');
let getHumidty =  document.getElementById('humidty');
let wind =  document.getElementById('wind');
let compass =  document.getElementById('compass');
let searchBar = document.getElementById('search');

let Nextday =  document.getElementsByClassName('Nextday');
let dayIcon =  document.getElementsByClassName('dayIcon');
let maxDegree =  document.getElementsByClassName('maxDegree');
let minDegree =  document.getElementsByClassName('minDegree');
let nextDesc =  document.getElementsByClassName('nextDesc');





let Days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']

let monthName = ['Jan','Feb','March','April','May','June','July',
'August','Sept','Oct','Nov','Des'];

 
let apiResponse ;
let getResponse ;



async function getData (searchDone = 'cairo'){

 apiResponse  = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${searchDone}&days=3`);
 getResponse = await  apiResponse.json()

displayWeather()
NextdisplayWeather()

}

getData ()


function displayWeather(){

    let date = new Date;

    day.innerHTML = Days[date.getDay()]
    todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`
    city.innerHTML = getResponse.location.name;
    todayDegree.innerHTML= getResponse.current.temp_c;
    todayIcon.setAttribute('src', `http:${getResponse.current.condition.icon}`)
    todayDesc.innerHTML= getResponse.current.condition.text;
    getHumidty.innerHTML=getResponse.current.humidity;
    wind.innerHTML=getResponse.current.wind_kph;
    compass.innerHTML=getResponse.current.wind_dir;

}



function NextdisplayWeather(){



    for(let i = 0 ; i< Nextday.length ; i++)
    {
        Nextday[i].innerHTML= Days [ new Date( getResponse.forecast.forecastday[i+1].date).getDay()]
        dayIcon[i].setAttribute('src',`https:${getResponse.forecast.forecastday[i+1].day.condition.icon}`)
        maxDegree[i].innerHTML=getResponse.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML=getResponse.forecast.forecastday[i+1].day.mintemp_c;
        nextDesc[i].innerHTML = getResponse.forecast.forecastday[i+1].day.condition.text;
    }


   
}


searchBar.addEventListener('keyup', function(){
    searchDone = searchBar.value;

    getData(searchDone)



})



function clear(){

    searchBar.value=''

}

clear()
