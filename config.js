const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/GraphQLDB1")
  .then(() => console.log("DB Connected "))
  .catch((err) => console.log(err));

const userSchema = {
  name: String,
  role: String,
};
const user = mongoose.model("user", userSchema);
module.exports = user;
