/* Resource MODEL
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resourceSchema = mongoose.Schema({
  name: {type: String, required: true},
  link: {type: String, required: true},
  level: {type: String, required: true},
  type: [{type: String, required: true}],
  subject: {type: String, required: true},
  tags: [{type: String, required: true}],
  description: {type: String, required: true}
});

module.exports = mongoose.model('resources', resourceSchema);
