var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/somedbname");

var citySchema = mongoose.Schema({
  city: String,
  state: String,
});

module.exports = mongoose.model("cities", citySchema);
