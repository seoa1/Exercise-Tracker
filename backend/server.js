const express = require('express');
const cors = require('cors');

require('dotenv').config(); //loads environment variables from .env

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});