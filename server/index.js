const { app } = require("./src/config");

(async () => {
    // Start the server
    await app.start(process.env.PORT || 3000);

    console.log("Server started!");
})();
