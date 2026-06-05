const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>NEX Weather</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial,sans-serif;
}

body{
min-height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:linear-gradient(
135deg,
#0f172a,
#1e293b,
#2563eb
);
padding:20px;
}

.card{
width:95%;
max-width:420px;
padding:45px 30px;
border-radius:35px;
background:rgba(255,255,255,.12);
backdrop-filter:blur(20px);
box-shadow:
0 0 30px rgba(37,99,235,.5),
0 0 60px rgba(0,255,255,.2);
text-align:center;
}

.weather-icon{
font-size:90px;
margin-bottom:15px;
}

h1{
font-size:52px;
font-weight:900;
color:#fff;
line-height:1.1;
margin-bottom:20px;
text-shadow:
0 0 15px #00ffff,
0 0 25px #00ffff;
}

.subtitle{
font-size:20px;
font-weight:800;
color:#dbeafe;
margin-bottom:25px;
}

input{
width:100%;
padding:20px;
font-size:20px;
font-weight:800;
border:none;
border-radius:18px;
outline:none;
text-align:center;
margin-bottom:20px;
}

button{
width:100%;
padding:20px;
font-size:22px;
font-weight:900;
border:none;
border-radius:18px;
cursor:pointer;
background:#00ff99;
color:#000;
}

.footer{
margin-top:25px;
font-size:15px;
font-weight:700;
color:#cbd5e1;
}

</style>
</head>

<body>

<div class="card">

<div class="weather-icon">☀️</div>

<h1>𝙼𝙸𝙽𝙳𝚂𝙼𝙸𝚃𝙷 𝚆𝙴𝙰𝚃𝙷𝙴𝚁 𝙲𝙷𝙴𝙲𝙺𝙴𝚁</h1>

<p class="subtitle">
Check weather anywhere in the world 🌍
</p>

<form action="/weather" method="POST">

<input
type="text"
name="city"
placeholder="ENTER CITY NAME"
required
>

<button>
🔍 CHECK WEATHER
</button>

</form>

<div class="footer">
Powered By NEX Weather
</div>

</div>

</body>
</html>
`);
});

app.post("/weather", async (req, res) => {

try {

const city = req.body.city;

const response = await axios.get(
`https://wttr.in/${encodeURIComponent(city)}?format=j1`
);

const weather = response.data.current_condition[0];

res.send(`
<!DOCTYPE html>
<html>
<head>
<title>${city} Weather</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial,sans-serif;
}

body{
min-height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:linear-gradient(
135deg,
#0f172a,
#1e293b,
#2563eb
);
padding:20px;
}

.card{
width:95%;
max-width:420px;
padding:45px 30px;
border-radius:35px;
background:rgba(255,255,255,.12);
backdrop-filter:blur(20px);
box-shadow:
0 0 30px rgba(37,99,235,.5),
0 0 60px rgba(0,255,255,.2);
text-align:center;
color:white;
}

.city{
font-size:40px;
font-weight:900;
margin-bottom:20px;
text-shadow:0 0 15px #00ffff;
}

.icon{
font-size:80px;
margin-bottom:15px;
}

.info{
font-size:26px;
font-weight:900;
line-height:1.8;
}

.back{
display:inline-block;
margin-top:25px;
padding:15px 25px;
background:#00ff99;
color:black;
font-size:18px;
font-weight:900;
text-decoration:none;
border-radius:15px;
}

</style>
</head>

<body>

<div class="card">

<div class="icon">🌤️</div>

<div class="city">${city.toUpperCase()}</div>

<div class="info">
🌡️ ${weather.temp_C}°C<br><br>
☁️ ${weather.weatherDesc[0].value}<br><br>
💨 ${weather.windspeedKmph} km/h<br><br>
💧 ${weather.humidity}% Humidity
</div>

<a href="/" class="back">
🔙 CHECK ANOTHER CITY
</a>

</div>

</body>
</html>
`);

} catch (err) {

res.send(`
<h1 style="font-family:Arial;text-align:center;margin-top:50px;">
❌ City Not Found
</h1>
`);
}

});

app.listen(PORT, () => {
console.log(\`☀️ NEX Weather running on http://localhost:\${PORT}\`);
});