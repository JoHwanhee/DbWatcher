const DataManager = require('./dataManager.js');
const MongoDBConnector = require('./mongoDBConnector.js') ;
const utils = require('./utils');

function MongoCollectionWatcher() {
    this.isRunning = false;
    this.isFirstTime = true;

    this.dataManager = new DataManager();
    this.dbConnector = new MongoDBConnector();

    this.intervalFunc = null;
}

MongoCollectionWatcher.prototype.initDB = function(dbUri, dbName) {
    this.dbConnector.init(dbUri, dbName);
}

MongoCollectionWatcher.prototype.watch = function(collectionName, intervalTimeMilSec, callBack) {
    if(!this.isRunning){
        this.isRunning = true;

        this.intervalFunc = setInterval(() => { this.watchCollection(collectionName, (status, id, key, beforeElement, afterElement) => callBack(status, id, key, beforeElement, afterElement)) },
        intervalTimeMilSec);
    }
}

MongoCollectionWatcher.prototype.watchCollection = async function(collectionName, callBack) {
    let data = [];

    await this.dbConnector.getData(collectionName)
                          .then(result => data = result )
                          .catch(error => console.error(error))

    if( this.isFirstTime ) {
        this.dataManager.init(data);
        this.isFirstTime = false;
    }

    let changedData = this.dataManager.getChangedDataList(data);

    if(!utils.empty(changedData)){
        for(let i =0; i < changedData.length; i ++){
            status = changedData[i]['status'];
            id = changedData[i]['id'];
            key = changedData[i]['changed'];
            before = changedData[i]['before'];
            after = changedData[i]['after'];

            callBack(status, id, key, before, after);
        }
    }
}

MongoCollectionWatcher.prototype.close = function(){
    this.isRunning = false;
    this.isRunning = true;
    clearInterval(this.intervalFunc);
}

module.exports = MongoCollectionWatcher;
