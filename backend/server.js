const app = require("express")();

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, { cors: "*" });

const PORT = 5000;

const eventhandler=require('./eventHandler.js')(io);


io.on("connection",eventhandler);

httpServer.listen(PORT, () => {
  console.log(`Server has started listening to  PORT:${PORT} `);
});
