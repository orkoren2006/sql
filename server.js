const express = require('express'),
    dbOperation = require('./dbFiles/dbOperation'),
    cors = require('cors');


dbOperation.getLoans().then(res => {
    console.log(res);
});