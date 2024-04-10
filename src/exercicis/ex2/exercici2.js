// Afegim un escoltador d'esdeveniments al formulari amb l'ID 'weatherForm'. L'esdeveniment és 'submit'.
document.getElementById('weatherForm').addEventListener('submit', async function (event) {
    // Prevenim el comportament per defecte de l'enviament del formulari.
    event.preventDefault();

    // Obtenim els valors dels camps del formulari.
    let ciutat = document.querySelector('#ciutat').value;
    let codiPostal = document.querySelector('#codiPostal').value;
    let pais = document.querySelector('#pais').value;

    // Si no s'han introduït la ciutat o el codi postal, mostrem un missatge d'alerta i sortim de la funció.
    if (!ciutat || !codiPostal) {
        alert('Els camps de ciutat i codi postal són obligatoris.');
        return;
    }

    // Creem la consulta amb la ciutat i, si s'ha introduït, el país.
    let consulta = ciutat;
    if (pais) {
        consulta += ',' + pais;
    }

    // Definim la clau de l'API i la URL de la consulta.
    const API_KEY = 'ddc6308e292b45028c0215125242502';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${consulta}&days=2`;

    try {
        // Fem la petició a l'API i esperem a obtenir la resposta.
        let response = await fetch(url);
        // Convertim la resposta a JSON i esperem a que es completi la conversió.
        let data = await response.json();

        // Obtenim l'element on mostrarem la informació del temps i l'omplim amb la informació obtinguda.
        let weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.style.display = 'block';
        weatherInfo.innerHTML = `
            <h2>Temperatura actual a ${data.location.name}: ${data.current.temp_c}°C</h2>
            <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
            <p>${data.current.condition.text}</p>
            <h2>Previsió per a demà a ${data.location.name}: ${data.forecast.forecastday[1].day.avgtemp_c}°C</h2>
            <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="${data.forecast.forecastday[1].day.condition.text}">
            <p>${data.forecast.forecastday[1].day.condition.text}</p>
        `;
    } catch (error) {
        // Si hi ha hagut algun error en la petició, mostrem un missatge d'alerta i l'error per la consola.
        alert('Hi ha hagut un error en obtenir la previsió meteorològica. Si us plau, intenta-ho de nou més tard.');
        console.error('Error:', error);
    }
});