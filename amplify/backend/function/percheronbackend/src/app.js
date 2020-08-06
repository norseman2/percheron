var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var axios = require('axios')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.get('/reservations', function(req, res) {
  /*
  const reservations = [
    {
      PECNom:'WWW AUTO',
      DateDepart:'2020-07-28 07:30:00',
      DateRetourPrevue:'2020-07-30 15:23:00',
      Duree:2,
      PrixTotalHT:156.25,
      ClientIntitule:'GUILLAUME LE CONQUERANT',
      AgenceDepart:'WWWPORT',
      VehImmatriculation:'FK927FI',
      VehCategorie:'P',
      VehType:'VP'
    },
    {
      PECNom:'WWW AUTO',
      DateDepart:'2020-07-29 07:30:00',
      DateRetourPrevue:'2020-08-01 07:30:00',
      Duree:3,
      PrixTotalHT:188.75,
      ClientIntitule:'MARC AURELE',
      AgenceDepart:'WWWPORT',
      VehImmatriculation:'FK822KM',
      VehCategorie:'P',
      VehType:'VP'
    },
    {
      PECNom:'WWW AUTO',
      DateDepart:'2020-07-22 08:30:00',
      DateRetourPrevue:'2020-08-05 08:30:00',
      Duree:14,
      PrixTotalHT:302.64,
      ClientIntitule:'MICHEL ONFRAY',
      AgenceDepart:'WWWSTP',
      VehImmatriculation:'FH432ER',
      VehCategorie:'P',
      VehType:'VP'
    }
  ]
  */
  axios.post(
    'https://wwwwww.execute-api.eu-west-3.amazonaws.com/dev/reservations', 
    {
      DocumentIntegre: "O",
      DateDepartDebut: "2020-07-20 00:00:00",
      DateDepartFin: "2020-12-31 23:59:59",
      PECNom: "WWW AUTO",
      AgenceDepart: ""
    }
  ).then(response=>{
    res.json({
      reservations: response.data,
      success: "successfully fetched reservations",
      url: req.url
    })
  }).catch(err=>{
    res.json({
      error: "error fetch from reservations API"
    })
  })
});

app.get('/item', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.post('/item', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.put('/item', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.delete('/item', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
