utils = {}

utils.isEmpty = function(object) {
    if(object === "undefined" || object == "undefined" || object == null || object === null){
        return true;
    }
    return false;
}

module.exports = utils
