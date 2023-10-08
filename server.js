require("./settings");
const http = require("http");
const app = require("./index");
const PORTHOST = port || 3000;

http.createServer(app).listen(PORTHOST, () => {
    console.log(`
                              

███████╗███████╗██╗░░██╗██╗░░██╗░█████╗░
╚════██║██╔════╝╚██╗██╔╝╚██╗██╔╝██╔══██╗
░░███╔═╝█████╗░░░╚███╔╝░░╚███╔╝░███████║
██╔══╝░░██╔══╝░░░██╔██╗░░██╔██╗░██╔══██║
███████╗███████╗██╔╝╚██╗██╔╝╚██╗██║░░██║
╚══════╝╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝


ZEXXA REST API
Server running on http://localhost:` + PORTHOST)
console.log(`Hello ${creator}`)
})
