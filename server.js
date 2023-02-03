const http = require("http");
const app = require("./index");
const PORT = process.env.PORT || 8080;

http.createServer(app).listen(PORT);
