require("./settings");
const http = require("http");
const app = require("./index");
const PORTHOST = port || 8080;

http.createServer(app).listen(PORTHOST, () => {
    console.log(`
 ______ _______   ____   __  ___  
|___  /|  ___\ \ / /\ \ / / / _ \ 
   / / | |__  \ V /  \ V / / /_\ \
  / /  |  __| /   \  /   \ |  _  |
./ /___| |___/ /^\ \/ /^\ \| | | |
\_____/\____/\/   \/\/   \/\_| |_/
ZEXXA REST API
Server running on http://localhost:` + PORTHOST)
console.log(`Hello ${creator}`)
})
