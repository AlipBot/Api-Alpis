require("./settings");
const http = require("http");
const app = require("./index");
const PORTHOST = port || 8080;

http.createServer(app).listen(PORTHOST, () => {
    console.log(`


 ____  ____  _  _  _  _    __   
(_   )( ___)( \/ )( \/ )  /__\  
 / /_  )__)  )  (  )  (  /(__)\ 
(____)(____)(_/\_)(_/\_)(__)(__)


ZEXXA REST API
Server running on http://localhost:` + PORTHOST)
console.log(`Hello ${creator}`)
})
