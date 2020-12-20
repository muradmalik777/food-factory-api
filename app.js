const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://localhost:27017/foodFactory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const addDefaultAdmin = () => {
  const userData = {
    name: "Admin",
    email: "muradmalik7@gmail.com",
    password:
      "xRjpfPkdiq8mqqV7h5o4cQ==$21Q5pe61VKKNpsU9oc1cF7F00kksXkgWRKJ7D4ZRdXbnOmgkxQheHB2f4nm+Lzq7lG1BpWzeNPNIeICl9a9ydg==",
    department: "butcher",
    role: "admin",
  };

  const UserModel = require("./models/user.model");
  UserModel.findByEmail(userData.email).then((userInDB) => {
    if (!userInDB) {
      UserModel.createUser(userData);
    }
  });
};

addDefaultAdmin();

app.use(require("./routes"));
app.listen(8081, () => console.log("Server running on http://localhost:8081/"));
