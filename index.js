const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

console.log(process.env);

//Creation express server/app
const app = express();

//Database connection
dbConnection();

//Public directory
app.use(express.static('public'));

//CORS
app.use(cors());

//Read and parse from body
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.PORT} port`)
});