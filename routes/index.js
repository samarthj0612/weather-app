var express = require("express");
var router = express.Router();
var path = require("path");
var server = require("https");
var appid = "c4796d806180ceb42d4b73253d899284";
var cityModel = require("../models/cities");
const indianCitiesDatabase = require("indian-cities-database");

router.get("/", function (req, res) {
  let cities = indianCitiesDatabase.cities;
  cityModel.find().then(function (c) {
    if (!c.length && cities && cities.length) {
      cityModel.create(cities).then(() => {
        res.render("index");
      });
    }
    else {
      res.render("index");
    }
  });
});

router.get("/getcitynames/:temp", function (req, res) {
  cityModel.find({ city: { $regex: req.params.temp } }).then(function (c) {
    res.json({ data: c });
  });
});

router.post("/getweather", (req, res) => {
  cityNames = req.body.selectcity;

  const weatherData = `https://api.openweathermap.org/data/2.5/weather?q=${cityNames}&appid=${appid}&units=metric`;

  server.get(weatherData, (response) => {
    response.on("data", function (data) {
      try {
        const allWeatherData = JSON.parse(data);
        const imageIcon = allWeatherData.weather[0].icon;
        const image = `http://openweathermap.org/img/wn/${imageIcon}@2x.png`;

        res.render("weather", { data: allWeatherData, img: image, error: null, });

      } catch (e) {
        res.render("index", {
          data: null,
          error: "Enter a city name to get weather data",
        });
      }
    });
  });
});

module.exports = router;
