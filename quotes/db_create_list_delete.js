var mongoClient = require('mongodb').MongoClient;

var dbInfo = "mongodb://admin:admin@ds163699.mlab.com:63699/learning";
var db;

//connecting to mongodb
mongoClient.connect(dbInfo, function(err, db) {
       if(err)
           throw err;
       console.log("connected to the mongoDB !");
       myCollection = db.collection('quotes');                  //quotes is the collection
       myCollection.stats(function(err,stats) {                 //getting stats info of collections
         console.log(stats);
        //  db.close();
       });

       //adding documents
       /*
       myCollection.insert({name: "doduck", quote: "learn more than everyone"}, function(err, result) {
         if(err)
         throw err;

         console.log("entry saved");
});


//listing all documents
myCollection.find(function(err, items) {
  items.toArray(function(err, item) {
    console.log('Document Array');
      console.log(item);
  });
});

myCollection.find(function(err, items) {
  items.each(function(err, item) {
    if(item) {
      console.log('Singular Items');
      console.log(item);
    }
  });
});

//finding one documnet
myCollection.findOne({name:'doduck'}, function(err, item) {
  console.log('Found documents with doduck');
  console.log(item);
})


//updating a document
myCollection.update({name: "doduck"}, {name: "doduck", description: "prototype your idea"}, {w:1}, function(err) {
if(err)
    throw err;
    console.log('entry updated');
});


//updating a document by adding fields
myCollection.update({name: "doduck"}, {$set: {industry: "France"}}, {w:1}, function(err) {
if(err)
    throw err;
    console.log('entry updated');
});


//Updating a document by adding a fields within a new field
myCollection.update({name: "doduck"}, {$set: {company: {employed: 10, officialName: "doduck LTD", industries: ["it consulting", "passionate programming"]}}}, {w:1}, function(err) {
    if(err)
        throw err;
    console.log('entry updated');
});
*/

//Remove document
myCollection.findAndModify({name: "doduck"}, [], {remove:true}, function(err, object) {
    if(err)
        throw err;
    console.log("document deleted");
});

db.close();
     });
