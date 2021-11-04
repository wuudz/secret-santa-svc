const JobService = require("../services/JobService");

const create = async (req, res) => {
  await JobService.create()

  return res.json({
    "success": true,
    "messages": "Created secret santa",
    "data": req.body
  });
}

module.exports = {
  create,
}
