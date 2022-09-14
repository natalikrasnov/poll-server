
 function success(req, res) {
    res.status(200).send({ status: "ok", message: "successfully", data: res.body });
}

 function fail(err, req, res) {
    console.error(err);
    res.status( err.status || 500).send({ status: "error", message: err.message || "something wrong" });
}

export default  {
    success, fail
}