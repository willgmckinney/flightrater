let express = require('express');
let app = express();
let user = require('./controllers/userController');
let rating = require('./controllers/ratingController');
let flight = require('./controllers/flightController');
let sequelize = require('./db');


sequelize.sync();
// sequelize.sync({force: true});

app.use(express.json());

app.use(require('./middleware/headers'));

app.use('/user', user);

app.use('/flight', flight);

app.use(require('./middleware/auth'));

app.use('/rating', rating);

app.listen(process.env.PORT, function(){
    console.log('App is listening on 8000.')
});