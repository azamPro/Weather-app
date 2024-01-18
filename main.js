let latitude 
let longitude 
//here use your api key
let API_KEY = '999999';

async function getData(){
    
    let url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&lang=ar`;
    try {
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            printWeatherData(data);
        }else{
            alert('حدث خطأ ما');
        }
        
    } catch (error) {
        console.log(error);
    }


}



function saveUserLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            // Example: Saving to the local storage
            localStorage.setItem('userLatitude', latitude);
            localStorage.setItem('userLongitude', longitude);
            getData()
            
        }, function(error) {
            alert('Unable to get location: ' + error.message);
        });
    } else {
        alert('Your browser does not support geolocation');
    }
    
}


function printWeatherData(data) {
    document.getElementById('location').textContent = ` الموقع: ${data.location.name}, ${data.location.region}`;
    document.getElementById('local-time').textContent = `الوقت : ${data.location.localtime.slice(11, 16)}`;
    document.getElementById('temperature').textContent = `درجة الحرارة: ${data.current.temp_c}°م `;
    document.getElementById('feels-like').textContent = `الإحساس بدرجة الحرارة: ${data.current.feelslike_c}°م `;
    document.getElementById('condition').textContent = `الحالة: ${data.current.condition.text}`;
    document.getElementById('humidity').textContent = `الرطوبة: ${data.current.humidity}%`;
    document.getElementById('wind').textContent = `الرياح: ${data.current.wind_kph} كم/س ${data.current.wind_dir}`;
    document.getElementById('visibility').textContent = `مدى الرؤية: ${data.current.vis_km} كم`;

    // Show the weather container
    document.getElementById('getWeatherBtn').style.display = 'none';

    document.getElementById('weather-container').style.display = 'block';
}


document.getElementById('getWeatherBtn').addEventListener('click', function() {
    saveUserLocation();
});



