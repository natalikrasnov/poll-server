
const { fail} = require('./sendStatus')
const userData = require('../data/userData');

module.exports = {
    addUserData: async (req,res,next) =>{ 
        try{
            let result = await userData.insert(req.body)
            console.log(result)
            res.body = result
        }catch(e){
            fail (e,req,res,next)
            return
        }
       next();
    }
}
