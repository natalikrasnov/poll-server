

module.exports ={
    success:  (req,res) =>{ 
        res.status(200).send({status: "ok",message: "successfully", data: res.body});
    },
    fail: (err, req, res)=> {
        console.error(err)
        res.status(500).send( {status: "error", message: err.message || err.Message})
    }
}

