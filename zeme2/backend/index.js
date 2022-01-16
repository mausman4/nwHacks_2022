import { Server } from "socket.io";
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import http from 'http'
import ZemeDAO from "./dao/zemeDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials:true
    }
  });

const port  = process.env.PORT || 8000

MongoClient.connect(
    process.env.ZEME_DB_URI,
    {
        maxPoolSize: 100,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    },
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})

.then(async client => {
    await ZemeDAO.injectDB(client) //connect to database
    server.listen(port, () => {
        console.log(`listening on port ${port}`)
    });
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.broadcast.emit('greetings', 'Hello!');
        
        socket.on('start-memes', (meetingId) => {
            socket.broadcast.emit('start-memes', meetingId, 'image');
        });
    });
})