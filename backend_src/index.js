import mongodb from "mongodb";
import app from "./server.js";
import ReviewsDao from "./dao/reviewsDAO.js";

const MongoClient = mongodb.MongoClient;
const mongo_username = "user123";
const mongo_password = "user123";

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@user.9mrdc.mongodb.net/?retryWrites=true&w=majority&appName=User`;
const port = 8000;
MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true,
    }).catch(err => {
        console.error(err.stack)
        process.exit(1)
    }).then(async client =>{
        await ReviewsDao.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })