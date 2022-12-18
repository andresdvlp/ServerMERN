const mongoose = require("mongoose");
const app = require("./app");
const { DB_URI, IP_SERVER, API_VERSION } = require("./constants");



const PORT = process.env.POST || 3001;


mongoose.set('strictQuery', true);
mongoose.connect(DB_URI,
    (error) => {
        //if (error) throw error;
        app.listen(PORT, ()=>{
            console.log("##################");
            console.log("####API REST######");
            console.log("##################");
            console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
        })
    }
);
