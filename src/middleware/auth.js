export default (req, res, next) => {
    const pollApiKey = req.headers["poll-api-key"]
    if (pollApiKey !== process.env.POLL_API_KEY)
      next(Error( "not authenticated" ));
    else next();
};
