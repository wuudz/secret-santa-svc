const index = async (req, res) => {
  const profileId = req.params.id;

  return res.json({
    "success": true,
    "messages": "GOT profile data",
    "profile": {
      "id": profileId
    }
  });
}

const update = async (req, res) => {
  const profileId = req.params.id;

  return res.json({
    "success": true,
    "messages": "PUT profile data",
    "profile": {
      "id": profileId,
      "data": req.body
    }
  });
}

module.exports = {
  index,
  update,
}
