const express = require("express");
const router = new express.Router();

const { success, fail } = require("../middleware/sendStatus");
const { getTop5Scores } = require("../middleware/scoresData");

router.get("/topScores", /*checkData ,*/ getTop5Scores, success);

module.exports = router;
