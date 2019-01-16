const diff = require('deep-diff');
const utils = require('./utils');

function DataManager() {
    this.data = []
}

DataManager.prototype.init = function(data) {
    this.data = data;
}

DataManager.prototype.getChangedDataList = function(inputData) {
    let changedDataList = []

    if(this.isSmame(inputData)){
        changedDataList = this.parseSameDataList(inputData);
    }
    else if(this.isInsert(inputData)) {
        changedDataList = this.parseInsertDataList(inputData);
    }
    else if (this.isDelete(inputData)){
        changedDataList = this.parseDeleteDataList(inputData);
    }
    else {
        changedDataList = this.parseChangedDataList(inputData);
    }

    this.data = inputData;
    return changedDataList;
}

DataManager.prototype.isSame = function(inputData){
    return JSON.stringify(this.data) == JSON.stringify(inputData)
}

DataManager.prototype.parseSameDataList  = function(inputData){
    let status = "same";
    let changedDataList = []

    let data = {
        id: '',
        status: status,
        changed: '',
        before: this.data,
        after: inputData
    }

    changedDataList.push(data)
    return changedDataList;
}

DataManager.prototype.isInsert = function(inputData){
    return this.data.length < inputData.length;
}

DataManager.prototype.parseInsertDataList  = function(inputData){
    let status = "insert";
    let changedDataList = []

    let data = {
        id: changedCollectionId,
        status: status,
        changed: 'document',
        before: before,
        after: after
    }

    changedDataList.push(data);

    return changedDataList;
}

DataManager.prototype.isDelete = function(inputData){
    return this.data.length > inputData.length
}

DataManager.prototype.parseDeleteDataList  = function(inputData){
    let status = "delete";
    let changedDataList = []

    let data = {
        id: changedCollectionId,
        status: status,
        changed: 'document',
        before: before,
        after: after
    }

    changedDataList.push(data);

    return changedDataList;
}

DataManager.prototype.parseChangedDataList = function(inputData){
    let changedDataList = [];
    let changes = diff(this.data, inputData);

    if(utils.isEmpty(changes)){
        return null;
    }

    for(let i = 0; i < changes.length; i ++){
        let changedCollectionNumber = changes[i]['path'][0];
        let changedCollectionData = changes[i]['path'][1];

        let changedCollectionId = inputData[changedCollectionNumber]['_id'];
        let before = this.data[changedCollectionNumber];
        let after = inputData[changedCollectionNumber];

        let status = "changed";

        let data = {
            id: changedCollectionId,
            status: status,
            changed: changedCollectionData,
            before: before,
            after: after
        }
    }

    changedDataList.push(data);
    return changedDataList;
}

DataManager.prototype.findUser = function(id) {
    return this.data.find(user => user._id == id + '');
}


module.exports = DataManager;
