document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert('도시 이름을 영어로 입력해 주세요!');
        return;
    }
    getWeather(city);
});

document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('searchBtn').click();
    }
});

async function getWeather(city) {
    const loading = document.getElementById('loading');
    const weatherInfo = document.getElementById('weatherInfo');
    const errorMsg = document.getElementById('errorMsg');

    loading.style.display = 'block';
    weatherInfo.style.display = 'none';
    errorMsg.innerText = '';

    try {
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || '날씨 정보를 가져오지 못했습니다. 도시 이름을 영어로 정확히 입력해주십시오.');
        }

        document.getElementById('cityName').innerText = data.name;
        document.getElementById('tempValue').innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById('weatherDesc').innerText = data.weather[0].description;

        weatherInfo.style.display = 'block';
    } catch (error) {
        errorMsg.innerText = error.message;
    } finally {
        loading.style.display = 'none';
    }
}

getWeather('Seoul');