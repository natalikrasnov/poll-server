import Poll from '../model/PollModel.js'
import logger from '../logger/Logger.js'

const handleResult = async (reqResult, req, res, next) => {
    try {
        let result = await reqResult;
        console.log(result);
        if (!result || result.errors)
        next(Error(result.errors ? result.errors : "no data"));
        res.body = result;
        next();
    } catch (e) {
        next(e);
    }
};

export async function insertNew (req, res, next) {
        const newOne = new Poll(req.body);
        let result = await newOne.save();
        logger.info(
        `New vote casted to poll ${result._id}, option: ${result.options}`
        );
        handleResult(result, req, res, next);
    }

  export async function getPollsByPages (req, res, next)  {
        const page = +req.query.page -1;
        const dataResult = {
            data: await Poll.find().skip(page * 3).limit(3),
            isComplete: (await Poll.find().count()) <= (page+1) * 3,
            page: page+1,
        };
        handleResult(dataResult, req, res, next);
    }
  
export async function submitPollVote(req, res, next) {
    const id = req.params.id;
    const option = req.params.option;
    const foundOne = await Poll.findById(id);
    foundOne.options.map(el => {
        if(el.option == option ) el.votes++
        return el
    })
    const result = await foundOne.save()
    handleResult(result, req, res, next);
  }