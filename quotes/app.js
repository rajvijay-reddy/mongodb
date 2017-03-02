//https://zellwk.com/blog/crud-express-mongodb/
//step 1 - Require all dependencies
var express = require('express');
var bodyParser = require('body-parser');    //express can't read data from form, bosy-parser

                                            //is used for reading data from from elements
var mongoClient = require('mongodb').MongoClient;
var app = express();

var dbInfo = "mongodb://admin:admin@ds163699.mlab.com:63699/learning";
var db;

app.use(bodyParser.urlencoded({extended:true}));    //urlencoded puts the data from form element
                                                // & adds them to the body property in the req obj
app.use(express.static('public'));              //making public folder accessible to public
app.use(bodyParser.json());     //server's doesn't read json data, to let it read it we use this
app.set('view engine', 'ejs');
//step 2 - create a server where browser can connect to

mongoClient.connect(dbInfo, (err,database) => {
  if(err) {
    console.log(err);
    return;
  } else {
    db = database
    app.listen(process.env.PORT || 4000, () => {
        console.log('listening on 4000');
    });

  }
});


app.get('/', (req,res) => {
  // res.sendFile(__dirname + '/index.html');
  //find returns a cursor and toArray method in find retruns all data from that collection
  //toArray takes a callback function
  db.collection('quotes').find().toArray((err, results) => {
    if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {quotes: results})
    })
  });

app.post('/quotes', (req,res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('Quotes saved');
    res.redirect('/');
  })
})

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/quotes', (req, res) => {
    db.collection('quotes').findOneAndDelete({ name: req.body.name }, (err, result) => {
        if (err) return res.send(500, err)
        res.send('A darth vadar quote got deleted')
    })
})
