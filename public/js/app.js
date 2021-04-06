const weatherForm = document.querySelector('form');
const message = document.querySelector('#success-data');
const spinner = document.querySelector('.spinner')
const headerLocation= document.querySelector('#headerLocation')
const imageIcon = document.querySelector('.img-weather')
const card = document.querySelector('.weather-forecast')
const cardLocation = document.querySelector('.card-title')
const cardCurrentWeather= document.querySelector('.card-text')
const cardTemperature = document.querySelector('.btn-temperature')
const weather_icons =  document.getElementById("myImg")

spinner.style.display='none';
card.style.display='none'
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const search = document.querySelector('.input-search').value;
    spinner.style.display='block';
    const url = `http://localhost:3000/weather?address=${search}`
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                setTimeout(()=>{
                    card.style.display='block'
                    cardLocation.innerHTML = `Unable to find : ${search}`
                    cardTemperature.style.display = 'none'
                    cardCurrentWeather.textContent=''
                    spinner.style.display='none';              
                      
                },1000)   

            } else {
                setTimeout(()=>{  
                   weather_icons.src = data.weather_icons
                    card.style.display='block'
                    cardTemperature.style.display = 'block'
                    cardLocation.innerHTML = `${data.location}`
                    cardCurrentWeather.innerHTML = 'Its ' +data.current_Weather+ ' in there'
                    cardTemperature.innerHTML = `Temperature: <b>${data.temperature} &#8451; `
                    spinner.style.display='none';    
                },2000)
               
            }
        })
    })
})

