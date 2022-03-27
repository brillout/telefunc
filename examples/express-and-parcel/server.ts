import express from "express";
import { telefunc } from "telefunc"

const port = 5000;

(async () => {
    const app = express();


    // Serve static pages:
    app.use(express.static('client/dist')); // TODO: only in production

    app.all('/_telefunc', async (req, res) => {
        const { originalUrl: url, method, body } = req
        const httpResponse = await telefunc({ url, method, body })
        res.status(httpResponse.statusCode).type(httpResponse.contentType).send(httpResponse.body)
    })
    

    await app.listen(5000);
    console.log("Server started: http://localhost:" + port)
})();