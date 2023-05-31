const isValid = function(value) {
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidTitle = function(title) {
    return ['Mr', 'Mrs', 'Miss', 'Mast'].indexOf(title) !== -1
}

const isValidObjectId = function(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

module.exports = {
    isValid,
    isValidObjectId,
    isValidTitle
}