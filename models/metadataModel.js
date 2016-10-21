/* Metadata MODEL
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var metadataSchema = mongoose.Schema({
  metadataType: {type: String, required: true},
  metadataList: [{type: String, required: true}]
});

module.exports = mongoose.model('metadata', metadataSchema);
