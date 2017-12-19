/**
 * Created by igiagante on 28/9/15.
 */

"use strict";

let Measure = require('../models/measure'),
    async = require('async'),
    request = require('request'),
    moment = require('moment');

let processSensor = function(measure, callback){

    Measure.create({
        measureDate: measure.measureDate,
        measure: measure.measure,
        unit: measure.unit,
        sensorId: measure.sensorId
    }, function(err) {
        if (err){
            callback(err);
        }
        callback();
    });
};

let processData = function(measures, callback){

    async.each(measures, processSensor, function(err){
        if (err) {
            callback(err);
        }
        callback(undefined, "all measures were successfully persisted!");
    });
};

//return all the measures done by one sensor
let getSensorMeasures = function(sensorId, callback) {

    Measure.find({ "sensorId" : sensorId }, function(error, measures){
        if(error) {
            callback(error);
        }
        callback(undefined, measures);
    });
};

let getTemperatureAndHumidity = function(callback) {

    let url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Cordoba&units=metric&cnt=16&appid=ee6b949a571893998b4424956aca7d97";

    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            let bodyJson = JSON.parse(body);
            let days = bodyJson.list;
            let temps = [];

            if(days) {

                for (let i = 0; i < days.length; i++) {

                    let date = new Date(days[i].dt * 1000);
                    let humidity = days[i].humidity;

                    if(humidity == 0) {
                        humidity = _getRandomHumidity();
                    }

                    let temp = {
                        "date": date,
                        "temp": days[i].temp.day,
                        "humidity" : humidity
                    };
                    temps.push(temp);
                }
            }
            callback(undefined, temps);
        } else {
            callback(error);
        }
    });
};

let _getRandomHumidity = function() {
    let low = 30;
    let high = 70;
    return Math.floor(Math.random() * (high - low + 1) + low);
};

let getActualTempAndHumidity = function (callback) {

    let url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Cordoba&units=metric&cnt=1&appid=ee6b949a571893998b4424956aca7d97";

    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {

            let bodyJson = JSON.parse(body);
            let days = bodyJson.list;

            let date = new Date(days[0].dt * 1000);
            var temp = days[0].temp.day;
            var humidity = days[0].humidity;

            if(humidity === 0) {
                humidity = _getRandomHumidity();
            }

            temp = {
                "date": date,
                "temp": temp,
                "humidity" : humidity
            };

            callback(undefined, temp);
        } else {
            callback(error);
        }
    });
};

module.exports = {
    processData : processData,
    getSensorMeasures : getSensorMeasures,
    getTemperatureAndHumidity: getTemperatureAndHumidity,
    getActualTempAndHumidity: getActualTempAndHumidity
};
