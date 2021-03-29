const Server = require("./src/server.js");

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

(async() =>{ await Server.init() })()
