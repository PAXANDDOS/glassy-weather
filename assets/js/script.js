const api = {
    key: "303332f795ec198811841aeb73fc22e2",
    locationKey: "kIJb_wvBfTt1ViQ11iX7hZgZsFSWjtJ4c5j7Gj-Ho9M",
    query: "",
    base: "https://api.openweathermap.org/data/2.5/",
    image: "assets/line/openweathermap/"
}

let body = document.getElementById('body');
let inputBlock = document.getElementsByClassName('input');
let currentBlock = document.getElementsByClassName('current');
let cardBlock = document.getElementsByClassName('card');

const input = document.querySelector('.inputValue');
input.addEventListener('keypress', setQuery);

let curLabel = document.getElementById('curlabel');
let city = document.getElementById('city');
let today = document.getElementById('today');
let temp = document.getElementById('temp');
let currentImage = document.getElementById('currentImage');
let status = document.getElementById('status');
let windLabel = document.getElementById('windLabel');
let humLabel = document.getElementById('humLabel');
let pressLabel = document.getElementById('pressLabel');
let feels = document.getElementById('feels');

let forecastDate = document.getElementsByClassName('forecastDate');
let forecastImage = document.getElementsByClassName('forecastImage');
let forecastTemp = document.getElementsByClassName('forecastTemp');
let forecastStatus = document.getElementsByClassName('forecastStatus');

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let language = window.navigator.language.slice(0,2);
let userLanguage = language;
translateApp();
getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) { 
            getLocationQuery(position.coords.latitude, position.coords.longitude) 
        }, locationError);
    }
    else {
        console.error("Geolocation is not supported.");
        getResults(api.query);
    }
}

function locationError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.error("Location request rejected.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.error("Location info is not available.");
            break;
        case error.TIMEOUT:
            console.error("Location request timeout.");
            break;
        case error.UNKNOWN_ERROR:
            console.error("Unknown error while trying to access location.");
            break;
    }
    getResults(api.query);
}

async function getLocationQuery(lat, lon) {
    try {
        const response = await fetch("https://revgeocode.search.hereapi.com/v1/revgeocode?at=" + lat + "," + lon + "&lang=en&apiKey=" + api.locationKey);
        let location = await response.json();
        if (!location.error) {
            document.getElementsByClassName('temporary')[0].style.display = 'none';
            inputBlock[0].style.display = "flex";
            currentBlock[0].style.display = "flex";
            document.getElementsByClassName('forecast')[0].style.display = "flex";
            getResults(location.items[0].address.city);
        }
        else
            console.error = "Location error, check the API service.";
    }
    catch (errorLocationName) {
        console.error = "Location error, check the API service.";
    }
}

function setQuery(evt) {
    if (evt.keyCode == 13)
      getResults(input.value);
}
  
function getResults(query) {
    api.query = query;
    fetch(`${api.base}forecast?q=${api.query}&units=metric&APPID=${api.key}`)
        .then(weather => { return weather.json(); }).then(displayCurrent);
}

