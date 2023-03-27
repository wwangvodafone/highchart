const express = require('express');
const fs = require('fs');
const app = express();
app.get('/data', (req, res) => {
    console.log(req.query.value)
    var fileName = '../data/fraud_detect.txt'
    if (req.query.value == '1') {
        fileName = '../data/fraud_detect1.txt'
    }
    else if (req.query.value == '2') {
        fileName = '../data/fraud_detect2.txt'
    }
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(data)
    });
});

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});