let router = require('express').Router();
let sequelize = require('../db');
let Flight = sequelize.import('../models/flightinfo');
let cron = require('node-cron');
const fetch = require('node-fetch');

router.post('/myflight', function (req, res) {
    Flight.findAll({
        where: {airline: req.body.airline, departureAirport: req.body.departureAirport, departureScheduledTime: req.body.departureScheduledTime }
    }).then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});


//Below is what pushes API data to postgres on a schedule

cron.schedule('* 1 * * *', function() {
    const baseURL = 'http://aviation-edge.com/v2/public/timetable?key=1ad327-3b3fb3';

    const airlines = ['Delta Air Lines', 'Alaska Airlines', 'Southwest Airlines', 'United Airlines', 'Hawaiian Airlines', 'American Airlines', 'JetBlue Airways', 'Allegiant Air', 'Spirit Airlines', 'Frontier Airlines']

    airlines.map(name =>
        fetch(`${baseURL}&airline_name=${name}`)
        .then(res => res.json())
        .then(data => data.map(
            set => (Flight.create({
                airline: set.airline.name,
    
                arrivalAirport: set.arrival.iataCode,
    
                arrivalScheduledTime: set.arrival.scheduledTime,
    
                arrivalActualTime: set.arrival.actualTime,
    
                departureAirport: set.departure.iataCode,

                departureScheduledTime: set.departure.scheduledTime,
    
                departureActualTime: set.departure.actualRunway,
    
                flightiataNumber: set.flight.iataNumber
            })
            )
            .then(
                function createSuccess(postedinfo) {
                    res.json({
                        postedinfo: postedinfo
                    });
                },
                function createError(err) {
                    res.send(500, err.message);
                }
            )
            )
        ))
    }
)

module.exports = router
