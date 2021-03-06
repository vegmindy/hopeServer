require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express');
const db = require('./db');
const app = express();
const controllers = require('./controllers');
const validateSession = require('./middleware/validateSession');

app.use(express.json());
app.use(require('./middleware/headers'));
app.use(bodyParser.json())


app.use('/user', controllers.userController);
app.use('/review', validateSession, controllers.reviewController); //add validatesession back in
app.use('/search', controllers.searchController);


db.authenticate()
    .then(() => db.sync()) // => {force: true}
    .then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`));
    })
    .catch((err) => {
        console.log("[Server: ] Server Crashed");
        console.log(err)
    })