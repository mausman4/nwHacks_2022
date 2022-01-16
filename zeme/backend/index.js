import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import ZemeDAO from "./dao/zemeDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

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
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})