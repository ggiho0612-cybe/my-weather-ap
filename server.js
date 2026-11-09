const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

const OPEN_WEATHER_MAP_KEY = 'fb2481ce2f829b12fd34968dc8848461'; 

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/weather', async (req, res) => {
    const city = req.query.city || 'Seoul';

    try {
    const openApiUrl = 'https://openweathermap.org' + city + '&appid=' + OPEN_WEATHER_MAP_KEY + '&units=metric&lang=kr';
    
    const response = await axios.get(openApiUrl);
    res.json(response.data);
};

app.listen(PORT, () => {
    console.log(`서버가 성공적으로 실행되었습니다!`);
    console.log(`웹페이지 접속 주소: http://localhost:${PORT}`);
});
