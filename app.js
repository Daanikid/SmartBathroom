const apiKey = "aa8NWpTXpyZ3mn0PonRqlCdptY85ya6PkZ"; 

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getLocationKey(lat, lon);
}

function error(err) {
    document.getElementById("location").innerHTML = `<i class="fas fa-map-marker-alt"></i> Error obteniendo ubicación: ${err.message}`;
    console.error("Error de geolocalización:", err);
}

function getLocationKey(lat, lon) {
    let url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let city = data.LocalizedName;
            let state = data.AdministrativeArea.LocalizedName;

            // Mostrar la ubicación con el ícono
            document.getElementById("location").innerHTML = `<i class="fas fa-map-marker-alt"></i> ${city}, ${state}`;

            // Llamar a la función para obtener el clima
            getWeather();
        })
        .catch(error => {
            document.getElementById("location").innerHTML = `<i class="fas fa-map-marker-alt"></i> Error obteniendo ubicación`;
            console.error("Error obteniendo Location Key:", error);
        });
}

function getWeather() {
    let url = `https://dataservice.accuweather.com/currentconditions/v1/241912?apikey=${apiKey}&details=true&language=es-MX`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let temperature = data[0]?.Temperature?.Metric?.Value ?? "No disponible";
            let condition = data[0]?.WeatherText ?? "No disponible";
            let humidity = data[0]?.RelativeHumidity ?? "No disponible";

            // Mostrar los datos del clima con un encabezado de nubecita
            document.getElementById("weather").innerHTML = `
                <h3><i class="fas fa-cloud"></i>  Datos del Clima Exterior</h3>
                <p><strong>Temperatura:</strong> ${temperature}°C</p>
                <p><strong>Condición:</strong> ${condition}</p>
                <p><strong>Humedad:</strong> ${humidity}%</p>
            `;
        })
        .catch(error => {
            document.getElementById("weather").innerHTML = `
                <h3><i class="fas fa-cloud"></i> Datos del Clima</h3>
                <p>Error obteniendo el clima</p>
            `;
            console.error("Error obteniendo clima:", error);
        });
}