function displayCurrent(weather) {    
    if (weather.cod === "404") {
        console.error('Invalid city name. Rejected');
        return;
    }

    let finalLanguage = userLanguage;
    if (userLanguage != language)
        finalLanguage = userLanguage;

    switch(finalLanguage){
        case'ru': 
            curLabel.innerText = `Текущая погода`;
            humLabel.innerHTML = `Влажность: ${Math.round(weather.list[0].main.humidity)}%`;
            pressLabel.innerHTML = `Давление: ${Math.round(weather.list[0].main.pressure)} мм рт. ст.`;
            windLabel.innerHTML = `Ветер: ${Math.round(weather.list[0].wind.speed)} м/с`;
            feels.innerHTML = `Чувствуется ${Math.round(weather.list[0].main.feels_like)}°C`;
            switch(weather.list[0].weather[0].main) {
                case 'Clear': status.innerText = `Ясно`; break;
                case 'Thunderstorm': status.innerText = `Гроза`; break;
                case 'Drizzle': status.innerText = `Морось`; break;
                case 'Rain': status.innerText = `Дождь`; break;
                case 'Snow': status.innerText = `Снег`; break;
                case 'Atmosphere': status.innerText = `Туман`; break;
                case 'Clouds': status.innerText = `Облачно`; break;
            }
            break;
        case'hu': 
            curLabel.innerText = `Jelenlegi időjárás`;
            humLabel.innerHTML = `Páratartalom: ${Math.round(weather.list[0].main.humidity)}%`;
            pressLabel.innerHTML = `Nyomás: ${Math.round(weather.list[0].main.pressure)} mm Hg`;
            windLabel.innerHTML = `Szél: ${Math.round(weather.list[0].wind.speed)} m/s`;
            feels.innerHTML = `Érezhető ${Math.round(weather.list[0].main.feels_like)}°C`;
            switch(weather.list[0].weather[0].main) {
                case 'Clear': status.innerText = `Tiszta`; break;
                case 'Thunderstorm': status.innerText = `Zivatar`; break;
                case 'Drizzle': status.innerText = `Szitálás`; break;
                case 'Rain': status.innerText = `Eső`; break;
                case 'Snow': status.innerText = `Hó`; break;
                case 'Atmosphere': status.innerText = `Köd`; break;
                case 'Clouds': status.innerText = `Felhők`; break;
            }
            break;
        case'de': 
            curLabel.innerText = `Aktuelles Wetter`; 
            humLabel.innerHTML = `Feuchtigkeit: ${Math.round(weather.list[0].main.humidity)}%`;
            pressLabel.innerHTML = `Atmosphärendruck: ${Math.round(weather.list[0].main.pressure)} mm Hg`;
            windLabel.innerHTML = `Wind: ${Math.round(weather.list[0].wind.speed)} м/с`;
            feels.innerHTML = `Fühlt ${Math.round(weather.list[0].main.feels_like)}°C`;
            switch(weather.list[0].weather[0].main) {
                case 'Clear': status.innerText = `Klar`; break;
                case 'Thunderstorm': status.innerText = `Gewitter`; break;
                case 'Drizzle': status.innerText = `Nieselregen`; break;
                case 'Rain': status.innerText = `Regen`; break;
                case 'Snow': status.innerText = `Schnee`; break;
                case 'Atmosphere': status.innerText = `Nebel`; break;
                case 'Clouds': status.innerText = `Wolken`; break;
            }
            break;
        case'uk': 
            curLabel.innerText = `Поточна погода`; 
            humLabel.innerHTML = `Вологість: ${Math.round(weather.list[0].main.humidity)}%`;
            pressLabel.innerHTML = `Атмос. тиск: ${Math.round(weather.list[0].main.pressure)} мм рт. ст.`;
            windLabel.innerHTML = `Вітер: ${Math.round(weather.list[0].wind.speed)} м/с`;
            feels.innerHTML = `Відчувається ${Math.round(weather.list[0].main.feels_like)}°C`;
            switch(weather.list[0].weather[0].main) {
                case 'Clear': status.innerText = `Ясно`; break;
                case 'Thunderstorm': status.innerText = `Гроза`; break;
                case 'Drizzle': status.innerText = `Мряка`; break;
                case 'Rain': status.innerText = `Дощ`; break;
                case 'Snow': status.innerText = `Сніг`; break;
                case 'Atmosphere': status.innerText = `Туман`; break;
                case 'Clouds': status.innerText = `Хмарно`; break;
            }
            break;
        default: 
            curLabel.innerText = `Current weather`; 
            humLabel.innerHTML = `Humidity: ${Math.round(weather.list[0].main.humidity)}%`;
            pressLabel.innerHTML = `Pressure: ${Math.round(weather.list[0].main.pressure)} mm Hg`;
            windLabel.innerHTML = `Wind: ${Math.round(weather.list[0].wind.speed)} m/s`;
            feels.innerHTML = `Feels like ${Math.round(weather.list[0].main.feels_like)}°C`;
            switch(weather.list[0].weather[0].main) {
                case 'Clear': status.innerText = `Clear`; break;
                case 'Thunderstorm': status.innerText = `Thunderstorm`; break;
                case 'Drizzle': status.innerText = `Drizzle`; break;
                case 'Rain': status.innerText = `Rain`; break;
                case 'Snow': status.innerText = `Snow`; break;
                case 'Atmosphere': status.innerText = `Fog`; break;
                case 'Clouds': status.innerText = `Clouds`; break;
            }
            break;
    }
    city.innerText = `${weather.city.name}, ${weather.city.country}`;

    let now = new Date();
    today.innerHTML = dateBuilder(now);

    currentImage.src = `${api.image}${weather.list[0].weather[0].icon}.svg`;

    temp.innerText = `${Math.round(weather.list[0].main.temp)}°C`;
    
    displayForecast(weather);

    let unix = weather.city.sunrise;
    let date = new Date(unix*1000);
    let sunriseSeconds = (+date.getHours()) * 60 * 60 + (+date.getMinutes()) * 60 + (+date.getSeconds()); 
    let nowSeconds = (+now.getHours()) * 60 * 60 + (+now.getMinutes()) * 60 + (+now.getSeconds());
    unix = weather.city.sunset;
    date = new Date(unix*1000);
    let sunsetSeconds = (+date.getHours()) * 60 * 60 + (+date.getMinutes()) * 60 + (+date.getSeconds());

    backgroundSwitcher(weather.list[0].weather[0].main, Math.round(weather.list[0].main.temp), sunriseSeconds, nowSeconds, sunsetSeconds);
}

