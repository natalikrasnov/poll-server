const config = require('config');
const app = require('./app');

const port = config.get("PORT")|| 3004;

app.listen(port, function(){
    console.log("server start on port "+port);
});