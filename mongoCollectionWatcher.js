const DataManager = require('./dataManager.js');
const MongoDBConnector = require('./mongoDBConnector.js') ;
const utils = require('./utils.js');

function MongoCollectionWatcher(dbUri, dbName) {
    this.isRunning = false;
    this.isFirstTime = true;

    this.dataManager = new DataManager();
    this.dbConnector = new MongoDBConnector(dbUri, dbName);
    this.intervalFunc = null;
}

MongoCollectionWatcher.prototype.watch = function(collectionName, intervalTimeMilSec, callBack) {
    if(!this.isRunning){
        this.isRunning = true;

        this.intervalFunc = setInterval(() => { this.watchCollection(collectionName, (change) => callBack(change)) },
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

    if(!utils.isEmpty(changedData)){
        for(let i =0; i < changedData.length; i ++){
            status = changedData[i]['status'];
            id = changedData[i]['id'];
            key = changedData[i]['changed'];
            before = changedData[i]['before'];
            after = changedData[i]['after'];

            let change = {
                status: status,
                id: id,
                key: key,
                before: before,
                after: after
            }

            callBack(change);
        }
    }
}

MongoCollectionWatcher.prototype.close = function(){
    this.isRunning = false;
    this.isRunning = true;
    clearInterval(this.intervalFunc);
}

module.exports = MongoCollectionWatcher;
