const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('scream', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log' , log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }

  });
  next();
});

// app.use((req, res, next) => {
//   res.render('miantenance.hbs')
// });

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/first page'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'home page',
    welcomeMessage: 'welcome to page',

  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs' , {
    pageTitle: 'about page',

  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage : 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`server is up in port 3000 ${port}`);
});
