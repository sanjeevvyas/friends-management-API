import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import http from 'http'
import dotenv from "dotenv";
import mongoClient from './app/config/db.config.js'
import Router from './app/router/index.js'

dotenv.config();

const app = express()
const port = process.env.PORT || 3000

var corsOptions = {
    origin: process.env.ALLOW_ACCESS_ORIGIN,
};

app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoClient()
Router(app)

let server = http.createServer(app)

server.listen(port, () => {
    console.log(`Server is running on ${port}`);

})

