import config from 'config';
import app from './app.js';

const port = config.get("PORT")|| 3004;

app.listen(port, function(){
    console.log("server start on port "+port);
});