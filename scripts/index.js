window.onload = function () {

    let dropdownMenuCity = document.getElementById("selectCity");
    cities.forEach(function (city) {
        var option = document.createElement("option");
        option.text = city.name;
        dropdownMenuCity.appendChild(option);
    });


    document.getElementById("selectCityBtn").addEventListener("click", onSelectCityBtn);

}


function onSelectCityBtn() {
    document.getElementById("resultSection").style.display = "block";

    let selectedCity = document.getElementById("selectCity").value;
    let city = cities.find(c => c.name === selectedCity);

    if (city) {
        let stationLookupUrl = `https://api.weather.gov/points/${city.latitude},${city.longitude}`;

        fetch(stationLookupUrl)
            .then(response => response.json())
            .then(data => {
                let weatherUrl = data.properties.forecast;
                getWeather(weatherUrl);
            });
    }
}

function getWeather(weatherUrl) {
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            let forecastArray = data.properties.periods;
            displayWeather(forecastArray);
        });
}
function displayWeather(forecastArray) {
    let result = document.getElementById("result");

    result.innerHTML = "";
    forecastArray.forEach(period => {
        result.innerHTML += `<p>Time Period: ${period.name}, Temperature: ${period.temperature}</p>`;
    });
}
