var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var logger = require("morgan");

var productRouter = require("./routes/product");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", productRouter);

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
