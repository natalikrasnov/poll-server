import  express  from "express";
const router = new express.Router();

import {
  getPollsByPages,
  insertNew,
  submitPollVote,
} from "../middleware/pollsData.js";

router.get("/api/polls/", getPollsByPages);   //?page={page} 
router.post("/api/poll/add-poll", insertNew);
router.get("/api/poll/:id/vote/:option", submitPollVote);


export default router