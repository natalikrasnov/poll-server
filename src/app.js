import  express, { json } from 'express';
import cors from "cors";

import  router  from "./routers/poll.js";
import authenticate from './middleware/auth.js';
import sendStatus from "./middleware/sendStatus.js";
import mongoose from './services/mongoose.js'

mongoose().catch((err) => console.log(err));

const corsOptions ={
   origin:'*'
}

const app = express();
app.use(cors(corsOptions)) 

app.use(json());

app.use(authenticate);

app.use(router);

app.use(sendStatus.success);
app.use(sendStatus.fail);


export default app;