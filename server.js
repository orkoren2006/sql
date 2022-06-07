const express = require('express'),
    dbOperation = require('./dbFiles/dbOperation'),
    cors = require('cors');

const API_PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


app.post('/api', async (req, res) => {
    await dbOperation.createLoan(req.body);
    const result = await dbOperation.getLoans()
    res.send(result.recordset)
});


app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));