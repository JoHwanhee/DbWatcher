const mongodb = require('mongodb');

function MongoDBConnector(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
 }

MongoDBConnector.prototype.getData = async function(collectionName) {
    let promise = new Promise(resolve => {
        mongodb.connect(this.uri, (err, db) => {
            if (err) throw err;
            let dbo = db.db(this.dbName);

            dbo.collection(collectionName)
               .find({})
               .toArray((err, result) => {
                   if(err) throw err;
                   resolve(result);
               });

            db.close();
        });
    });

    return promise;
}

module.exports = MongoDBConnector;
