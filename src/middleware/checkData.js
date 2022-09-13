const { fail } = require('./sendStatus')

module.exports = (req,res,next) =>{ 
    // console.log("check data validation for data:", req.data)
    const data = req.body;

    let errorMessage = ''
    if(!data.name) errorMessage ="Not  Unauthorized"
    if(errorMessage){
        fail({message: errorMessage}, req,res)
        return
    }
    // console.log("after data validation . new data:", req.data)
    next();
}