document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var ciutat = document.getElementById('ciutat').value;
    var codiPostal = document.getElementById('codiPostal').value;
    var pais = document.getElementById('pais').value;

    if (!ciutat || !codiPostal) {
        alert('Els camps de ciutat i codi postal són obligatoris.');
        return;
    }

    var url = `https://api.weatherapi.com/v1/forecast.json?key=ddc6308e292b45028c0215125242502&q=${ciutat}&days=2`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.style.display = 'block';
            weatherInfo.innerHTML = `
                <h2>Temperatura actual a ${data.location.name}: ${data.current.temp_c}°C</h2>
                <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
                <p>${data.current.condition.text}</p>
                <h2>Previsió per a demà a ${data.location.name}: ${data.forecast.forecastday[1].day.avgtemp_c}°C</h2>
                <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="${data.forecast.forecastday[1].day.condition.text}">
                <p>${data.forecast.forecastday[1].day.condition.text}</p>
            `;
        })
        .catch(error => {
            alert('Hi ha hagut un error en obtenir la previsió meteorològica. Si us plau, intenta-ho de nou més tard.');
            console.error('Error:', error);
        });
});