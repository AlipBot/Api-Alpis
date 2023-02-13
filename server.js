const http = require("http");
const app = require("./index");
const PORT = process.env.PORT || 8080;

http.createServer(app).listen(PORT, () => {
    console.log(`
    █████╗ ██████╗ ██╗     █████╗ ██╗     ██████╗ ██╗███████╗
   ██╔══██╗██╔══██╗██║    ██╔══██╗██║     ██╔══██╗██║██╔════╝
   ███████║██████╔╝██║    ███████║██║     ██████╔╝██║███████╗
   ██╔══██║██╔═══╝ ██║    ██╔══██║██║     ██╔═══╝ ██║╚════██║
   ██║  ██║██║     ██║    ██║  ██║███████╗██║     ██║███████║
   ╚═╝  ╚═╝╚═╝     ╚═╝    ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚══════╝ V2 
			                          @alipje29
								 
Server running on http://localhost:` + port)
console.log(`Hello ${creator}`)
})