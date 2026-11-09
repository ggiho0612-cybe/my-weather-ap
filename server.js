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
        const queryParams = new URLSearchParams({
            q: city,
            appid: OPEN_WEATHER_MAP_KEY,
            units: 'metric',
            lang: 'kr'
        });

        const targetUrl = 'https://openweathermap.org?' + queryParams.toString();
        
        const response = await axios.get(targetUrl);
        res.json(response.data);
    } catch (error) {
        console.error('날씨 데이터 가져오기 실패:', error.message);
        res.status(500).json({ error: '날씨 정보를 불러오는 데 실패했습니다.' });
    }
});

app.listen(PORT, () => {
    console.log(`서버가 성공적으로 실행되었습니다!`);
    console.log(`웹페이지 접속 주소: http://localhost:${PORT}`);
});
