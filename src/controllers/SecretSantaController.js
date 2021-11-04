const create = async (req, res) => {
  return res.json({
    "success": true,
    "messages": "Created secret santa",
    "data": req.body
  });
}

module.exports = {
  create,
}
