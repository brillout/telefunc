import express from "express";

const port = 5000;

(async () => {
    const app = express();


    // Serve static pages:
    app.use(express.static('client/dist')); // TODO: only in production

    

    await app.listen(5000);
    console.log("Server started: http://localhost:" + port)
})();