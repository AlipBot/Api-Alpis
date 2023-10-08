require("./settings");
const http = require("http");
const app = require("./index");
const port = process.env.PORT || 3000;
const host = '0.0.0.0';

http.createServer(app).listen(port, host, () => {
    console.log(`
                              

███████╗███████╗██╗░░██╗██╗░░██╗░█████╗░
╚════██║██╔════╝╚██╗██╔╝╚██╗██╔╝██╔══██╗
░░███╔═╝█████╗░░░╚███╔╝░░╚███╔╝░███████║
██╔══╝░░██╔══╝░░░██╔██╗░░██╔██╗░██╔══██║
███████╗███████╗██╔╝╚██╗██╔╝╚██╗██║░░██║
╚══════╝╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝


ZEXXA REST API
Server running on http://${host}:` + PORTHOST)
console.log(`Hello ${creator}`)
})
