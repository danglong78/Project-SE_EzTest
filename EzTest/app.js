const express = require('express');
const bodyParser = require('body-parser');

const Routes = require('./src/routes');
const Database = require('./src/database');

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', Routes());

// set up mongoose
Database.connect().then(() => {
    console.log('Database connected');
})
    .catch((error) => {
        console.log('Error connecting to database');
    });
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})
