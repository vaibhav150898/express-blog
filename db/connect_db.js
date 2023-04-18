const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/Blogwebsite";
const live_url =
  "mongodb+srv://vaibhavprajapati094:VyB836Fk9507Ebgh@cluster0.tbfexa9.mongodb.net/cluster0?retryWrites=true&w=majority";

const connectDB = () => {
  return mongoose
    .connect(live_url)

    .then(() => {
      console.log("Connection succesfull");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDB;
