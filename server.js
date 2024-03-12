const express = require("express");
const app = express();
const path = require("path");
const helpers = require("./utils/helpers");

// socket.io
var server = require("http").createServer(app);
var io = require("socket.io")(server);

// handlebars
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// routing
app.use(express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
    res.render("index");
});

// start connection
io.on("connection", function (client) {
    client.on("clicked", function (data) {
        console.log(data);
        io.emit("message", data);
    });
});

//start server
server.listen(3000, function () {
    console.log("listening on http://localhost:3000");
});