function displayForecast(weather) {
    let forecast = [8, 16, 24, 32, 39];
    for(let i = 0; i < forecast.length; i++) {
        let now = new Date(weather.list[forecast[i]].dt_txt);
        forecastDate[i].innerHTML = dateBuilder(now);
        forecastTemp[i].innerHTML = `${Math.round(weather.list[forecast[i]].main.temp)}°C`;
        forecastImage[i].src = `${api.image}${weather.list[forecast[i]].weather[0].icon}.svg`;

        let finalLanguage = userLanguage;
        if (userLanguage != language)
            finalLanguage = userLanguage;
        switch(finalLanguage){
            case'ru': 
                switch(weather.list[forecast[i]].weather[0].main) {
                    case 'Clear': forecastStatus[i].innerHTML = `Ясно`; break;
                    case 'Thunderstorm': forecastStatus[i].innerHTML = `Гроза`; break;
                    case 'Drizzle': forecastStatus[i].innerHTML = `Морось`; break;
                    case 'Rain': forecastStatus[i].innerHTML = `Дождь`; break;
                    case 'Snow': forecastStatus[i].innerHTML = `Снег`; break;
                    case 'Atmosphere': forecastStatus[i].innerHTML = `Туман`; break;
                    case 'Clouds': forecastStatus[i].innerHTML = `Облачно`; break;
                }
                break;
            case'hu': 
                switch(weather.list[forecast[i]].weather[0].main) {
                    case 'Clear': forecastStatus[i].innerHTML = `Tiszta`; break;
                    case 'Thunderstorm': forecastStatus[i].innerHTML = `Zivatar`; break;
                    case 'Drizzle': forecastStatus[i].innerHTML = `Szitálás`; break;
                    case 'Rain': forecastStatus[i].innerHTML = `Eső`; break;
                    case 'Snow': forecastStatus[i].innerHTML = `Hó`; break;
                    case 'Atmosphere': forecastStatus[i].innerHTML = `Köd`; break;
                    case 'Clouds': forecastStatus[i].innerHTML = `Felhők`; break;
                }
                break;
            case'de': 
                switch(weather.list[forecast[i]].weather[0].main) {
                    case 'Clear': forecastStatus[i].innerHTML = `Klar`; break;
                    case 'Thunderstorm': forecastStatus[i].innerHTML = `Gewitter`; break;
                    case 'Drizzle': forecastStatus[i].innerHTML = `Nieselregen`; break;
                    case 'Rain': forecastStatus[i].innerHTML = `Regen`; break;
                    case 'Snow': forecastStatus[i].innerHTML = `Schnee`; break;
                    case 'Atmosphere': forecastStatus[i].innerHTML = `Nebel`; break;
                    case 'Clouds': forecastStatus[i].innerHTML = `Wolken`; break;
                }
                break;
            case'uk': 
                switch(weather.list[forecast[i]].weather[0].main) {
                    case 'Clear': forecastStatus[i].innerHTML = `Ясно`; break;
                    case 'Thunderstorm': forecastStatus[i].innerHTML = `Гроза`; break;
                    case 'Drizzle': forecastStatus[i].innerHTML = `Мряка`; break;
                    case 'Rain': forecastStatus[i].innerHTML = `Дощ`; break;
                    case 'Snow': forecastStatus[i].innerHTML = `Сніг`; break;
                    case 'Atmosphere': forecastStatus[i].innerHTML = `Туман`; break;
                    case 'Clouds': forecastStatus[i].innerHTML = `Хмарно`; break;
                }
                break;
            default: 
                switch(weather.list[forecast[i]].weather[0].main) {
                    case 'Clear': forecastStatus[i].innerHTML = `Clear`; break;
                    case 'Thunderstorm': forecastStatus[i].innerHTML = `Thunderstorm`; break;
                    case 'Drizzle': forecastStatus[i].innerHTML = `Drizzle`; break;
                    case 'Rain': forecastStatus[i].innerHTML = `Rain`; break;
                    case 'Snow': forecastStatus[i].innerHTML = `Snow`; break;
                    case 'Atmosphere': forecastStatus[i].innerHTML = `Fog`; break;
                    case 'Clouds': forecastStatus[i].innerHTML = `Clouds`; break;
                }
                break;
        }
    }
}

