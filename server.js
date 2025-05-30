const app = require('./app');
const db = require('./db');
const configs = require('./configs');

const startServer = async () => {
    try {
        await db.getConnection()

        app.listen(configs.port , () => {
            console.log(`Server is running on port ${configs.port}`)
        })
    } catch (error) {
        console.log("Err -> " , error);
        db.end()
    }
}

startServer()