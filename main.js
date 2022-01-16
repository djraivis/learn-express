const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(getWeather);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

function getWeather(reg, res, next) {
  req.visitorWeather = false;
  if (req.visitorWeather) {
    res.send('please come back to app when it is not raining');
  } else {
    next();
  }
}
app.get('/', (req, res) => {
  res.render('index', {
    isRaining: req.visitorWeather,
    pets: [
      { name: 'Meowsalot', species: 'cat' },
      { name: 'Barksalot', species: 'dog' },
    ],
  });
});
app.get('/about', (req, res) => {
  res.send('Thank you for learning more about us');
});

app.post('/result', (req, res) => {
  if (req.body.color.trim().toUpperCase() === 'BLUE') {
    res.send('Congrats, that is correct.');
  } else {
    res.send('Incorrect, please try again');
  }
});
app.get('/result', (req, res) => {
  res.send('Why are you visiting this URL?');
});

app.get('/api/pets', (req, res) => {
  res.json([
    { name: 'Meowsalot', species: 'cat' },
    { name: 'Barksalot', species: 'dog' },
  ]);
});

app.listen(3000);
