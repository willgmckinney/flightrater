let express = require('express');
let app = express();
let user = require('./controllers/userController');
let rating = require('./controllers/ratingController');
let sequelize = require('./db');


sequelize.sync();
// sequelize.sync({force: true});

app.use(express.json());

app.use(require('./middleware/headers'));

app.use('/user', user);

app.use(require('./middleware/auth'));

app.use('/rating', rating);


app.listen(8000, function(){
    console.log('App is listening on 8000.')
});