function changeDay(id) {
    let forecast = [8, 16, 24, 32, 39];
    fetch(`${api.base}forecast?q=${api.query}&units=metric&APPID=${api.key}`)
    .then((response) => {
      return response.json();
    })
    .then((weather) => {
        let finalLanguage = userLanguage;
        if (userLanguage != language)
            finalLanguage = userLanguage;
        switch(finalLanguage) {
            case'ru': 
                curLabel.innerText = `Прогноз погоды`;
                humLabel.innerHTML = `Влажность: ${Math.round(weather.list[forecast[id]].main.humidity)}%`;
                pressLabel.innerHTML = `Давление: ${Math.round(weather.list[forecast[id]].main.pressure)} мм рт. ст.`;
                windLabel.innerHTML = `Ветер: ${Math.round(weather.list[forecast[id]].wind.speed)} м/с`;
                feels.innerHTML = `Чувствуется ${Math.round(weather.list[forecast[id]].main.feels_like)}°C`;
                switch(weather.list[forecast[id]].weather[0].main) {
                    case 'Clear': status.innerText = `Ясно`; break;
                    case 'Thunderstorm': status.innerText = `Гроза`; break;
                    case 'Drizzle': status.innerText = `Морось`; break;
                    case 'Rain': status.innerText = `Дождь`; break;
                    case 'Snow': status.innerText = `Снег`; break;
                    case 'Atmosphere': status.innerText = `Туман`; break;
                    case 'Clouds': status.innerText = `Облачно`; break;
                }
                break;
            case'hu': 
                curLabel.innerText = `Időjárási előrejelzés`;
                humLabel.innerHTML = `Páratartalom: ${Math.round(weather.list[forecast[id]].main.humidity)}%`;
                pressLabel.innerHTML = `Nyomás: ${Math.round(weather.list[forecast[id]].main.pressure)} mm Hg`;
                windLabel.innerHTML = `Szél: ${Math.round(weather.list[forecast[id]].wind.speed)} m/s`;
                feels.innerHTML = `Érezhető ${Math.round(weather.list[forecast[id]].main.feels_like)}°C`;
                switch(weather.list[forecast[id]].weather[0].main) {
                    case 'Clear': status.innerText = `Tiszta`; break;
                    case 'Thunderstorm': status.innerText = `Zivatar`; break;
                    case 'Drizzle': status.innerText = `Szitálás`; break;
                    case 'Rain': status.innerText = `Eső`; break;
                    case 'Snow': status.innerText = `Hó`; break;
                    case 'Atmosphere': status.innerText = `Köd`; break;
                    case 'Clouds': status.innerText = `Felhők`; break;
                }
                break;
            case'de': 
                curLabel.innerText = `Wettervorhersage`; 
                humLabel.innerHTML = `Feuchtigkeit: ${Math.round(weather.list[forecast[id]].main.humidity)}%`;
                pressLabel.innerHTML = `Atmosphärendruck: ${Math.round(weather.list[forecast[id]].main.pressure)} mm Hg`;
                windLabel.innerHTML = `Wind: ${Math.round(weather.list[forecast[id]].wind.speed)} м/с`;
                feels.innerHTML = `Fühlt ${Math.round(weather.list[forecast[id]].main.feels_like)}°C`;
                switch(weather.list[forecast[id]].weather[0].main) {
                    case 'Clear': status.innerText = `Klar`; break;
                    case 'Thunderstorm': status.innerText = `Gewitter`; break;
                    case 'Drizzle': status.innerText = `Nieselregen`; break;
                    case 'Rain': status.innerText = `Regen`; break;
                    case 'Snow': status.innerText = `Schnee`; break;
                    case 'Atmosphere': status.innerText = `Nebel`; break;
                    case 'Clouds': status.innerText = `Wolken`; break;
                }
                break;
            case'uk': 
                curLabel.innerText = `Прогноз погоди`; 
                humLabel.innerHTML = `Вологість: ${Math.round(weather.list[forecast[id]].main.humidity)}%`;
                pressLabel.innerHTML = `Атмос. тиск: ${Math.round(weather.list[forecast[id]].main.pressure)} мм рт. ст.`;
                windLabel.innerHTML = `Вітер: ${Math.round(weather.list[forecast[id]].wind.speed)} м/с`;
                feels.innerHTML = `Відчувається ${Math.round(weather.list[forecast[id]].main.feels_like)}°C`;
                switch(weather.list[forecast[id]].weather[0].main) {
                    case 'Clear': status.innerText = `Ясно`; break;
                    case 'Thunderstorm': status.innerText = `Гроза`; break;
                    case 'Drizzle': status.innerText = `Мряка`; break;
                    case 'Rain': status.innerText = `Дощ`; break;
                    case 'Snow': status.innerText = `Сніг`; break;
                    case 'Atmosphere': status.innerText = `Туман`; break;
                    case 'Clouds': status.innerText = `Хмарно`; break;
                }
                break;
            default: 
                curLabel.innerText = `Weather forecast`; 
                humLabel.innerHTML = `Humidity: ${Math.round(weather.list[forecast[id]].main.humidity)}%`;
                pressLabel.innerHTML = `Pressure: ${Math.round(weather.list[forecast[id]].main.pressure)} mm Hg`;
                windLabel.innerHTML = `Wind: ${Math.round(weather.list[forecast[id]].wind.speed)} m/s`;
                feels.innerHTML = `Feels like ${Math.round(weather.list[forecast[id]].main.feels_like)}°C`;
                switch(weather.list[forecast[id]].weather[0].main) {
                    case 'Clear': status.innerText = `Clear`; break;
                    case 'Thunderstorm': status.innerText = `Thunderstorm`; break;
                    case 'Drizzle': status.innerText = `Drizzle`; break;
                    case 'Rain': status.innerText = `Rain`; break;
                    case 'Snow': status.innerText = `Snow`; break;
                    case 'Atmosphere': status.innerText = `Fog`; break;
                    case 'Clouds': status.innerText = `Clouds`; break;
                }
                break;
        }

        today.innerHTML = forecastDate[id].textContent;
        currentImage.src = `${api.image}${weather.list[forecast[id]].weather[0].icon}.svg`;
        temp.innerText = `${Math.round(weather.list[forecast[id]].main.temp)}°C`;

        let now = new Date();
        let unix = weather.city.sunrise;
        let date = new Date(unix*1000);
        let sunriseSeconds = (+date.getHours()) * 60 * 60 + (+date.getMinutes()) * 60 + (+date.getSeconds()); 
        let nowSeconds = (+now.getHours()) * 60 * 60 + (+now.getMinutes()) * 60 + (+now.getSeconds());
        unix = weather.city.sunset;
        date = new Date(unix*1000);
        let sunsetSeconds = (+date.getHours()) * 60 * 60 + (+date.getMinutes()) * 60 + (+date.getSeconds());
        backgroundSwitcher(weather.list[forecast[id]].weather[0].main, Math.round(weather.list[forecast[id]].main.temp), sunriseSeconds, nowSeconds, sunsetSeconds);
    });
}

