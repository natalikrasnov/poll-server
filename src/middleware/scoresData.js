const { fail } = require("./sendStatus");
const userData = require("../data/userData");

module.exports = {
  getTop5Scores: async (req, res, next) => {
    try {
      let [result] = await userData.findTop5();
        console.log(result);
        if(!result) throw Error("no data")
      res.body = result;
    } catch (e) {
      fail(e, req, res, next);
      return;
    }
    next();
  },
};
