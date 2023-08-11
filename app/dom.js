export class Dom{

    constructor(){
        this.city = document.querySelector(".name");
        this.countryLatLon = document.querySelector(".country");
        this.timeZone = document.querySelector(".time-zone");
        this.timeDate = document.querySelector(".date-time-one");
        this.currentTempEl = document.getElementById("current-temp");
        this.buscador = document.querySelector(".weather__search");
        this.currentWeatherEl = document.getElementById("current-weather-items");
        this.tempOne = document.querySelector(".temperatura");
        this.tempTwo = document.querySelector(".temperatura2")
    }

  
    emptyInput(){
        this.buscador.reset();
    }

    render(weather){
        const sections = document.querySelectorAll(".section");
        const sectBtns = document.querySelectorAll(".controlls");
        const sectBtn = document.querySelectorAll(".control");
        const allSections = document.querySelector(".main-content");


        function pageTransitions() {
            //Button click active class
            for(let i = 0; i < sectBtn.length; i++){
                sectBtn[i].addEventListener("click", function(){
                    let currentBtn = document.querySelectorAll(".active-btn");
                    currentBtn[0].className = currentBtn[0].className.replace("active-btn", "");
                    this.className += " active-btn"; 
                })
            }

        //Sections active
        allSections.addEventListener("click", (e)=>{
            const id = e.target.dataset.id;
            if(id){
                //remove selected from the other btn
                sectBtns.forEach((btn)=>{
                    btn.classList.remove('active');
                })
                e.target.classList.add('active');

                //Hide other sections
                sections.forEach((section)=>{
                    section.classList.remove('active');
                })

                const element = document.getElementById(id);
                element.classList.add('active');
            }
        })

        //toggle them
        const themeBtn = document.querySelector(".theme-btn");
        themeBtn.addEventListener("click", () => {
            let element = document.body;
            element.classList.toggle("other-mode");
        })
    }

        pageTransitions();

        let ubicacionPrincipal = window.scrollY;
        window.addEventListener("scroll", function(){
            let desplazamientoActual = window.scrollY;
            if(ubicacionPrincipal >= desplazamientoActual){
                document.getElementsByTagName("nav")[0].style.top = "0px"
            }else{
                document.getElementsByTagName("nav")[0].style.top = "-100px"
            }
            ubicacionPrincipal= desplazamientoActual;
        })


        //Changes units
        function pad(units){
            return units === "imperial" ? "&#176C" : "&#176F";
            //return (this.units === "imperial" ? "&#176F" : "&#176C");
        }


        //Convert country code to name
        function convertCountryCode(country){
            let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
            return regionNames.of(country)
        }

        function convertTimeStamp(timestamp, timezone){
            const convertTimeZone = timezone / 3600;//Converts seconds to hours
            const date = new Date(timestamp * 1000);
            const options = {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                timeZone: `Etc/GMT${convertTimeZone >= 0 ? "-" : "+"}${Math.abs(convertTimeZone)}`,
                hour12: true
            }
            return date.toLocaleString("en-US", options);
            }

        this.city.innerHTML = weather.name;
        this.countryLatLon.innerHTML = weather.coord.lat + "N" + weather.coord.lon + "E";
        this.timeZone.innerHTML = `${convertCountryCode(weather.sys.country)}`;
        this.timeDate.innerHTML = convertTimeStamp(weather.dt, weather.timezone);
        this.currentTempEl.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(weather.dt * 1000).format('dddd')}</div>
                <div class="temp">Temp - ${Math.round(weather.main.temp)}&#176</div>
                <div class="temp">Fls-like - ${Math.round(weather.main.feels_like)}&#176 </div>
            </div>`

            
            let {humidity, pressure} = weather.main;
            let {sunrise, sunset} = weather.sys;
        
            this.currentWeatherEl.innerHTML = `
            <div class="weather-item">
                <div class="title-weather-item">Humidity:</div>
                <div>${humidity}%</div>
            </div>
            <div class="weather-item">
                <div class="title-weather-item">Pressure:</div>
                <div>${pressure} hPa</div>
            </div>
            <div class="weather-item">
                <div class="title-weather-item">Wind speed:</div>
                <div>${weather.wind.speed} ${this.units === "imperial" ? "mph" : "m/s"}</div>
            </div>
            <div class="weather-item">
                <div class="title-weather-item">Sunrise:</div>
                <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
            </div>
            <div class="weather-item">
                <div class="title-weather-item">Sunset:</div>
                <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
            </div>` 
            
    }

    renderTwo(info){
        document.querySelector(".one-forecast").innerHTML = `
        <div class="day">${window.moment(info.list[0].dt * 1000).format('HH:mm a')}</div>
        <img src="https://openweathermap.org/img/wn/${info.list[0].weather[0].icon}@2x.png" alt="weather icon" class="w-icon"> 
        <div class="temp">Temp - ${Math.round(info.list[0].main.temp)}&#176</div>
        <div class="temp">Fls-like - ${Math.round(info.list[0].main.feels_like)}&#176</div>
        `;
        document.querySelector(".two-forecast").innerHTML = `
        <div class="day">${window.moment(info.list[1].dt * 1000).format('HH:mm a')}</div>
        <img src="https://openweathermap.org/img/wn/${info.list[1].weather[0].icon}@2x.png" alt="weather icon" class="w-icon"> 
        <div class="temp">Temp - ${Math.round(info.list[1].main.temp)}&#176</div>
        <div class="temp">Fls-like - ${Math.round(info.list[1].main.feels_like)}&#176</div>
        `;
        document.querySelector(".three-forecast").innerHTML = `
        <div class="day">${window.moment(info.list[2].dt * 1000).format('HH:mm a')}</div>
        <img src="https://openweathermap.org/img/wn/${info.list[2].weather[0].icon}@2x.png" alt="weather icon" class="w-icon"> 
        <div class="temp">Temp - ${Math.round(info.list[2].main.temp)}&#176</div>
        <div class="temp">Fls-like - ${Math.round(info.list[2].main.feels_like)}&#176</div>
        `;
        document.querySelector(".four-forecast").innerHTML = `
        <div class="day">${window.moment(info.list[3].dt * 1000).format('HH:mm a')}</div>
        <img src="https://openweathermap.org/img/wn/${info.list[3].weather[0].icon}@2x.png" alt="weather icon" class="w-icon"> 
        <div class="temp">Temp - ${Math.round(info.list[3].main.temp)}&#176</div>
        <div class="temp">Fls-like - ${Math.round(info.list[3].main.feels_like)}&#176</div>
        `;
        document.querySelector(".five-forecast").innerHTML = `
        <div class="day">${window.moment(info.list[4].dt * 1000).format('HH:mm a')}</div>
        <img src="https://openweathermap.org/img/wn/${info.list[4].weather[0].icon}@2x.png" alt="weather icon" class="w-icon"> 
        <div class="temp">Temp - ${Math.round(info.list[4].main.temp)}&#176</div>
        <div class="temp">Fls-like - ${Math.round(info.list[4].main.feels_like)}&#176</div>
        `;
        document.querySelector(".six-forecast").innerHTML = `
        <div class="day">${window.moment(info.list[5].dt * 1000).format('HH:mm a')}</div>
        <img src="https://openweathermap.org/img/wn/${info.list[5].weather[0].icon}@2x.png" alt="weather icon" class="w-icon"> 
        <div class="temp">Temp - ${Math.round(info.list[5].main.temp)}&#176</div>
        <div class="temp">Fls-like - ${Math.round(info.list[5].main.feels_like)}&#176</div>
        `;
    }
}