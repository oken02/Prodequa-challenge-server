const express = require("express");
const mongooseLoader = require("./db");
// const cors = require("cors");
// require("dotenv").config();
const path = require("path");
const routes = require("./routes");

const app = express();

// app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.use("/api", routes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke! msg: " + err.message);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
 
mongooseLoader()
  .then(() => {
    console.log("Db loaded and connected");
    app.listen(process.env.PORT || 3001, () => {
      console.log(`app listening at http://localhost:3001`);
    });
  })
  .catch((err) => console.log(err));
