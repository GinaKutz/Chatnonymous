const express = require("express");
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3002;


const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const path = require("path");

// socket.io
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// start connection
io.on("connection", function (client) {
    client.on("clicked", function (data) {
        console.log(data);
        io.emit("message", data);
    });
});

//start server


sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, function () {
        console.log(`listening on http://localhost:${PORT}`);
    });
});
