import express  from 'express'
import path from 'path'
import {fileURLToPath} from 'url'

import { telefunc } from 'telefunc'

// manual import (if needed) https://github.com/brillout/vite-plugin-import-build#manual-import
//await import('./dist/server/importBuild.cjs')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use('/', express.static(__dirname + '/dist/client'))

// Telefunc middleware
app.all('/_telefunc', express.text(), async (req, res) => {
    const httpResponse = await telefunc({
        // HTTP Request URL, which is '/_telefunc' if we didn't modify config.telefuncUrl
        url: req.url,
        // HTTP Request Method (GET, POST, ...)
        method: req.method,
        // HTTP Request Body, which can be a string, buffer, or stream
        body: req.body,
        // Optional
        context: {
            /* Some context */
        }
    })
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
})

app.get('/hi', (_, res) => res.send('Hello from express for vite+telefunc'))

const port = process.env.PORT || 3000
app.listen(port, 
    () =>  { console.log(`Server running at http://localhost:${port}`) })
