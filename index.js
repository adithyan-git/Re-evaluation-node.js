const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({path:"config.env"});
const databaseConnection = require("./databaseConnection");
databaseConnection()
app.listen(process.env.PORT,()=>{
    console.log(`server run on port ${process.env.PORT}`);
})
