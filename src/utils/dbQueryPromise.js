const mysql = require('mysql2');
const config = require('config');

const db = mysql.createPool(config.get("db"));

async function createConnection(query, data){
    try{
        return await db.promise().query(query,data)
    }catch(e){
        console.error(e);
        return null
    }
}
module.exports = async(query, data) => {
    let connection = await createConnection(query, data);
    if(connection) console.log("--connect--")
    return connection
    // do {
    //     console.log("try to create connection")
    //     connection =
            // await createConnection(query, data)
    // } while(!connection)
    // console.log("--connect--");
    // return connection
}