function dateBuilder(now) { 
    let day = days[now.getDay()];
    let date = now.getDate();
    let month = months[now.getMonth()];
  
    return `${day} ${date}, ${month}`;
}

function languageMenu(value) {
    console.log(value);
    let block = document.getElementsByClassName('languageMenu');
    switch(value) {
        case 'openMenu': block[0].style.display = "flex"; break;
        case 'closeMenu': block[0].style.display = "none"; break;
        case 'en':
        case 'ru':
        case 'uk':
        case 'hu':
        case 'de': 
            userLanguage = value; translateApp(); getResults(api.query); block[0].style.display = "none"; break;
    }
}

function translateApp() {
    let tempHeader = document.getElementById('tempHeader');
    let tempText = document.getElementById('tempText');
    let tempWarning = document.getElementById('tempWarning');
    let tempQuestion = document.getElementById('tempQuestion');
    let iconInfo = document.getElementById('iconInfo');

    let finalLanguage = userLanguage;
    if (userLanguage != language)
        finalLanguage = userLanguage;
    switch(finalLanguage){
        case'en': { 
            tempHeader.innerHTML = "Please allow access to your location";
            tempText.innerHTML = "Welcome to the WeatherApp!<br>To get information about the current weather and forecast in your city, we must use your location information.";
            tempWarning.innerHTML = "Location data is only used to obtain weather information and would not be stored or transmitted";
            tempQuestion.innerHTML = `If you still see this message, <a onclick="quickTransfer()">click here</a><br><br>In case of any problems - <a href="https://github.com/PAXANDDOS">contact the developer</a>`;
            iconInfo.innerHTML = "Weather Icons by Bas";
            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            input.placeholder = 'Search for a country or city';
            break;
        }
        case'ru': { 
            tempHeader.innerHTML = "Пожалуйста, разрешите использование данных о вашем местоположении";
            tempText.innerHTML = "Добро пожаловать в GlassyWeather!<br>Чтобы получить информацию о текущих погодных условиях и прогнозе погоды в вашем городе, мне нужно использовать данные о местоположении";
            tempWarning.innerHTML = "Данные о местоположении используются только для получения сведений о погоде и не будут сохранены или переданы";
            tempQuestion.innerHTML = `Если вы всё ещё видите это сообщение <a onclick="quickTransfer()">нажмите здесь</a><br><br>В случае возникновения проблем - <a href="https://github.com/PAXANDDOS">свяжитесь с разработчиком</a>`;
            iconInfo.innerHTML = "Иконки для погоды сделал Bas";
            months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
            days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
            input.placeholder = 'Введите страну или город для поиска';
            break;
        }
        case'hu': { 
            tempHeader.innerHTML = "Kérjük kapcsolja be a hely hozzáférést";
            tempText.innerHTML = "Üdvözöljük a GlassyWeather-nál!<br>Ahhoz hogy megszerezzük a jelenlegi időjárási információt és előrejelzést a városából használnunk kell a helyi információját.";
            tempWarning.innerHTML = "A helyi adatot arra használjuk hogy megszerezzük az időjárási információt.A helyi adatot nem tároljuk és nem továbbítjuk.";
            tempQuestion.innerHTML = `Ha még mindig látja ezt az üzenetet <a onclick="quickTransfer()">kattintson ide</a><br><br>Hogyha problémát talál - <a href="https://github.com/PAXANDDOS">Lépjen kapcsolatba a fejlesztővel</a>`;
            iconInfo.innerHTML = "Időjárási ikonok Bas által";
            months = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
            days = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
            input.placeholder = 'Keressen egy országot vagy várost';
            break;
        }
        case'de': { 
            tempHeader.innerHTML = "Bitte erlauben Sie den Zugang auf Ihren Standort";
            tempText.innerHTML = "Herzlich Willkommen in der GlassyWeather!<br>Wir müssen Ihre Standortinformationen verwenden, um Informationen über das aktuelle Wetter und die Vorhersage in Ihrer Stadt zu erhalten";
            tempWarning.innerHTML = "Standortdaten werden nur zum Abrufen von Wetterinformationen verwendet und nicht gespeichert oder übertragen.";
            tempQuestion.innerHTML = `Wenn diese Meldung weiterhin angezeigt wird, <a onclick="quickTransfer()">klicken Sie hier</a><br><br>Bei Problemen wenden <a href="https://github.com/PAXANDDOS">Sie sich an den Entwickler</a>`;
            iconInfo.innerHTML = "Wetterikonen von Bas";
            months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
            days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
            input.placeholder = 'Suchen Sie nach einem Land oder einer Stadt';
            break;
        }
        case'uk': { 
            tempHeader.innerHTML = "Будь ласка, дозвольте використання даних про місцезнаходження ";
            tempText.innerHTML = "Вітаю у GlassyWeather!<br>Щоб отримати інформацію про поточні погодні умови і прогноз погоди у вашому місті, мені потрібно використовувати дані про місцезнаходження";
            tempWarning.innerHTML = "Дані про місцезнаходження використовуються тільки для отримання даних про погоду і не будуть збережені або передані";
            tempQuestion.innerHTML = `Якщо ви досі бачите це повідомлення, <a onclick="quickTransfer()">натисніть тут</a><br><br>У випадку будь-яких помилок - <a href="https://github.com/PAXANDDOS">зв'яжітся з розробником</a>`;
            iconInfo.innerHTML = "Іконки для погоди зробив Bas";
            months = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
            days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];
            input.placeholder = 'Введіть країну або місто для пошуку';
            break;
        }
    }
}

function quickTransfer() {
    document.getElementsByClassName('temporary')[0].style.display = 'none';
    inputBlock[0].style.display = "flex";
    currentBlock[0].style.display = "flex";
    document.getElementsByClassName('forecast')[0].style.display = "flex";
    getResults("Kyiv");
}

function backgroundSwitcher(status, temperature, sunrise, now, sunset) {
    switch(status) {
        case 'Clear': {
            if(now < sunrise || now > sunset) {
                body.className = '';
                inputBlock[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                inputBlock[0].style.boxShadow = "none";
                currentBlock[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                currentBlock[0].style.boxShadow = "none";
                for(let i = 0; i < cardBlock.length; i++) {
                    cardBlock[i].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    cardBlock[i].style.boxShadow = "none";
                }
                body.classList.add("night");
            }
            else if(temperature <= 5) {
                body.className = '';
                if(temperature <= -15) {
                    inputBlock[0].style.backgroundColor = "none";
                    inputBlock[0].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    currentBlock[0].style.backgroundColor = "none";
                    currentBlock[0].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    for(let i = 0; i < cardBlock.length; i++) {
                        cardBlock[i].style.backgroundColor = "none";
                        cardBlock[i].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    }
                    body.classList.add("clearFreezing");
                }
                else {
                    inputBlock[0].style.backgroundColor = "none";
                    inputBlock[0].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    currentBlock[0].style.backgroundColor = "none";
                    currentBlock[0].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    for(let i = 0; i < cardBlock.length; i++) {
                        cardBlock[i].style.backgroundColor = "none";
                        cardBlock[i].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    }
                    body.classList.add("clearCold");
                }
            }
            else if(temperature >= 5) {
                body.className = '';
                if(temperature >= 25){
                    inputBlock[0].style.backgroundColor = "rgba(65, 65, 65, 0.2)";
                    inputBlock[0].style.boxShadow = "none";
                    currentBlock[0].style.backgroundColor = "rgba(65, 65, 65, 0.2)";
                    currentBlock[0].style.boxShadow = "none";
                    for(let i = 0; i < cardBlock.length; i++) {
                        cardBlock[i].style.backgroundColor = "rgba(65, 65, 65, 0.2)";
                        cardBlock[i].style.boxShadow = "none";
                    }
                    body.classList.add("clearHot");
                }
                else {
                    inputBlock[0].style.backgroundColor = "none";
                    inputBlock[0].style.boxShadow = "5px 5px 20px rgba(0, 0, 0, 0.2)";
                    currentBlock[0].style.backgroundColor = "none";
                    currentBlock[0].style.boxShadow = "5px 5px 20px rgba(0, 0, 0, 0.2)";
                    for(let i = 0; i < cardBlock.length; i++) {
                        cardBlock[i].style.backgroundColor = "none";
                        cardBlock[i].style.boxShadow = "5px 5px 20px rgba(0, 0, 0, 0.2)";
                    }
                    body.classList.add("clearWarm");
                } 
            }
            break;
        }
        case 'Thunderstorm': {
            if(now < sunrise || now > sunset) {
                body.className = '';
                inputBlock[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                inputBlock[0].style.boxShadow = "none";
                currentBlock[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                currentBlock[0].style.boxShadow = "none";
                for(let i = 0; i < cardBlock.length; i++) {
                    cardBlock[i].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    cardBlock[i].style.boxShadow = "none";
                }
                body.classList.add("night");
            }
            else {
                body.className = '';
                body.classList.add("thunderstorm");
            }
            break;
        }
        case 'Drizzle': {
            if(now < sunrise || now > sunset) {
                body.className = '';
                inputBlock[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                inputBlock[0].style.boxShadow = "none";
                currentBlock[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                currentBlock[0].style.boxShadow = "none";
                for(let i = 0; i < cardBlock.length; i++) {
                    cardBlock[i].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    cardBlock[i].style.boxShadow = "none";
                }
                body.classList.add("night");
            }
            else {
                body.className = '';
                body.classList.add("drizzle");
            }
            break;
        }
        case 'Rain': {
            if(now < sunrise || now > sunset) {
                body.className = '';
                inputBlock[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                inputBlock[0].style.boxShadow = "none";
                currentBlock[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                currentBlock[0].style.boxShadow = "none";
                for(let i = 0; i < cardBlock.length; i++) {
                    cardBlock[i].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    cardBlock[i].style.boxShadow = "none";
                }
                body.classList.add("night");
            }
            else {
                body.className = '';
                body.classList.add("rain");
            }
            break;
        }
        case 'Snow': {
            if(now < sunrise || now > sunset) {
                body.className = '';
                inputBlock[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                inputBlock[0].style.boxShadow = "none";
                currentBlock[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                currentBlock[0].style.boxShadow = "none";
                for(let i = 0; i < cardBlock.length; i++) {
                    cardBlock[i].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    cardBlock[i].style.boxShadow = "none";
                }
                body.classList.add("night");
            }
            else if(temperature <= 5) {
                body.className = '';
                if(temperature <= -15) {
                    inputBlock[0].style.backgroundColor = "none";
                    inputBlock[0].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    currentBlock[0].style.backgroundColor = "none";
                    currentBlock[0].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    for(let i = 0; i < cardBlock.length; i++) {
                        cardBlock[i].style.backgroundColor = "none";
                        cardBlock[i].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    }
                    body.classList.add("clearFreezing");
                }
                else {
                    inputBlock[0].style.backgroundColor = "none";
                    inputBlock[0].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    currentBlock[0].style.backgroundColor = "none";
                    currentBlock[0].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    for(let i = 0; i < cardBlock.length; i++) {
                        cardBlock[i].style.backgroundColor = "none";
                        cardBlock[i].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    }
                    body.classList.add("clearCold");
                }
            }
            else {
                body.className = '';
                body.classList.add("snow");
            }
            break;
        }
        case 'Atmosphere': {
            if(now < sunrise || now > sunset) {
                body.className = '';
                inputBlock[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                inputBlock[0].style.boxShadow = "none";
                currentBlock[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                currentBlock[0].style.boxShadow = "none";
                for(let i = 0; i < cardBlock.length; i++) {
                    cardBlock[i].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    cardBlock[i].style.boxShadow = "none";
                }
                body.classList.add("night");
            }
            else {
                body.className = '';
                body.classList.add("atmosphere");
            }
            break;
        }
        case 'Clouds': {
            if(now < sunrise || now > sunset) {
                body.className = '';
                inputBlock[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                inputBlock[0].style.boxShadow = "none";
                currentBlock[0].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                currentBlock[0].style.boxShadow = "none";
                for(let i = 0; i < cardBlock.length; i++) {
                    cardBlock[i].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    cardBlock[i].style.boxShadow = "none";
                }
                body.classList.add("night");
            }
            else if(temperature <= 5) {
                body.className = '';
                if(temperature <= -15) {
                    inputBlock[0].style.backgroundColor = "none";
                    inputBlock[0].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    currentBlock[0].style.backgroundColor = "none";
                    currentBlock[0].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    for(let i = 0; i < cardBlock.length; i++) {
                        cardBlock[i].style.backgroundColor = "none";
                        cardBlock[i].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    }
                    body.classList.add("clearFreezing");
                }
                else {
                    inputBlock[0].style.backgroundColor = "none";
                    inputBlock[0].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    currentBlock[0].style.backgroundColor = "none";
                    currentBlock[0].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    for(let i = 0; i < cardBlock.length; i++) {
                        cardBlock[i].style.backgroundColor = "none";
                        cardBlock[i].style.boxShadow = "5px 5px 30px rgba(0, 0, 0, 0.2)";
                    }
                    body.classList.add("clearCold");
                }
            }
            else if(temperature >= 5) {
                body.className = '';
                if(temperature >= 25){
                    inputBlock[0].style.backgroundColor = "rgba(65, 65, 65, 0.2)";
                    inputBlock[0].style.boxShadow = "none";
                    currentBlock[0].style.backgroundColor = "rgba(65, 65, 65, 0.2)";
                    currentBlock[0].style.boxShadow = "none";
                    for(let i = 0; i < cardBlock.length; i++) {
                        cardBlock[i].style.backgroundColor = "rgba(65, 65, 65, 0.2)";
                        cardBlock[i].style.boxShadow = "none";
                    }
                    body.classList.add("clearHot");
                }
                else {
                    inputBlock[0].style.backgroundColor = "none";
                    inputBlock[0].style.boxShadow = "5px 5px 20px rgba(0, 0, 0, 0.2)";
                    currentBlock[0].style.backgroundColor = "none";
                    currentBlock[0].style.boxShadow = "5px 5px 20px rgba(0, 0, 0, 0.2)";
                    for(let i = 0; i < cardBlock.length; i++) {
                        cardBlock[i].style.backgroundColor = "none";
                        cardBlock[i].style.boxShadow = "5px 5px 20px rgba(0, 0, 0, 0.2)";
                    }
                    body.classList.add("clearWarm");
                } 
            }
            break;
        }
    }
}
